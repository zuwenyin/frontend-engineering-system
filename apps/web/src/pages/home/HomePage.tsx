import { Card, PageTitle } from "@/shared/ui"

export function HomePage() {
  return (
    <main>
      <PageTitle title="frontend-engineering-system" subtitle="工程管理实战" />

      <Card>
        <p className="text-sm leading-6 text-surface-900/70">这是首页，欢迎👏</p>
      </Card>
    </main>
  )
}
