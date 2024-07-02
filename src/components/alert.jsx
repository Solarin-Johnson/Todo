import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { NameContext } from '../context/NameContext'
import Button, { XButton } from './Button'

export default function Alert({ visible, setVisible, title, description }) {
  const bottom = useSharedValue(200)
  const { color, setTasks } = useContext(NameContext)

  const springConfig = {
    damping: 10,
    stiffness: 100,
    mass: 0.2,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.05,
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: bottom.value }],
    }
  })

  useEffect(() => {
    if (visible) {
      bottom.value = withSpring(0, springConfig)
    } else {
      bottom.value = withSpring(200, springConfig)
    }
  }, [visible])
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
      style={{ backgroundColor: 'red' }}
      onRequestClose={() => {
        setVisible(!visible)
      }}
    >
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
        <View style={styles.container}>
          <Animated.View
            style={[
              styles.alert,
              animatedStyle,
              { backgroundColor: color?.fgColor },
            ]}
          >
            <Text style={[styles.title, { color: color?.textColor }]}>
              {title}
            </Text>
            <Text style={[styles.description, { color: color?.textColor }]}>
              {description}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 24,
                alignContent: 'center',
              }}
            >
              <XButton
                styleBtn={[
                  styles.button,
                  {
                    backgroundColor: color?.textColor + '10',
                  },
                ]}
                styleText={[styles.btnText, { color: color?.textColor }]}
                text='Cancel'
                action={() => setVisible(false)}
              />
              <XButton
                styleBtn={[
                  styles.button,
                  {
                    backgroundColor: color?.accentColor,
                  },
                ]}
                styleText={[styles.btnText, { color: color?.fgColor }]}
                color={color}
                text='Delete'
                action={() => {
                  setVisible(false)
                  setTasks('')
                }}
              />
            </View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  alert: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 18,
    marginBottom: 20,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Nunito_700Bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    fontFamily: 'Nunito_500Medium',
    textAlign: 'center',
    marginTop: 10,
    opacity: 0.8,
  },
  button: {
    padding: 12.5,
    paddingHorizontal: 24,
    minWidth: 130,
  },
  btnText: {
    fontSize: 16,
    fontFamily: 'Nunito_600SemiBold',
    textAlign: 'center',
  },
})
