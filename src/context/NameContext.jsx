import React, { createContext, useEffect, useState } from 'react'
import { loadData, saveData } from '../utils/store'

export const NameContext = createContext()

export const NameProvider = ({ children }) => {
  const [name, setName] = useState('')
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
    if (name !== null) {
      saveData('uname', name)
    }
  }, [name])

  return (
    <NameContext.Provider value={{ name, setName }}>
      {children}
    </NameContext.Provider>
  )
}
