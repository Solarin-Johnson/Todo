import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { View } from 'react-native'

export default Header = () => {
  const [mode, setMode] = useState()
  useEffect(() => {
    // loadData()
  }, [])
  return (
    <View>
      <StatusBar style='auto' />
    </View>
  )
}
