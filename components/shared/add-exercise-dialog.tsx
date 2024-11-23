"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { useExerciseStore } from "@/store/exercise-store"
import { Plus, CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

interface AddExerciseDialogProps {
  defaultExercise?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function AddExerciseDialog({ defaultExercise, open: controlledOpen, onOpenChange: setControlledOpen }: AddExerciseDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const [date, setDate] = useState<Date>(new Date())
  const [weight, setWeight] = useState("")
  const [exerciseName, setExerciseName] = useState(defaultExercise || "")
  const [searchValue, setSearchValue] = useState(defaultExercise || "")
  const [commandOpen, setCommandOpen] = useState(false)
  const [calendarOpen, setCalendarOpen] = useState(false)

  const { exercises, addExerciseRecord, userSettings } = useExerciseStore()

  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const setOpen = setControlledOpen || setInternalOpen
  
  const existingExercises = exercises.map(e => e.name)
  
  const filteredExercises = existingExercises.filter((exercise) =>
    exercise.toLowerCase().includes(searchValue.toLowerCase())
  )

  const handleSubmit = () => {
    if (!exerciseName || !weight || !date) return
    
    addExerciseRecord(
      exerciseName,
      parseFloat(weight),
      date.toISOString()
    )
    
    setOpen(false)
    setExerciseName(defaultExercise || "")
    setWeight("")
    setDate(new Date())
    setSearchValue(defaultExercise || "")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {defaultExercise ? (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Record
          </Button>
        ) : (
          <Button
            className="fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-lg"
            size="icon"
          >
            <Plus className="h-6 w-6" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Exercise Record</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {/* Exercise Name Selection */}
          <div className="space-y-2">
            <Popover open={commandOpen} onOpenChange={setCommandOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-full justify-between"
                  disabled={!!defaultExercise}
                >
                  {exerciseName || "Select exercise..."}
                  {!defaultExercise && (
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  )}
                </Button>
              </PopoverTrigger>
              {!defaultExercise && (
                <PopoverContent className="p-0 max-h-[300px] overflow-y-auto" align="start">
                  <Command>
                    <CommandInput 
                      placeholder="Search or add new exercise..." 
                      value={searchValue}
                      onValueChange={setSearchValue}
                    />
                    <CommandGroup>
                      {filteredExercises.map((exercise) => (
                        <CommandItem
                          key={exercise}
                          value={exercise}
                          onSelect={(value) => {
                            setExerciseName(value)
                            setSearchValue(value)
                            setCommandOpen(false)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              exerciseName === exercise ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {exercise}
                        </CommandItem>
                      ))}
                      {!filteredExercises.some(
                        exercise => exercise.toLowerCase() === searchValue.toLowerCase()
                      ) && searchValue && (
                        <CommandItem
                          value={searchValue}
                          onSelect={(value) => {
                            setExerciseName(value || searchValue)
                            setCommandOpen(false)
                          }}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          {searchValue}
                        </CommandItem>
                      )}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              )}
            </Popover>
          </div>

          {/* Weight Input */}
          <div className="space-y-2">
            <Input
              type="number"
              placeholder={`Weight (${userSettings.metrics})`}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          {/* Date Picker */}
          <div className="space-y-2">
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(date, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => {
                    if (newDate) {
                      setDate(newDate)
                      setCalendarOpen(false)
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Submit Button */}
          <Button 
            className="w-full" 
            onClick={handleSubmit}
            disabled={!exerciseName || !weight || !date}
          >
            Save Record
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}