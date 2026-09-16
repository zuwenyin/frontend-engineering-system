import { describe, expect, it } from "vitest"

import { readBoolean } from "./boolean.js"

// 把同一个函数的测试组织在一起
describe("readBoolean", () => {
  // 描述一个具体行为
  it('returns true for "true"', () => {
    // 断言实际结果是否符合预期
    expect(readBoolean("true")).toBe(true)
  })

  it('returns false for "false"', () => {
    expect(readBoolean("false")).toBe(false)
  })

  it("always returns a strict boolean", () => {
    expect(typeof readBoolean("true")).toBe("boolean")
    expect(typeof readBoolean("false")).toBe("boolean")
  })

  it("is based on the string content, not on string truthiness", () => {
    // "false" 是一个 truthy 字符串，但仍然必须被解析为 false
    expect(Boolean("false")).toBe(true)
    expect(readBoolean("false")).toBe(false)
  })
})
