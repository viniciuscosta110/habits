import { useEffect, useState } from "react";
import { ScrollView, View, Text, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import { api } from "../lib/axios";

import { generateProgressPercentage } from "../utils/generate-progress-percentage";

import { BackButton } from "../components/BackButton";
import { ProgressBar } from "../components/ProgressBar";
import { CheckBox } from "../components/CheckBox";
import { Loading } from "../components/Loading";
import { EmptyDay } from "../components/EmptyDay";
import clsx from "clsx";

interface HabitProps {
  date: string;
}

type TDay= {
  doneHabits: string[];
  todayHabits: {
    id: string;
    title: string;
  }[];
}

export function Habit() {
  const route = useRoute()
  const { date } = route.params as HabitProps

  const [loading, setLoading] = useState<boolean>(true)
  const [dayData, setDayData] = useState<TDay | null>(null)
  const [habitsDone, setHabitsDone] = useState<string[]>([])

  const parsedDate = dayjs(date)
  const isDateInPast = parsedDate.endOf('day').isBefore(new Date())
  const weekDay = parsedDate.format('dddd')
  const monthDay = parsedDate.format('DD/MM')

  const habitsPercentage = dayData?.todayHabits.length ? 
    generateProgressPercentage(dayData.todayHabits.length, habitsDone.length) 
    : 0

  async function fetchHabits() {
    setLoading(true)

    api.get('/day', {
      params: {
        date,
    }}).then((response) => {
      setDayData(response.data)
      setHabitsDone(response.data.doneHabits)
    }).catch((err) => {
      console.log(err)
      Alert.alert("Ops", "Não foi possível carregar as informações dos hábitos")
    }).finally(() => {
      setLoading(false)
    })
  }

  async function handleToggleHabit(habitId: string) {
    await api.patch(`/habits/${habitId}/toggle`).catch((err) => {
      console.log(err)
      Alert.alert("Ops", "Não foi possível atualizar o hábito")
    })

    const habitAlreadyDone = habitsDone.includes(habitId)

    if(habitAlreadyDone) {
      setHabitsDone(prevState => prevState.filter(habit => habit !== habitId))
    } else {
      setHabitsDone(prevState => [...prevState, habitId])
    }
  }
    

  useEffect(() => {
    fetchHabits()
  }, [])

  if(loading) {
    return <Loading />
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <BackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {weekDay}
        </Text>

        <Text className="text-white font-extrabold text-3xl">
          {monthDay}
        </Text>

        <ProgressBar progress={habitsPercentage} />

        <View className={clsx("mt-6", {
          ["opacity-50"]: isDateInPast,
        })}>
          {dayData?.todayHabits && dayData?.todayHabits?.length > 0 ? 
            dayData?.todayHabits.map(habit => (
              <CheckBox
                key={habit.id}
                title={habit.title}
                checked={habitsDone.includes(habit.id)}
                disabled={isDateInPast}
                onPress={() => handleToggleHabit(habit.id)}
              />
            )) 
            : <EmptyDay />
          }

          {
            isDateInPast ? (
              <Text className="text-white text-center mt-10">
                Você não pode editar hábitos de uma data passada.
              </Text>
            ) : null
          
          }
        </View>
      </ScrollView>
    </View>
  )
}