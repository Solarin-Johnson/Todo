import { useEffect, useState } from 'react'

import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { loadData, removeItemFromStorage } from './src/utils/store'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import { DarkMode, LightMode } from './src/styles/colors'
import WelcomeScreen from './src/screens/WelcomeScreen'
import HomeScreen from './src/screens/HomeScreen'

import { FontAwesome } from '@expo/vector-icons'

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
import SettingsScreen from './src/screens/SettingsScreen'
import { NameProvider } from './src/context/NameContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Stack = createNativeStackNavigator()
export default function App() {
  const [color, setColor] = useState()
  const [uname, setUname] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const colorScheme = useColorScheme()

  // removeItemFromStorage('tasks')
  // AsyncStorage.clear()
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

  useEffect(() => {
    updateColor()
  }, [colorScheme])

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
      <NameProvider>
        <NavigationContainer>
          {color && (
            <Stack.Navigator
              initialRouteName={!uname ? 'welcome' : 'home'}
              screenOptions={{
                gestureEnabled: true,
                // gestureDirection: 'horizontal',
                headerShown: false,
                animationEnabled: true,
              }}
            >
              <Stack.Screen
                name='welcome'
                component={WelcomeScreen}
                initialParams={{ welcome: true }}
              />
              <Stack.Screen
                name='newUser'
                component={WelcomeScreen}
                initialParams={{ welcome: false }}
              />
              <Stack.Screen name='home' component={HomeScreen} />
              <Stack.Screen
                name='settings'
                component={SettingsScreen}
                options={{
                  headerShown: true,
                  title: 'Settings',
                  headerBackTitle: 'Back',
                }}
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </NameProvider>
    )
  }
}
