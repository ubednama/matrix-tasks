"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { TaskStatus } from "@/types/tasks"
import { useEffect, useState } from "react"

interface SelectSectionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (section: TaskStatus) => void
  task: string
}

const sectionConfig = {
  "do-first": { shortcut: "Shift ⇧ + Arrow ↑", color: "bg-[#00FF94]", hover: "hover:bg-[#00FF94]/90" },
  "do-later": { shortcut: "Shift ⇧ + Arrow →", color: "bg-[#00D1FF]", hover: "hover:bg-[#00D1FF]/90" },
  delegate: { shortcut: "Shift ⇧ + Arrow ←", color: "bg-[#FFB800]", hover: "hover:bg-[#FFB800]/90" },
  eliminate: { shortcut: "Shift ⇧ + Arrow ↓", color: "bg-[#FF0000]", hover: "hover:bg-[#FF0000]/90" },
}

export function SelectSectionModal({ open, onOpenChange, onSelect }: SelectSectionModalProps) {
  const [selectedSection, setSelectedSection] = useState<TaskStatus>("do-first")

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open || !e.shiftKey) return

      const sectionMap: Record<string, TaskStatus> = {
        ArrowUp: "do-first",
        ArrowRight: "do-later",
        ArrowLeft: "delegate",
        ArrowDown: "eliminate",
      }

      if (sectionMap[e.key]) {
        setSelectedSection(sectionMap[e.key])
        onSelect(sectionMap[e.key])
        onOpenChange(false)
        e.preventDefault()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, onSelect, onOpenChange])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1A1A1A] border-0">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl">Select section</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {(Object.entries(sectionConfig) as [TaskStatus, (typeof sectionConfig)[keyof typeof sectionConfig]][]).map(
            ([section, config]) => (
              <button
                key={section}
                onClick={() => {
                  setSelectedSection(section)
                  onSelect(section)
                  onOpenChange(false)
                }}
                className={`w-full flex items-center justify-between p-3 rounded ${config.color} ${config.hover} text-black transition-colors ${
                  selectedSection === section ? "border-2 border-white" : ""
                }`}
              >
                <span className="bg-black/20 px-3 py-1 rounded text-white">{config.shortcut}</span>
                <span className="capitalize font-medium">{section.replace("-", " ")}</span>
              </button>
            ),
          )}
          <div className="flex justify-end">
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="text-red-500 hover:text-red-400 hover:bg-transparent"
            >
              CLOSE
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}