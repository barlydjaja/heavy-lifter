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

interface ExerciseTableProps {
  data: { date: string; weight: number }[]
  metrics: string
}

export function ExerciseTable({ data, metrics }: ExerciseTableProps) {
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((record, index) => (
            <TableRow key={index}>
              <TableCell>{format(new Date(record.date), 'PPP')}</TableCell>
              <TableCell className="text-right">{record.weight} {metrics}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}