import { describe, expect, it } from "vitest"

import { deepClone, omit, pick } from "./object.js"

describe("pick", () => {
  const source = { id: 1, name: "Alice", age: 30 }

  it("creates an object with only the picked keys", () => {
    expect(pick(source, ["id", "name"])).toEqual({ id: 1, name: "Alice" })
  })

  it("ignores keys that are missing on the source", () => {
    expect(pick(source, ["id", "missing" as keyof typeof source])).toEqual({ id: 1 })
  })

  it("returns an empty object when no key is picked", () => {
    expect(pick(source, [])).toEqual({})
  })

  it("keeps keys whose value is undefined", () => {
    const value = { a: undefined, b: 1 }
    expect(Object.keys(pick(value, ["a"]))).toEqual(["a"])
  })

  it("returns a new object and leaves the source untouched", () => {
    const result = pick(source, ["id"])
    expect(result).not.toBe(source)
    expect(source).toEqual({ id: 1, name: "Alice", age: 30 })
  })
})

describe("omit", () => {
  const source = { id: 1, name: "Alice", age: 30 }

  it("creates a copy without the omitted keys", () => {
    expect(omit(source, ["age"])).toEqual({ id: 1, name: "Alice" })
  })

  it("supports omitting several keys at once", () => {
    expect(omit(source, ["age", "name"])).toEqual({ id: 1 })
  })

  it("ignores keys that are missing on the source", () => {
    expect(omit(source, ["missing" as keyof typeof source])).toEqual(source)
  })

  it("keeps every key when nothing is omitted", () => {
    expect(omit(source, [])).toEqual(source)
  })

  it("returns a new object and leaves the source untouched", () => {
    const result = omit(source, ["age"])
    expect(result).not.toBe(source)
    expect(source).toEqual({ id: 1, name: "Alice", age: 30 })
  })

  it("copies shallowly, so nested references are shared", () => {
    const source2 = { nested: { value: 1 }, other: 2 }
    const result = omit(source2, ["other"])
    expect(result.nested).toBe(source2.nested)
  })
})

describe("deepClone", () => {
  it("returns primitives as-is", () => {
    expect(deepClone(1)).toBe(1)
    expect(deepClone("a")).toBe("a")
    expect(deepClone(true)).toBe(true)
    expect(deepClone(null)).toBe(null)
    expect(deepClone(undefined)).toBe(undefined)
  })

  it("clones nested objects and arrays without sharing references", () => {
    const source = { user: { name: "Alice" }, tags: ["a", ["b"]] }
    const copy = deepClone(source)
    expect(copy).toEqual(source)
    expect(copy).not.toBe(source)
    expect(copy.user).not.toBe(source.user)
    expect(copy.tags).not.toBe(source.tags)
    expect(copy.tags[1]).not.toBe(source.tags[1])
  })

  it("does not leak mutations back into the source", () => {
    const source = { user: { name: "Alice" }, tags: ["a"] }
    const copy = deepClone(source)
    copy.user.name = "Bob"
    copy.tags.push("b")
    expect(source.user.name).toBe("Alice")
    expect(source.tags).toEqual(["a"])
  })

  it("clones Date instances", () => {
    const date = new Date("2024-01-01T00:00:00.000Z")
    const copy = deepClone(date)
    expect(copy).not.toBe(date)
    expect(copy.getTime()).toBe(date.getTime())
  })

  it("clones Date instances nested in objects", () => {
    const source = { date: new Date(0) }
    const copy = deepClone(source)
    expect(copy.date).toEqual(source.date)
    expect(copy.date).not.toBe(source.date)
  })

  it("returns non-plain objects as-is", () => {
    class Person {
      name = "Alice"
    }
    const map = new Map<string, number>([["a", 1]])
    const person = new Person()
    expect(deepClone(map)).toBe(map)
    expect(deepClone(person)).toBe(person)
  })

  it("keeps non-plain values nested in cloned objects by reference", () => {
    const map = new Map<string, number>()
    const copy = deepClone({ map })
    expect(copy.map).toBe(map)
  })
})
