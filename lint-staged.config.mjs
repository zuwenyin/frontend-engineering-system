export default {
  "apps/web/**/*.{ts,tsx}": ["pnpm --filter web exec eslint --fix", "prettier --write"],
  "*.{json,md,yml,yaml}": "prettier --write",
  "apps/web/**/*.{json,css,md}": "prettier --write",
}