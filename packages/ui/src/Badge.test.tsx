import { render, screen } from "@testing-library/react"
import type { ComponentProps } from "react"
import { describe, expect, it } from "vitest"
import { Badge } from "./Badge"

type BadgeVariant = NonNullable<ComponentProps<typeof Badge>["variant"]>

const variantCases: Array<[BadgeVariant, string]> = [
  ["neutral", "bg-surface-100"],
  ["success", "bg-success-50"],
  ["warning", "bg-warning-50"],
  ["danger", "bg-danger-50"],
  ["brand", "bg-brand-50"],
]

describe("Badge Component Test", () => {
  it("renders its content", () => {
    render(<Badge>New</Badge>)

    expect(screen.getByText("New")).toBeInTheDocument()
  })

  it("uses the neutral variant by default", () => {
    render(<Badge data-testid="badge">New</Badge>)

    expect(screen.getByTestId("badge")).toHaveClass("bg-surface-100")
  })

  it.each(variantCases)("applies the %s variant styles", (variant, expectedClassName) => {
    render(
      <Badge data-testid="badge" variant={variant}>
        {variant}
      </Badge>,
    )

    expect(screen.getByTestId("badge")).toHaveClass(expectedClassName)
  })

  it("merges the custom className with the variant styles", () => {
    render(
      <Badge className="uppercase" data-testid="badge">
        New
      </Badge>,
    )

    const badge = screen.getByTestId("badge")

    expect(badge).toHaveClass("uppercase")
    expect(badge).toHaveClass("inline-flex", "items-center", "rounded-full")
  })

  it("forwards the remaining props to the element", () => {
    render(
      <Badge data-testid="badge" title="Status">
        New
      </Badge>,
    )

    expect(screen.getByTestId("badge")).toHaveAttribute("title", "Status")
  })
})
