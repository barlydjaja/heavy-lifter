"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Exercise } from "@/store/exercise-store"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { RenameExerciseDialog } from "@/components/shared/rename-exercise-dialog"
import { DeleteExerciseDialog } from "@/components/shared/delete-exercise-dialog"

interface ExerciseCardProps {
  exercise: Exercise
  metrics: string
}

export function ExerciseCard({ exercise, metrics }: ExerciseCardProps) {
  const router = useRouter()
  const [showRenameDialog, setShowRenameDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  
  const personalBest = exercise.records.reduce((max, record) => 
    record.weight > max.weight ? record : max
  , exercise.records[0])

  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const handleRename = (e: Event) => {
    e.stopPropagation()
    setShowRenameDialog(true)
  }

  const handleDelete = (e: Event) => {
    e.stopPropagation()
    setShowDeleteDialog(true)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileTap={{ scale: 0.98 }}
      >
        <Card 
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => router.push(`/ranks/${encodeURIComponent(exercise.name)}`)}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">{exercise.name}</CardTitle>
            <div onClick={handleDropdownClick}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={handleRename}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onSelect={handleDelete}
                    className="text-red-600"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold text-primary">
                {personalBest.weight} {metrics}
              </div>
              <div className="text-sm text-muted-foreground">
                {new Date(personalBest.date).toLocaleDateString()}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <RenameExerciseDialog
        open={showRenameDialog}
        onOpenChange={setShowRenameDialog}
        exerciseName={exercise.name}
      />

      <DeleteExerciseDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        exerciseName={exercise.name}
      />
    </>
  )
}