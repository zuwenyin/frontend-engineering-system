import "@testing-library/jest-dom/vitest"

import { cleanup, configure } from "@testing-library/react"
import { afterAll, afterEach, beforeAll } from "vitest"

import { server } from "./mocks/server"

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" })
})

afterEach(() => {
  cleanup()
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})

// 设置测试用例中find*的超时时间（eg：screen.findByText）
configure({ asyncUtilTimeout: 3500 })
