import { expect, test } from "@playwright/test"

import { apiUrl } from "./env"

const usersUrl = apiUrl("/users")

const users = [
  {
    id: "user-1",
    name: "张三",
    email: "ada@example.com",
    role: "admin",
    status: "active",
  },
  {
    id: "user-2",
    name: "李四",
    email: "grace@example.com",
    role: "member",
    status: "disabled",
  },
]

test("navigates from home to the user list", async ({ page }) => {
  await page.route(usersUrl, async (route) => {
    await route.fulfill({
      status: 200,
      headers: { "access-control-allow-origin": "*" },
      json: users
    })
  })

  await page.goto("/")

  await expect(page.getByRole("heading", {
    name: "frontend-engineering-system"
  })).toBeVisible()

  await page.getByRole('link', { name: "users" }).click()
  await expect(page).toHaveURL(/\/users$/)
  await expect(
    page.getByRole("heading", {
      name: "用户",
    }),
  ).toBeVisible()

  await expect(page.getByText("张三")).toBeVisible()
  await expect(page.getByText("ada@example.com")).toBeVisible()
  await expect(page.getByText("李四")).toBeVisible()

})
