import { View, Text, StyleSheet, BackHandler } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useBackHandler } from '@react-native-community/hooks'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { AntDesign, Octicons } from '@expo/vector-icons'
import { TouchableOpacity } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NameContext } from '../context/NameContext'
import { RadioBtn } from '../components/Button'

export default function SettingsScreen({ navigation }) {
  const { name, color, mode, setMode } = useContext(NameContext)
  useEffect(() => {
    navigation.setOptions({
      headerTintColor: color?.textColor,
      headerStyle: {
        backgroundColor: color.fgColor,
        elevation: 1,
      },
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    })
  }, [color, navigation])

  const themes = [
    {
      name: 'Automatic',
      mode: 'automatic',
      onPress: () => setMode('automatic'),
    },
    { name: 'Light', mode: 'light', onPress: () => setMode('light') },
    { name: 'Dark', mode: 'dark', onPress: () => setMode('dark') },
  ]
  if (color !== undefined && name) {
    return (
      <GestureHandlerRootView>
        <SafeAreaView
          style={[{ backgroundColor: color?.fgColor }, styles.container]}
        >
          <SettingsCard
            color={color}
            onPress={() => navigation.navigate('newUser')}
          >
            <Text style={[styles.text, { color: color?.primaryColor }]}>
              {name}
            </Text>
            <AntDesign name='edit' size={20} color={color?.textColor + 'cd'} />
          </SettingsCard>

          <Text style={[styles.head, { color: color?.primaryColor }]}>
            Theme
          </Text>
          <View style={{ gap: 15 }}>
            {themes.map((theme, index) => (
              <SettingsCard color={color} key={index} onPress={theme.onPress}>
                <Text style={[styles.text, { color: color?.primaryColor }]}>
                  {theme.name}
                </Text>
                <RadioBtn
                  size={20}
                  state={mode === theme.mode}
                  color={color?.textColor + 'cd'}
                />
              </SettingsCard>
            ))}
          </View>
          <Text style={[styles.head, { color: color?.primaryColor }]}>
            Delete all tasks
          </Text>
          <SettingsCard
            color={color}
            onPress={() => navigation.navigate('newUser')}
          >
            <Text style={[styles.text, { color: color?.primaryColor }]}>
              Delete
            </Text>
            <Octicons name='trash' size={20} color={color?.textColor + 'AB'} />
          </SettingsCard>
        </SafeAreaView>
      </GestureHandlerRootView>
    )
  }
}

const SettingsCard = ({ onPress, children, color }) => {
  return (
    <View
      style={{
        backgroundColor: color?.fgColor,
        borderColor: '#97979735',
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
    paddingTop: 8,
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
    paddingBottom: 15,
    fontSize: 15,
    opacity: 0.7,
    paddingLeft: 1,
    fontFamily: 'Raleway_600SemiBold',
  },
  card: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Nunito_600SemiBold',
  },
})
