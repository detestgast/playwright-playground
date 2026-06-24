/**
 * Formats a date value into a string in the format "DD-MM-YYYY".
 * @param value - The date value to format. Can be a Date object, a string, or a number.
 * @returns A string representing the formatted date in "DD-MM-YYYY" format.
 */
export function formatDate(value: Date | string | number): string {
  const date = value instanceof Date ? value : new Date(value);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

/**
 * Converts a Date object to a string in the format "YYYY-MM-DD" for API usage.
 * @param date - The Date object to convert.
 * @returns A string representing the date in "YYYY-MM-DD" format.
 */
export function apiDate(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
