import { View } from "react-native"

interface ProgressBarProps{
  progress?: number;
}

export function ProgressBar({ progress = 0 }: ProgressBarProps = {}) {
  return (
    <View className="w-full h-3 bg-zinc-700 rounded-xl mt-4">
      <View className="h-3 bg-violet-600 rounded-xl"
        style={{
          width: `${progress}%`
        }}  
      />
    </View>
  )
}