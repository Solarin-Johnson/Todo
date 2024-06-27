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
  } else if (currentHour >= 18 && currentHour < 22) {
    greeting = 'Good afternoon'
  } else {
    greeting = 'Happy latenight'
  }
  return greeting
}

export const Truncate = ({ text, limit }) => {
  const windowWidth = useWindowDimensions().width
  const maxChars = Math.floor(
    (windowWidth - 20) / (limit !== undefined ? limit : 35),
  )
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

export function replaceFavouriteStateAtIndex(objectsArray, id, newState) {
  return objectsArray.map((obj) =>
    obj.id === id ? { ...obj, fav: newState } : obj,
  )
}

export function changeDescription(objectsArray, id, newDesc) {
  return objectsArray.map((obj) =>
    obj.id === id ? { ...obj, desc: newDesc } : obj,
  )
}

export function changeTitle(objectsArray, id, newTitle) {
  return objectsArray.map((obj) =>
    obj.id === id ? { ...obj, title: newTitle } : obj,
  )
}
export function removeLineBreaks(inputString) {
  // Replace all line breaks with an empty string
  return inputString.replace(/(\r\n|\n|\r)/gm, '').trim()
}

export const STYLES = {
  automatic: 'default',
  dark: 'dark-content',
  light: 'light-content',
}
