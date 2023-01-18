import { View, Text, ScrollView } from "react-native";
import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";

import { generateDaysFromYearBeginning } from "../utils/generate-days-from-year-beginning";

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const calendarDays = generateDaysFromYearBeginning()

const minimumSummaryDatesSize = 18 * 7 // 18 weeks to populate squares
const amountOfDaysToFill = minimumSummaryDatesSize - calendarDays.length

export function Home() {
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
        <View className="flex-row flex-wrap">
          {calendarDays.map((day, index) => 
            <HabitDay key={day.toISOString()} />
          )}
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
      </ScrollView>
    </View>
  )
}