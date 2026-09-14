/**
 * A debounced function returned by {@link debounce}.
 */
export interface DebouncedFunction<Args extends unknown[]> {
  (...args: Args): void
  /** Cancels the pending invocation, if any. */
  cancel: () => void
}

/**
 * Creates a debounced function that delays invoking `fn` until `wait`
 * milliseconds have elapsed since the last call.
 *
 * @param fn - The function to debounce.
 * @param wait - Delay in milliseconds. Defaults to 300.
 * @returns A debounced function with a `cancel` method.
 *
 * @example
 * ```ts
 * const search = debounce((keyword: string) => {
 *   console.log("searching:", keyword)
 * }, 300)
 *
 * search("a")
 * search("ab") // only "ab" is logged, 300ms after the last call
 * search.cancel() // cancels the pending invocation
 * ```
 */
export function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  wait = 300,
): DebouncedFunction<Args> {
  let timer: ReturnType<typeof setTimeout> | undefined

  const cancel = () => {
    if (timer !== undefined) {
      clearTimeout(timer)
      timer = undefined
    }
  }

  const debounced = (...args: Args) => {
    cancel()
    timer = setTimeout(() => {
      timer = undefined
      fn(...args)
    }, wait)
  }

  return Object.assign(debounced, { cancel })
}

/**
 * A throttled function returned by {@link throttle}.
 */
export interface ThrottledFunction<Args extends unknown[]> {
  (...args: Args): void
  /** Cancels the trailing invocation, if any. */
  cancel: () => void
}

/**
 * Creates a throttled function that invokes `fn` at most once per `wait`
 * milliseconds. Calls made during the window are invoked at the end of it.
 *
 * @param fn - The function to throttle.
 * @param wait - Minimum interval between invocations in milliseconds. Defaults to 300.
 * @returns A throttled function with a `cancel` method.
 *
 * @example
 * ```ts
 * const onScroll = throttle(() => {
 *   console.log(window.scrollY)
 * }, 200)
 *
 * window.addEventListener("scroll", onScroll)
 * // ...later
 * window.removeEventListener("scroll", onScroll)
 * onScroll.cancel()
 * ```
 */
export function throttle<Args extends unknown[]>(
  fn: (...args: Args) => void,
  wait = 300,
): ThrottledFunction<Args> {
  let lastCall = 0
  let timer: ReturnType<typeof setTimeout> | undefined
  let lastArgs: Args | undefined

  const invoke = () => {
    lastCall = Date.now()
    timer = undefined
    if (lastArgs !== undefined) {
      fn(...lastArgs)
      lastArgs = undefined
    }
  }

  const cancel = () => {
    if (timer !== undefined) {
      clearTimeout(timer)
      timer = undefined
    }
    lastArgs = undefined
    lastCall = 0
  }

  const throttled = (...args: Args) => {
    lastArgs = args
    const remaining = wait - (Date.now() - lastCall)
    if (remaining <= 0) {
      if (timer !== undefined) {
        clearTimeout(timer)
        timer = undefined
      }
      invoke()
      return
    }
    if (timer === undefined) {
      timer = setTimeout(invoke, remaining)
    }
  }

  return Object.assign(throttled, { cancel })
}

/**
 * Wraps a function so it is executed only once. Subsequent calls return the
 * result of the first invocation.
 *
 * @param fn - The function to wrap.
 * @returns A function that runs `fn` at most once.
 *
 * @example
 * ```ts
 * const init = once(() => {
 *   console.log("initialized")
 *   return 42
 * })
 *
 * init() // logs "initialized", returns 42
 * init() // returns 42 without logging again
 * ```
 */
export function once<Args extends unknown[], R>(fn: (...args: Args) => R): (...args: Args) => R {
  let called = false
  let result: R | undefined
  return (...args: Args) => {
    if (!called) {
      called = true
      result = fn(...args)
    }
    return result as R
  }
}
