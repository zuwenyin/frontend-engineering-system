import { httpGet } from "@/shared/api"
import { env } from "@/shared/config"
import type { User } from "@/entities/user/model"

export type UserListScenario = "success" | "empty" | "error"

const mockUsers: User[] = [
  {
    id: "u_001",
    name: "Ada Lovelace",
    email: "ada@example.com",
    role: "admin",
    status: "active",
  },
  {
    id: "u_002",
    name: "Grace Hopper",
    email: "grace@example.com",
    role: "member",
    status: "active",
  },
  {
    id: "u_003",
    name: "Alan Turing",
    email: "alan@example.com",
    role: "member",
    status: "disabled",
  },
]

function wait(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

async function getMockUsers(scenario: UserListScenario) {
  await wait(600)

  if (scenario === "error") {
    throw new Error("Mock user request failed")
  }

  if (scenario === "empty") {
    return []
  }

  return mockUsers
}

export async function getUsers(scenario: UserListScenario = "success") {
  // 是否走 mock 数据
  if (env.enableMock) {
    return getMockUsers(scenario)
  }

  return httpGet<User[]>("/users")
}
