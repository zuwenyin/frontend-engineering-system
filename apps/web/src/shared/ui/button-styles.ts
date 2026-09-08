export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost"

export type ButtonSize = "sm" | "md" | "lg"

type ButtonClassNameOptions = {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

const baseButtonClassName =
  "inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60"

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-brand-600 text-surface-0 hover:bg-brand-700",
  secondary: "bg-surface-100 text-surface-900 hover:bg-surface-50",
  danger: "bg-danger-700 text-surface-0 hover:bg-danger-700/90",
  ghost: "bg-transparent text-surface-900 hover:bg-surface-100",
}

const buttonSizes: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
}

export function getButtonClassName({
  variant = "primary",
  size = "md",
  className,
}: ButtonClassNameOptions = {}) {
  return [baseButtonClassName, buttonVariants[variant], buttonSizes[size], className]
    .filter(Boolean)
    .join(" ")
}
