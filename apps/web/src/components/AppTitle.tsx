type AppTitleProps = {
  subtitle?: string
}

export function AppTitle({ subtitle }: AppTitleProps) {
  return (
    <section>
      <h1>frontend-engineering-system</h1>
      {subtitle ? <p>{subtitle}</p> : null}
    </section>
  )
}