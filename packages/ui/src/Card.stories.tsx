import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "./Button"
import { Card } from "./Card"

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    title: "Project status",
    description: "View the latest status of the current project.",
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <p>All checks have passed.</p>,
  },
}

export const WithFooter: Story = {
  args: {
    children: <p>The package is ready to publish.</p>,
    footer: <Button size="sm">View details</Button>,
  },
}
