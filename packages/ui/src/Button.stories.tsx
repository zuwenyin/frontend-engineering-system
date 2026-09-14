import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "./Button"

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Button",
  },

  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
}

export const Danger: Story = {
  args: {
    variant: "danger",
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
