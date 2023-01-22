import { useEffect, useState } from "react";

import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { api } from "../lib/axios";
import dayjs from "dayjs";

interface HabitListProps {
  date: Date
  onDoneHabitsChange: (done: number) => void
}

type HabitT = {
  todayHabits: {
    id: string
    title: string
    created_at: string
  }[]
  doneHabits: string[]
}

export function HabitList({ date, onDoneHabitsChange }: HabitListProps) {
  const [habitListData, setHabitListData] = useState<HabitT>()
  const isDataInPost = dayjs(date)
    .endOf('day')
    .isBefore(new Date())

  
  async function handleToggleHabit(habitId: string) {
    await api.patch(`/habits/${habitId}/toggle`)

    const isHabitDone = habitListData!.doneHabits.includes(habitId)
    let completedHabits: string[] = []
    if(isHabitDone) {
      completedHabits = habitListData!.doneHabits.filter(id => id !== habitId)
    } else {
      completedHabits = [...habitListData!.doneHabits, habitId]
    }

    setHabitListData(prevState => {
      return {
        todayHabits: prevState!.todayHabits,
        doneHabits: completedHabits
      }
    })

    onDoneHabitsChange(completedHabits.length)
  }

  useEffect(() => {
    api.get('/day', {
      params: {
        date: date.toISOString(),
      }
    }).then((res) => {
      setHabitListData(res.data)
    })
  }, [])

  return (
    <>
      <div className="mt-3 flex flex-col gap-3">
        {habitListData?.todayHabits.map((habit) => {
          return (
            <Checkbox.Root
              key={habit.id}
              onCheckedChange={() => handleToggleHabit(habit.id)}
              checked={habitListData?.doneHabits.includes(habit.id)}
              disabled={isDataInPost}
              className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
            >
              <div className="w-8 h-8 rounded-lg flex justify-center items-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>
              
              <span 
                className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400"
              > 
                {habit.title}
              </span>
            </Checkbox.Root>
          )
        })}
      </div>
    </>
  )
}