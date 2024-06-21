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

import DraggableFlatList, { NestableDraggableFlatList, NestableScrollContainer } from 'react-native-draggable-flatlist'
import { saveData } from '../utils/store'
import NoTask from './NoTask'

export default function TaskList({ tasks, color, empty }) {
  const scrollX = useRef(new Animated.Value(0)).current
  const adjWidth = useRef(new Animated.Value(20)).current
  const [favourites, setfavourites] = useState([])
  const [scrollLeft, setScrollLeft] = useState(0)
  const [data, setdata] = useState([])
  const scrollRef = useRef(null)
  const { width: screenWidth } = useWindowDimensions()

  useEffect(() => {
    setdata(tasks)
  }, [tasks])

  console.log(data);

  useEffect(() => {
    setfavourites(data.filter((item) => item.fav === true))
    
  }, [data])

  const calculateScrollPercentage = () => {
    // Calculate the percentage of scroll
    const totalWidth = screenWidth * 1.82 // Total width of all pages
    const scrollValue = Animated.divide(scrollX, totalWidth)
    return Animated.multiply(scrollValue, 100)
  }

  const calculateWidth = () => {
    const totalWidth = screenWidth
    const scrollValue = Animated.divide(adjWidth, totalWidth)
    return Animated.multiply(scrollValue, 100)
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

  const handleDragEnd = ({ data }) => {
    setdata(data)
    saveData('tasks', JSON.stringify(data))
  }

  const updateState = (x) => {
    setdata(x)
    if(x.length <=0 ){
      saveData('tasks', '')
    }
    else{
      saveData('tasks', JSON.stringify(x))

    }
  }

  return (
    <View style={styles.container}>
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
        onContentSizeChange={() => scrollRef.current.scrollToEnd({ animated: false })}
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          handleScroll(e)
          handleScrollWidth(e)
          getScrollLeft(e)
        }}
        scrollEventThrottle={0}
        snapToOffsets={[0, screenWidth + 100]} // Snap to each page
        overScrollMode='never'
        decelerationRate='fast'
        contentContainerStyle={styles.scroll}
        >
        <View style={{ width: screenWidth }}>
          {favourites.length > 0 ? (
            <FlatList
            alwaysBounceHorizontal
            contentContainerStyle={styles.page}
            data={favourites}
              renderItem={({ item, isActive, drag, index }) => (
                <TaskCard
                  data={item}
                  drag={drag}
                  isActive={isActive}
                  color={color}
                  index={index}
                  base={data}
                  setData={updateState}
                  fav={true}
                />
              )}
              nestedScrollEnabled={true}
            />
          )
          :
          <NoTask color={color} text={'Mark important tasks with a star to see them here'}/>
        
        }
        </View>
        {data.length > 0 && (
          <NestableScrollContainer style={[styles.page, {width: screenWidth}]}>
          <NestableDraggableFlatList
            data={data}
            renderItem={({ item, isActive, drag, getIndex }) => (
              <TaskCard
                data={item}
                drag={drag}
                isActive={isActive}
                color={color}
                index={getIndex()}
                base={data}
                setData={updateState}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            onDragEnd={handleDragEnd}
            nestedScrollEnabled={true}
            
          />
          </NestableScrollContainer>
        )}
        {/* </View> */}
      </ScrollView>
    </View>
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
    maxWidth:60,
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
