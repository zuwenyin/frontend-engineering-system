import type { UserStatus } from "../model"

import { Badge } from "@frontend-engineering-system/ui"

type UserStatusBadgeProps = {
  status: UserStatus
}

const statusText: Record<UserStatus, string> = {
  active: "Active",
  disabled: "Disabled",
}

const statusVariant: Record<UserStatus, "success" | "warning"> = {
  active: "success",
  disabled: "warning",
}

export function UserStatusBadge({ status }: UserStatusBadgeProps) {
  return <Badge variant={statusVariant[status]}>{statusText[status]}</Badge>
}
