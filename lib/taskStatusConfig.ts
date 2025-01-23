import type { TaskStatus } from "@/types/tasks"

interface StatusConfig {
  bgColor: string
  textColor: string
  hover?: string
  borderColor: string
}

export const taskStatusConfig: Record<TaskStatus, StatusConfig> = {
  "do-first": {
    bgColor: "bg-green-200 dark:bg-green-600",
    textColor: "text-green-600 dark:text-green-400",
    hover: "hover:bg-green-600 hover:text-green-200 dark:hover:bg-green-200 dark:hover:text-green-400",
    borderColor: "border-[hsl(var(--do-first-text))]",
  },
  "do-later": {
    bgColor: "bg-blue-200",
    textColor: "text-blue-600",
    hover: "hover:bg-blue-600 hover:text-blue-200 dark:hover:bg-blue-200 dark:hover:text-blue-400",
    borderColor: "border-[hsl(var(--do-later-text))]",
  },
  "delegate": {
    bgColor: "bg-yellow-200",
    textColor: "text-yellow-600",
    hover: "hover:bg-yellow-600 hover:text-yellow-200 dark:hover:bg-yellow-200 dark:hover:text-yellow-400",
    borderColor: "border-[hsl(var(--delegate-text))]",
  },
  "eliminate": {
    bgColor: "bg-red-200",
    textColor: "text-red-600",
    hover: "hover:bg-red-600 hover:text-red-200 dark:hover:bg-red-200 dark:hover:text-red-400",
    borderColor: "border-[hsl(var(--eliminate-text))]",
  },
}