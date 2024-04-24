import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import InputText from './Input'
import { FontAwesome5 } from '@expo/vector-icons'
import { FontAwesome6 } from '@expo/vector-icons'

export default function NewTask({ color, close }) {
  const translateY = useRef(new Animated.Value(300)).current
  const slide = useRef(new Animated.Value(50)).current
  const InputRef = useRef(null)
  const DescRef = useRef(null)
  const [input, setinput] = useState()
  const [descState, setdescState] = useState(false)
  const [desc, setdesc] = useState('')
  const slideUp = () => {
    Animated.timing(translateY, {
      toValue: 0, // Adjust this value to control the distance of the slide-up
      duration: 200, // Duration of the animation in milliseconds
      useNativeDriver: true,
    }).start()
  }
  const slideUp2 = () => {
    Animated.timing(slide, {
      toValue: 0, // Adjust this value to control the distance of the slide-up
      duration: 100, // Duration of the animation in milliseconds
      useNativeDriver: true,
    }).start()
  }
  useEffect(() => {
    slideUp() // Trigger the slide-up animation when the component mounts
    slideUp2()
  }, [])

  return (
    <>
      <TouchableWithoutFeedback onPress={() => close(false)}>
        <View
          style={[styles.fade, { backgroundColor: color?.accentColor }]}
        ></View>
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          styles.container,
          { backgroundColor: color?.bgColor, transform: [{ translateY }] },
        ]}
      >
        <InputText
          InputRef={InputRef}
          text={input}
          handleTextChange={(e) => setinput(e.value)}
          color={color}
          autoFocus={true}
          placeholder={'New Task'}
          maxLength={50}
          size={18}
          padding={'0'}
        />
        {descState && (
          <Animated.View style={{ transform: [{ slide }] }}>
            <InputText
              InputRef={DescRef}
              text={desc}
              handleTextChange={(e) => setdesc(e.value)}
              color={color}
              placeholder={'Description'}
              maxLength={50}
              size={13}
              padding={'0'}
            />
          </Animated.View>
        )}
        <View style={styles.options}>
          <TouchableWithoutFeedback
            onPress={() => {
              setdescState(!descState)
            }}
          >
            <FontAwesome5
              name='align-left'
              size={18}
              color={color?.accentColor}
            />
          </TouchableWithoutFeedback>
          <FontAwesome6 name='star' size={18} color={color?.accentColor} />
        </View>
      </Animated.View>
    </>
  )
}

const styles = StyleSheet.create({
  fade: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: '100%',
    zIndex: 100,
    opacity: 0.15,
  },
  container: {
    position: 'absolute',
    width: '92%',
    zIndex: 200,
    marginVertical: 20,
    marginHorizontal: '4%',
    paddingVertical: 15,
    paddingHorizontal: 3,
    bottom: 0,
    borderRadius: 14,
    gap: 10,
  },
  options: {
    paddingHorizontal: 13,
    paddingTop: 10,
    flexDirection: 'row',
    paddingBottom: 10,
    gap: 20,
  },
})
