import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render } from "@testing-library/react"
import type { ReactElement } from "react"

// 测试不需要启动真实浏览器
// MemoryRouter 把路由历史保存在内存中，不会操作真实地址栏。
import { MemoryRouter } from "react-router"

// 接收需要测试的页面
export function renderWithProviders(ui: ReactElement) {
  // 每次调用 renderWithProviders 都创建一个新的实例
  // 测试 A -> 独立 QueryClient 和缓存
  // 测试 B -> 独立 QueryClient 和缓存
  // 测试 C -> 独立 QueryClient 和缓存
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={["/users"]}>{ui}</MemoryRouter>
    </QueryClientProvider>,
  )
}
