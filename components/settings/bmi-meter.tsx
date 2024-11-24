"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

interface BMIMeterProps {
  bmi: number | null
}

export function BMIMeter({ bmi }: BMIMeterProps) {
  if (bmi === null) {
    return (
      <Card className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">BMI Calculator</h2>
        <p className="text-muted-foreground">
          Please enter your height and weight to calculate BMI
        </p>
      </Card>
    )
  }

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: "Underweight", color: "text-red-500" }
    if (bmi < 24.9) return { category: "Normal", color: "text-green-500" }
    if (bmi < 29.9) return { category: "Overweight", color: "text-yellow-500" }
    return { category: "Obese", color: "text-red-500" }
  }

  const { category, color } = getBMICategory(bmi)

  const getIndicatorPosition = (bmi: number) => {
    const ranges = [
      { min: 0, max: 18.5, rangeStart: 0, rangeEnd: 30 },    // Underweight
      { min: 18.5, max: 24.9, rangeStart: 30, rangeEnd: 70 }, // Normal
      { min: 24.9, max: 40, rangeStart: 70, rangeEnd: 100 }   // Overweight to Obese
    ]

    // Find the correct range for the BMI
    const range = ranges.find(r => bmi <= r.max) || ranges[ranges.length - 1]

    // Calculate percentage within the range
    const percentage = ((bmi - range.min) / (range.max - range.min)) * 
      (range.rangeEnd - range.rangeStart) + range.rangeStart

    // Clamp the value between 0 and 100
    return Math.min(Math.max(percentage, 0), 100)
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Your BMI</h2>
      
      <div className="text-center mb-6">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`text-4xl font-bold ${color} mb-2`}
        >
          {bmi.toFixed(1)}
        </motion.div>
        <div className={`text-lg ${color}`}>{category}</div>
      </div>

      {/* BMI Scale */}
      <div className="relative h-8 mb-2">
        {/* Scale Background */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="h-full flex">
            <div className="h-full w-[30%] bg-gradient-to-r from-red-500 to-yellow-500" /> {/* Underweight */}
            <div className="h-full w-[40%] bg-gradient-to-r from-yellow-500 via-green-500 to-yellow-500" /> {/* Normal */}
            <div className="h-full w-[30%] bg-gradient-to-r from-yellow-500 to-red-500" /> {/* Overweight to Obese */}
          </div>
        </div>
        
        {/* Indicator */}
        <motion.div
          initial={{ x: "50%" }}
          animate={{ left: `${getIndicatorPosition(bmi)}%` }}
          transition={{ type: "spring", stiffness: 100 }}
          className="absolute top-0 -ml-1 h-full"
        >
          <div className="w-2 h-8 bg-white rounded-full shadow-lg" />
        </motion.div>
      </div>

      {/* Scale Labels */}
      <div className="relative justify-between text-sm text-muted-foreground px-1 py-4">
        <div className="absolute top-0 left-0 text-center">
          <div>16</div>
          <div>Underweight</div>
        </div>
        <div className="absolute top-0 left-[50%] translate-x-[-50%] text-center">
          <div>25.5</div>
          <div>Normal</div>
        </div>
        <div className="absolute top-0 right-0 text-center">
          <div>35</div>
          <div>Obese</div>
        </div>
      </div>
    </Card>
  )
}