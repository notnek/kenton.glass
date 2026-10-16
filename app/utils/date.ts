import { format } from 'date-fns';

export function formatFullDate(date?: string) {
  if (!date) {
    return '';
  }

  return format(new Date(date), 'MMMM do, y');
}

export function formatYear(date?: string) {
  if (!date) {
    return '';
  }

  return format(new Date(date), 'y');
}
