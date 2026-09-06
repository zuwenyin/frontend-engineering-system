import type { Theme } from "@/app/providers/theme-context"
import { useTheme } from "@/app/providers/useTheme"
import { env } from "@/shared/config"
import { PageTitle } from "@/shared/ui"
import { Link } from "react-router"

const themeOptions: Array<{
  value: Theme
  label: string
  description: string
}> = [
  {
    value: "light",
    label: "浅色主题",
    description: "默认的明亮界面，适合光线充足的环境。",
  },
  {
    value: "dark",
    label: "深色主题",
    description: "降低界面亮度，适合夜间或较暗的环境。",
  },
  {
    value: "brand",
    label: "品牌主题",
    description: "基于相同语义令牌实现的品牌化主题。",
  },
]

export function SettingsPage() {
  const { theme, setTheme } = useTheme()

  return (
    <main>
      <PageTitle title="设置页" subtitle="管理应用运行时配置和界面偏好" />

      <div className="grid gap-6">
        <section className="rounded-(--radius-card) border border-surface-100 bg-surface-0 p-6 shadow-sm">
          <h2 className="text-base font-semibold text-surface-900">外观设置</h2>

          <p className="mt-1 text-sm text-surface-900/70">选择当前设备所使用的应用主题。</p>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {themeOptions.map((option) => {
              const isSelected = option.value === theme

              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={isSelected}
                  className={[
                    "rounded-(--radius-card) border p-4 text-left text-sm transition-colors",
                    isSelected
                      ? "border-brand-600 bg-brand-50 text-brand-700"
                      : "border-surface-100 bg-surface-0 text-surface-900 hover:bg-surface-50",
                  ].join(" ")}
                  onClick={() => setTheme(option.value)}
                >
                  <span className="block font-medium">{option.label}</span>

                  <span className="mt-1 block text-surface-900/70">{option.description}</span>
                </button>
              )
            })}
          </div>
        </section>

        <section className="rounded-(--radius-card) border border-surface-100 bg-surface-0 p-6 shadow-sm">
          <h2 className="text-base font-semibold text-surface-900">运行环境</h2>

          <p className="mt-1 text-sm text-surface-900/70">查看应用当前使用的运行时配置。</p>

          <dl className="mt-4 grid gap-4 text-sm md:grid-cols-2">
            <div>
              <dt className="font-medium text-surface-900">当前环境</dt>
              <dd className="mt-1 text-surface-900/70">{env.appEnv}</dd>
            </div>

            <div>
              <dt className="font-medium text-surface-900">API Base URL</dt>
              <dd className="mt-1 break-all text-surface-900/70">{env.apiBaseUrl}</dd>
            </div>

            <div>
              <dt className="font-medium text-surface-900">Mock 服务</dt>
              <dd className="mt-1 text-surface-900/70">{env.enableMock ? "已启用" : "未启用"}</dd>
            </div>

            <div>
              <dt className="font-medium text-surface-900">应用监控</dt>
              <dd className="mt-1 text-surface-900/70">
                {env.enableMonitoring ? "已启用" : "未启用"}
              </dd>
            </div>
          </dl>
        </section>
      </div>

      <Link
        to="/"
        className="mt-5 inline-flex items-center rounded-md border border-surface-100 bg-surface-0 px-4 py-2 text-sm font-medium text-surface-900 shadow-sm transition-colors hover:bg-surface-50"
      >
        ← 返回主页
      </Link>
    </main>
  )
}
