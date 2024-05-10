import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import TaskNav from '../navigation/TasksNav'
import { TaskCard } from './TaskCard'

import DraggableFlatList from 'react-native-draggable-flatlist'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { saveData } from '../utils/store'

export default function TaskList({ tasks, color }) {
  const scrollX = useRef(new Animated.Value(0)).current
  const adjWidth = useRef(new Animated.Value(20)).current
  const [favourites, setfavourites] = useState([])
  const [scrollLeft, setScrollLeft] = useState(0)
  const [data, setdata] = useState([])
  const scrollRef = useRef(null)
  const { width: screenWidth } = useWindowDimensions()

  useEffect(() => {
    setfavourites(tasks.filter((item) => item.fav === true))
    setdata(tasks)
  }, [tasks])

  const calculateScrollPercentage = () => {
    // Calculate the percentage of scroll
    const totalWidth = screenWidth * 1.84 // Total width of all pages
    const scrollValue = Animated.divide(scrollX, totalWidth)
    return Animated.multiply(scrollValue, 100)
  }

  const calculateWidth = () => {
    const totalWidth = screenWidth / 2
    const scrollValue = Animated.divide(adjWidth, totalWidth)
    return Animated.multiply(scrollValue, 30)
  }

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false },
  )

  const handleScrollWidth = Animated.event(
    [{ nativeEvent: { contentOffset: { x: adjWidth } } }],
    { useNativeDriver: false },
  )

  const getScrollLeft = (e) => {
    const { contentOffset } = e.nativeEvent
    setScrollLeft(contentOffset.x)
  }

  const handleRowMoved = ({ from, to }) => {
    const newData = [...data]
    const itemToMove = newData[from]
    newData.splice(from, 1)
    newData.splice(to, 0, itemToMove)

    setdata(newData)

    AsyncStorage.setItem('listData', JSON.stringify(newData))
  }
  useEffect(() => {
    scrollRef.current.scrollToEnd({ animated: false })
  }, [])

  const handleDragEnd = ({ data }) => {
    setdata(data)
    saveData('tasks', JSON.stringify(data))
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View
        style={[
          styles.head,
          { borderBottomWidth: 1, borderBlockColor: color.textColor + '60' },
        ]}
      >
        <TaskNav
          color={color}
          state={calculateWidth()}
          scrollLeft={scrollLeft}
          scrollRef={scrollRef.current}
        />
        <Animated.View
          style={[
            styles.line,
            {
              transform: [{ translateX: calculateScrollPercentage() }],
              width: calculateWidth(),
              backgroundColor: color?.accentColor,
            },
          ]}
        />
      </View>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          handleScroll(e)
          handleScrollWidth(e)
          getScrollLeft(e)
        }}
        scrollEventThrottle={-100}
        snapToOffsets={[0, screenWidth]} // Snap to each page
        decelerationRate='fast'
        overScrollMode='never'
        alwaysBounceHorizontal
        contentContainerStyle={styles.scroll}
      >
        {/* <View }> */}
        {favourites.length > 0 && (
          <DraggableFlatList
            contentContainerStyle={[styles.page, { width: screenWidth }]}
            data={favourites}
            horizontal={false}
            renderItem={({ item, isActive, drag, getIndex }) => (
              <TaskCard
                data={item}
                drag={drag}
                isActive={isActive}
                color={color}
                index={getIndex()}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            onDragEnd={handleDragEnd}
            nestedScrollEnabled={true}
          />
        )}
        {/* </View> */}
        {/* {tasks.length > 0 && (
              <FlatList
              data={tasks}
              renderItem={({ item }) => <TaskCard data={item} />}
              keyExtractor={(data) => data?.id?.toString()}
              />
            )} */}
        {data.length > 0 && (
          <DraggableFlatList
            contentContainerStyle={[styles.page, { width: screenWidth }]}
            data={data}
            renderItem={({ item, isActive, drag, getIndex }) => (
              <TaskCard
                data={item}
                drag={drag}
                isActive={isActive}
                color={color}
                index={getIndex()}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            onDragEnd={handleDragEnd}
            nestedScrollEnabled={true}
          />
        )}
      </ScrollView>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  head: {
    marginTop: 24,
    alignContent: 'flex-start',
  },
  page: {
    height: '100%',
    flex: 1,
    marginTop: 20,
  },
  line: {
    // position: 'absolute',
    // top: 30,
    // left: 0,
    height: 3,
    minWidth: 24,
    marginLeft: 23,
    borderTopLeftRadius: 10000,
    borderTopRightRadius: 10000,
    borderRadius: 900,
    backgroundColor: 'red',
  },
  scroll: {
    // paddingHorizontal: 20,
  },
})
