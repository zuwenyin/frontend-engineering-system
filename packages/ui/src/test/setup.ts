import "@testing-library/jest-dom/vitest"

import { cleanup } from "@testing-library/react"
import { afterEach } from "vitest"

// afterEach会在每一个测试用例结束后执行
afterEach(() => {
  cleanup()
})