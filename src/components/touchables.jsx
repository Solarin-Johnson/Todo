import React from 'react'
import { View, Text, TouchableNativeFeedback, StyleSheet } from 'react-native'

export default function TouchableMadeEasier({
  children,
  onPress,
  round,
  width,
  style,
  styleParent,
  color,
  rippleColor,
}) {
  return (
    <View
      style={[
        {
          borderRadius: round ? 1000 : 0,
          width: round && width ? width + round : 'auto',
          height: round && width ? width + round : 'auto',
        },
        styles.container,
        styleParent,
      ]}
    >
      <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple(
          rippleColor ? rippleColor : color?.accentColor + '00',
          false,
        )}
      >
        <View style={[styles.btn, style]}>
          <Text>{children}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
