"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useExerciseStore } from "@/store/exercise-store"
import { useToast } from "@/hooks/use-toast"

interface RenameExerciseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  exerciseName: string
}

export function RenameExerciseDialog({ 
  open, 
  onOpenChange, 
  exerciseName 
}: RenameExerciseDialogProps) {
  const { toast } = useToast()
  const [newName, setNewName] = useState(exerciseName)
  const { renameExercise } = useExerciseStore()

  const handleRename = () => {
    if (newName && newName !== exerciseName) {
      renameExercise(exerciseName, newName)
      toast({
        title: "Exercise renamed",
        description: `Successfully renamed to "${newName}"`
      })
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Exercise</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter new name"
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleRename}
              disabled={!newName || newName === exerciseName}
            >
              Rename
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}