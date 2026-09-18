import type { User } from "@/entities/user"

export const mockUsers = [
  {
    id: "user-1",
    name: "张三",
    email: "ada@example.com",
    role: "admin",
    status: "active",
  },
  {
    id: "user-2",
    name: "李四",
    email: "grace@example.com",
    role: "member",
    status: "disabled",
  },
] satisfies User[]
