import { useQuery } from "@tanstack/react-query"
import { Link, useSearchParams } from "react-router"

import { getUsers } from "@/entities/user"
import type { UserListScenario } from "@/entities/user"
import { PageTitle, UserStatusBadge } from "@/shared/ui"

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

  const usersQuery = useQuery({
    queryKey: ["users", scenario],
    queryFn: () => getUsers(scenario),
    retry: false,
  })

  return (
    <main>
      <PageTitle title="用户" subtitle="Users are loaded through the shared request layer." />

      <section className="rounded-[--radius-card] border border-surface-100 bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          {/* 模拟了三个场景：成功、数据为空、错误 */}
          {/* 通过传递不同的 URL 查询参数来实现 */}
          <nav aria-label="用户列表场景" className="flex flex-wrap items-center gap-2">
            <Link
              className="rounded-md bg-brand-600 px-3 py-2 text-sm font-medium text-white"
              to="/users"
            >
              成功
            </Link>

            <Link
              className="rounded-md bg-surface-100 px-3 py-2 text-sm font-medium text-surface-900"
              to="/users?scenario=empty"
            >
              数据为空
            </Link>

            <Link
              className="rounded-md bg-surface-100 px-3 py-2 text-sm font-medium text-surface-900"
              to="/users?scenario=error"
            >
              错误
            </Link>
          </nav>
        </div>

        {/* 根据 usersQuery 的不同状态，渲染不同的页面内容 */}

        {usersQuery.isPending ? (
          <p className="rounded-md bg-surface-100 p-4 text-sm text-surface-900/70">
            加载用户列表中...
          </p>
        ) : null}

        {usersQuery.isError ? (
          <section className="rounded-md bg-danger-50 p-4 text-sm text-danger-700">
            <p>加载用户列表失败</p>

            <button
              className="mt-3 rounded-md bg-danger-700 px-3 py-2 text-sm font-medium text-white"
              type="button"
              onClick={() => usersQuery.refetch()}
            >
              重试
            </button>
          </section>
        ) : null}

        {usersQuery.isSuccess && usersQuery.data.length === 0 ? (
          <p className="rounded-md bg-surface-100 p-4 text-sm text-surface-900/70">
            未找到相关用户
          </p>
        ) : null}

        {usersQuery.isSuccess && usersQuery.data.length > 0 ? (
          <ul className="divide-y divide-surface-100">
            {usersQuery.data.map((user) => (
              <li
                className="grid gap-2 py-4 text-sm md:grid-cols-[1fr_1.5fr_auto_auto] md:items-center"
                key={user.id}
              >
                <strong className="font-medium text-surface-900">{user.name}</strong>

                <span className="text-surface-900/70">{user.email}</span>

                <span className="text-surface-900/70">{user.role}</span>

                <UserStatusBadge status={user.status} />
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    </main>
  )
}
