import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { PageTitle } from "./PageTitle"

describe("PageTitle Component Test", () => {
  it("renders the title as a top level heading", () => {
    render(<PageTitle title="Engineering dashboard" />)

    expect(
      screen.getByRole("heading", { level: 1, name: "Engineering dashboard" }),
    ).toBeInTheDocument()
  })

  it("renders the subtitle when it is provided", () => {
    render(
      <PageTitle
        title="Engineering dashboard"
        subtitle="Manage packages, releases and deployment status."
      />,
    )

    expect(screen.getByText("Manage packages, releases and deployment status.")).toBeInTheDocument()
  })

  it("does not render a subtitle when it is missing", () => {
    const { container } = render(<PageTitle title="Engineering dashboard" />)

    expect(container.querySelector("p")).not.toBeInTheDocument()
  })
})
