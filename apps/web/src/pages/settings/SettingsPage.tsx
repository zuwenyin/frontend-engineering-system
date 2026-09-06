import { env } from "@/shared/config"
import { PageTitle } from "@/shared/ui"
import { Link } from "react-router"

export function SettingsPage() {
  return (
    <main>
      <PageTitle title="设置页" subtitle="管理应用运行时配置" />
      <section className="rounded-[--radius-card] border border-surface-100 bg-white p-6 shadow-sm">
        <dl className="grid gap-4 text-sm md:grid-cols-2">
          <dt className="font-medium text-surface-900">当前环境</dt>
          <dd className="mt-1 text-surface-900/70">{env.appEnv}</dd>
          <dt className="font-medium text-surface-900">API Base URL</dt>
          <dd className="mt-1 text-surface-900/70">{env.apiBaseUrl}</dd>
          <dt className="font-medium text-surface-900">Mock Enabled</dt>
          <dd className="mt-1 text-surface-900/70">{env.enableMock ? "yes" : "no"}</dd>
          <dt className="font-medium text-surface-900">监视</dt>
          <dd className="mt-1 text-surface-900/70">
            {env.enableMonitoring ? "enabled" : "disabled"}
          </dd>
        </dl>
      </section>
      <Link
        to="/"
        className="mt-5 inline-flex items-center rounded-md border border-surface-100 bg-white px-4 py-2 text-sm font-medium text-surface-900 shadow-sm transition-colors hover:bg-surface-50"
      >
        ← 返回主页
      </Link>
    </main>
  )
}
