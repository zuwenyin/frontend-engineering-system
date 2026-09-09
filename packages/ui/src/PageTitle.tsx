type PageTitleProps = {
  title: string
  subtitle?: string
}

export function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <section className="mb-6">
      <h1 className="text-3xl font-semibold tracking-tight text-surface-900">{title}</h1>
      {subtitle ? (
        <p className="mt-2 max-w-2xl text-sm leading-6 text-surface-900/70">{subtitle}</p>
      ) : null}
    </section>
  )
}
