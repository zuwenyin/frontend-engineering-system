import { PageTitle } from "@/shared/ui"

export function HomePage() {
  return (
    <main>
      <PageTitle title="frontend-engineering-system" subtitle="工程管理实战" />
      <section className="rounded-[--radius-card] border border-surface-100 bg-surface-0 p-6 shadow-sm">
        <p className="text-sm leading-6 text-surface-900/70">这是首页，欢迎👏</p>
      </section>
    </main>
  )
}
