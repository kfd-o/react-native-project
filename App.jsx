import React, { useEffect } from 'react'
import MainNavigator from './src/navigator/MainNavigator'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { store } from './src/store/store'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { lightMode, darkMode, systemMode } from './src/features/themeSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useColorScheme } from 'react-native'

const ThemeProvider = ({ children }) => {
  const dispatch = useDispatch()
  const colorScheme = useColorScheme()
  const theme = useSelector((state) => state.theme.value)

  useEffect(() => {
    const getTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('theme')
      if (storedTheme) {
        if (storedTheme === 'light') {
          dispatch(lightMode())
        } else if (storedTheme === 'dark') {
          dispatch(darkMode())
        } else {
          dispatch(systemMode(colorScheme))
        }
      } else {
        dispatch(systemMode(colorScheme))
      }
    }

    getTheme()
  }, [colorScheme, dispatch])

  return children
}

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <MainNavigator />
        </GestureHandlerRootView>
      </ThemeProvider>
    </Provider>
  )
}

export default App
