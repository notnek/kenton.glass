---
title: Deploying Statamic across stages with version-controlled content
description: Learn a solid way to deploy Statamic across stages with version-controlled content.
createdAt: 2022/10/19
---

[Statamic](https://statamic.com) is a fantastic flat-file CMS built on top of [Laravel](https://laravel.com). It's extremely flexible to model content in anyway that you or your client may need. It also comes with an API and GraphQL support ouf-of-the-box. This article won't go too deeply into Statamic but focus strictly on their Git integration and how I've come to manage and deploy a Statamic-powered site across multiple stages.

The good news is that Statamic is a Laravel package so when it comes to deployment, however you may have deployed a Laravel-powered site in the past can still be applied now. I've used the automated deployment through [Laravel Forge](https://forge.laravel.com), [Capstraino](https://capistranorb.com), and currently use [Deployer](https://deployer.org). Below is my typical task to deploy my sites. I use the `statamic` recipe from Deployer which is built off the `laravel` recipe so you get all of the handy commands for both.

```php
task('deploy', [
    'deploy:prepare',
    'deploy:vendors',
    'yarn:install',
    'yarn:build',
    'artisan:storage:link',
    'artisan:config:cache',
    'artisan:route:cache',
    'artisan:view:cache',
    'deploy:publish',
    'statamic:stache:refresh',
    'statamic:static:clear',
]);
```

One thing I do is persist the [static cache](#) across deployments and only clear these files once a deployment is completely finished. That way during a deployment, users still benefit from the static cache. Now, this is all good and gets our site deployed, but what if we want to version control the content?

Statamic has some [extensive documentation](https://statamic.dev/git-automation) around git automation so I won't dig too deep here, but the gist is you can configure paths to be watched within your repo and have Statamic commit changes and even push them to a remote as a user works within the control panel. This is a killer feature as it gives you a history of content changes with the option of moving to a remote as a backup. There has certainly been more than one time when a client has made a change that I ended up needing to rollback. By utilizing this built-in git automation, it was very simple. The rest of this article assumes you've followed their docs and have automatic git pushes turned on.

With all of this done, we are in a pretty good spot. We can deploy without downtime and any content change in the control panel gets committed to git and pushed to a remote. But what happens if we want a staging environment where content is different from production? One approach could be to simple make a staging branch and have the content live there and every deployment to staging goes through that branch. That works fine, but I think quickly you end up with a risk of leaking that separate staging content to production. The safest thing to do is to whole separate content from code and branch that content per environment. Here's how that looks:

## Separate your content

Originally, I had content-specific branches in the same repo, but that become cumbersome to manage pretty quickly. So recently, I've switched to simply making a brand new adjacent repo for the directories involved in Statamic's git automation. Working from the default config, you'd have a repo with the following directories:

```
/content
/users
/public/assets
/resources/forms
/resources/blueprints/forms
/resources/users
```

This is as simple as moving these directories from the repo that houses your site code into your new content repo. I typically keep 3 branches: main for development, staging and production. In each environment, you just checkout the version you want to use. Next comes bringing that content in your app. These needs to happen in 2 places. You need to be able to do it locally for you to work on the site yourself, and you need need to do it during deployment so that your site has the correct content.

## Content Linking

I've solved this by writing a simple command to symlink the above directories into your site. You do it once during setup in your development environment, and then you do it during the deployment flow. I've bundled it up as a simple package called [Statamic Content Link] to make it as easy as possible. The basic gist is that we delete existing directories for the paths that will be controlled by git, and them symlink from another location. This allows your site to have whichever version of content you want. Want to test your site locally with produciton content? Simple checkout the production branch and refresh your stache.

## Server Setup

What we've done so far gets you setup locally, but we also need this to happen during deployment. For that, I checkout the given environment's branch in the `shared` directory (Deployer and Capistrano both use this paradigm). This is a great place to utilize git's ability to clone a single branch as Statamic git commits can add up quickly in count and size (especially if you are storing assets):

```bash
git clone -b staging --single-branch <remote>
```

With my setup, you now have this basic structure on your server:

```
/releases
/current
/shared/<content-repo>
```

With the repo checked out, you can include the content linking command in your deployment flow. I like to put it just before `composer install` is ran so that Statamic doesn't try to create its own content directories.
