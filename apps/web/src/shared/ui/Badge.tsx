import type { ComponentPropsWithoutRef } from "react"

type BadgeVariant = "neutral" | "success" | "warning" | "danger" | "brand"

type BadgeProps = ComponentPropsWithoutRef<"span"> & {
  variant?: BadgeVariant
}

const badgeVariants: Record<BadgeVariant, string> = {
  neutral: "bg-surface-100 text-surface-900",
  success: "bg-success-50 text-success-700",
  warning: "bg-warning-50 text-warning-700",
  danger: "bg-danger-50 text-danger-700",
  brand: "bg-brand-50 text-brand-700",
}

export function Badge({ variant = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        badgeVariants[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  )
}
