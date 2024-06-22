import React, { useEffect, useState } from 'react'
import {
  ToastAndroid,
  BackHandler,
  Text,
  StyleSheet,
  View,
  TouchableNativeFeedback,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useBackHandler } from '@react-native-community/hooks'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Truncate, greetings } from '../utils'
import { loadData, removeItemFromStorage } from '../utils/store'
import { FontAwesome6 } from '@expo/vector-icons'
import NoTask from '../components/NoTask'
import NewTask from '../components/NewTask'
import Header from '../navigation/Header'
import TaskList from '../components/Tasks'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default HomeScreen = ({ route }) => {
  const navigation = useNavigation()
  const { color } = route.params
  const [isBackPressed, setIsBackPressed] = useState(false)
  const [uname, setuname] = useState()
  const [tasks, settasks] = useState('')
  const [newTask, setnewTask] = useState(false)
  // removeItemFromStorage('tasks')
  const CheckUname = async () => {
    const loadUname = await loadData('uname', '')
    if (loadUname !== '') {
      setuname(loadUname)
    } else {
      setuname(false)
    }
  }
  const LoadTasks = async () => {
    const loadTask = await loadData('tasks', '')
    if (loadTask !== '') {
      settasks(JSON.parse(loadTask))
    } else {
      settasks(false)
    }
  }
  useEffect(() => {
    LoadTasks()
  }, [newTask])
  useEffect(() => {
    CheckUname()
    LoadTasks()
  }, [])

  useBackHandler(() => {
    if (!newTask) {
      if (isBackPressed) {
        BackHandler.exitApp()
        return true // Prevent default behavior
      } else {
        ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT)
        setIsBackPressed(true) // Set flag to true
        setTimeout(() => setIsBackPressed(false), 2000) // Reset flag after 2 seconds
        return true // Prevent default behavior
      }
    }
  })

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView
        style={[{ backgroundColor: color?.fgColor }, styles.container]}
      >
        <Header color={color} uname={uname} />
        {!tasks || tasks.length < 1 ? (
          <NoTask color={color} />
        ) : (
          <TaskList
            tasks={tasks}
            color={color}
            empty={(e) => e && settasks('')}
          />
        )}
        <View
          style={[
            { backgroundColor: color?.accentColor },
            styles.plusContainer,
          ]}
        >
          {!newTask && (
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#33333', false)}
              onPress={() => setnewTask(true)}
            >
              <View style={styles.plus}>
                <FontAwesome6 name='plus' size={24} color={color?.bgColor} />
              </View>
            </TouchableNativeFeedback>
          )}
        </View>
      </SafeAreaView>
      {newTask && <NewTask color={color} close={setnewTask} />}
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },

  defText: {
    fontFamily: 'Nunito_500Medium',
  },

  plusContainer: {
    position: 'absolute',
    bottom: 50,
    right: 30,
    borderRadius: 200,
    overflow: 'hidden',
  },
  plus: {
    width: 65,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
