"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import { useExerciseStore } from "@/store/exercise-store"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { Trash2 } from "lucide-react"

interface DeleteExerciseRecordDialogProps {
  exerciseName: string
  deleteRecordIndex: number
}

export function DeleteExerciseRecordDialog({  
  exerciseName,
  deleteRecordIndex,
}: DeleteExerciseRecordDialogProps) {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const { deleteExerciseRecord } = useExerciseStore()

  const handleDelete = () => {
    deleteExerciseRecord(exerciseName, deleteRecordIndex)
    toast({
      title: "Exercise record deleted",
      description: `Record has been deleted`
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.5 }}
          whileTap={{ scale: 1.5 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Trash2 className="h-4 w-4 text-red-500 cursor-pointer" />
        </motion.div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Exercise</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground">
            This action cannot be undone. Are you sure?
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDelete}
            >
              Delete Record
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}