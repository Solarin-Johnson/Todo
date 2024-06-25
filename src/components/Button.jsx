import { useNavigation } from '@react-navigation/native'
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
export default Button = ({
  color,
  text,
  styleBtn,
  styleText,
  path,
  action,
}) => {
  const navigationRef = useNavigation()
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple('#ffffff00', false)}
      onPress={() => {
        action !== undefined && action()
        navigationRef.navigate(path)
      }}
    >
      <View style={[styleBtn, { backgroundColor: color?.accentColor }]}>
        <Text style={[styleText, { color: color?.bgColor }]}>{text}</Text>
      </View>
    </TouchableNativeFeedback>
  )
}

export const RadioBtn = ({ state, onPress, size, color }) => {
  return (
    <Pressable onPress={onPress}>
      {state ? (
        <Ionicons name='radio-button-on' size={size} color={color} />
      ) : (
        <Ionicons name='radio-button-off' size={size} color={color} />
      )}
    </Pressable>
  )
}
