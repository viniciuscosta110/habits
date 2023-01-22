import { TouchableOpacity, View,Text, TouchableOpacityProps } from "react-native";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";

import { Feather } from '@expo/vector-icons'
import colors from "tailwindcss/colors";

interface CheckBoxProps extends TouchableOpacityProps {
  checked?: boolean;
  title: string;
}

export function CheckBox({ checked = false, title, ...rest }: CheckBoxProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row mb-2 items-center"
      {...rest}
    >
      {checked ? (
        <Animated.View 
          className="h-8 w-8 bg-green-500 rounded-lg justify-center items-center"
          entering={ZoomIn}
          exiting={ZoomOut}
        >
        <Feather
          name="check"
          size={20}
          color={colors.white}
        />
      </Animated.View>
      ) : (
        <View className="h-8 w-8 bg-zinc-900" />
      )}

      <Text className="ml-3 text-white text-base font-semibold">
        {title}
      </Text>

    </TouchableOpacity>
  )
}