import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import TouchableMadeEasier from './touchables'
import { FontAwesome5, AntDesign, Octicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { replaceFavouriteStateAtIndex } from '../utils'
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
  index,
  sheetRef,
  close,
}) {
  const [fav, setfav] = useState()
  const scrollX = useSharedValue(0)
  const { expand, collapse, animatedIndex } = useBottomSheet()

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
      transform: [
        {
          scale: withTiming(
            interpolate(
              animatedIndex.value,
              [-1, 0, 1],
              [1, 1, 0],
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

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <TouchableMadeEasier
          round={10}
          width={30}
          color={color}
          onPress={close}
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
        <BottomSheetTextInput
          style={[styles.title, { color: color.textColor }]}
          maxLength={50}
          multiline={true}
          blurOnSubmit={true}
          placeholder={data.title}
          autoCapitalize={'words'}
          cursorColor={color?.accentColor}
          selectionColor={color?.accentColor}
          placeholderTextColor={color?.textColor}
        >
          {data.title}
        </BottomSheetTextInput>

        <Animated.View style={[styles.label, animatedOpacity]}>
          <TouchableWithoutFeedback>
            <FontAwesome5
              name='align-left'
              size={18}
              color={color?.textColor + '99'}
            />
          </TouchableWithoutFeedback>
          <BottomSheetTextInput
            style={[styles.desc, { color: color.textColor }]}
            placeholder='Add description'
            multiline
            maxLength={200}
            cursorColor={color?.accentColor}
            selectionColor={color?.accentColor}
            placeholderTextColor={'grey'}
            blurOnSubmit={true}
          >
            {data.desc}
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
    paddingHorizontal: 10,
    // backgroundColor: 'red',
  },
  title: {
    fontFamily: 'Nunito_700Bold',
    paddingVertical: 10,
    minHeight: 80,
    fontSize: 26,
    width: '100%',
    textAlign: 'left',
    lineHeight: 35,
  },
  label: {
    width: '100%',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: 90,
    maxWidth: '100%',
    // backgroundColor: 'green',
  },
  desc: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 16,
    textAlign: 'left',
    paddingLeft: 20,
    lineHeight: 24,
  },
  float: {
    position: 'absolute',
    top: 124,
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
