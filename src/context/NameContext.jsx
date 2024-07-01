import React, { createContext, useEffect, useState } from 'react'
import { loadData, saveData } from '../utils/store'
import { Alert, useColorScheme, StatusBar as RNStatusBar } from 'react-native'
import { DarkMode, LightMode } from '../styles/colors'
import { STYLES } from '../utils'
import { StatusBar } from 'expo-status-bar'
import * as SystemUI from 'expo-system-ui'

export const NameContext = createContext()

export const NameProvider = ({ children }) => {
  const [name, setName] = useState()
  const [color, setColor] = useState()
  const [mode, setMode] = useState()
  const [tasks, setTasks] = useState()
  const colorScheme = useColorScheme()

  const LoadTasks = async () => {
    const loadTask = await loadData('tasks', '')
    if (loadTask !== '') {
      setTasks(JSON.parse(loadTask))
    } else {
      setTasks(false)
    }
  }

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
    LoadTasks()
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

  // console.log(colorScheme, color, mode)

  useEffect(() => {
    updateColor()
    saveData('mode', 'automatic')
  }, [colorScheme])

  useEffect(() => {
    if (mode !== null && mode !== undefined) {
      RNStatusBar.setBarStyle(STYLES[mode], true)
      console.log(STYLES[mode])
      saveData('mode', mode)
      updateColor()
    }
  }, [mode])

  useEffect(() => {
    const updateUi = async () => {
      color && SystemUI.setBackgroundColorAsync(color.fgColor)
    }
    updateUi()
  }, [color])

  useEffect(() => {
    if (tasks !== null && tasks !== undefined && tasks) {
      saveData('tasks', JSON.stringify(tasks))
    }
  }, [tasks])

  useEffect(() => {}, [color])

  return (
    <NameContext.Provider
      value={{ name, setName, color, setColor, mode, setMode, tasks, setTasks }}
    >
      <StatusBar
        barStyle={STYLES[mode]}
        backgroundColor='transparent'
        translucent
      />
      {children}
    </NameContext.Provider>
  )
}
