import 'react-native-gesture-handler'
import { useEffect, useState } from 'react'

import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { loadData, removeItemFromStorage } from './utils/store'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import { DarkMode, LightMode } from './styles/colors'
import WelcomeScreen from './screens/WelcomeScreen'
import HomeScreen from './screens/HomeScreen'

import * as SystemUI from 'expo-system-ui'
import {
  useFonts,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Raleway_400Regular,
  Raleway_500Medium,
} from '@expo-google-fonts/dev'

const Stack = createNativeStackNavigator()
export default function App() {
  const [color, setColor] = useState()
  const [uname, setUname] = useState()

  // removeItemFromStorage('uname')
  useEffect(() => {
    const updateColor = async () => {
      loadInit = await loadData('mode', 'light')
      setColor(loadInit === 'dark' ? DarkMode : LightMode)
    }
    updateColor()
  }, [])
  useEffect(() => {
    const updateUi = async () => {
      color && SystemUI.setBackgroundColorAsync(color.bgColor)
    }
    updateUi()
  }, [color])

  useEffect(() => {
    const CheckUname = async () => {
      const loadUname = await loadData('uname', '')
      if (loadUname !== '') {
        setUname(loadUname)
      } else {
        setUname(false)
      }
    }
    CheckUname()
  }, [])

  // console.log('uname:', uname)

  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Raleway_400Regular,
    Raleway_500Medium,
  })

  ;async () => {}

  if (!fontsLoaded) {
    return null
  } else {
    return (
      <NavigationContainer>
        {color && (
          <Stack.Navigator
            initialRouteName={!uname ? 'welcome' : 'home'}
            screenOptions={{
              gestureEnabled: true,
              // gestureDirection: 'horizontal',
              headerShown: false,
              cardStyle: { backgroundColor: 'red' }, // Set background color here
              cardOverlayEnabled: true,
              animationEnabled: true,
            }}
            mode='modal'
          >
            <Stack.Screen
              name='welcome'
              component={WelcomeScreen}
              initialParams={{ color: color, welcome: true }}
            />
            <Stack.Screen
              name='newUser'
              component={WelcomeScreen}
              initialParams={{ color: color, welcome: false }}
            />
            <Stack.Screen
              name='home'
              component={HomeScreen}
              initialParams={{ color: color, uname: uname }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    )
  }
}
