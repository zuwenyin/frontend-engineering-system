import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { debounce, once, throttle } from "./function.js"

describe("debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("does not invoke the function immediately", () => {
    const fn = vi.fn()
    debounce(fn, 100)()
    expect(fn).not.toHaveBeenCalled()
  })

  it("invokes the function once the wait time has elapsed", () => {
    const fn = vi.fn()
    debounce(fn, 100)()
    vi.advanceTimersByTime(99)
    expect(fn).not.toHaveBeenCalled()
    vi.advanceTimersByTime(1)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it("collapses rapid calls and uses the latest arguments", () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 100)
    debounced("a")
    vi.advanceTimersByTime(50)
    debounced("ab")
    vi.advanceTimersByTime(50)
    debounced("abc")
    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith("abc")
  })

  it("forwards every argument", () => {
    const fn = vi.fn()
    debounce(fn, 100)(1, "a", true)
    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledWith(1, "a", true)
  })

  it("can be triggered again after it fired", () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 100)
    debounced()
    vi.advanceTimersByTime(100)
    debounced()
    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it("cancel drops the pending invocation", () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 100)
    debounced()
    vi.advanceTimersByTime(50)
    debounced.cancel()
    vi.advanceTimersByTime(1000)
    expect(fn).not.toHaveBeenCalled()
  })

  it("cancel is a no-op when nothing is pending", () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 100)
    expect(() => debounced.cancel()).not.toThrow()
    debounced()
    vi.advanceTimersByTime(100)
    expect(() => debounced.cancel()).not.toThrow()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it("defaults to a 300ms wait", () => {
    const fn = vi.fn()
    debounce(fn)()
    vi.advanceTimersByTime(299)
    expect(fn).not.toHaveBeenCalled()
    vi.advanceTimersByTime(1)
    expect(fn).toHaveBeenCalledTimes(1)
  })
})

describe("throttle", () => {
  beforeEach(() => {
    vi.useFakeTimers()
    // 固定系统时间，让 Date.now() 的取值在测试之间保持稳定
    vi.setSystemTime(new Date("2024-01-01T00:00:00.000Z"))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("invokes the function immediately on the first call", () => {
    const fn = vi.fn()
    throttle(fn, 100)()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it("defers the trailing call and uses the latest arguments", () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 100)
    throttled("a")
    throttled("ab")
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenLastCalledWith("a")
    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledTimes(2)
    expect(fn).toHaveBeenLastCalledWith("ab")
  })

  it("coalesces calls inside the window into a single trailing call", () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 100)
    throttled()
    vi.advanceTimersByTime(10)
    throttled()
    vi.advanceTimersByTime(10)
    throttled()
    expect(fn).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it("invokes immediately again once the window has elapsed", () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 100)
    throttled()
    vi.advanceTimersByTime(100)
    throttled()
    expect(fn).toHaveBeenCalledTimes(2)
    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it("drops the pending trailing call when the window already elapsed", () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 100)
    throttled("a")
    throttled("b")
    // 只推进系统时间而不触发定时器，模拟"窗口已经过去但定时器回调还没跑"的情况
    vi.setSystemTime(new Date("2024-01-01T00:00:01.000Z"))
    throttled("c")
    expect(fn).toHaveBeenCalledTimes(2)
    expect(fn).toHaveBeenLastCalledWith("c")
    vi.advanceTimersByTime(1000)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it("cancel drops a pending trailing invocation", () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 100)
    throttled("a")
    throttled("b")
    throttled.cancel()
    vi.advanceTimersByTime(1000)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenLastCalledWith("a")
  })

  it("invokes immediately again after cancel", () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 100)
    throttled()
    throttled.cancel()
    throttled()
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it("defaults to a 300ms window", () => {
    const fn = vi.fn()
    const throttled = throttle(fn)
    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(299)
    expect(fn).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(1)
    expect(fn).toHaveBeenCalledTimes(2)
  })
})

describe("once", () => {
  it("invokes the wrapped function only once", () => {
    const fn = vi.fn(() => 42)
    const wrapped = once(fn)
    expect(wrapped()).toBe(42)
    expect(wrapped()).toBe(42)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it("always returns the result of the first invocation", () => {
    let count = 0
    const wrapped = once(() => {
      count += 1
      return count
    })
    expect(wrapped()).toBe(1)
    expect(wrapped()).toBe(1)
    expect(count).toBe(1)
  })

  it("forwards the arguments of the first invocation", () => {
    const fn = vi.fn((first: number, second: string) => `${first}${second}`)
    const wrapped = once(fn)
    expect(wrapped(1, "a")).toBe("1a")
    expect(wrapped(2, "b")).toBe("1a")
    expect(fn).toHaveBeenCalledWith(1, "a")
  })

  it("propagates an error and does not retry afterwards", () => {
    const fn = vi.fn((): number => {
      throw new Error("boom")
    })
    const wrapped = once(fn)
    expect(() => wrapped()).toThrow("boom")
    expect(wrapped()).toBeUndefined()
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
