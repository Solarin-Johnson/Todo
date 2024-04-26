import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Animated, {
  FlipInEasyX,
  FlipOutEasyX,
  LightSpeedOutLeft,
} from 'react-native-reanimated'

export const TaskCard = ({ index, data, drag, isActive, color }) => {
  const [fav, setfav] = useState()
  useEffect(() => {
    setfav(data.fav)
  }, [data])

  return (
    <Animated.View
      style={[
        styles.container,
        isActive && { transform: [{ scale: 1.1 }] },
        { backgroundColor: color?.fgColor },
      ]}
      exiting={LightSpeedOutLeft}
    >
      <TouchableWithoutFeedback onLongPress={drag}>
        <View>
          <Text>{data.title}</Text>
          {/* <Text>{data.desc}</Text> */}
        </View>
        <View>
          <FontAwesome
            name='star'
            size={20}
            color={fav ? color?.accentColor : color?.textColor + '99'}
          />
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    elevation: 4,
    shadowColor: '#194B7DA8',
    width: '85%',
    alignSelf: 'center',
    marginVertical: 20,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  status: {},
  fav: {},
  active: {
    transform: [{ scale: 1.05 }],
  },
})
