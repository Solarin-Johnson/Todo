import AsyncStorage from '@react-native-async-storage/async-storage'

export const saveData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, data)
    console.log(data, 'saved successfully')
  } catch (error) {
    console.error('Error saving data:', error)
  }
}

export const loadData = async (key, alt) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if (value !== null) {
      return value
    } else {
      saveData(key, alt)
      return alt
    }
  } catch (error) {
    console.error('Error loading data:', error)
  }
}

export const removeItemFromStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key)
    console.log(key, 'removed successfully')
  } catch (error) {
    console.error('Error removing item from AsyncStorage:', error)
  }
}
