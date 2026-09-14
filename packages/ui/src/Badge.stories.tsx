import type { Meta, StoryObj } from "@storybook/react-vite"

import { Badge } from "./Badge"

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    children: "Badge",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["neutral", "success", "warning", "danger", "brand"],
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Neutral: Story = {}

export const Success: Story = {
  args: {
    variant: "success",
    children: "Success",
  },
}

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Warning",
  },
}

export const Danger: Story = {
  args: {
    variant: "danger",
    children: "Danger",
  },
}

export const Brand: Story = {
  args: {
    variant: "brand",
    children: "Brand",
  },
}
