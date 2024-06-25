import { View, Text, StyleSheet, BackHandler } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useBackHandler } from '@react-native-community/hooks'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import { TouchableOpacity } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NameContext } from '../context/NameContext'

export default function SettingsScreen({ route }) {
  const navigation = useNavigation()
  const { color } = route.params
  const { name } = useContext(NameContext)

  return (
    <GestureHandlerRootView>
      <SafeAreaView
        style={[{ backgroundColor: color?.fgColor }, styles.container]}
      >
        <SettingsCard
          color={color}
          onPress={() => navigation.navigate('newUser')}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Nunito_600SemiBold',
              color: color?.primaryColor,
            }}
          >
            {name}
          </Text>
          <AntDesign name='edit' size={20} color={color?.textColor + 'cd'} />
        </SettingsCard>
        <Text style={[styles.head, { color: color?.textColor }]}>Theme</Text>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

const SettingsCard = ({ onPress, children, color }) => {
  return (
    <View
      style={{
        backgroundColor: color?.fgColor,
        borderColor: '#D3D3D340',
        borderWidth: 1,
        borderRadius: 10,
      }}
    >
      <TouchableOpacity style={styles.card} onPress={onPress}>
        {children}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  //   head: {
  //     paddingTop: 50,
  //     paddingBottom: 20,
  //     elevation: 2,
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     justifyContent: 'space-between',
  //     paddingHorizontal: 10,
  //     paddingLeft: 20,
  //   },
  head: {
    paddingTop: 40,
    fontSize: 16.5,
    opacity: 0.5,
    fontFamily: 'Nunito_600SemiBold',
  },
  card: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
