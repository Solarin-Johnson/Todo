import { useEffect, useState } from 'react'

import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { loadData, removeItemFromStorage } from './src/utils/store'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import { DarkMode, LightMode } from './src/styles/colors'
import WelcomeScreen from './src/screens/WelcomeScreen'
import HomeScreen from './src/screens/HomeScreen'

import { FontAwesome } from '@expo/vector-icons'

import * as SystemUI from 'expo-system-ui'
import {
  useFonts,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_700Bold,
} from '@expo-google-fonts/dev'
import { StatusBar } from 'expo-status-bar'
import SettingsScreen from './src/screens/SettingsScreen'

const Stack = createNativeStackNavigator()
export default function App() {
  const [color, setColor] = useState()
  const [uname, setUname] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const colorScheme = useColorScheme()

  removeItemFromStorage('mode')
  useEffect(() => {
    const updateColor = async () => {
      loadInit = await loadData('mode', 'automatic')
      if (loadInit === 'automatic') {
        setColor(colorScheme === 'dark' ? DarkMode : LightMode)
      } else {
        setColor(
          loadInit === 'dark' ? DarkMode : loadInit === 'light' && LightMode,
        )
      }
      console.log(colorScheme)
    }

    updateColor()

    // const loadResources = async () => {
    //   try {
    //     // Load FontAwesome icons
    //     // const storedData = await AsyncStorage.getItem('myData')
    //   } catch (error) {
    //     console.error('Error loading resources:', error)
    //   } finally {
    //     setIsLoading(false)
    //   }
    // }

    FontAwesome.loadFont()
    // loadResources()
  }, [])
  useEffect(() => {
    const updateUi = async () => {
      color && SystemUI.setBackgroundColorAsync(color.bgColor)
    }
    updateUi()
  }, [color])

  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Raleway_400Regular,
    Raleway_500Medium,
    Raleway_600SemiBold,
    Raleway_700Bold,
  })

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

  if (!fontsLoaded) {
    return null
  } else {
    return (
      <NavigationContainer>
        {/* <StatusBar backgroundColor='black' barStyle='light-content' /> */}
        {color && (
          <Stack.Navigator
            initialRouteName={!uname ? 'welcome' : 'home'}
            screenOptions={{
              gestureEnabled: true,
              // gestureDirection: 'horizontal',
              headerShown: false,
              cardOverlayEnabled: true,
              animationEnabled: true,
            }}
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
            <Stack.Screen
              name='settings'
              component={SettingsScreen}
              initialParams={{ color: color, uname: uname }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    )
  }
}
