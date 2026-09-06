import type { UserStatus } from "@/entities/user/model"

import styles from "./UserStatusBadge.module.css"

type UserStatusBadgeProps = {
  status: UserStatus
}

const statusText: Record<UserStatus, string> = {
  active: "Active",
  disabled: "Disabled",
}

export function UserStatusBadge({ status }: UserStatusBadgeProps) {
  return <span className={`${styles.badge} ${styles[status]}`}>{statusText[status]}</span>
}
