/**
 * Converts the first character of a string to upper case.
 *
 * @param value - The source string.
 * @returns A new string with the first character upper-cased.
 *
 * @example
 * ```ts
 * capitalize("hello") // "Hello"
 * capitalize("") // ""
 * ```
 */
export function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

/**
 * Truncates a string to the given length, appending a suffix when it is cut.
 *
 * @param value - The source string.
 * @param maxLength - Maximum length of the result, including the suffix.
 * @param suffix - Appended when the string is truncated. Defaults to `"..."`.
 * @returns The truncated string.
 *
 * @example
 * ```ts
 * truncate("Hello, world!", 8) // "Hello..."
 * truncate("Hi", 8) // "Hi"
 * ```
 */
export function truncate(value: string, maxLength: number, suffix = "..."): string {
  if (value.length <= maxLength) {
    return value
  }
  return value.slice(0, Math.max(0, maxLength - suffix.length)) + suffix
}

/**
 * Converts a string to camelCase.
 *
 * @param value - The source string. Segments may be separated by `-`, `_` or whitespace.
 * @returns The camelCased string.
 *
 * @example
 * ```ts
 * camelCase("foo-bar baz") // "fooBarBaz"
 * camelCase("FOO_BAR") // "fooBar"
 * ```
 */
export function camelCase(value: string): string {
  return value
    .split(/[-_\s]+/)
    .filter((word) => word.length > 0)
    .map((word, index) => {
      const lower = word.toLowerCase()
      return index === 0 ? lower : capitalize(lower)
    })
    .join("")
}

/**
 * Converts a string to kebab-case.
 *
 * @param value - The source string. camelCase boundaries, whitespace and `_` become `-`.
 * @returns The kebab-cased string.
 *
 * @example
 * ```ts
 * kebabCase("fooBar") // "foo-bar"
 * kebabCase("Foo_Bar baz") // "foo-bar-baz"
 * ```
 */
export function kebabCase(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase()
}
