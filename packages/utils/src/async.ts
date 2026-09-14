/**
 * Pauses execution for the given duration.
 *
 * @param duration - Milliseconds to wait.
 * @returns A promise that resolves after the duration.
 *
 * @example
 * ```ts
 * console.log("start")
 * await sleep(1000)
 * console.log("one second later")
 * ```
 */
export function sleep(duration: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}

/**
 * Options for {@link retry}.
 */
export interface RetryOptions {
  /** Maximum number of retries, excluding the first attempt. Defaults to 3. */
  retries?: number
  /** Milliseconds to wait before each retry. Defaults to 0. */
  delay?: number
}

/**
 * Runs a function and retries it until it succeeds or the retry limit is reached.
 *
 * @param fn - The function to execute. It may return a value or a promise.
 * @param options - Retry options.
 * @returns The resolved value of `fn`.
 * @throws The last error thrown by `fn` when all attempts fail.
 *
 * @example
 * ```ts
 * const data = await retry(() => fetch("/api/data").then((res) => res.json()), {
 *   retries: 3,
 *   delay: 500,
 * })
 * ```
 */
export async function retry<T>(fn: () => Promise<T> | T, options: RetryOptions = {}): Promise<T> {
  const { retries = 3, delay = 0 } = options
  let lastError: unknown

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      if (attempt < retries && delay > 0) {
        await sleep(delay)
      }
    }
  }

  throw lastError
}
