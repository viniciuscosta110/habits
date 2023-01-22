import { useNavigation } from '@react-navigation/native'
import { Text } from 'react-native'

export function EmptyDay() {
  const { navigate } = useNavigation()
  return (
    <Text className="text-zinc-400 text-base">
      Você não tem hábitos para hoje{' '}

      <Text 
        className="text-violet-400 text-base underline active:text-violet-500"
        onPress={() => navigate('newHabitForm')}
      >
        comece cadastrando um novo.
      </Text>
    </Text>
  )
}