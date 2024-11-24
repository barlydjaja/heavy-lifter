"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { format } from "date-fns"
import { DeleteExerciseRecordDialog } from "../shared/delete-exercise-record-dialog"

interface ExerciseTableProps {
  exerciseName: string
  data: { date: string; weight: number }[]
  metrics: string
}

export function ExerciseTable({ exerciseName, data, metrics }: ExerciseTableProps) {
  const sortedData = [...data].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Weight</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((record, index) => (
            <TableRow key={index}>
              <TableCell>{format(new Date(record.date), 'PPP')}</TableCell>
              <TableCell className="text-right">{record.weight} {metrics}</TableCell>
              <TableCell className="flex justify-center align-middle">
                <DeleteExerciseRecordDialog deleteRecordIndex={index} exerciseName={exerciseName} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}