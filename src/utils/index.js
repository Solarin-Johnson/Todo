import React from 'react'
import { useWindowDimensions } from 'react-native'

export const greetings = () => {
  const currentTime = new Date()
  const currentHour = currentTime.getHours()
  let greeting

  if (currentHour >= 5 && currentHour < 12) {
    greeting = 'Good morning'
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = 'Good afternoon'
  } else {
    greeting = 'Good evening'
  }
  return greeting
}

export const Truncate = ({ text }) => {
  const windowWidth = useWindowDimensions().width
  const maxChars = Math.floor((windowWidth - 20) / 45)
  const truncatedText =
    text.length > maxChars ? `${text.substring(0, maxChars)}...` : text
  return truncatedText
}

export const isAlphanumeric = (inputText) => {
  return /^[a-zA-Z0-9]+$/.test(inputText)
}

export const FocusInput = (ref) => {
  ref.current !== null && ref.current.focus()
}
