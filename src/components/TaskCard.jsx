import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback as RNTouchableWithoutFeedback,
} from 'react-native'
import { Entypo, FontAwesome6, Octicons } from '@expo/vector-icons'
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
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

export const TaskCard = ({
  index,
  data,
  setData,
  drag,
  isActive,
  color,
  base,
  onPress,
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
    }
  })

  useEffect(() => {
    dragScale.value = isActive ? 1.05 : 1
  }, [isActive])

  const dragged = () => {
    drag()
  }

  return (
    <Animated.View
      style={[
        styles.subContainer,
        animatedStyle,
        { backgroundColor: color.fgColor },
      ]}
    >
      <Animated.View
        entering={LightSpeedInRight}
        exiting={LightSpeedOutLeft}
        style={[styles.container, { backgroundColor: color.fgColor }]}
      >
        <TouchableWithoutFeedback style={[styles.child]} onLongPress={dragged}>
          <View style={styles.btn}>
            <TouchableMadeEasier
              round={true}
              width={40}
              color={color}
              onPress={toggleFavourite}
            >
              {fav ? (
                <Octicons
                  name='star-fill'
                  size={20}
                  color={color?.accentColor}
                />
              ) : (
                <Octicons
                  name='star'
                  size={20}
                  color={color?.textColor + 'AB'}
                />
              )}
            </TouchableMadeEasier>
          </View>
          <RNTouchableWithoutFeedback
            // onPress={() => setSeeAll(!seeAll)}
            onPress={onPress}
            onLongPress={dragged}
          >
            <View style={styles.body}>
              <Text style={[styles.title, { color: color.textColor }]}>
                <Truncate text={data.title} limit={10} />
              </Text>
            </View>
          </RNTouchableWithoutFeedback>
          <View style={styles.btn}>
            <TouchableMadeEasier
              round={true}
              width={40}
              color={color}
              onPress={deleteTask}
            >
              <Octicons
                name='trash'
                size={22}
                color={color?.textColor + 'AB'}
              />
            </TouchableMadeEasier>
          </View>
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
    borderRadius: 16,
    height: 80,
    marginVertical: 15,
    overflow: 'hidden',
    borderColor: '#EEF2F760',
    borderWidth: 1,
  },
  subContainer: {},
  child: {
    paddingHorizontal: 4,
    justifyContent: 'center',
    flexDirection: 'row',
    height: 80,
    gap: 12,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
  },
  btn: {
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 16,
    lineHeight: 21,
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
