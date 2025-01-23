"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"

interface EditTaskModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (task: string) => void
  initialValue: string
}

export function EditTaskModal({ open, onOpenChange, onSubmit, initialValue }: EditTaskModalProps) {
  const [task, setTask] = useState(initialValue)

  useEffect(() => {
    setTask(initialValue)
  }, [initialValue])

  const handleSubmit = () => {
    if (task.trim()) {
      onSubmit(task)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1A1A1A] border-0">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl">Edit tasks</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label htmlFor="task" className="text-white">
              Task
            </label>
            <Input
              id="task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="mt-2 bg-transparent border-gray-700 text-white"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
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
            <Button onClick={handleSubmit} className="bg-[#FFB800] hover:bg-[#FFB800]/90 text-black">
              UPDATE
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}