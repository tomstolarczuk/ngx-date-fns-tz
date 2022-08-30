import { isValid } from 'date-fns';

export function isValidDate(date: any): boolean {
  return date != null && isValid(new Date(date));
}
