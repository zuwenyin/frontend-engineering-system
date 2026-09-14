import type { Meta, StoryObj } from "@storybook/react-vite"

import { PageTitle } from "./PageTitle"

const meta = {
  title: "Components/PageTitle",
  component: PageTitle,
  tags: ["autodocs"],
  args: {
    title: "Engineering dashboard",
    subtitle: "Manage packages, releases and deployment status.",
  },
} satisfies Meta<typeof PageTitle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithoutSubtitle: Story = {
  args: {
    subtitle: undefined,
  },
}
