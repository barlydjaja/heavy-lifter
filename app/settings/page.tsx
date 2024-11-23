"use client"

import { useState, useEffect } from "react"
import { useExerciseStore } from "@/store/exercise-store"
import { BMIMeter } from "@/components/settings/bmi-meter"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { ArrowLeft, Save } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { userSettings, updateUserSettings } = useExerciseStore()
  
  // Local state for form values
  const [height, setHeight] = useState(userSettings.height?.toString() || "")
  const [weight, setWeight] = useState(userSettings.weight?.toString() || "")
  const [metrics, setMetrics] = useState(userSettings.metrics)
  
  // Track if form has unsaved changes
  const [isDirty, setIsDirty] = useState(false)

  const calculateBMI = () => {
    if (!height || !weight) return null
    
    const heightInMeters = metrics === 'kg' 
      ? parseFloat(height) / 100  // cm to m
      : (parseFloat(height) * 2.54) / 100  // inches to m
      
    const weightInKg = metrics === 'kg'
      ? parseFloat(weight)
      : parseFloat(weight) * 0.453592  // lbs to kg

    if (isNaN(heightInMeters) || isNaN(weightInKg)) return null
    if (heightInMeters <= 0 || weightInKg <= 0) return null
    
    return weightInKg / (heightInMeters * heightInMeters)
  }

  const handleMetricsChange = (newMetrics: 'kg' | 'lbs') => {
    if (newMetrics === metrics) return

    // Convert existing values
    if (height) {
      setHeight(newMetrics === 'kg' 
        ? (parseFloat(height) * 2.54).toFixed(1)  // inches to cm
        : (parseFloat(height) / 2.54).toFixed(1)  // cm to inches
      )
    }
    
    if (weight) {
      setWeight(newMetrics === 'kg'
        ? (parseFloat(weight) * 0.453592).toFixed(1)  // lbs to kg
        : (parseFloat(weight) / 0.453592).toFixed(1)  // kg to lbs
      )
    }

    setMetrics(newMetrics)
    setIsDirty(true)
  }

  const handleInputChange = (
    value: string, 
    setter: (value: string) => void
  ) => {
    setter(value)
    setIsDirty(true)
  }

  const handleSave = () => {
    const heightNum = height ? parseFloat(height) : undefined
    const weightNum = weight ? parseFloat(weight) : undefined
    
    updateUserSettings({
      height: heightNum,
      weight: weightNum,
      metrics
    })

    setIsDirty(false)
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully."
    })
  }

  // Load saved settings on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('heavy-lifter-storage')
    if (savedSettings) {
      const { state } = JSON.parse(savedSettings)
      if (state.userSettings) {
        setHeight(state.userSettings.height?.toString() || "")
        setWeight(state.userSettings.weight?.toString() || "")
        setMetrics(state.userSettings.metrics)
      }
    }
  }, [])

  const bmi = calculateBMI()

  return (
    <div className="flex-1 p-4 space-y-6 mb-20">
      <Button variant="ghost" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <BMIMeter bmi={bmi} />

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Preferences</h2>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Units</label>
            <Select 
              value={metrics} 
              onValueChange={(value: 'kg' | 'lbs') => handleMetricsChange(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kg">Metric (kg/cm)</SelectItem>
                <SelectItem value="lbs">Imperial (lbs/in)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Height {metrics === 'kg' ? '(cm)' : '(in)'}</label>
            <Input
              type="number"
              value={height}
              onChange={(e) => handleInputChange(e.target.value, setHeight)}
              placeholder={`Enter height in ${metrics === 'kg' ? 'centimeters' : 'inches'}`}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Weight {metrics === 'kg' ? '(kg)' : '(lbs)'}</label>
            <Input
              type="number"
              value={weight}
              onChange={(e) => handleInputChange(e.target.value, setWeight)}
              placeholder={`Enter weight in ${metrics === 'kg' ? 'kilograms' : 'pounds'}`}
            />
          </div>

          <Button 
            onClick={handleSave}
            disabled={!isDirty}
            className="w-full gap-2"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </motion.div>
    </div>
  )
}