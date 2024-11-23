"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useExerciseStore } from "@/store/exercise-store"
import { toast, useToast } from "@/hooks/use-toast"

interface DeleteExerciseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  exerciseName: string
  onSuccess?: () => void
}

export function DeleteExerciseDialog({ 
  open, 
  onOpenChange, 
  exerciseName,
  onSuccess 
}: DeleteExerciseDialogProps) {
  const { toast } = useToast()
  const [confirmText, setConfirmText] = useState("")
  const { deleteExercise } = useExerciseStore()

  const handleDelete = () => {
    if (confirmText === "delete") {
      deleteExercise(exerciseName)
      toast({
        title: "Exercise deleted",
        description: `"${exerciseName}" has been deleted`
      })
      onOpenChange(false)
      if (onSuccess) {
        onSuccess()
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Exercise</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground">
            This action cannot be undone. Type <span className="font-bold">delete</span> to confirm.
          </p>
          <Input
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder='Type "delete" to confirm'
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDelete}
              disabled={confirmText !== "delete"}
            >
              Delete Exercise
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}