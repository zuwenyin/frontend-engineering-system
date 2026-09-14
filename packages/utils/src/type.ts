/**
 * Checks whether a value is `null` or `undefined`.
 *
 * @param value - The value to check.
 * @returns `true` when the value is `null` or `undefined`.
 *
 * @example
 * ```ts
 * isNil(null) // true
 * isNil(undefined) // true
 * isNil(0) // false
 * ```
 */
export function isNil(value: unknown): value is null | undefined {
  return value === null || value === undefined
}

/**
 * Checks whether a value is neither `null` nor `undefined`, narrowing the type.
 *
 * @param value - The value to check.
 * @returns `true` when the value is defined.
 *
 * @example
 * ```ts
 * isDefined(0) // true
 * isDefined("") // true
 * isDefined(null) // false
 *
 * const list = [1, null, 2].filter(isDefined) // number[]
 * ```
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}

/**
 * Checks whether a value is a plain object, e.g. created via `{}` or `new Object()`.
 * Arrays, class instances, `Date`, `Map` and `null` are not considered plain objects.
 *
 * @param value - The value to check.
 * @returns `true` when the value is a plain object.
 *
 * @example
 * ```ts
 * isPlainObject({}) // true
 * isPlainObject(Object.create(null)) // true
 * isPlainObject([]) // false
 * isPlainObject(new Date()) // false
 * ```
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null) {
    return false
  }
  const prototype = Object.getPrototypeOf(value)
  return prototype === Object.prototype || prototype === null
}

/**
 * Checks whether a value is "empty". `null`/`undefined`, empty strings and arrays,
 * empty `Map`/`Set` and plain objects without own keys are treated as empty.
 *
 * @param value - The value to check.
 * @returns `true` when the value is empty.
 *
 * @example
 * ```ts
 * isEmpty(null) // true
 * isEmpty("") // true
 * isEmpty([]) // true
 * isEmpty(new Map()) // true
 * isEmpty({}) // true
 * isEmpty({ a: 1 }) // false
 * ```
 */
export function isEmpty(value: unknown): boolean {
  if (isNil(value)) {
    return true
  }
  if (typeof value === "string" || Array.isArray(value)) {
    return value.length === 0
  }
  if (value instanceof Map || value instanceof Set) {
    return value.size === 0
  }
  if (isPlainObject(value)) {
    return Object.keys(value).length === 0
  }
  return false
}
