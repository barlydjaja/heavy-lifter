"use client"

import { useState } from "react"
import { useExerciseStore } from "@/store/exercise-store"
import { ExerciseCard } from "@/components/ranks/exercise-card"
import { AddExerciseDialog } from "@/components/shared/add-exercise-dialog"
import { motion } from "framer-motion"
import { Plus } from "lucide-react"

export default function RanksPage() {
  const { exercises, userSettings } = useExerciseStore()
  const [dialogOpen, setDialogOpen] = useState(false)

  if (exercises.length === 0) {
    return (
      <div className="flex-1 relative h-[calc(100vh-5rem)] p-4 flex flex-col items-center justify-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mb-4 cursor-pointer" onClick={() => setDialogOpen(true)}>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Plus className="h-6 w-6 text-primary" />
            </div>
          </div>
          <h2 className="text-lg font-semibold mb-2">No exercise yet</h2>
          <p className="text-sm text-muted-foreground">
            Click on &quot;+&quot; icon to add your exercise
          </p>
        </motion.div>

        <AddExerciseDialog 
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      </div>
    )
  }

  return (
    <div className="flex-1 relative">
      <div className="p-4 space-y-4 mb-20">
        {exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.name}
            exercise={exercise}
            metrics={userSettings.metrics}
          />
        ))}
      </div>

      <AddExerciseDialog />
    </div>
  )
}