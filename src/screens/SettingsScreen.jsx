import { View, Text, StyleSheet, BackHandler } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useBackHandler } from '@react-native-community/hooks'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

export default function SettingsScreen({ route }) {
  const navigation = useNavigation()
  const { color } = route.params

  return (
    <SafeAreaView
      style={[{ backgroundColor: color?.fgColor }, styles.container]}
    >
      <View>
        <Text>Settings Screen</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    },
    head: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      paddingLeft: 20,
    },
})
