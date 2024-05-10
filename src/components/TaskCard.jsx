import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Entypo, FontAwesome6, Octicons } from '@expo/vector-icons'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Animated, {
  FlipInEasyX,
  FlipOutEasyX,
  LightSpeedOutLeft,
  LightSpeedInRight,
} from 'react-native-reanimated'
import TouchableMadeEasier from './touchables'
import { replaceFavouriteStateAtIndex, Truncate } from '../utils'

export const TaskCard = ({
  index,
  data,
  setData,
  drag,
  isActive,
  color,
  base,
}) => {
  const [fav, setfav] = useState()
  useEffect(() => {
    setfav(data.fav)
  }, [data])

  const toggleFavourite = () => {
    setData(replaceFavouriteStateAtIndex(base, data.id, !fav))
    console.log(replaceFavouriteStateAtIndex(base, data.id, !fav))
    setfav(!fav)
  }

  return (
    <Animated.View
      entering={LightSpeedInRight}
      exiting={LightSpeedOutLeft}
      style={[styles.container, isActive && { opacity: 0.7 }]}
    >
      <TouchableWithoutFeedback
        style={[styles.child, { backgroundColor: color?.fgColor }]}
        onLongPress={drag}
      >
        <TouchableMadeEasier
          round={true}
          width={40}
          color={color}
          onPress={toggleFavourite}
        >
          {fav ? (
            <Octicons name='star-fill' size={20} color={color?.accentColor} />
          ) : (
            <Octicons name='star' size={20} color={color?.textColor + 'AB'} />
          )}
        </TouchableMadeEasier>
        <View style={styles.body}>
          <Text style={styles.title}>
            <Truncate text={data.title} limit={15} />
          </Text>
          {data.desc && <Text style={styles.desc}>{data.desc}</Text>}
          {/* <Text>{data.desc}</Text> */}
        </View>
        <TouchableMadeEasier round={true} width={40} color={color}>
          <Octicons name='trash' size={22} color={color?.textColor + 'AB'} />
        </TouchableMadeEasier>
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
    marginVertical: 12,
    borderRadius: 16,
    overflow: 'hidden',
    borderColor: '#EEF2F7',
    borderWidth: 1,
    height: 80,
  },
  child: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    gap: 12,
  },
  body: {
    flex: 1,
    gap: 5,
  },
  title: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 16,
  },
  desc: {
    opacity: 0.8,
    fontSize: 12,
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 12,
  },
  status: {},
  fav: {},
  active: {
    transform: [{ scale: 1.05 }],
  },
})
