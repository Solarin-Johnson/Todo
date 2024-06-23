import { useEffect, useRef, useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableNativeFeedback,
  View,
} from 'react-native'
import { Image } from 'expo-image'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  NavigationContainer,
  useNavigationContainerRef,
  useNavigation,
} from '@react-navigation/native'

import { loadData, saveData } from '../utils/store'

import { FontAwesome5 } from '@expo/vector-icons'
import Button from '../components/Button'
import { isAlphanumeric } from '../utils'
import InputText from '../components/Input'

export default WelcomeScreen = ({ route }) => {
  const { color, welcome } = route.params
  const responsive = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color?.bgColor,
    },
    text: {
      color: color?.textColor,
    },
  })

  if (color) {
    return (
      <SafeAreaView style={[responsive.container, styles.container]}>
        {!welcome ? (
          <EnterName responsive={responsive} color={color} />
        ) : (
          <NewUser responsive={responsive} color={color} />
        )}
      </SafeAreaView>
    )
  }
}

export const EnterName = ({ responsive, color }) => {
  const [uname, setUname] = useState('')
  const InputRef = useRef(null)

  const handleTextChange = (inputText) => {
    if (inputText.length > 0 && !isAlphanumeric(inputText)) {
      ToastAndroid.show(
        'Only letters and numbers are allowed',
        ToastAndroid.SHORT,
      )
    }
    const formattedText = inputText.replace(/[^a-zA-Z0-9]/g, '')
    setUname(formattedText)
  }

  return (
    <>
      <View style={styles.subContainer}>
        <Text style={[styles.title, responsive.text]}>Hello there!</Text>
        {/* <Text
        style={[
          styles.subTitle,
          responsive.text,
          { fontFamily: 'Raleway_500Medium', fontSize: 24 },
        ]}
      >
        Welcome
      </Text> */}
        <Text
          style={[
            styles.subTitle,
            { opacity: 0.7 },
            responsive.text,
            { fontFamily: 'Raleway_400Regular', paddingTop: 10, fontSize: 16 },
          ]}
        >
          Enter your name to continue to Todo
        </Text>
        <View
          style={[styles.inputContainer, { backgroundColor: color?.fgColor }]}
        >
          <FontAwesome5 name='user' size={18} color={color.textColor} />
          <InputText
            InputRef={InputRef}
            color={color}
            handleTextChange={handleTextChange}
            text={uname}
            placeholder={'Enter your display name'}
          />
        </View>
      </View>
      {uname.length > 1 && (
        <View style={styles.buttonArea}>
          <Button
            color={color}
            styleBtn={styles.button}
            styleText={styles.buttonText}
            text='Continue'
            path={'home'}
            action={() => saveData('uname', uname)}
          />
        </View>
      )}
    </>
  )
}
export const NewUser = ({ responsive, color }) => {
  return (
    <View
      style={[
        styles.subContainer,
        { justifyContent: 'center', alignContent: 'center' },
      ]}
    >
      <Image
        style={styles.image}
        source={require('../assets/welcome.png')}
        contentFit='contain'
        transition={500}
      />
      <View style={{ paddingBottom: 80 }}>
        <Text
          style={[
            responsive.text,
            styles.bottomText,
            { fontFamily: 'Raleway_500Medium', fontSize: 28 },
          ]}
        >
          Welcome to Todo
        </Text>
        <Text
          style={[
            responsive.text,

            styles.subTitle,
            styles.defText,
            {
              textAlign: 'center',
              fontSize: 16,
              opacity: 0.7,
              paddingVertical: 12,
            },
          ]}
        >
          Simplify your day, one task at a time
        </Text>
      </View>
      <View style={styles.buttonArea}>
        <Button
          text='Next'
          color={color}
          styleText={styles.buttonText}
          styleBtn={styles.button}
          path={'newUser'}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  subContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    paddingBottom: '10%',
    alignContent: 'center',
    // backgroundColor: 'red',
  },
  title: {
    fontSize: 32,
    // fontFamily: 'Nunito_700Bold',
    letterSpacing: -0.8,
    // paddingBottom: 10,
    textAlign: 'center',
  },
  defText: {
    fontFamily: 'Nunito_500Medium',
  },
  subTitle: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
    paddingBottom: 6,
  },
  inputContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 15,
    maxWidth: 350,
    //   borderColor: color.textColor,
  },

  buttonArea: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  button: {
    padding: 13,
    paddingHorizontal: 24,
    borderRadius: 5,
    minWidth: 130,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Nunito_600SemiBold',
    textAlign: 'center',
  },
  form: {
    flex: 1,
    alignContent: 'center',
    paddingTop: 30,
    backgroundColor: 'red',
  },
  image: {
    flex: 0.6,
    width: '100%',
  },
  bottomText: {
    alignSelf: 'center',
    fontSize: 24,
  },
})
