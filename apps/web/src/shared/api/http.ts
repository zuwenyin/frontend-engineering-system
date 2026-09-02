import { env } from "@/shared/config"

/** 支持的 HTTP 请求方法 */
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

/** HTTP 请求可选配置 */
type HttpRequestOptions = {
  /** 请求方法，默认为 GET */
  method?: HttpMethod
  /** 用于取消请求的 AbortSignal */
  signal?: AbortSignal
}

/**
 * HTTP 请求失败时抛出的错误。
 * 携带响应状态码，便于上层按状态做差异化处理。
 *
 * @example
 * ```ts
 * // 输入：message = "Request failed", status = 404
 * throw new HttpError("Request failed", 404)
 *
 * // 输出：
 * // error.name === "HttpError"
 * // error.message === "Request failed"
 * // error.status === 404
 * ```
 */
export class HttpError extends Error {
  public readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = "HttpError"
    this.status = status
  }
}

/**
 * 将相对路径拼接到 API 基础地址上。
 * 会去除 baseUrl 末尾斜杠，并保证 path 以 `/` 开头。
 *
 * @example
 * ```ts
 * // 假设 env.apiBaseUrl = "https://api.example.com/"
 *
 * // 输入：path = "/users"
 * createUrl("/users")
 * // 输出："https://api.example.com/users"
 *
 * // 输入：path = "users"（缺少前导斜杠）
 * createUrl("users")
 * // 输出："https://api.example.com/users"
 * ```
 */
function createUrl(path: string) {
  const baseUrl = env.apiBaseUrl.replace(/\/$/, "")
  const normalizedPath = path.startsWith("/") ? path : `/${path}`

  return `${baseUrl}${normalizedPath}`
}

/**
 * 发起 JSON GET 请求并解析响应体。
 * 非 2xx 响应时抛出 {@link HttpError}。
 *
 * @param path - API 相对路径，如 `/users`
 * @param options - 可选请求配置（方法、取消信号等）
 * @returns 解析后的响应数据
 *
 * @example
 * ```ts
 * // 输入：path = "/users"，响应体为 [{ id: 1, name: "Ada" }]
 * const users = await httpGet<User[]>("/users")
 * // 输出：[{ id: 1, name: "Ada" }]
 *
 * // 输入：path = "/users/999"，服务端返回 404
 * await httpGet("/users/999")
 * // 输出：抛出 HttpError { message: "Request failed", status: 404 }
 * ```
 */
export async function httpGet<TData>(path: string, options: HttpRequestOptions = {}) {
  const response = await fetch(createUrl(path), {
    method: options.method ?? "GET",
    headers: {
      Accept: "application/json",
    },
    signal: options.signal,
  })

  if (!response.ok) {
    throw new HttpError("Request failed", response.status)
  }

  return (await response.json()) as TData
}
