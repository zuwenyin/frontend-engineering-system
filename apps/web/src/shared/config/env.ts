import { readBoolean } from "@zuwy/frontend-engineering-system-utils"

type AppEnv = "development" | "staging" | "production"

type EnvConfig = {
  appEnv: AppEnv
  apiBaseUrl: string
  enableMock: boolean
  enableMonitoring: boolean
  isDevelopment: boolean
  isStaging: boolean
  isProduction: boolean
}

export const env: EnvConfig = {
  appEnv: import.meta.env.VITE_APP_ENV,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  enableMock: readBoolean(import.meta.env.VITE_ENABLE_MOCK),
  enableMonitoring: readBoolean(import.meta.env.VITE_ENABLE_MONITORING),
  isDevelopment: import.meta.env.VITE_APP_ENV === "development",
  isStaging: import.meta.env.VITE_APP_ENV === "staging",
  isProduction: import.meta.env.VITE_APP_ENV === "production",
}
