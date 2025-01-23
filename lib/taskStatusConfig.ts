import type { TaskStatus } from "@/types/tasks"

interface StatusConfig {
  bgColor: string
  textColor: string
  borderColor: string
}

export const taskStatusConfig: Record<TaskStatus, StatusConfig> = {
  "do-first": {
    bgColor: "bg-green-800",
    textColor: "text-green-500",
    borderColor: "border-[hsl(var(--do-first-text))]",
  },
  "do-later": {
    bgColor: "bg-blue-800",
    textColor: "text-blue-500",
    borderColor: "border-[hsl(var(--do-later-text))]",
  },
  delegate: {
    bgColor: "bg-yellow-800",
    textColor: "text-yellow-500",
    borderColor: "border-[hsl(var(--delegate-text))]",
  },
  eliminate: {
    bgColor: "bg-red-800",
    textColor: "text-red-500",
    borderColor: "border-[hsl(var(--eliminate-text))]",
  },
}