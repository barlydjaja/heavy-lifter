"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useExerciseStore } from "@/store/exercise-store"
import { ExerciseGraph } from "@/components/shared/exercise-graph"
import { ExerciseTable } from "@/components/shared/exercise-table"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Pencil } from "lucide-react"
import { motion } from "framer-motion"
import { AddExerciseDialog } from "@/components/shared/add-exercise-dialog"
import { RenameExerciseDialog } from "@/components/shared/rename-exercise-dialog"
import { DeleteExerciseDialog } from "@/components/shared/delete-exercise-dialog"

export default function ExerciseDetail({ params }: { params: { name: string } }) {
  const router = useRouter()
  const { exercises, userSettings } = useExerciseStore()
  const exerciseName = decodeURIComponent(params.name)
  const [showRenameDialog, setShowRenameDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  
  const exercise = exercises.find(e => e.name === exerciseName)

  const handleDeleteSuccess = () => {
    router.push('/ranks')
  }
  
  if (!exercise) {
    return (
      <div className="p-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="text-center py-8">Exercise not found</div>
      </div>
    )
  }

  const personalBest = exercise.records.reduce((max, record) => 
    record.weight > max.weight ? record : max
  , exercise.records[0])

  const handleDelete = () => {
    router.back()
  }

  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <AddExerciseDialog defaultExercise={exerciseName} />
      </div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg bg-primary/10 p-6 text-center relative"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <h1 className="text-2xl font-bold">{exercise.name}</h1>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8"
            onClick={() => setShowRenameDialog(true)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-4xl font-bold text-primary mb-2">
          {personalBest.weight} {userSettings.metrics}
        </div>
        <div className="text-sm text-muted-foreground">
          Personal Best • {new Date(personalBest.date).toLocaleDateString()}
        </div>
      </motion.div>

      {/* Progress Graph */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-lg font-semibold mb-4">Progress Graph</h2>
        <ExerciseGraph 
          data={exercise.records} 
          metrics={userSettings.metrics} 
        />
      </motion.div>

      {/* History Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-lg font-semibold mb-4">History</h2>
        <ExerciseTable 
          data={exercise.records} 
          metrics={userSettings.metrics} 
        />
      </motion.div>

      {/* Delete Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Button 
          variant="destructive" 
          className="w-full"
          onClick={() => setShowDeleteDialog(true)}
        >
          Delete Exercise
        </Button>
      </motion.div>

      {/* Dialogs */}
      <RenameExerciseDialog
        open={showRenameDialog}
        onOpenChange={setShowRenameDialog}
        exerciseName={exerciseName}
      />

      <DeleteExerciseDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        exerciseName={exerciseName}
        onSuccess={handleDeleteSuccess}
      />
    </div>
  )
}