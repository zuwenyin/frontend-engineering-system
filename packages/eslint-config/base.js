import js from "@eslint/js"
import { defineConfig, globalIgnores } from "eslint/config"
import eslintConfigPrettier from "eslint-config-prettier"
import tseslint from "typescript-eslint"

export default defineConfig([
  // 哪些目录需要忽略
  // 一般来讲，在做 eslint 检查的时候，肯定只检查我们自己写的代码
  globalIgnores(["dist", "dist-ssr"]),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
])
