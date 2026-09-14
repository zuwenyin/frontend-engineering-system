/**
 * Clamps a number within the inclusive `min` and `max` bounds.
 *
 * @param value - The number to clamp.
 * @param min - The lower bound.
 * @param max - The upper bound.
 * @returns The clamped number.
 *
 * @example
 * ```ts
 * clamp(5, 0, 10) // 5
 * clamp(-1, 0, 10) // 0
 * clamp(99, 0, 10) // 10
 * ```
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Returns a random integer between `min` and `max`, both inclusive.
 *
 * @param min - The lower bound.
 * @param max - The upper bound.
 * @returns A random integer within `[min, max]`.
 *
 * @example
 * ```ts
 * randomInt(1, 6) // e.g. 4
 * ```
 */
export function randomInt(min: number, max: number): number {
  const lower = Math.ceil(min)
  const upper = Math.floor(max)
  return Math.floor(Math.random() * (upper - lower + 1)) + lower
}
