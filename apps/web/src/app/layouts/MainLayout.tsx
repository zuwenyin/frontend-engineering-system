import { NavLink, Outlet } from "react-router"

const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
  [
    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
    isActive ? "bg-brand-100 text-brand-700" : "text-surface-900 hover:bg-surface-100",
  ].join(" ")

export function MainLayout() {
  return (
    <div className="min-h-screen bg-surface-50 text-surface-900">
      {/* header这一块儿相当于所有页面都有的内容，因此单独抽取到layout组件里面 */}
      <header className="border-b border-surface-100 bg-white">
        <div className="mx-auto flex max-w-[--container-page] items-center justify-between px-6 py-4">
          <strong className="text-base font-semibold">frontend-engineering-system</strong>
          <nav aria-label="Main navigation" className="flex items-center gap-2">
            <NavLink to="/" className={navLinkClassName}>
              Home
            </NavLink>
            <NavLink to="/users" className={navLinkClassName}>
              Users
            </NavLink>
            <NavLink to="/settings" className={navLinkClassName}>
              Settings
            </NavLink>
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-[--container-page] px-6 py-8">
        {/* outlet用于渲染pages里面具体的页面内容 */}
        <Outlet />
      </div>
    </div>
  )
}
