/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENV: "development" | "staging" | "production"
  readonly VITE_API_BASE_URL: string
  readonly VITE_ENABLE_MOCK: "true" | "false"
  readonly VITE_ENABLE_MONITORING: "true" | "false"
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
