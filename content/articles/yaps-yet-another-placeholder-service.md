---
title: YAPS (Yet Another Placeholder Service)
createdAt: 2021/02/03
---
**TLDR:** I made a placeholder image service called YAPS that returns placeholder SVGS. [Check it out!](https://yaps.dev)

***

I always find myself needing placeholder images whether it's building a page or an entire new site. Over the years, there have been [plenty](https://placeholder.com) [of](https://placekitten.com) [options](https://satyr.dev) but they always fell short for me. They either were slow, not professional or would randomly go down. So I scratched my own itch, and built my own. It's called [YAPs (or *Yet Another Placeholder Service*)](https://yaps.dev) and it's really fast, very flexible and because I rely on it near daily: always up. My absolute favorite feature is defining dimensions via aspect ratio. Read on for how it works and to see example uses.

## How it works
It's a very simple service. Through URL segments, you can define the dimensions and colors. Dimensions can be provided as just the width for squares, a width and height, or a width and aspect ratio for an unknown height. Colors can be provided as background only or background and foreground. The forgeground consists of the dimensions for easy reference. The service uses these segments to create an SVG. It's *fast*.

## Examples
*Please note the rounded corners in the examples below are from my own site's styling and not the placeholder image itself.*

### Width only
https://yaps.dev/300

![](https://yaps.dev/300)

### Width and height

https://yaps.dev/300x500

![](https://yaps.dev/300x500)

### Width and height via aspect ratio
*This is by far my favorite feature.*

https://yaps.dev/300x16:9

![](https://yaps.dev/300x16:9)

### Colors
Colors are formatted as background-foreground. Only background is required.

https://yaps.dev/300x500/000

![](https://yaps.dev/300x500/000)

https://yaps.dev/300/000-fff

![](https://yaps.dev/300/000-fff)

***

And that's it. I still plan on making a nice landing/documentation page for it, but it's fine for now. Please [check it out!](https://yaps.dev)
