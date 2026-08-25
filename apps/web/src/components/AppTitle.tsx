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

// // noUnusedLocals: true 时，下面这行会报错
// const deadVariable = 42;  // ❌ 错误：'deadVariable' 已声明但从未读取

// // noUnusedParameters: true 时，下面这个参数会报错
// function greet(name: string, unusedParam: number) {  // ❌ 错误：'unusedParam' 已声明但从未读取
//   return `Hello, ${name}`;
// }