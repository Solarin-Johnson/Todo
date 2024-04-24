import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'

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
