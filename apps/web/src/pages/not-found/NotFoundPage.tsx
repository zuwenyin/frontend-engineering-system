import { Link } from "react-router"
import { PageTitle } from "@/shared/ui"

export function NotFoundPage() {
  return (
    <main>
      <PageTitle title="页面未找到" subtitle="你所查找的页面并不存在" />
      <p>
        <Link to="/">返回主页</Link>
      </p>
    </main>
  )
}
