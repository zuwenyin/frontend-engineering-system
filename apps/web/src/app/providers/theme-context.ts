import { createContext } from "react"

/** 应用支持的主题枚举 */
export type Theme = "light" | "dark" | "brand"

/** ThemeContext 对外暴露的值 */
export type ThemeContextValue = {
  /** 当前主题 */
  theme: Theme
  /** 切换主题 */
  setTheme: (theme: Theme) => void
}

/** 主题在 localStorage 中的存储键 */
export const themeStorageKey = "frontend-engineering-system2:theme"

/** 主题 React Context，未包裹 Provider 时值为 null */
export const ThemeContext = createContext<ThemeContextValue | null>(null)

/**
 * 类型守卫：判断字符串是否为合法 Theme。
 *
 * @param value - 待校验的原始字符串（常见来源：localStorage）
 * @returns 是否为合法主题；为 `true` 时 TypeScript 会将类型收窄为 `Theme`
 *
 * @example
 * ```ts
 * // 输入：value = "dark"
 * isTheme("dark")
 * // 输出：true，且 value 被收窄为 Theme
 *
 * // 输入：value = "blue"
 * isTheme("blue")
 * // 输出：false
 *
 * // 输入：value = null
 * isTheme(null)
 * // 输出：false
 * ```
 */
export function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark" || value === "brand"
}

/**
 * 从 localStorage 读取已保存的主题。
 * SSR / 无 window 环境，或存储值非法时，回退为 `"light"`。
 *
 * @returns 合法的当前主题
 *
 * @example
 * ```ts
 * // 输入：localStorage 中存有 "brand"
 * readStoredTheme()
 * // 输出："brand"
 *
 * // 输入：localStorage 无值或值为 "unknown"
 * readStoredTheme()
 * // 输出："light"
 *
 * // 输入：无 window（如 SSR）
 * readStoredTheme()
 * // 输出："light"
 * ```
 */
export function readStoredTheme(): Theme {
  if (typeof window === "undefined") {
    return "light"
  }

  const storedTheme = window.localStorage.getItem(themeStorageKey)

  return isTheme(storedTheme) ? storedTheme : "light"
}

/**
 * 将主题应用到文档根节点，供 CSS 通过 `[data-theme]` 选择器生效。
 *
 * @param theme - 要应用的主题
 *
 * @example
 * ```ts
 * // 输入：theme = "dark"
 * applyTheme("dark")
 * // 输出：document.documentElement.dataset.theme === "dark"
 * //       即 <html data-theme="dark">
 * ```
 */
export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
}
