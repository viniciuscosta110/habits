import { Dimensions, TouchableOpacity, TouchableOpacityProps } from "react-native"
import clsx from "clsx"

import { generateProgressPercentage } from "../utils/generate-progress-percentage"
import dayjs from "dayjs"

const WEEK_DAYS = 7
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5

export const DAY_MARGIN_BETWEEN = 8
export const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5)

interface HabitDayProps extends TouchableOpacityProps {
  amountOfHabits?: number
  amountDone?: number
  date: Date
}

export function HabitDay({ amountDone = 0, amountOfHabits = 0, date, ...rest}: HabitDayProps) {
  const progressPercentage = amountDone > 0 ? generateProgressPercentage(amountDone, amountOfHabits) : 0
  const today = dayjs().startOf('day').toDate()
  const isCurrentDay = dayjs(date).isSame(today, 'day')

  return (
    <TouchableOpacity
      className={clsx("m-1 border-2 rounded-lg", {
          ["bg-zinc-900 border-zinc-800"] : progressPercentage === 0,
          ["bg-violet-900 border-violet-700"] : progressPercentage > 0 && progressPercentage < 20,
          ["bg-violet-800 border-violet-600"] : progressPercentage >= 20 && progressPercentage < 40,
          ["bg-violet-700 border-violet-500"] : progressPercentage >= 40 && progressPercentage < 60,
          ["bg-violet-600 border-violet-500"] : progressPercentage >= 60 && progressPercentage < 80,
          ["bg-violet-500 border-violet-400"] : progressPercentage >= 80,
          ["border-white border-4"] : isCurrentDay,
        } 
      )}
      style={{
        width: DAY_SIZE,
        height: DAY_SIZE,
      }}
      activeOpacity={0.7}
      {...rest}
    />
  )
}