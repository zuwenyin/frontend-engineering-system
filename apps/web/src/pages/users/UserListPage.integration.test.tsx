import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { renderWithProviders } from "@/test/renderWithProviders"
import {
  createUsersDelayedHandler,
  createUsersErrorHandler,
  createUsersRetryHandler,
  createUsersSuccessHandler,
} from "@/test/mocks/handlers"
import { server } from "@/test/mocks/server"

import { UserListPage } from "./UserListPage"

describe("UserListPage", () => {
  it("renders users after loading", async () => {
    server.use(createUsersDelayedHandler())

    renderWithProviders(<UserListPage />)

    expect(screen.getByText("加载用户列表中...")).toBeInTheDocument()
    expect(await screen.findByText("张三")).toBeInTheDocument()
    expect(screen.getByText("ada@example.com")).toBeInTheDocument()
  })

  it("renders empty state when the API returns no users", async () => {
    server.use(createUsersSuccessHandler([]))

    renderWithProviders(<UserListPage />)

    expect(await screen.findByText("未找到相关用户")).toBeInTheDocument()
  })

  it("renders error state when the API fails", async () => {
    server.use(createUsersErrorHandler())

    renderWithProviders(<UserListPage />)

    expect(await screen.findByText("加载用户列表失败")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "重试" })).toBeInTheDocument()
  })

  it("refetches users after retry", async () => {
    const user = userEvent.setup()
    server.use(createUsersRetryHandler())

    renderWithProviders(<UserListPage />)

    expect(await screen.findByText("加载用户列表失败")).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "重试" }))

    expect(await screen.findByText("张三")).toBeInTheDocument()
  })
})
