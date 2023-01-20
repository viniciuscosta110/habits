import { useState } from "react";
import { ScrollView, View,Text, TextInput, TouchableOpacity, Alert } from "react-native";

import { Feather } from '@expo/vector-icons'
import { BackButton } from "../components/BackButton";
import { CheckBox } from "../components/CheckBox";
import colors from "tailwindcss/colors";
import { api } from "../lib/axios";

const availableWeekDays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]

export function NewHabitForm() {
  const [title, setTitle] = useState<string>("")
  const [weekDays, setWeekDays] = useState<number[]>([])

  function handleToggleWeekDay(weekDayIndex: number) {
    if(weekDays.includes(weekDayIndex)) {
      setWeekDays(prevState => prevState.filter(day => day !== weekDayIndex))
    } else {
      setWeekDays(prevState => [...prevState, weekDayIndex])
    }
  }

  function handleCreateHabit() {
    if(!title.trim() || weekDays.length === 0) {
      Alert.alert("Ops", "Você precisa informar um nome para o hábito e selecionar ao menos um dia da semana")
    }
    
    api.post('/habits', {
      title,
      weekDays
    }).then(() => {
      Alert.alert("Novo hábito", "Hábito criado com sucesso")
    }).catch((err) => {
      Alert.alert("Ops", "Não foi possível criar um novo hábito hábito")
      console.log(err)
    }).finally(() => {
      setTitle("")
      setWeekDays([])
    })
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
          onChangeText={setTitle}
          value={title}
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
          onPress={handleCreateHabit}
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