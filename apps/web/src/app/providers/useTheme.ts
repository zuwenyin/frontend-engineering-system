import { useContext } from "react"

import { ThemeContext } from "@/app/providers/theme-context"

/**
 * 读取当前主题 Context。
 * 必须在 {@link ThemeProvider} 子树内使用，否则会抛错。
 *
 * @returns `{ theme, setTheme }` 主题状态与切换方法
 *
 * @example
 * ```tsx
 * // 输入：组件被 ThemeProvider 包裹
 * function ThemeToggle() {
 *   const { theme, setTheme } = useTheme()
 *   return (
 *     <button type="button" onClick={() => setTheme("dark")}>
 *       Current: {theme}
 *     </button>
 *   )
 * }
 * // 输出：theme 为当前主题（如 "light"）；点击后调用 setTheme("dark") 切换主题
 *
 * // 输入：组件不在 ThemeProvider 内
 * useTheme()
 * // 输出：抛出 Error("useTheme must be used within ThemeProvider")
 * ```
 */
export function useTheme() {
  const value = useContext(ThemeContext)

  // Context 默认值为 null，说明外层缺少 ThemeProvider
  if (!value) {
    throw new Error("useTheme must be used within ThemeProvider")
  }

  return value
}
