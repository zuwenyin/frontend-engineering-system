/**
 * Removes duplicate values, keeping the first occurrence.
 *
 * @param array - The source array.
 * @returns A new array without duplicates.
 *
 * @example
 * ```ts
 * unique([1, 2, 2, 3, 3, 3]) // [1, 2, 3]
 * unique(["a", "a", "b"]) // ["a", "b"]
 * ```
 */
export function unique<T>(array: readonly T[]): T[] {
  return Array.from(new Set(array))
}

/**
 * Removes duplicates based on a derived key, keeping the first occurrence.
 *
 * @param array - The source array.
 * @param keySelector - Returns the key used to detect duplicates.
 * @returns A new array without duplicates.
 *
 * @example
 * ```ts
 * const users = [
 *   { id: 1, name: "Alice" },
 *   { id: 1, name: "Alice (dup)" },
 *   { id: 2, name: "Bob" },
 * ]
 * uniqueBy(users, (user) => user.id)
 * // [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]
 * ```
 */
export function uniqueBy<T, K>(array: readonly T[], keySelector: (item: T) => K): T[] {
  const seen = new Set<K>()
  const result: T[] = []
  for (const item of array) {
    const key = keySelector(item)
    if (!seen.has(key)) {
      seen.add(key)
      result.push(item)
    }
  }
  return result
}

/**
 * Splits an array into groups of the given size. The last group may be shorter.
 *
 * @param array - The source array.
 * @param size - The length of each group. Must be a positive integer.
 * @returns A new array of chunked arrays.
 * @throws {RangeError} When `size` is not a positive integer.
 *
 * @example
 * ```ts
 * chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 * ```
 */
export function chunk<T>(array: readonly T[], size: number): T[][] {
  if (!Number.isInteger(size) || size <= 0) {
    throw new RangeError("chunk size must be a positive integer")
  }
  const result: T[][] = []
  for (let index = 0; index < array.length; index += size) {
    result.push(array.slice(index, index + size))
  }
  return result
}

/**
 * Groups the items of an array by a derived key.
 *
 * @param array - The source array.
 * @param keySelector - Returns the group key for each item.
 * @returns An object mapping each key to the list of matching items.
 *
 * @example
 * ```ts
 * groupBy([1, 2, 3, 4], (n) => (n % 2 === 0 ? "even" : "odd"))
 * // { odd: [1, 3], even: [2, 4] }
 * ```
 */
export function groupBy<T, K extends PropertyKey>(
  array: readonly T[],
  keySelector: (item: T) => K,
): Record<K, T[]> {
  const result = {} as Record<K, T[]>
  for (const item of array) {
    const key = keySelector(item)
    // 必须用 hasOwn 判断，否则 "constructor" 之类的 key 会命中 Object.prototype 上的同名属性
    if (Object.hasOwn(result, key)) {
      result[key].push(item)
    } else {
      result[key] = [item]
    }
  }
  return result
}
