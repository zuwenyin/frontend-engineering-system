import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { Button } from "./Button"

describe("Button Component Test", () => {
  it("renders its accessible name", () => {
    render(<Button>Save changes</Button>)

    expect(screen.getByRole("button", { name: "Save changes" })).toBeInTheDocument()
  })
})

it("uses button type by default", () => {
  render(<Button>Save changes</Button>)

  expect(screen.getByRole("button", { name: "Save changes" })).toHaveAttribute("type", "button")
})

it("calls onClick when the user clicks", async () => {
  const user = userEvent.setup()
  const handleClick = vi.fn()

  render(<Button onClick={handleClick}>Save changes</Button>)

  const button = screen.getByRole("button", { name: "Save changes" })
  await user.click(button)

  expect(handleClick).toHaveBeenCalledTimes(1)
})

it("does not respond when disabled", async () => {
  const user = userEvent.setup()
  const handleClick = vi.fn()

  render(
    <Button disabled onClick={handleClick}>
      Save changes
    </Button>,
  )

  const button = screen.getByRole("button", { name: "Save changes" })

  expect(button).toBeDisabled()
  await user.click(button)

  expect(handleClick).not.toHaveBeenCalled()
})
