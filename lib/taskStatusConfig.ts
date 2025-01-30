import type { TaskStatus, StatusConfig } from "@/types/tasks"

export const taskStatusConfig: Record<TaskStatus, StatusConfig> = {
  "do-first": {
    bgColor: "bg-green-200 dark:bg-green-800",
    titleTextColor: "text-green-600 dark:text-green-200",
    textColor: "text-green-600 dark:text-green-100",
    hover: "hover:bg-green-600 hover:text-green-200 dark:hover:bg-green-400 dark:hover:text-green-800",
    borderColor: "border-[hsl(var(--do-first-text))]",
  },
  "do-later": {
    bgColor: "bg-blue-200 dark:bg-blue-800",
    titleTextColor: "text-blue-600 dark:text-blue-200",
    textColor: "text-blue-600 dark:text-blue-100",
    hover: "hover:bg-blue-600 hover:text-blue-200 dark:hover:bg-blue-400 dark:hover:text-blue-800",
    borderColor: "border-[hsl(var(--do-later-text))]",
  },
  "delegate": {
    bgColor: "bg-yellow-200 dark:bg-yellow-800",
    titleTextColor: "text-yellow-600 dark:text-yellow-200",
    textColor: "text-yellow-600 dark:text-yellow-100",
    hover: "hover:bg-yellow-600 hover:text-yellow-200 dark:hover:bg-yellow-400 dark:hover:text-yellow-800",
    borderColor: "border-[hsl(var(--delegate-text))]",
  },
  "eliminate": {
    bgColor: "bg-red-200 dark:bg-red-800",
    titleTextColor: "text-red-600 dark:text-red-300",
    textColor: "text-red-600 dark:text-red-100",
    hover: "hover:bg-red-600 hover:text-red-200 dark:hover:bg-red-400 dark:hover:text-red-800",
    borderColor: "border-[hsl(var(--eliminate-text))]",
  },
}