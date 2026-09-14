import { useQuery } from "@tanstack/react-query"
import { Link, useSearchParams } from "react-router"

import { getUsers, UserStatusBadge } from "@/entities/user"
import type { UserListScenario } from "@/entities/user"
import { Button, Card, PageTitle, getButtonClassName } from "@zuwy/frontend-engineering-system-ui"

function readScenario(value: string | null): UserListScenario {
  if (value === "empty" || value === "error") {
    return value
  }

  return "success"
}

export function UserListPage() {
  // 就是读取 parmas
  // 读取当前 URL 的查询参数，例如 /users?scenario=empty → { scenario: "empty" }
  const [searchParams] = useSearchParams()

  // 保证 scenario 一定是一个合法值
  const scenario = readScenario(searchParams.get("scenario"))

  // 这里就是利用 tanstack query
  // 1. queryFn -> 负责调用请求方法
  // 2. queryKey -> 缓存服务器状态数据
  const usersQuery = useQuery({
    queryKey: ["users", scenario],
    queryFn: () => getUsers(scenario),
    retry: false,
  })

  return (
    <main>
      <PageTitle title="用户" subtitle="Users are loaded through the shared request layer." />

      <Card>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <nav aria-label="用户列表场景" className="flex flex-wrap items-center gap-2">
            <Link
              aria-current={scenario === "success" ? "page" : undefined}
              className={getButtonClassName({
                variant: scenario === "success" ? "primary" : "secondary",
                size: "sm",
              })}
              to="/users"
            >
              成功
            </Link>
            <Link
              aria-current={scenario === "empty" ? "page" : undefined}
              className={getButtonClassName({
                variant: scenario === "empty" ? "primary" : "secondary",
                size: "sm",
              })}
              to="/users?scenario=empty"
            >
              数据为空
            </Link>
            <Link
              aria-current={scenario === "error" ? "page" : undefined}
              className={getButtonClassName({
                variant: scenario === "error" ? "primary" : "secondary",
                size: "sm",
              })}
              to="/users?scenario=error"
            >
              错误
            </Link>
          </nav>
        </div>

        {usersQuery.isPending ? (
          <p className="rounded-md bg-surface-100 p-4 text-sm text-surface-900/70">
            加载用户列表中...
          </p>
        ) : null}

        {usersQuery.isError ? (
          <section className="rounded-md bg-danger-50 p-4 text-sm text-danger-700">
            <p>加载用户列表失败</p>
            <Button
              className="mt-3"
              variant="danger"
              size="sm"
              onClick={() => usersQuery.refetch()}
            >
              重试
            </Button>
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
      </Card>
    </main>
  )
}
