import { resolve } from "node:path"

// 与 `vite --mode e2e` 读取的是同一个文件，保证单一真源
process.loadEnvFile(resolve(__dirname, "../apps/web/.env.e2e"))

function required(name: string) {
  const value = process.env[name]

  if (!value) {
    throw new Error(`E2E 运行需要 apps/web/.env.e2e 中定义 ${name}`)
  }

  return value
}

export const apiBaseUrl = required("VITE_API_BASE_URL")

// .env.e2e 必须是 enableMock=false，否则请求被前端 mock 短路，page.route 根本拦不到
if (process.env.VITE_ENABLE_MOCK !== "false") {
  throw new Error("E2E 场景下 VITE_ENABLE_MOCK 必须为 false，否则 page.route 不会生效")
}

/**
 * 与 apps/web/src/shared/api/http.ts 的 createUrl 保持同一套拼接规则。
 * 注意：不能换成 new URL(path, base) —— 业务侧是纯字符串拼接，
 * base 带路径前缀（如 https://host/api）时 new URL 会把前缀吃掉，两边行为不一致。
 */
export function apiUrl(path: string) {
  const base = apiBaseUrl.replace(/\/$/, "")
  const normalizedPath = path.startsWith("/") ? path : `/${path}`

  return `${base}${normalizedPath}`
}
