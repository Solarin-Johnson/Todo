import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Entypo, FontAwesome6, Octicons } from '@expo/vector-icons'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Animated, {
  FlipInEasyX,
  FlipOutEasyX,
  LightSpeedOutLeft,
  LightSpeedInRight,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
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
  const [seeAll, setSeeAll] = useState(false)
  useEffect(() => {
    setfav(data.fav)
  }, [data])

  const toggleFavourite = (e) => {
    setData(replaceFavouriteStateAtIndex(base, data.id, !fav))
    setfav(!fav)
  }
  const deleteTask = (e) => {
    setData(base.filter((item) => item.id !== data.id))
  }

  const dragScale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(dragScale.value) }],
      flex: 1,
    };
  }); 

  useEffect(() => {
    dragScale.value = isActive ? 1.05 : 1
  }, [isActive]);


  const dragged = ()=> {
    drag()
  }

  return (
    <Animated.View
      entering={LightSpeedInRight}
      exiting={LightSpeedOutLeft}
      style={styles.container}
    >
    <Animated.View 
        style={animatedStyle}
      >
      <TouchableWithoutFeedback
        style={[styles.child, { backgroundColor: color?.fgColor }]}
        onLongPress={dragged}
        onPress={()=> setSeeAll(!seeAll)}
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
        <View style={styles.body} >
        <TouchableWithoutFeedback  onPress={()=> setSeeAll(!seeAll)}>
          <Text style={[styles.title, {color: color.textColor}]}>
            {seeAll && data.desc ? <Truncate text={data.title} limit={20} /> : data.title}
          </Text>
          {seeAll && data.desc && <Text style={[styles.desc, {color: color.textColor}]}>{data.desc}</Text>}
          {/* <Text>{data.desc}</Text> */}
        </TouchableWithoutFeedback>
        </View>
        <TouchableMadeEasier round={true} width={40} color={color} onPress={deleteTask}>
          <Octicons name='trash' size={22} color={color?.textColor + 'AB'} />
        </TouchableMadeEasier>
      </TouchableWithoutFeedback>
    </Animated.View>
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
    borderColor: '#EEF2F760',
    borderWidth: 1,
    height: 80,
  },
  child: {
    // paddingVertical: 10,
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
    justifyContent: 'center',
  },
  title: {
    // backgroundColor: 'red',
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 16,
    lineHeight: 19,
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
