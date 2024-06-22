import { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import TouchableMadeEasier from '../components/touchables'
import { FontAwesome } from '@expo/vector-icons'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated'

export default function TaskNav({ color, state, scrollLeft, scrollRef }) {
  const [fav, setfav] = useState(false)
  const [task, settask] = useState(false)
  const [current, setCurrent] = useState(scrollLeft)
  const [prev, setPrev] = useState(0)
  const { width: screenWidth } = useWindowDimensions()

  const clickFav = () => {
    scrollRef.scrollTo({ x: 0, animated: true })
    setfav(true)
    settask(false)
  }
  const clickTasks = () => {
    scrollRef.scrollToEnd({ animated: true })
    setfav(false)
    settask(true)
  }

  const favColor = useAnimatedStyle(() => {
    const iconColor = interpolateColor(
      scrollLeft.value,
      [0, 100, screenWidth],
      [color.accentColor, color.textColor + '99', color.textColor + '99'],
    )

    return {
      color: iconColor,
    }
  })

  const taskColor = useAnimatedStyle(() => {
    const iconColor = interpolateColor(
      scrollLeft.value,
      [0, 100, screenWidth],
      [color.textColor + 'cc', color.textColor + 'cc', color.accentColor],
    )

    return {
      color: iconColor,
    }
  })

  return (
    <View style={styles.nav}>
      <TouchableMadeEasier
        round={10}
        width={30}
        color={color}
        onPress={() => clickFav()}
      >
        <Animated.Text style={favColor}>
          <FontAwesome
            name='star'
            size={20}
            // color={fav ? color?.accentColor : color?.textColor + '99'}
          />
        </Animated.Text>
      </TouchableMadeEasier>
      <TouchableMadeEasier
        round={10}
        style={styles.child}
        styleParent={styles.parent}
        color={color}
        onPress={() => clickTasks()}
      >
        <Animated.Text
          style={[
            styles.child,
            taskColor,
            { color: task ? color?.accentColor : color?.textColor + 'cc' },
          ]}
        >
          My Tasks
        </Animated.Text>
      </TouchableMadeEasier>
    </View>
  )
}

const styles = StyleSheet.create({
  nav: {
    paddingHorizontal: 15,
    justifyContent: 'start',
    alignItems: 'center',
    gap: 10,
    flexDirection: 'row',
  },
  child: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 15,
    paddingHorizontal: 10,
  },
  parent: {},
})
