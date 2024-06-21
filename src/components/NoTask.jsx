import { Image } from 'expo-image'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'

export default NoTask = ({ color, text }) => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
    >
      <Image
        style={styles.image}
        source={require('../assets/emptytask.png')}
        contentFit='contain'
        transition={500}
      />
      <Text style={[styles.text, { color: color?.textColor }]}>
        {text ? text : 'Add a task now to get started'}
      </Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: Dimensions.get('window').height,
    // backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '45%',
  },
  text: {
    textAlign: 'center',
    flex: 0.45,
    fontSize: 16,
    opacity: 0.6,
    fontFamily: 'Nunito_500Medium',
    paddingHorizontal: 20,
  },
})
