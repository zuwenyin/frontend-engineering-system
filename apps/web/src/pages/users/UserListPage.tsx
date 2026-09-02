import { useQuery } from "@tanstack/react-query"
import { Link, useSearchParams } from "react-router"

import { getUsers } from "@/entities/user"
import type { UserListScenario } from "@/entities/user"
import { PageTitle } from "@/shared/ui"

/**
 * 将 URL 查询参数中的 scenario 归一化为合法枚举值。
 * 仅接受 `"empty"` / `"error"`；其余情况（含 `null`）一律回退为 `"success"`。
 *
 * @param value - `searchParams.get("scenario")` 的原始值
 * @returns 合法的 `UserListScenario`
 *
 * @example
 * ```ts
 * // 输入：value = "empty"
 * readScenario("empty")
 * // 输出："empty"
 *
 * // 输入：value = "error"
 * readScenario("error")
 * // 输出："error"
 *
 * // 输入：value = null（URL 未带 scenario）
 * readScenario(null)
 * // 输出："success"
 *
 * // 输入：value = "unknown"（非法值）
 * readScenario("unknown")
 * // 输出："success"
 * ```
 */
function readScenario(value: string | null): UserListScenario {
  if (value === "empty" || value === "error") {
    return value
  }

  return "success"
}

export function UserListPage() {
  // 读取当前 URL 的查询参数，例如 /users?scenario=empty → { scenario: "empty" }
  const [searchParams] = useSearchParams()
  // 将 scenario 查询参数归一化为合法枚举值，详见 readScenario
  const scenario = readScenario(searchParams.get("scenario"))

  /**
   * 按当前 scenario 拉取用户列表。
   * queryKey 包含 scenario，切换场景时会自动重新请求。
   * retry: false 避免失败场景被 React Query 自动重试，便于演示错误态。
   *
   * @example
   * ```ts
   * // 输入：scenario = "success"
   * // 输出：usersQuery.data 为用户数组，usersQuery.isSuccess === true
   *
   * // 输入：scenario = "empty"
   * // 输出：usersQuery.data === []，页面展示 "No users found."
   *
   * // 输入：scenario = "error"
   * // 输出：usersQuery.isError === true，页面展示失败态与 Retry 按钮
   * ```
   */
  const usersQuery = useQuery({
    queryKey: ["users", scenario],
    queryFn: () => getUsers(scenario),
    retry: false,
  })

  return (
    <main>
      <PageTitle title="用户" subtitle="Users are loaded through the shared request layer." />

      <nav aria-label="User list scenarios">
        <Link to="/users">成功</Link> <Link to="/users?scenario=empty">数据为空</Link>{" "}
        <Link to="/users?scenario=error">错误</Link>
      </nav>

      {usersQuery.isPending ? <p>加载用户列表中...</p> : null}

      {usersQuery.isError ? (
        <section>
          <p>加载用户列表失败</p>
          <button type="button" onClick={() => usersQuery.refetch()}>
            重试
          </button>
        </section>
      ) : null}

      {usersQuery.isSuccess && usersQuery.data.length === 0 ? <p>未找到相关用户</p> : null}

      {usersQuery.isSuccess && usersQuery.data.length > 0 ? (
        <ul>
          {usersQuery.data.map((user) => (
            <li key={user.id}>
              <strong>{user.name}</strong> - {user.email} - {user.role} - {user.status}
            </li>
          ))}
        </ul>
      ) : null}
    </main>
  )
}
