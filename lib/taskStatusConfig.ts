import type { TaskStatus } from "@/types/tasks"

interface StatusConfig {
  bgColor: string
  textColor: string
  borderColor: string
}

export const taskStatusConfig: Record<TaskStatus, StatusConfig> = {
  "do-first": {
    bgColor: "bg-green-200 dark:bg-green-600",
    textColor: "text-green-600 dark:text-green-400",
    borderColor: "border-[hsl(var(--do-first-text))]",
  },
  "do-later": {
    bgColor: "bg-blue-200",
    textColor: "text-blue-600",
    borderColor: "border-[hsl(var(--do-later-text))]",
  },
  "delegate": {
    bgColor: "bg-yellow-200",
    textColor: "text-yellow-600",
    borderColor: "border-[hsl(var(--delegate-text))]",
  },
  "eliminate": {
    bgColor: "bg-red-200",
    textColor: "text-red-600",
    borderColor: "border-[hsl(var(--eliminate-text))]",
  },
}