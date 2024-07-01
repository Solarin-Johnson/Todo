import { useContext, useEffect, useState } from 'react'
import { FontAwesome6 } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'
import { Truncate, greetings } from '../utils'
import { useNavigation } from '@react-navigation/native'
import TouchableMadeEasier from '../components/touchables'
import { NameContext } from '../context/NameContext'

export default Header = () => {
  const navigation = useNavigation()
  const [mode, setMode] = useState()
  const { name, color } = useContext(NameContext)

  useEffect(() => {
    // loadData()
  }, [])
  return (
    <View style={styles.head}>
      <Text style={[styles.greetings, { color: color?.primaryColor }]}>
        {greetings()}, {name && <Truncate text={name} />}
      </Text>
      <TouchableMadeEasier
        round={10}
        width={40}
        color={color}
        onPress={() => navigation.navigate('settings')}
      >
        <FontAwesome6 name='bars' size={24} color={color?.textColor} />
      </TouchableMadeEasier>
    </View>
  )
}

const styles = StyleSheet.create({
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingLeft: 20,
  },
  greetings: {
    fontSize: 20,
    fontFamily: 'Raleway_600SemiBold',
  },
})
