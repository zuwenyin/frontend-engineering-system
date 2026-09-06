import { useEffect, useMemo, useState, type ReactNode } from "react"

import {
  applyTheme,
  readStoredTheme,
  ThemeContext,
  themeStorageKey,
  type Theme,
  type ThemeContextValue,
} from "@/app/providers/theme-context"

/** ThemeProvider 组件入参 */
type ThemeProviderProps = {
  /** 需要共享主题状态的子树 */
  children: ReactNode
}

/**
 * 主题 Provider：负责初始化、同步 DOM / localStorage，并向子组件提供主题读写能力。
 *
 * 流程：
 * 1. 用 `readStoredTheme()` 作为初始主题
 * 2. 主题变化时调用 `applyTheme`，并写入 localStorage
 * 3. 通过 `ThemeContext` 向下暴露 `{ theme, setTheme }`
 *
 * @example
 * ```tsx
 * // 输入：用 Provider 包裹应用，并在子组件中调用 setTheme("dark")
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 *
 * // 输出：
 * // - <html data-theme="dark">
 * // - localStorage["frontend-engineering-system2:theme"] === "dark"
 * // - 子组件通过 Context 读到 theme === "dark"
 * ```
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  // 惰性初始化：仅首次渲染时从 localStorage 读取，避免每次 render 都读存储
  const [theme, setTheme] = useState<Theme>(() => readStoredTheme())

  /**
   * 主题变化时同步到 DOM 与 localStorage。
   *
   * @example
   * ```ts
   * // 输入：theme 从 "light" 变为 "brand"
   * // 输出：
   * // - document.documentElement.dataset.theme === "brand"
   * // - localStorage.getItem(themeStorageKey) === "brand"
   * ```
   */
  useEffect(() => {
    applyTheme(theme)
    window.localStorage.setItem(themeStorageKey, theme)
  }, [theme])

  // 缓存 Context value，避免 theme 未变时触发无关消费者重渲染
  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
