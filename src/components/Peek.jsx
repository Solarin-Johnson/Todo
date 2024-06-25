import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import TouchableMadeEasier from './touchables'
import { FontAwesome5, AntDesign, Octicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import {
  changeDescription,
  changeTitle,
  removeLineBreaks,
  replaceFavouriteStateAtIndex,
} from '../utils'
import { BottomSheetTextInput, useBottomSheet } from '@gorhom/bottom-sheet'
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

export default function PeekCard({
  base,
  data,
  color,
  setData,
  sheetRef,
  closeSheet,
}) {
  const [fav, setfav] = useState()
  const scrollX = useSharedValue(0)
  const { animatedIndex, close } = useBottomSheet()
  const [title, setTitle] = useState(removeLineBreaks(data.title))
  const [desc, setDesc] = useState(removeLineBreaks(data.desc))

  const animatedOpacity = useAnimatedStyle(() => {
    return {
      opacity: withTiming(animatedIndex.value, {
        duration: 500,
        easing: Easing.out(Easing.ease),
      }),
      transform: [
        {
          translateY: withTiming(-animatedIndex.value * 80, {
            duration: 100,
            easing: Easing.out(Easing.ease),
          }),
        },
      ],
    }
  })
  const animatedIndicator = useAnimatedStyle(() => {
    return {
      opacity: withTiming(
        interpolate(
          animatedIndex.value,
          [-1, 0, 0.3, 1],
          [1, 1, 0, 0],
          Extrapolation.CLAMP,
        ),
        {
          duration: 200,
          easing: Easing.out(Easing.ease),
        },
      ),
      transform: [
        {
          scale: withTiming(
            interpolate(
              animatedIndex.value,
              [-1, 0, 0.5, 1],
              [1, 1, 0, 0],
              Extrapolation.CLAMP,
            ),
            {
              duration: 100,
              easing: Easing.out(Easing.ease),
            },
          ),
        },
      ],
    }
  })
  const animatedTitle = useAnimatedStyle(() => {
    const widthValue = interpolate(
      animatedIndex.value,
      [0, 1],
      [84, 100],
      Extrapolation.CLAMP,
    )
    return {
      transform: [
        {
          scale: withTiming(
            interpolate(
              animatedIndex.value,
              [-1, 0, 0.5, 1],
              [0.6, 0.8, 1, 1],
              Extrapolation.CLAMP,
            ),
            {
              duration: 150,
              easing: Easing.out(Easing.ease),
            },
          ),
        },
        {
          translateX: withTiming(
            interpolate(
              animatedIndex.value,
              [-1, 0, 0.5, 1],
              [-100, -35, 0, 0],
              Extrapolation.CLAMP,
            ),
            {
              duration: 150,
              easing: Easing.out(Easing.ease),
            },
          ),
        },
      ],
    }
  })

  useEffect(() => {
    setfav(data.fav)
  }, [data])

  const toggleFavourite = (e) => {
    setData(replaceFavouriteStateAtIndex(base, data.id, !fav))
    setfav(!fav)
  }

  const deleteTask = (e) => {
    setData(base.filter((item) => item.id !== data.id))
    closeSheet()
  }

  const handleSubmitTitle = () => {
    if (title.trim() !== '') {
      setData(changeTitle(base, data.id, title))
    }
  }

  const handleSubmitDesc = () => {
    if (title.trim() !== '') {
      setData(changeDescription(base, data.id, desc))
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <TouchableMadeEasier
          round={10}
          width={30}
          color={color}
          onPress={() => closeSheet()}
        >
          <AntDesign
            name='arrowleft'
            size={24}
            color={color?.textColor + 'BC'}
          />
        </TouchableMadeEasier>
        <View style={styles.options}>
          <TouchableMadeEasier
            round={true}
            width={40}
            color={color}
            onPress={toggleFavourite}
          >
            {fav ? (
              <Octicons name='star-fill' size={22} color={color?.accentColor} />
            ) : (
              <Octicons name='star' size={22} color={color?.textColor + 'AB'} />
            )}
          </TouchableMadeEasier>
          <TouchableMadeEasier
            round={10}
            width={30}
            color={color}
            onPress={deleteTask}
          >
            <Octicons name='trash' size={20} color={color?.textColor + 'AB'} />
          </TouchableMadeEasier>
        </View>
      </View>
      <View style={styles.body}>
        <Animated.View style={[styles.titleLabel, animatedTitle]}>
          <BottomSheetTextInput
            style={[styles.title, { color: color.textColor }]}
            maxLength={50}
            multiline={true}
            blurOnSubmit={true}
            placeholder={title}
            autoCapitalize={'words'}
            cursorColor={color?.accentColor}
            selectionColor={color?.accentColor + '40'}
            placeholderTextColor={color?.textColor}
            onChangeText={(e) => setTitle(removeLineBreaks(e))}
            onSubmitEditing={handleSubmitTitle}
          >
            {title}
          </BottomSheetTextInput>
        </Animated.View>

        <Animated.View style={[styles.label, animatedOpacity]}>
          <TouchableWithoutFeedback>
            <FontAwesome5
              name='align-left'
              size={18}
              color={color?.textColor + 'bc'}
            />
          </TouchableWithoutFeedback>
          <BottomSheetTextInput
            style={[styles.desc, { color: color.textColor }]}
            placeholder={desc ? desc : 'Add description'}
            multiline
            maxLength={200}
            cursorColor={color?.accentColor}
            selectionColor={color?.accentColor + '40'}
            placeholderTextColor={'grey'}
            blurOnSubmit={true}
            onChangeText={(e) => setDesc(removeLineBreaks(e))}
            onSubmitEditing={handleSubmitDesc}
          >
            {desc}
          </BottomSheetTextInput>
        </Animated.View>
      </View>
      <TouchableWithoutFeedback
        onPress={() => sheetRef.current && sheetRef.current.expand()}
      >
        <Animated.View
          style={[
            styles.float,
            animatedIndicator,
            { backgroundColor: color?.textColor + 20 },
          ]}
        >
          <Octicons
            name='arrow-down'
            size={22}
            color={color?.textColor + 'EF'}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    minWidth: '100%',
    gap: 10,
  },
  head: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 6,
  },
  options: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    paddingRight: 10,
  },
  body: {
    width: '100%',
    flex: 1,
    justifyContent: 'start',
    alignItems: 'start',
    paddingHorizontal: 8,
    // backgroundColor: 'red',
  },
  titleLabel: {
    // backgroundColor: 'red',
    flex: 1,
    justifyContent: 'center',
    minHeight: 160,
    maxHeight: 160,
    // width: '84%',
  },
  title: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 34,
    width: '99%',
    textAlign: 'left',
    lineHeight: 48,
    textAlignVertical: 'center',
    // backgroundColor: 'green',
  },
  label: {
    width: '100%',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: 94,
    maxWidth: '100%',
  },
  desc: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 16,
    textAlign: 'left',
    paddingHorizontal: 20,
    lineHeight: 24,
    width: '100%',
  },
  float: {
    position: 'absolute',
    top: 90,
    right: 5,
    fontFamily: 'Nunito_700Bold',
    backgroundColor: '#00000099',
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    margin: 20,
  },
})
