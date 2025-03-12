import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names and merges Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a currency value with the specified locale and currency
 */
export function formatCurrency(amount: number, locale = 'es-MX', currency = 'MXN') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Formats a date with the specified locale and options
 */
export function formatDate(date: Date | string, locale = 'es-MX', options?: Intl.DateTimeFormatOptions) {
  const dateToFormat = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    ...options,
  }).format(dateToFormat);
}

/**
 * Generates a random string for use as temporary IDs
 */
export function generateId(length = 8) {
  return Math.random().toString(36).substring(2, 2 + length);
}

/**
 * Truncates a string to the specified length and adds an ellipsis
 */
export function truncateString(str: string, length = 50) {
  if (str.length <= length) return str;
  return `${str.substring(0, length)}...`;
}

/**
 * Debounces a function call
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait = 300) {
  let timeout: NodeJS.Timeout;
  
  return function(...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}