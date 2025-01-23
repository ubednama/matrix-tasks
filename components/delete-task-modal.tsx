"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, X } from "lucide-react"
import { useState, useEffect } from "react"

interface DeleteTaskModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  onDoNotShowAgainChange: (value: boolean) => void
}

export function DeleteTaskModal({ open, onOpenChange, onConfirm, onDoNotShowAgainChange }: DeleteTaskModalProps) {
  const [mounted, setMounted] = useState(false)
  const [doNotShowAgain, setDoNotShowAgain] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleConfirm = () => {
    onDoNotShowAgainChange(doNotShowAgain)
    onConfirm()
    onOpenChange(false)
  }

  if (!mounted) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="theme-transition bg-background border-border">
        <DialogTitle className="hidden"></DialogTitle>
        <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="absolute right-4 top-4">
          <X className="h-4 w-4" />
        </Button>
        <div className="flex flex-col items-center gap-4">
          <AlertCircle className="h-12 w-12" />
          <h2 className="text-xl font-semibold text-center">Are you sure you want to delete this task?</h2>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="doNotShow"
              checked={doNotShowAgain}
              onCheckedChange={(checked) => setDoNotShowAgain(checked as boolean)}
            />
            <label htmlFor="doNotShow">Do not show again</label>
          </div>
          <div className="flex gap-4 mt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="min-w-[100px]">
              No, cancel
            </Button>
            <Button
              onClick={handleConfirm}
              className="min-w-[100px] bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Yes, I&apos;m sure
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}