import type { ComponentPropsWithoutRef } from "react"

import { getButtonClassName, type ButtonSize, type ButtonVariant } from "./button-styles"

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant
  size?: ButtonSize
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button className={getButtonClassName({ variant, size, className })} type={type} {...props} />
  )
}
