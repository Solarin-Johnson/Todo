import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import TouchableMadeEasier from '../components/touchables'
import { FontAwesome } from '@expo/vector-icons'

export default function TaskNav({ color, state, scrollLeft, scrollRef }) {
  const [fav, setfav] = useState(false)
  const [task, settask] = useState(false)
  const { width: screenWidth } = useWindowDimensions()

  useEffect(() => {
    if (state < 50) {
      setfav(true)
    }
  }, [state])

  useEffect(() => {
    if (scrollLeft) {
      if (scrollLeft < screenWidth / 2) {
        setfav(true)
        settask(false)
      } else {
        setfav(false)
        settask(true)
      }
    }
  }, [scrollLeft])

  const clickFav = () => {
    scrollRef.scrollTo({ x: 0, animated: true })
    setfav(true)
  }
  const clickTasks = () => {
    scrollRef.scrollToEnd({ animated: true })
    settask(true)
  }

  return (
    <View style={styles.nav}>
      <TouchableMadeEasier
        round={10}
        width={30}
        color={color}
        onPress={() => clickFav()}
      >
        <FontAwesome
          name='star'
          size={20}
          color={fav ? color?.accentColor : color?.textColor + '99'}
        />
      </TouchableMadeEasier>
      <TouchableMadeEasier
        round={10}
        style={styles.child}
        styleParent={styles.parent}
        color={color}
        onPress={() => clickTasks()}
      >
        <Text
          style={[
            styles.child,
            { color: task ? color?.accentColor : color?.textColor + 'cc' },
          ]}
        >
          My Tasks
        </Text>
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
