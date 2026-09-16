import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { retry, sleep } from "./async.js"

describe("sleep", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("resolves only after the given duration", async () => {
    let resolved = false
    const promise = sleep(100).then(() => {
      resolved = true
    })
    await vi.advanceTimersByTimeAsync(99)
    expect(resolved).toBe(false)
    await vi.advanceTimersByTimeAsync(1)
    expect(resolved).toBe(true)
    await promise
  })

  it("resolves with undefined", async () => {
    const promise = sleep(10)
    await vi.advanceTimersByTimeAsync(10)
    await expect(promise).resolves.toBeUndefined()
  })
})

describe("retry", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("returns the value when the first attempt succeeds", async () => {
    const fn = vi.fn(async () => "ok")
    await expect(retry(fn)).resolves.toBe("ok")
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it("retries until it succeeds", async () => {
    let attempts = 0
    const result = await retry(
      () => {
        attempts += 1
        if (attempts < 3) {
          throw new Error("fail")
        }
        return attempts
      },
      { retries: 3 },
    )
    expect(result).toBe(3)
    expect(attempts).toBe(3)
  })

  it("throws the last error when every attempt fails", async () => {
    const fn = vi.fn((): string => {
      throw new Error("always fails")
    })
    await expect(retry(fn, { retries: 2 })).rejects.toThrow("always fails")
    expect(fn).toHaveBeenCalledTimes(3)
  })

  it("does not retry when retries is 0", async () => {
    const fn = vi.fn((): string => {
      throw new Error("nope")
    })
    await expect(retry(fn, { retries: 0 })).rejects.toThrow("nope")
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it("supports asynchronous functions", async () => {
    const fn = vi.fn(async (): Promise<string> => {
      throw new Error("async fail")
    })
    await expect(retry(fn, { retries: 1 })).rejects.toThrow("async fail")
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it("rethrows non-Error values as-is", async () => {
    await expect(
      retry(
        (): string => {
          throw "boom"
        },
        { retries: 1 },
      ),
    ).rejects.toBe("boom")
  })

  it("does not wait between attempts when no delay is configured", async () => {
    let attempts = 0
    const result = await retry(
      () => {
        attempts += 1
        if (attempts < 2) {
          throw new Error("fail")
        }
        return "ok"
      },
      { retries: 2 },
    )
    expect(result).toBe("ok")
    expect(attempts).toBe(2)
  })

  it("waits for the configured delay between attempts", async () => {
    let attempts = 0
    const fn = (): string => {
      attempts += 1
      if (attempts < 3) {
        throw new Error("fail")
      }
      return "ok"
    }
    const promise = retry(fn, { retries: 3, delay: 100 })

    await vi.advanceTimersByTimeAsync(99)
    expect(attempts).toBe(1)

    await vi.advanceTimersByTimeAsync(1)
    expect(attempts).toBe(2)

    await vi.advanceTimersByTimeAsync(100)
    await expect(promise).resolves.toBe("ok")
    expect(attempts).toBe(3)
  })
})
