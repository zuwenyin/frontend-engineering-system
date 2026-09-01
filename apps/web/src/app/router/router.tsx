import { createBrowserRouter } from "react-router"
import { MainLayout } from "@/app/layouts/MainLayout"
import { HomePage } from "@/pages/home"
import { RequireAuth } from "./RequireAuth"
import { NotFoundPage } from "@/pages/not-found"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      // index: true 表示它是父路由 / 的默认页面。
      { index: true, Component: HomePage },
      {
        Component: RequireAuth,
        children: [
          {
            path: "settings",
            lazy: async () => {
              const { SettingsPage } = await import("@/pages/settings")
              return { Component: SettingsPage }
            },
          },
        ],
      },
      { path: "*", Component: NotFoundPage },
    ],
  },
])
