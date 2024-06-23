import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  StyleSheet,
  useWindowDimensions,
  FlatList,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native'
import TaskNav from '../navigation/TasksNav'
import { TaskCard } from './TaskCard'
import DraggableFlatList, {
  NestableDraggableFlatList,
  NestableScrollContainer,
} from 'react-native-draggable-flatlist'
import { saveData } from '../utils/store'
import NoTask from './NoTask'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useAnimatedScrollHandler,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated'

import PeekCard from './Peek'
import BottomSheet from '@gorhom/bottom-sheet'
import { useBackHandler } from '@react-native-community/hooks'
import CustomFooter from './customFooter'

export default function TaskList({ tasks, color, empty }) {
  const { width: screenWidth } = useWindowDimensions()
  const scrollX = useSharedValue(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [favourites, setFavourites] = useState([])
  const [data, setData] = useState([])
  const [sheetIndex, setSheetIndex] = useState(-1)
  const scrollRef = useRef(null)
  const [peek, setPeek] = useState(false)
  const [fade, setFade] = useState(false)
  const sheetRef = useRef(null)
  const fadeOpacity = useSharedValue(0.5)
  useEffect(() => {
    setData(tasks)
  }, [tasks])

  useEffect(() => {
    setFavourites(data.filter((item) => item.fav === true))
  }, [data])

  useEffect(() => {
    scrollRef.current.scrollToEnd({ animated: true })
  }, [tasks.length])

  useEffect(() => {
    favourites.length <= 0 && scrollRef.current.scrollToEnd({ animated: true })
  }, [favourites])

  useEffect(() => {
    if (peek) {
      fadeOpacity.value = withTiming(0.5, { duration: 200 })
      setFade(true)
    } else {
      fadeOpacity.value = withTiming(0, { duration: 200 })
      setFade(false)
    }
  }, [peek])

  const calculateScrollPercentage = useDerivedValue(() => {
    const totalWidth = screenWidth * 1.82 // Total width of all pages
    return (scrollX.value / totalWidth) * 100
  })

  const animatedLineStyle = useAnimatedStyle(() => {
    const translateX = calculateScrollPercentage.value
    const width = translateX * 1.5 // For example purposes, you can calculate this differently
    return {
      transform: [
        {
          translateX: withTiming(translateX, {
            duration: 600,
            easing: Easing.out(Easing.exp),
          }),
        },
      ],
      width: withTiming(width, {
        duration: 500,
        easing: Easing.out(Easing.exp),
      }),
    }
  })

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x
    // onScroll: (event) => {
    // },
  })

  const derivedScrollX = useDerivedValue(() => {
    return scrollX.value
  })

  const handleDragEnd = ({ data }) => {
    setData(data)
    saveData('tasks', JSON.stringify(data))
  }

  const updateState = (x) => {
    setData(x)
    if (x.length <= 0) {
      saveData('tasks', '')
      empty(true)
    } else {
      saveData('tasks', JSON.stringify(x))
    }
  }

  const animatedFadeStyle = useAnimatedStyle(() => ({
    opacity: fadeOpacity.value,
  }))

  const handleSheetChanges = (index) => {
    console.log(index)
    setSheetIndex(index)
    if (index === -1) {
      fadeOpacity.value = withTiming(0, { duration: 100 })
      setPeek(false)
    } else if (index === 0) {
      fadeOpacity.value = withTiming(0.5, { duration: 200 })
    } else {
      fadeOpacity.value = withTiming(1, { duration: 200 })
    }
  }
  console.log('peek', peek, fade)

  const closeSheet = () => {
    sheetRef && sheetRef.current.close()
    setFade(false)
    fadeOpacity.value = withTiming(0, { duration: 100 })
  }

  useBackHandler(() => {
    closeSheet()
    return true
  })

  return (
    <>
      {fade && (
        <TouchableWithoutFeedback
          onPress={() => {
            setFade(false)
            sheetRef.current.close()
            fadeOpacity.value = withTiming(0, { duration: 100 })
          }}
        >
          <Animated.View style={[styles.fadeBackground, animatedFadeStyle]}>
            <View style={styles.fullScreenTouchable}></View>
          </Animated.View>
        </TouchableWithoutFeedback>
      )}
      <View style={styles.container}>
        <View
          style={[
            styles.head,
            { borderBottomWidth: 1, borderBlockColor: color.textColor + '60' },
          ]}
        >
          <TaskNav
            color={color}
            state={calculateScrollPercentage.value}
            scrollLeft={derivedScrollX}
            scrollRef={scrollRef.current}
          />
          <Animated.View
            style={[
              styles.line,
              {
                backgroundColor: color?.accentColor,
              },
              animatedLineStyle,
            ]}
          />
        </View>
        <Animated.ScrollView
          ref={scrollRef}
          horizontal
          // pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}
          onScrollEndDrag={(e) => setScrollLeft(e.nativeEvent.contentOffset.x)}
          scrollEventThrottle={-200}
          snapToOffsets={[0, screenWidth]} // Snap to each page
          overScrollMode='never'
          // alwaysBounceHorizontal={true}
          decelerationRate='fast'
          contentContainerStyle={styles.scroll}
        >
          <View style={[styles.page, { width: screenWidth }]}>
            {favourites.length > 0 ? (
              <FlatList
                // contentContainerStyle={styles.page}
                data={favourites}
                renderItem={({ item, isActive, index }) => (
                  <TaskCard
                    data={item}
                    drag={() => {}}
                    isActive={isActive}
                    color={color}
                    index={index}
                    base={data}
                    setData={updateState}
                    fav={true}
                    onPress={() => setPeek(item)}
                  />
                )}
                nestedScrollEnabled={true}
              />
            ) : (
              <NoTask
                color={color}
                text='Mark important tasks with a star to see them here'
                height={Dimensions.get('window').height - 100}
              />
            )}
          </View>
          {data.length > 0 && (
            <NestableScrollContainer
              style={[styles.page, { width: screenWidth }]}
            >
              <NestableDraggableFlatList
                data={data}
                containerStyle={styles.scroll}
                renderItem={({ item, isActive, drag, getIndex }) => (
                  <TaskCard
                    data={item}
                    drag={drag}
                    isActive={isActive}
                    color={color}
                    index={getIndex()}
                    base={data}
                    setData={updateState}
                    onPress={() => setPeek(item)}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
                onDragEnd={handleDragEnd}
                nestedScrollEnabled={true}
              />
              <View style={{ height: 140 }}></View>
            </NestableScrollContainer>
          )}
        </Animated.ScrollView>
      </View>
      {peek && (
        <BottomSheet
          ref={sheetRef}
          snapPoints={[220, '50%']}
          r
          backgroundStyle={{
            backgroundColor: color.fgColor,
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
          }}
          handleIndicatorStyle={{
            backgroundColor: color.textColor,
          }}
          // footerComponent={CustomFooter}
          containerStyle={styles.sheet}
          renderContent={PeekCard}
          enablePanDownToClose
          keyboardBehavior='fillParent'
          android_keyboardInputMode='adjustResize'
          keyboardBlurBehavior='restore'
          index={peek ? 0 : -1}
          animateOnMount={true}
          onChange={handleSheetChanges}
        >
          <PeekCard
            index={sheetIndex}
            data={peek}
            base={data}
            setData={updateState}
            color={color}
            sheetRef={sheetRef}
            close={closeSheet}
          />
        </BottomSheet>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  head: {
    marginTop: 18,
    alignContent: 'flex-start',
  },
  page: {
    height: '100%',
    flex: 1.5,
    paddingVertical: 20,
  },
  line: {
    height: 3,
    minWidth: 24,
    maxWidth: 60,
    marginLeft: 23,
    borderTopLeftRadius: 10000,
    borderTopRightRadius: 10000,
    borderRadius: 900,
  },
  scroll: {
    // paddingBottom: 10,
  },
  sheet: {
    zIndex: 1000,
  },
  fadeBackground: {
    zIndex: 10,
    ...StyleSheet.absoluteFillObject,
    width: Dimensions.get('window').width,
    minHeight: Dimensions.get('window').height,
    backgroundColor: '#00000070',
  },
})
