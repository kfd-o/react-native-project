import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {getStyles} from '../../../assets/styles/visitor/tabTheme';
import VisitorScreen from '../../../screens/visitor/VisitorScreen';
import VisitorSettingScreen from '../../../screens/visitor/VisitorSettingScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const VisitorTabNavigator = () => {
  const theme = useSelector(state => state.theme.value);
  const styles = getStyles(theme);

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
              iconName = 'home-variant';
              break;
            case 'VisitorSettingScreen':
              iconName = 'account';
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
