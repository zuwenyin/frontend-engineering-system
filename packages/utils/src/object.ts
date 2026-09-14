import { isPlainObject } from "./type.js"

/**
 * Creates a new object containing only the picked properties.
 *
 * @param object - The source object.
 * @param keys - The property keys to pick.
 * @returns A new object with only the picked properties.
 *
 * @example
 * ```ts
 * pick({ id: 1, name: "Alice", age: 30 }, ["id", "name"])
 * // { id: 1, name: "Alice" }
 * ```
 */
export function pick<T extends object, K extends keyof T>(object: T, keys: readonly K[]): Pick<T, K> {
  const result = {} as Pick<T, K>
  for (const key of keys) {
    if (key in object) {
      result[key] = object[key]
    }
  }
  return result
}

/**
 * Creates a shallow copy of an object without the omitted properties.
 *
 * @param object - The source object.
 * @param keys - The property keys to omit.
 * @returns A shallow copy without the omitted properties.
 *
 * @example
 * ```ts
 * omit({ id: 1, name: "Alice", age: 30 }, ["age"])
 * // { id: 1, name: "Alice" }
 * ```
 */
export function omit<T extends object, K extends keyof T>(object: T, keys: readonly K[]): Omit<T, K> {
  const result = { ...object } as unknown as Record<string, unknown>
  for (const key of keys) {
    delete result[key as string]
  }
  return result as unknown as Omit<T, K>
}

function clone(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => clone(item))
  }
  if (value instanceof Date) {
    return new Date(value.getTime())
  }
  if (isPlainObject(value)) {
    const result: Record<string, unknown> = {}
    for (const [key, item] of Object.entries(value)) {
      result[key] = clone(item)
    }
    return result
  }
  return value
}

/**
 * Creates a deep clone of the given value. Plain objects, arrays and `Date`
 * instances are cloned recursively, while other values are returned as-is.
 *
 * @param value - The value to clone.
 * @returns A deep clone of the value.
 *
 * @example
 * ```ts
 * const source = { user: { name: "Alice" }, tags: ["a"] }
 * const copy = deepClone(source)
 * copy.user.name = "Bob"
 * source.user.name // "Alice" (the original is untouched)
 * ```
 */
export function deepClone<T>(value: T): T {
  return clone(value) as T
}
