import { expect, test } from "@playwright/test"

test("navigates from home to settings", async ({ page }) => {
  await page.goto("/")

  await page.getByRole("link", { name: "Settings" }).click()

  await expect(page).toHaveURL(/\/settings$/)
  await expect(page.getByRole("heading", { name: "设置页" })).toBeVisible()
  await expect(page.getByText("外观设置")).toBeVisible()
})