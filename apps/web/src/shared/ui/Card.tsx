import type { ComponentPropsWithoutRef, ReactNode } from "react"

type CardProps = ComponentPropsWithoutRef<"section"> & {
  title?: string
  description?: string
  footer?: ReactNode
}

export function Card({ title, description, footer, children, className, ...props }: CardProps) {
  return (
    <section
      className={[
        "rounded-(--radius-card) border border-surface-100 bg-surface-0 p-6 shadow-sm",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {title || description ? (
        <header className="mb-4">
          {title ? <h2 className="text-base font-semibold text-surface-900">{title}</h2> : null}
          {description ? <p className="mt-1 text-sm text-surface-900/70">{description}</p> : null}
        </header>
      ) : null}

      {children}

      {footer ? <footer className="mt-4">{footer}</footer> : null}
    </section>
  )
}
