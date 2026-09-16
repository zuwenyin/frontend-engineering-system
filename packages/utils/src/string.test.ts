import { describe, expect, it } from "vitest"

import { camelCase, capitalize, kebabCase, truncate } from "./string.js"

describe("capitalize", () => {
  it("upper-cases the first character", () => {
    expect(capitalize("hello")).toBe("Hello")
    expect(capitalize("hello world")).toBe("Hello world")
  })

  it("only changes the first character", () => {
    expect(capitalize("aBc")).toBe("ABc")
  })

  it("leaves an already capitalized string unchanged", () => {
    expect(capitalize("Hello")).toBe("Hello")
  })

  it("returns an empty string unchanged", () => {
    expect(capitalize("")).toBe("")
  })
})

describe("truncate", () => {
  it("returns the original string when it already fits", () => {
    expect(truncate("Hi", 8)).toBe("Hi")
    expect(truncate("Hello", 5)).toBe("Hello")
  })

  it("appends the default suffix when truncating", () => {
    expect(truncate("Hello, world!", 8)).toBe("Hello...")
  })

  it("counts the suffix towards maxLength", () => {
    expect(truncate("Hello, world!", 8)).toHaveLength(8)
  })

  it("supports a custom suffix", () => {
    expect(truncate("Hello, world!", 8, "…")).toBe("Hello, …")
    expect(truncate("Hello, world!", 4, "")).toBe("Hell")
  })

  it("keeps only the suffix when maxLength is shorter than the suffix", () => {
    expect(truncate("Hello, world!", 3)).toBe("...")
    expect(truncate("Hello, world!", 2)).toBe("...")
  })

  it("returns an empty string when maxLength is 0 and the suffix is empty", () => {
    expect(truncate("Hello", 0, "")).toBe("")
  })
})

describe("camelCase", () => {
  it("converts dash, underscore and space separated words", () => {
    expect(camelCase("foo-bar")).toBe("fooBar")
    expect(camelCase("foo_bar")).toBe("fooBar")
    expect(camelCase("foo bar")).toBe("fooBar")
    expect(camelCase("foo-bar baz")).toBe("fooBarBaz")
  })

  it("lower-cases upper-case input", () => {
    expect(camelCase("FOO_BAR")).toBe("fooBar")
    expect(camelCase("Hello World")).toBe("helloWorld")
    expect(camelCase("Foo")).toBe("foo")
  })

  it("collapses consecutive separators", () => {
    expect(camelCase("foo--bar")).toBe("fooBar")
    expect(camelCase("  foo  ")).toBe("foo")
  })

  it("returns an empty string for empty or separator-only input", () => {
    expect(camelCase("")).toBe("")
    expect(camelCase("   ")).toBe("")
    expect(camelCase("-_-")).toBe("")
  })
})

describe("kebabCase", () => {
  it("converts camelCase boundaries into dashes", () => {
    expect(kebabCase("fooBar")).toBe("foo-bar")
    expect(kebabCase("fooBarBaz")).toBe("foo-bar-baz")
    expect(kebabCase("foo1Bar")).toBe("foo1-bar")
  })

  it("converts whitespace and underscores into dashes", () => {
    expect(kebabCase("foo bar")).toBe("foo-bar")
    expect(kebabCase("Foo_Bar baz")).toBe("foo-bar-baz")
  })

  it("collapses repeated dashes", () => {
    expect(kebabCase("foo--bar")).toBe("foo-bar")
    expect(kebabCase("foo_-_bar")).toBe("foo-bar")
  })

  it("trims leading and trailing dashes", () => {
    expect(kebabCase("-foo-")).toBe("foo")
    expect(kebabCase("_foo_")).toBe("foo")
  })

  it("lower-cases the result", () => {
    expect(kebabCase("FOO")).toBe("foo")
    expect(kebabCase("FOO_BAR")).toBe("foo-bar")
  })

  it("returns an empty string for empty input", () => {
    expect(kebabCase("")).toBe("")
  })
})
