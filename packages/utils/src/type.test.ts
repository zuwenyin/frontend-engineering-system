import { describe, expect, it } from "vitest"

import { isDefined, isEmpty, isNil, isPlainObject } from "./type.js"

describe("isNil", () => {
  it("returns true for null and undefined", () => {
    expect(isNil(null)).toBe(true)
    expect(isNil(undefined)).toBe(true)
  })

  it("returns false for other falsy values", () => {
    expect(isNil(0)).toBe(false)
    expect(isNil("")).toBe(false)
    expect(isNil(false)).toBe(false)
    expect(isNil(Number.NaN)).toBe(false)
  })

  it("returns false for objects, arrays and functions", () => {
    expect(isNil({})).toBe(false)
    expect(isNil([])).toBe(false)
    expect(isNil(() => undefined)).toBe(false)
  })
})

describe("isDefined", () => {
  it("returns true for defined values, including falsy ones", () => {
    expect(isDefined(0)).toBe(true)
    expect(isDefined("")).toBe(true)
    expect(isDefined(false)).toBe(true)
    expect(isDefined(Number.NaN)).toBe(true)
  })

  it("returns false for null and undefined", () => {
    expect(isDefined(null)).toBe(false)
    expect(isDefined(undefined)).toBe(false)
  })

  it("narrows the type when used as a filter predicate", () => {
    const values = [1, null, 2, undefined, 3]
    const defined: number[] = values.filter(isDefined)
    expect(defined).toEqual([1, 2, 3])
  })
})

describe("isPlainObject", () => {
  it("returns true for object literals and null-prototype objects", () => {
    expect(isPlainObject({})).toBe(true)
    expect(isPlainObject({ a: 1 })).toBe(true)
    expect(isPlainObject(Object.create(null))).toBe(true)
    expect(isPlainObject(new Object())).toBe(true)
  })

  it("returns false for arrays, dates, maps, sets and class instances", () => {
    class Person {
      name = "Alice"
    }
    expect(isPlainObject([])).toBe(false)
    expect(isPlainObject([1, 2])).toBe(false)
    expect(isPlainObject(new Date())).toBe(false)
    expect(isPlainObject(new Map())).toBe(false)
    expect(isPlainObject(new Set())).toBe(false)
    expect(isPlainObject(new Person())).toBe(false)
  })

  it("returns false for null and primitives", () => {
    expect(isPlainObject(null)).toBe(false)
    expect(isPlainObject(undefined)).toBe(false)
    expect(isPlainObject(1)).toBe(false)
    expect(isPlainObject("object")).toBe(false)
    expect(isPlainObject(true)).toBe(false)
    expect(isPlainObject(() => undefined)).toBe(false)
  })

  it("returns false for objects with a custom prototype", () => {
    expect(isPlainObject(Object.create({ a: 1 }))).toBe(false)
  })
})

describe("isEmpty", () => {
  it("returns true for null and undefined", () => {
    expect(isEmpty(null)).toBe(true)
    expect(isEmpty(undefined)).toBe(true)
  })

  it("treats strings and arrays by length", () => {
    expect(isEmpty("")).toBe(true)
    expect(isEmpty([])).toBe(true)
    expect(isEmpty(" ")).toBe(false)
    expect(isEmpty([0])).toBe(false)
  })

  it("treats Map and Set by size", () => {
    expect(isEmpty(new Map())).toBe(true)
    expect(isEmpty(new Set())).toBe(true)
    expect(isEmpty(new Map([["a", 1]]))).toBe(false)
    expect(isEmpty(new Set([1]))).toBe(false)
  })

  it("treats plain objects by own key count", () => {
    expect(isEmpty({})).toBe(true)
    expect(isEmpty({ a: 1 })).toBe(false)
    expect(isEmpty(Object.create(null))).toBe(true)
  })

  it("returns false for values that cannot be empty", () => {
    expect(isEmpty(0)).toBe(false)
    expect(isEmpty(1)).toBe(false)
    expect(isEmpty(Number.NaN)).toBe(false)
    expect(isEmpty(false)).toBe(false)
    expect(isEmpty(new Date())).toBe(false)
    expect(isEmpty(() => undefined)).toBe(false)
  })
})
