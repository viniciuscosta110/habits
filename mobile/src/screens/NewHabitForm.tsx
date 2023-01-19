import { useState } from "react";
import { ScrollView, View,Text, TextInput, TouchableOpacity } from "react-native";

import { Feather } from '@expo/vector-icons'
import { BackButton } from "../components/BackButton";
import { CheckBox } from "../components/CheckBox";
import colors from "tailwindcss/colors";

const availableWeekDays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]

export function NewHabitForm() {
  const [weekDays, setWeekDays] = useState<number[]>([])

  function handleToggleWeekDay(weekDayIndex: number) {
    if(weekDays.includes(weekDayIndex)) {
      setWeekDays(prevState => prevState.filter(day => day !== weekDayIndex))
    } else {
      setWeekDays(prevState => [...prevState, weekDayIndex])
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />
        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar hábito
        </Text>

        <Text className="mt-6 text-white font-extrabold text-base">
          Qual o seu compromentimento?
        </Text>

        <TextInput 
          className="h-12 pl-4 mt-3 text-white bg-zinc-900 rounded-lg border-2 border-zinc-800 focus:border-green-600 "
          placeholderTextColor={colors.zinc[400]}
          placeholder="Ex.: exrcícios, dormir bem etc..."
        />

        <Text className="text-base text-white font-semibold mt-4 mb-3">
          Qual a recorrência?
        </Text>

        {availableWeekDays.map((weekDay, index) => (
          <CheckBox 
            key={weekDay} 
            title={weekDay}
            checked={weekDays.includes(index)}
            onPress={() => handleToggleWeekDay(index)}
          />
        ))}

        <TouchableOpacity
          className="w-full h-14 flex-row justify-center items-center mt-6 bg-green-600 rounded-lg"
          activeOpacity={0.7}
        >
          <Feather
            name="check"
            size={20}
            color={colors.white}
          />

          <Text className="text-base text-white font-semibold ml-2">
            Confirmar
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  )
}