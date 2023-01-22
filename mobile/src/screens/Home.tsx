import { View, Text, ScrollView, Alert } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";
import { api } from "../lib/axios";

import { generateDaysFromYearBeginning } from "../utils/generate-days-from-year-beginning";
import { useCallback, useState } from "react";
import { Loading } from "../components/Loading";
import dayjs from "dayjs";

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const calendarDays = generateDaysFromYearBeginning()

const minimumSummaryDatesSize = 18 * 7 // 18 weeks to populate squares
const amountOfDaysToFill = minimumSummaryDatesSize - calendarDays.length

type SummaryDataProps = Array<{
  id: string
  date: string
  amount: number
  done: number
}>

export function Home() {
  const [loading, setLoading] = useState(true)
  const [summaryData, setSummaryData] = useState<SummaryDataProps | null>(null)

  const { navigate } = useNavigation()

  async function fetchData() {
    setLoading(true)

    await api.get('/summary').then((response) => {
      setSummaryData(response.data)
    }).catch((err) => {
      Alert.alert('Ops', 'Erro ao carregar o sumário de hábitos')
      console.log(err)
    }).finally(() => {
      setLoading(false)
    })
  }

  useFocusEffect( useCallback(() => {
    fetchData()
  }, []))

  if(loading) {
    return <Loading />
  }

  return (
    <View className="flex-1 bg-background p-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {
          weekDays.map((day, index) => {
            return (
              <Text 
                key={index}
                className="text-zinc-400 text-xl font-bold text-center m-1"
                style={{ width: DAY_SIZE }}
              >
                {day}
              </Text>
            )
          })
        }
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {summaryData ? (
          <View className="flex-row flex-wrap">
            {calendarDays.map((day, index) => {
              const dayWithHabits = summaryData.find(summaryDay => dayjs(day).isSame(summaryDay.date, 'day'))

              return (
                <HabitDay
                  key={day.toISOString()}
                  date={day}
                  amountDone={dayWithHabits?.done}
                  amountOfHabits={dayWithHabits?.amount}
                  onPress={() => navigate('habit', { date: day.toISOString() })}
                />
              )
            })}
            {amountOfDaysToFill > 0 && Array(amountOfDaysToFill).fill(0).map((_, index) => {
              return (
                <View 
                  key={index}
                  className="bg-zinc-900 m-1 border-2 border-zinc-700 rounded-lg opacity-40"
                  style={{
                    width: DAY_SIZE,
                    height: DAY_SIZE,
                  }}
                />
              )
            })}
          </View>
        ) : null}
      </ScrollView>
    </View>
  )
}