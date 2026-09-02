import { RouterProvider } from "react-router"
import { router } from "@/app/router/router"
import { AppProviders } from "@/app/providers"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

export default function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
      {/* 点击页面右下角按钮，可以打开 Query Devtools。 */}
      <ReactQueryDevtools initialIsOpen={false} />
    </AppProviders>
  )
}
