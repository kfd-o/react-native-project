import React, {useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {lightMode, darkMode, systemMode} from '../../../features/themeSlice';
import {getStyles} from '../../../assets/styles/admin/tabTheme';
import VisitorScreen from '../../../screens/visitor/VisitorScreen';
import VisitorSettingScreen from '../../../screens/visitor/VisitorSettingScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const VisitorTabNavigator = () => {
  const value = useSelector(state => state.theme.value);
  const dispatch = useDispatch();
  const color = useColorScheme();
  const styles = getStyles(value);

  const getTheme = async () => {
    try {
      const phoneTheme = await AsyncStorage.getItem('theme');
      if (phoneTheme === null) {
        dispatch(systemMode(color));
        await AsyncStorage.setItem('theme', 'system');
      } else {
        if (phoneTheme === 'light') {
          dispatch(lightMode());
        } else if (phoneTheme === 'dark') {
          dispatch(darkMode());
        } else {
          dispatch(systemMode(color));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTheme();
  }, [color, dispatch]);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarIconStyle: styles.tabBarIconStyle,
        tabBarActiveTintColor: '#36454F',
        tabBarInactiveTintColor: '#36454F',
        tabBarStyle: styles.tabBarStyle,
        tabBarIcon: ({focused}) => {
          let iconName;

          switch (route.name) {
            case 'VisitorScreen':
              iconName = focused ? 'home-variant' : 'home-variant-outline';
              break;
            case 'VisitorSettingScreen':
              iconName = focused ? 'account' : 'account-outline';
              break;
            default:
              break;
          }

          return <Icon name={iconName} size={hp('4%')} color="#36454F" />;
        },
      })}>
      <Tab.Screen
        name="VisitorScreen"
        component={VisitorScreen}
        options={{headerShown: false, tabBarLabel: 'Home'}}
      />
      <Tab.Screen
        name="VisitorSettingScreen"
        component={VisitorSettingScreen}
        options={{headerShown: false, tabBarLabel: 'Profile'}}
      />
    </Tab.Navigator>
  );
};

export default VisitorTabNavigator;
