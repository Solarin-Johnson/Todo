import React, { createContext, useEffect, useState } from 'react'
import { loadData, saveData } from '../utils/store'
import { Alert, StatusBar, useColorScheme } from 'react-native'
import { DarkMode, LightMode } from '../styles/colors'
import * as SystemUI from 'expo-system-ui'
import { STYLES } from '../utils'

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
      StatusBar.setBarStyle(STYLES[mode], true)
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

  useEffect(() => {
    if (tasks !== null && tasks !== undefined && tasks) {
      console.log('bitch', tasks)
      saveData('tasks', JSON.stringify(tasks))
    }
  }, [tasks])

  useEffect(() => {}, [color])

  return (
    <NameContext.Provider
      value={{ name, setName, color, setColor, mode, setMode, tasks, setTasks }}
    >
      {children}
    </NameContext.Provider>
  )
}
