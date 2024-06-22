import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { FontAwesome6 } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'
import { Truncate, greetings } from '../utils'

export default Header = ({ uname, color }) => {
  const [mode, setMode] = useState()
  useEffect(() => {
    // loadData()
  }, [])
  return (
    <View style={styles.head}>
      {uname && (
        <Text style={[styles.greetings, { color: color?.primaryColor }]}>
          {greetings()}, <Truncate text={uname} />
        </Text>
      )}
      <FontAwesome6 name='bars-staggered' size={24} color={color?.textColor} />
    </View>
  )
}

const styles = StyleSheet.create({
  head: {
    paddingTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  greetings: {
    fontSize: 20,
    fontFamily: 'Raleway_600SemiBold',
  },
})
