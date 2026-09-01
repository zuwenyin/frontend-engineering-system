import { env } from "@/shared/config"
import { PageTitle } from "@/shared/ui"
import { Link } from "react-router"

export function SettingsPage() {
  return (
    <main>
      <PageTitle title="设置页" subtitle="管理应用运行时配置" />
      <dl>
        <dt>当前环境</dt>
        <dd>{env.appEnv}</dd>
        <dt>API Base URL</dt>
        <dd>{env.apiBaseUrl}</dd>
        <dt>Mock Enabled</dt>
        <dd>{env.enableMock ? "yes" : "no"}</dd>
        <dt>监视</dt>
        <dd>{env.enableMonitoring ? "enabled" : "disabled"}</dd>
      </dl>
      <p>
        <Link to="/">返回主页</Link>
      </p>
    </main>
  )
}
