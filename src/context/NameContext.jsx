import React, { createContext, useEffect, useState } from 'react'
import { loadData, saveData } from '../utils/store'
import { Alert, useColorScheme } from 'react-native'
import { DarkMode, LightMode } from '../styles/colors'
import * as SystemUI from 'expo-system-ui'

export const NameContext = createContext()

export const NameProvider = ({ children }) => {
  const [name, setName] = useState()
  const [color, setColor] = useState()
  const [mode, setMode] = useState()
  const colorScheme = useColorScheme()

  useEffect(() => {
    const CheckUname = async () => {
      const loadUname = await loadData('uname', '')
      if (loadUname !== '') {
        setName(loadUname)
      } else {
        setName('')
      }
    }

    CheckUname()
  }, [])

  useEffect(() => {
    if (name !== null && name !== undefined) {
      saveData('uname', name)
    }
  }, [name])

  const updateColor = async () => {
    loadInit = await loadData('mode', 'automatic')
    !mode && setMode(loadInit)
    if (loadInit === 'automatic') {
      setColor(colorScheme === 'dark' ? DarkMode : LightMode)
    } else {
      setColor(loadInit === 'dark' ? DarkMode : LightMode)
      // Alert.alert(loadInit)
    }
  }
  console.log(colorScheme, color, mode)

  useEffect(() => {
    updateColor()
    saveData('mode', 'automatic')
  }, [colorScheme])

  useEffect(() => {
    if (mode !== null && mode !== undefined) {
      saveData('mode', mode)
      updateColor()
    }

  }, [mode])

  useEffect(() => {
    const updateUi = async () => {
      color && SystemUI.setBackgroundColorAsync(color.bgColor)
    }
    updateUi()
  }, [color])

  useEffect(() => {}, [color])

  return (
    <NameContext.Provider
      value={{ name, setName, color, setColor, mode, setMode }}
    >
      {children}
    </NameContext.Provider>
  )
}
