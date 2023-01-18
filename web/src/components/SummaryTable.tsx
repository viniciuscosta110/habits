import { HabitDay } from "./HabitDay"
import { generateDaysFromYearBeginning } from "../utils/generate-days-from-year-beginning"

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const summaryDays = generateDaysFromYearBeginning()

const minimumSummaryDatesSize = 18 * 7 // 18 weeks to populate squares
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDays.length

export function SummaryTable() {
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
            return (
              <HabitDay
                key={day.toString()}
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