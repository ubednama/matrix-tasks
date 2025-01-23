"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface AddTaskModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (task: string) => void
}

export function AddTaskModal({ open, onOpenChange, onSubmit }: AddTaskModalProps) {
  const [task, setTask] = useState("")

  const handleSubmit = () => {
    if (task.trim()) {
      onSubmit(task)
      setTask("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="dark:bg-[#1A1A1A] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl dark:text-white">Add tasks</DialogTitle>
          <DialogDescription>Enter your task below. Press Enter or click Submit to add it.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label htmlFor="task" className="dark:text-white text-black">
              Task
            </label>
            <Input
              id="task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="mt-2 bg-transparent dark:border-gray-700 dark:text-white"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              autoFocus
            />
          </div>
          <div className="flex justify-end gap-4">
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="text-red-500 hover:text-red-400 hover:bg-transparent"
            >
              CLOSE
            </Button>
            <Button onClick={handleSubmit} className="bg-[#00C2A9] text-white hover:bg-[#00C2A9]/90">
              SUBMIT
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}