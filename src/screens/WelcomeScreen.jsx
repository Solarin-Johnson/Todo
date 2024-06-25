import { useContext, useEffect, useRef, useState } from 'react'
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
import { NameContext } from '../context/NameContext'

export default WelcomeScreen = ({ route }) => {
  const { color, welcome, uname } = route.params
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
  const InputRef = useRef(null)
  const { name, setName } = useContext(NameContext)
  const [uname, setUname] = useState(name)

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
        <Image
          style={styles.logo}
          source={require('../assets/splash.png')}
          contentFit='cover'
        />
        <Text style={[styles.title, responsive.text]}>Todo</Text>
        <Text
          style={[
            styles.subTitle,
            { opacity: 0.7 },
            responsive.text,
            { fontFamily: 'Raleway_400Regular', fontSize: 14 },
          ]}
        >
          Enter your name to continue
        </Text>
        <View
          style={[styles.inputContainer, { backgroundColor: color?.fgColor }]}
        >
          <FontAwesome5 name='user' size={18} color={color.textColor + 'cd'} />
          <InputText
            InputRef={InputRef}
            color={color}
            handleTextChange={handleTextChange}
            text={uname}
            size={16}
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
            action={() => setName(uname)}
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
    fontSize: 30,
    // fontFamily: 'Nunito_700Bold',
    letterSpacing: -0.8,
    paddingBottom: 32,
    textAlign: 'center',
    opacity: 0.8,
  },
  defText: {
    fontFamily: 'Nunito_500Medium',
  },
  subTitle: {
    textAlign: 'center',
    fontWeight: '400',
    paddingBottom: 5,
  },
  inputContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 8,
    marginTop: 10,
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
  logo: {
    height: 70,
    marginBottom: 10,
  },
  bottomText: {
    alignSelf: 'center',
    fontSize: 24,
  },
})
