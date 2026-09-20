import { describe, expect, it } from "vitest"

import * as utils from "./index.js"

// 防止改动 barrel 文件时无意中删掉已发布出去的工具函数
const PUBLIC_API = [
  "readBoolean",
  "isNil",
  "isDefined",
  "isPlainObject",
  "isEmpty",
  "unique",
  "uniqueBy",
  "chunk",
  "groupBy",
  "pick",
  "omit",
  "deepClone",
  "capitalize",
  "truncate",
  "camelCase",
  "kebabCase",
  "clamp",
  "randomInt",
  "debounce",
  "throttle",
  "once",
  "sleep",
  "retry",
]

describe("public API", () => {
  it("exports every documented utility", () => {
    for (const name of PUBLIC_API) {
      expect(utils, `missing export: ${name}`).toHaveProperty(name)
    }
  })

  it("exports nothing else", () => {
    expect(Object.keys(utils).sort()).toEqual([...PUBLIC_API].sort())
  })

  it("only exports functions", () => {
    for (const [name, value] of Object.entries(utils)) {
      expect(typeof value, `${name} is not a function`).toBe("function")
    }
  })
})
