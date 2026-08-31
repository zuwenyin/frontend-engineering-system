import { env } from "@/shared/config"
import { PageTitle } from "@/shared/ui"

export function HomePage() {
  return (
    <main>
      <PageTitle title="frontend-engineering-system" subtitle="工程管理项目" />
      <dl>
        <dt>App Env</dt>
        <dd>{env.appEnv}</dd>
        <dt>API Base URL</dt>
        <dd>{env.apiBaseUrl}</dd>
        <dt>Enable Mock</dt>
        <dd>{env.enableMock ? "Yes" : "No"}</dd>
        <dt>Enable Monitoring</dt>
        <dd>{env.enableMonitoring ? "Yes" : "No"}</dd>
      </dl>
    </main>
  )
}
