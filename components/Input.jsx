import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'

export default function InputText({
  color,
  text,
  InputRef,
  handleTextChange,
  autoFocus,
  maxLength,
  placeholder,
  size,
  padding,
  opacity,
  autoCapitalize,
}) {
  return (
    <TextInput
      ref={InputRef}
      style={[
        styles.input,
        {
          color: color?.textColor,
          fontSize: size,
          paddingVertical: padding || 13,
          opacity: opacity || 1,
        },
      ]}
      value={text}
      onChangeText={handleTextChange}
      placeholder={placeholder}
      placeholderTextColor={'grey'}
      textAlign='left'
      maxLength={maxLength || 24}
      autoCapitalize={autoCapitalize || 'words'}
      cursorColor={color?.textColor}
      selectionColor={color?.textColor}
      autoFocus={autoFocus}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    fontFamily: 'Nunito_500Medium',
    fontSize: 16,
    textAlign: 'left',
    width: '100%',
    paddingHorizontal: 13,
  },
})
