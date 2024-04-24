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

export default HomeScreen = ({ route }) => {
  const navigation = useNavigation()
  const { color } = route.params
  const [isBackPressed, setIsBackPressed] = useState(false)
  const [uname, setuname] = useState()
  const [tasks, settasks] = useState()
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
      console.log('loadtask', loadTask)
      settasks(loadTask)
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

  console.log('tasks', tasks)

  useBackHandler(() => {
    if (isBackPressed) {
      BackHandler.exitApp()
      return true // Prevent default behavior
    } else {
      ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT)
      setIsBackPressed(true) // Set flag to true
      setTimeout(() => setIsBackPressed(false), 2000) // Reset flag after 2 seconds
      return true // Prevent default behavior
    }
  })

  return (
    <>
      {newTask && <NewTask color={color} close={setnewTask} />}
      <SafeAreaView
        style={[{ backgroundColor: color?.fgColor }, styles.container]}
      >
        <View style={styles.head}>
          {uname && (
            <Text style={[styles.greetings, { color: color?.primaryColor }]}>
              {greetings()} <Truncate text={uname} />
            </Text>
          )}
          <FontAwesome6
            name='bars-staggered'
            size={24}
            color={color?.textColor}
          />
        </View>

        {!tasks ? <NoTask color={color} /> : <Text>Okay</Text>}
        <View
          style={[
            { backgroundColor: color?.accentColor },
            styles.plusContainer,
          ]}
        >
          {!newTask && (
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#33333', false)}
              onPress={() => setnewTask(!newTask)}
            >
              <View style={styles.plus}>
                <FontAwesome6 name='plus' size={24} color={color?.bgColor} />
              </View>
            </TouchableNativeFeedback>
          )}
        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  greetings: {
    fontSize: 22,
    fontFamily: 'Nunito_700Bold',
  },
  defText: {
    fontFamily: 'Nunito_500Medium',
  },
  head: {
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  plusContainer: {
    position: 'absolute',
    bottom: 60,
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
