import { describe, expect, it, vi } from "vitest"

import { chunk, groupBy, unique, uniqueBy } from "./array.js"

describe("unique", () => {
  it("removes duplicates, keeping the first occurrence", () => {
    expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3])
    expect(unique(["a", "a", "b"])).toEqual(["a", "b"])
  })

  it("returns an empty array for empty input", () => {
    expect(unique([])).toEqual([])
  })

  it("returns a new array and leaves the source untouched", () => {
    const source = [1, 1, 2]
    const result = unique(source)
    expect(result).toEqual([1, 2])
    expect(result).not.toBe(source)
    expect(source).toEqual([1, 1, 2])
  })

  it("compares with SameValueZero, so NaN is deduplicated", () => {
    const result = unique([Number.NaN, Number.NaN, 1])
    expect(result).toHaveLength(2)
    expect(result[0]).toBeNaN()
    expect(result[1]).toBe(1)
  })

  it("deduplicates objects by reference, not by shape", () => {
    const first = { id: 1 }
    const second = { id: 1 }
    expect(unique([first, second])).toEqual([first, second])
    expect(unique([first, first])).toEqual([first])
  })
})

describe("uniqueBy", () => {
  it("removes duplicates by the selected key, keeping the first item", () => {
    const users = [
      { id: 1, name: "Alice" },
      { id: 1, name: "Alice (dup)" },
      { id: 2, name: "Bob" },
    ]
    expect(uniqueBy(users, (user) => user.id)).toEqual([
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ])
  })

  it("supports derived keys", () => {
    expect(uniqueBy(["a", "bb", "cc", "ddd"], (item) => item.length)).toEqual(["a", "bb", "ddd"])
  })

  it("calls the key selector exactly once per item", () => {
    const keySelector = vi.fn((value: number) => value % 2)
    uniqueBy([1, 2, 3], keySelector)
    expect(keySelector).toHaveBeenCalledTimes(3)
  })

  it("returns an empty array for empty input", () => {
    expect(uniqueBy([], (value: number) => value)).toEqual([])
  })

  it("leaves the source array untouched", () => {
    const source = [1, 1, 2]
    uniqueBy(source, (value) => value)
    expect(source).toEqual([1, 1, 2])
  })
})

describe("chunk", () => {
  it("splits an array into groups of the given size", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
  })

  it("keeps a single group when the size exceeds the length", () => {
    expect(chunk([1, 2, 3], 5)).toEqual([[1, 2, 3]])
  })

  it("creates one group per item when the size is 1", () => {
    expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]])
  })

  it("returns an empty array for empty input", () => {
    expect(chunk([], 3)).toEqual([])
  })

  it("leaves the source array untouched", () => {
    const source = [1, 2, 3]
    chunk(source, 2)
    expect(source).toEqual([1, 2, 3])
  })

  it("throws a RangeError when the size is not a positive integer", () => {
    expect(() => chunk([1, 2], 0)).toThrow(RangeError)
    expect(() => chunk([1, 2], -1)).toThrow(RangeError)
    expect(() => chunk([1, 2], 1.5)).toThrow(RangeError)
    expect(() => chunk([1, 2], Number.NaN)).toThrow(RangeError)
  })

  it("explains why the size is invalid", () => {
    expect(() => chunk([1, 2], 0)).toThrow("chunk size must be a positive integer")
  })
})

describe("groupBy", () => {
  it("groups items by the selected key", () => {
    const result = groupBy([1, 2, 3, 4], (value) => (value % 2 === 0 ? "even" : "odd"))
    expect(result).toEqual({ odd: [1, 3], even: [2, 4] })
  })

  it("creates the groups in order of first appearance", () => {
    const result = groupBy(["b", "a", "c"], (value) => value)
    expect(Object.keys(result)).toEqual(["b", "a", "c"])
  })

  it("supports numeric keys", () => {
    const result = groupBy(["a", "bb", "c"], (value) => value.length)
    expect(result[1]).toEqual(["a", "c"])
    expect(result[2]).toEqual(["bb"])
  })

  it("supports keys that shadow Object.prototype members", () => {
    const result = groupBy(["constructor", "toString"], (value) => value)
    expect(result["constructor"]).toEqual(["constructor"])
    expect(result["toString"]).toEqual(["toString"])
  })

  it("returns an empty object for empty input", () => {
    expect(groupBy([], (value: number) => value)).toEqual({})
  })

  it("leaves the source array untouched", () => {
    const source = [1, 2]
    groupBy(source, (value) => value)
    expect(source).toEqual([1, 2])
  })
})
