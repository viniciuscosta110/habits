import { HabitDay } from "./HabitDay"
import { generateDaysFromYearBeginning } from "../utils/generate-days-from-year-beginning"
import { useEffect, useState } from "react"
import { api } from "../lib/axios"
import dayjs from "dayjs"

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const summaryDays = generateDaysFromYearBeginning()

const minimumSummaryDatesSize = 18 * 7 // 18 weeks to populate squares
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDays.length

type Summary = Array<{
  id: string
  date: string
  amount: number
  done: number
}>

export function SummaryTable() {
  const [summaryData, setSummaryData] = useState<Summary>([])

  useEffect(() => {
    api.get('/summary').then(response => {
      setSummaryData(response.data)
    })
  }, [])

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {
          weekDays.map((weekDay, index) => (
            <div key={index} className="text-zinc-400 text-xl font-bold h-10 w-10 flex justify-center items-center">
              {weekDay}
            </div>
          ))
        }
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {
          summaryDays.map((day, index) => {
            const dayInSummary = summaryData.find((summaryDay) => {
              return dayjs(day).isSame(summaryDay.date, 'day')
            })

            return (
              <HabitDay
                key={day.toString()}
                amount={dayInSummary?.amount}
                done={dayInSummary?.done}
                date={day}
              />
            )
          })
        }

        {
          amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, index) => {
            return (
              <div key={index} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"></div>
            )
          })
        }
      </div>
    </div>
  )
}