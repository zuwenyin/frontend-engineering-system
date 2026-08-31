type PageTitleProps = {
  title: string
  subtitle?: string
}

export function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <section>
      <h1>{title}</h1>
      {subtitle ? <p>{subtitle}</p> : null}
    </section>
  )
}
