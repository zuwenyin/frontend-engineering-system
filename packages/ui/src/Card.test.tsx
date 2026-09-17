import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Card } from "./Card"

describe("Card Component Test", () => {
  it("renders its children", () => {
    render(
      <Card>
        <p>All checks have passed.</p>
      </Card>,
    )

    expect(screen.getByText("All checks have passed.")).toBeInTheDocument()
  })

  it("renders the title as a heading", () => {
    render(<Card title="Project status" />)

    expect(screen.getByRole("heading", { name: "Project status" })).toBeInTheDocument()
  })

  it("renders the description", () => {
    render(<Card description="View the latest status of the current project." />)

    expect(screen.getByText("View the latest status of the current project.")).toBeInTheDocument()
  })

  it("renders both the title and the description", () => {
    render(<Card title="Project status" description="View the latest status." />)

    expect(screen.getByRole("heading", { name: "Project status" })).toBeInTheDocument()
    expect(screen.getByText("View the latest status.")).toBeInTheDocument()
  })

  it("does not render a header when the title and description are missing", () => {
    const { container } = render(
      <Card>
        <p>All checks have passed.</p>
      </Card>,
    )

    expect(container.querySelector("header")).not.toBeInTheDocument()
  })

  it("renders the footer when it is provided", () => {
    render(
      <Card footer={<button type="button">View details</button>}>
        <p>The package is ready to publish.</p>
      </Card>,
    )

    expect(screen.getByRole("button", { name: "View details" })).toBeInTheDocument()
  })

  it("does not render a footer when it is missing", () => {
    const { container } = render(
      <Card>
        <p>All checks have passed.</p>
      </Card>,
    )

    expect(container.querySelector("footer")).not.toBeInTheDocument()
  })

  it("merges the custom className and forwards the remaining props", () => {
    render(
      <Card className="max-w-md" data-testid="card">
        <p>All checks have passed.</p>
      </Card>,
    )

    const card = screen.getByTestId("card")

    expect(card).toHaveClass("max-w-md")
    expect(card).toHaveClass("rounded-(--radius-card)", "border", "p-6")
  })
})
