import React, { useContext, useEffect, useRef, useState } from 'react'
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
import { FontAwesome5, FontAwesome6, FontAwesome } from '@expo/vector-icons'
import TouchableMadeEasier from './touchables'
import { loadData, saveData } from '../utils/store'
import { FocusInput } from '../utils'
import { useBackHandler } from '@react-native-community/hooks'
import { NameContext, NameProvider } from '../context/NameContext'

export default function NewTask({ close, color }) {
  const translateY = useRef(new Animated.Value(300)).current
  const slide = useRef(new Animated.Value(100)).current
  const InputRef = useRef(null)
  const DescRef = useRef(null)
  const [input, setinput] = useState('')
  const [descState, setdescState] = useState(false)
  const [desc, setdesc] = useState('')
  const [fav, setfav] = useState(false)
  const { tasks, setTasks } = useContext(NameContext)
  const slideUp = () => {
    Animated.timing(translateY, {
      toValue: 0, // Adjust this value to control the distance of the slide-up
      duration: 200, // Duration of the animation in milliseconds
      useNativeDriver: true,
    }).start()
  }
  useEffect(() => {
    slideUp() // Trigger the slide-up animation when the component mounts
  }, [])

  useEffect(() => {
    // !descState
  }, [descState])

  const AddTask = async (e) => {
    const loadTask = await tasks
    if (loadTask) {
      const newTasks = loadTask
      console.log(newTasks)
      setTasks((prev) => [
        ...prev,
        {
          id: String(newTasks.length),
          title: input,
          desc: desc,
          fav: fav,
        },
      ])
    } else {
      await setTasks([{ id: '0', title: input, desc: desc, fav: fav }])
    }
    close(false)
  }

  useBackHandler(() => {
    close(false)
    return true
  })

  return (
    <>
      <TouchableWithoutFeedback onPress={() => close(false)}>
        <View style={[styles.fade]}></View>
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          styles.container,
          { backgroundColor: color?.fgColor, transform: [{ translateY }] },
        ]}
      >
        <InputText
          InputRef={InputRef}
          text={input}
          handleTextChange={(e) => setinput(e)}
          color={color}
          autoFocus={true}
          placeholder={'New Task'}
          maxLength={50}
          size={18}
          padding={3}
          autoCapitalize={'sentences'}
        />
        {descState && (
          <InputText
            InputRef={DescRef}
            text={desc}
            handleTextChange={(e) => setdesc(e)}
            color={color}
            placeholder={'Add description'}
            maxLength={180}
            size={15}
            padding={'0'}
            autoFocus={true}
            opacity={0.8}
            autoCapitalize={'sentences'}
          />
        )}
        <View style={styles.options}>
          <TouchableMadeEasier
            round={10}
            width={30}
            color={color}
            onPress={() => {
              FocusInput(InputRef)
              setdescState(!descState)
            }}
          >
            <FontAwesome5
              name='align-left'
              size={18}
              color={color?.accentColor}
            />
          </TouchableMadeEasier>
          <TouchableMadeEasier
            round={10}
            width={30}
            color={color}
            onPress={() => setfav(!fav)}
          >
            {fav ? (
              <FontAwesome name='star' size={22} color={color?.accentColor} />
            ) : (
              <FontAwesome name='star-o' size={22} color={color?.accentColor} />
            )}
          </TouchableMadeEasier>
          <TouchableMadeEasier
            round={10}
            padding={[10]}
            style={styles.done}
            styleParent={styles.doneParent}
            color={color}
            onPress={() => input && AddTask()}
          >
            {input.trim().length > 0 && (
              <Text style={[styles.done, { color: color?.accentColor }]}>
                Done
              </Text>
            )}
          </TouchableMadeEasier>
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
    opacity: 0.3,
    backgroundColor: '#000',
    // zIndex: 1000,
  },
  container: {
    position: 'absolute',
    width: '92%',
    zIndex: 200,
    marginVertical: 20,
    marginHorizontal: '4%',
    paddingTop: 20,
    paddingBottom: 5,
    paddingHorizontal: 3,
    bottom: 0,
    borderRadius: 20,
    gap: 10,
    zIndex: 200,
  },
  options: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    gap: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  done: {
    textAlign: 'right',
    fontFamily: 'Nunito_700Bold',
    fontSize: 18,
    paddingHorizontal: 20,
    overflow: 'hidden',
    borderRadius: 1000,
  },
  doneParent: {
    flex: 1,
    alignItems: 'flex-end',
    width: 100,
  },
})
