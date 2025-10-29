/**
 * Comprehensive type checking utilities for TypeScript projects
 */

// ==================== BASIC TYPE CHECKERS ====================

/**
 * Checks if a value is a finite number or a string that can be converted to a finite number
 */
export function isNumeric(value: unknown): value is number | string {
  if (typeof value === "number") {
    return Number.isFinite(value);
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed !== "" && Number.isFinite(Number(trimmed));
  }
  return false;
}

/**
 * Checks if a value is a string
 */
export function isString(value: unknown): value is string {
  return typeof value === "string";
}

/**
 * Checks if a value is a non-empty string
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Checks if a value is a boolean
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

/**
 * Checks if a value is a finite number (excludes NaN, Infinity, -Infinity)
 */
export function isNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

/**
 * Checks if a value is an integer
 */
export function isInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value);
}

/**
 * Checks if a value is a positive number
 */
export function isPositiveNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

/**
 * Checks if a value is a bigint
 */
export function isBigInt(value: unknown): value is bigint {
  return typeof value === "bigint";
}

/**
 * Checks if a value is a symbol
 */
export function isSymbol(value: unknown): value is symbol {
  return typeof value === "symbol";
}

// ==================== COMPLEX TYPE CHECKERS ====================

/**
 * Checks if a value is an array
 */
export function isArray<T = unknown>(value: unknown): value is T[] {
  return Array.isArray(value);
}

/**
 * Checks if a value is a non-empty array
 */
export function isNonEmptyArray<T = unknown>(
  value: unknown,
): value is [T, ...T[]] {
  return Array.isArray(value) && value.length > 0;
}

/**
 * Checks if a value is a plain object (not null, not array, not Date, etc.)
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return Object.prototype.toString.call(value) === "[object Object]";
}

/**
 * Checks if a value is a plain object with at least one property
 */
export function isNonEmptyObject(
  value: unknown,
): value is Record<string, unknown> {
  return isObject(value) && Object.keys(value).length > 0;
}

/**
 * Checks if a value is a valid Date object
 */
export function isDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}

/**
 * Checks if a value is a RegExp
 */
export function isRegExp(value: unknown): value is RegExp {
  return value instanceof RegExp;
}

/**
 * Checks if a value is a Map
 */
export function isMap<K = unknown, V = unknown>(
  value: unknown,
): value is Map<K, V> {
  return value instanceof Map;
}

/**
 * Checks if a value is a Set
 */
export function isSet<T = unknown>(value: unknown): value is Set<T> {
  return value instanceof Set;
}

/**
 * Checks if a value is a function
 */
export function isFunction(value: unknown): value is Function {
  return typeof value === "function";
}

/**
 * Checks if a value is an async function
 */
export function isAsyncFunction(value: unknown): value is Function {
  return (
    typeof value === "function" && value.constructor.name === "AsyncFunction"
  );
}

/**
 * Checks if a value is a Promise
 */
export function isPromise<T = unknown>(value: unknown): value is Promise<T> {
  return (
    value instanceof Promise ||
    (typeof value === "object" &&
      value !== null &&
      typeof (value as any).then === "function")
  );
}

// ==================== NULL/UNDEFINED CHECKERS ====================

/**
 * Checks if a value is null
 */
export function isNull(value: unknown): value is null {
  return value === null;
}

/**
 * Checks if a value is undefined
 */
export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

/**
 * Checks if a value is null or undefined
 */
export function isNullish(value: unknown): value is null | undefined {
  return value == null;
}

/**
 * Type guard that excludes null and undefined
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value != null;
}

// ==================== EMPTINESS CHECKERS ====================

/**
 * Checks if a value is considered empty
 * - null, undefined: true
 * - string: true if empty or only whitespace
 * - array: true if length is 0
 * - Map, Set: true if size is 0
 * - plain object: true if no enumerable properties
 * - other values: false
 */
export function isEmpty(value: unknown): boolean {
  if (value == null) return true;

  if (typeof value === "string") {
    return value.trim().length === 0;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }

  if (isObject(value)) {
    return Object.keys(value).length === 0;
  }

  return false;
}

/**
 * Opposite of isEmpty
 */
export function isNotEmpty(value: unknown): boolean {
  return !isEmpty(value);
}

// ==================== ADVANCED TYPE CHECKERS ====================

/**
 * Checks if a value is a valid URL string
 */
export function isUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Checks if a value is a valid email string (basic validation)
 */
export function isEmail(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

/**
 * Checks if a value is a valid UUID string
 */
export function isUuid(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value);
}

/**
 * Checks if a value is a primitive type
 */
export function isPrimitive(
  value: unknown,
): value is string | number | boolean | null | undefined | symbol | bigint {
  const type = typeof value;
  return (
    value == null ||
    type === "string" ||
    type === "number" ||
    type === "boolean" ||
    type === "symbol" ||
    type === "bigint"
  );
}

/**
 * Checks if a value is serializable to JSON
 */
export function isJsonSerializable(value: unknown): boolean {
  try {
    JSON.stringify(value);
    return true;
  } catch {
    return false;
  }
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Gets the precise type of a value as a string
 */
export function getType(value: unknown): string {
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  if (Array.isArray(value)) return "array";
  if (value instanceof Date) return "date";
  if (value instanceof RegExp) return "regexp";
  if (value instanceof Map) return "map";
  if (value instanceof Set) return "set";
  if (value instanceof Promise) return "promise";

  return typeof value;
}

/**
 * Type assertion with custom error message
 */
export function assertType<T>(
  value: unknown,
  predicate: (val: unknown) => val is T,
  message?: string,
): asserts value is T {
  if (!predicate(value)) {
    throw new TypeError(message || `Type assertion failed for value: ${value}`);
  }
}

// ==================== COMPOSITE CHECKERS ====================

/**
 * Checks if all values in an array match a predicate
 */
export function isArrayOf<T>(
  value: unknown,
  predicate: (item: unknown) => item is T,
): value is T[] {
  return Array.isArray(value) && value.every(predicate);
}

/**
 * Checks if a value is an array of strings
 */
export function isStringArray(value: unknown): value is string[] {
  return isArrayOf(value, isString);
}

/**
 * Checks if a value is an array of numbers
 */
export function isNumberArray(value: unknown): value is number[] {
  return isArrayOf(value, isNumber);
}

/**
 * Creates a union type checker from multiple predicates
 */
export function isOneOf<T extends readonly unknown[]>(
  ...predicates: { [K in keyof T]: (value: unknown) => value is T[K] }
): (value: unknown) => value is T[number] {
  return (value: unknown): value is T[number] => {
    return predicates.some((predicate) => predicate(value));
  };
}

// Example usage of isOneOf:
// const isStringOrNumber = isOneOf(isString, isNumber);

export default {
  // Basic types
  isString,
  isNonEmptyString,
  isNumber,
  isInteger,
  isPositiveNumber,
  isNumeric,
  isBoolean,
  isBigInt,
  isSymbol,

  // Complex types
  isArray,
  isNonEmptyArray,
  isObject,
  isNonEmptyObject,
  isDate,
  isRegExp,
  isMap,
  isSet,
  isFunction,
  isAsyncFunction,
  isPromise,

  // Null/undefined
  isNull,
  isUndefined,
  isNullish,
  isDefined,

  // Emptiness
  isEmpty,
  isNotEmpty,

  // Advanced
  isUrl,
  isEmail,
  isUuid,
  isPrimitive,
  isJsonSerializable,

  // Utilities
  getType,
  assertType,

  // Composite
  isArrayOf,
  isStringArray,
  isNumberArray,
  isOneOf,
};
