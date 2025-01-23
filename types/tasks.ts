export type TaskStatus = "do-first" | "do-later" | "delegate" | "eliminate"

export interface Task {
  id: string
  task: string
  status: TaskStatus
  tag: string | null
  prevTag: string | null
}

export interface TaskSection {
  title: string
  ids: string[]
}

export interface TaskState {
  items: { [key: string]: Task }
  "do-first": TaskSection
  "do-later": TaskSection
  "delegate": TaskSection
  "eliminate": TaskSection
  tags: { [key: string]: string }
  titles: { [key: string]: string }
}