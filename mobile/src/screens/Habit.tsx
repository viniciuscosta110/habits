import { ScrollView, View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

import { BackButton } from "../components/BackButton";
import { ProgressBar } from "../components/ProgressBar";
import { CheckBox } from "../components/CheckBox";

interface HabitProps {
  date: string;
}

export function Habit() {
  const route = useRoute()
  const { date } = route.params as HabitProps

  const parsedDate = dayjs(date)
  const weekDay = parsedDate.format('dddd')
  const monthDay = parsedDate.format('DD/MM')

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

        <ProgressBar progress={25} />

        <View className="mt-6">
          <CheckBox
            title="Exercícios"
            checked={false}
          />

          <CheckBox
            title="Aqua"
            checked={true}
          />
        </View>
      </ScrollView>
    </View>
  )
}