export type UserStatus = "active" | "disabled"

export type User = {
  id: string
  name: string
  email: string
  role: "admin" | "member"
  status: UserStatus
}
