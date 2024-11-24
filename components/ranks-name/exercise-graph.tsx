"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card } from "@/components/ui/card"
import { format } from "date-fns"

interface ExerciseGraphProps {
  data: { date: string; weight: number }[]
  metrics: string
}

export function ExerciseGraph({ data, metrics }: ExerciseGraphProps) {
  const chartData = data.map(record => ({
    date: format(new Date(record.date), 'MMM d'),
    weight: record.weight
  }))

  return (
    <Card className="p-4">
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis unit={` ${metrics}`} />
            <Tooltip 
              formatter={(value: number) => [`${value} ${metrics}`, 'Weight']}
            />
            <Line 
              type="monotone" 
              dataKey="weight" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={{ fill: "hsl(var(--primary))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}