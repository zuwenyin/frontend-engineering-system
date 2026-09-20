import { afterEach, describe, expect, it, vi } from "vitest"

import { clamp, randomInt } from "./number.js"

describe("clamp", () => {
  it("returns the value when it is inside the bounds", () => {
    expect(clamp(5, 0, 10)).toBe(5)
  })

  it("clamps to the lower bound", () => {
    expect(clamp(-1, 0, 10)).toBe(0)
  })

  it("clamps to the upper bound", () => {
    expect(clamp(99, 0, 10)).toBe(10)
  })

  it("returns the value when it equals a bound", () => {
    expect(clamp(0, 0, 10)).toBe(0)
    expect(clamp(10, 0, 10)).toBe(10)
  })

  it("returns the bound when min and max are equal", () => {
    expect(clamp(5, 7, 7)).toBe(7)
  })

  it("works with negative bounds", () => {
    expect(clamp(-5, -10, -1)).toBe(-5)
    expect(clamp(-20, -10, -1)).toBe(-10)
    expect(clamp(20, -10, -1)).toBe(-1)
  })

  it("clamps infinities", () => {
    expect(clamp(Number.POSITIVE_INFINITY, 0, 10)).toBe(10)
    expect(clamp(Number.NEGATIVE_INFINITY, 0, 10)).toBe(0)
  })
})

describe("randomInt", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("returns the lower bound when Math.random returns 0", () => {
    vi.spyOn(Math, "random").mockReturnValue(0)
    expect(randomInt(1, 6)).toBe(1)
  })

  it("returns the upper bound when Math.random is close to 1", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.999999)
    expect(randomInt(1, 6)).toBe(6)
  })

  it("maps intermediate values into the range", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5)
    expect(randomInt(1, 6)).toBe(4)
  })

  it("returns the only possible value when min equals max", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.42)
    expect(randomInt(3, 3)).toBe(3)
  })

  it("rounds non-integer bounds inward", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.999999)
    expect(randomInt(1.2, 3.9)).toBe(3)
  })

  it("always returns an integer inside the inclusive range", () => {
    for (let index = 0; index < 200; index += 1) {
      const value = randomInt(-3, 3)
      expect(Number.isInteger(value)).toBe(true)
      expect(value).toBeGreaterThanOrEqual(-3)
      expect(value).toBeLessThanOrEqual(3)
    }
  })
})
