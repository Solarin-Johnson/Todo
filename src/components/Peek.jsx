import { StyleSheet, Text, View } from 'react-native'
import TouchableMadeEasier from './touchables'
import { FontAwesome5 } from '@expo/vector-icons'

export default function PeekCard({ base, data, color }) {
  return (
    <View style={styles.container}>
      <View style={styles.head}></View>
      <TouchableMadeEasier round={10} width={30} color={color}>
        <FontAwesome5 name='align-left' size={18} color={color?.accentColor} />
      </TouchableMadeEasier>
      <Text>Swipe down to close</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  head: {
    width: '100%',
    height: 20,
    // backgroundColor: 'red',
  },
})
