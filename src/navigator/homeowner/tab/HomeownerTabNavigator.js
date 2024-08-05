import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeownerScreen from '../../../screens/homeowner/HomeownerScreen';
import HomeownerRequestRFID from '../../../screens/homeowner/HomeownerRequestRFID';
import HomeownerSettingScreen from '../../../screens/homeowner/HomeownerSettingScreen';
import HomeownerNotificationScreen from '../../../screens/homeowner/HomeownerNotificationScreen';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Tab = createBottomTabNavigator();

const HomeownerTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#36454F',
        tabBarInactiveTintColor: '#36454F',
        tabBarIcon: ({focused}) => {
          let iconName;
          let IconComponent = MaterialCommunityIcons;

          switch (route.name) {
            case 'HomeownerScreen':
              iconName = focused ? 'home-variant' : 'home-variant-outline';
              break;
            case 'HomeownerRequestRFID':
              iconName = focused ? 'rectangle' : 'rectangle-outline';
              break;
            case 'HomeownerSettingScreen':
              iconName = focused ? 'account' : 'account-outline';
              break;
            default:
              break;
          }

          return (
            <IconComponent name={iconName} size={hp('4%')} color="#36454F" />
          );
        },
      })}>
      <Tab.Screen
        name="HomeownerScreen"
        component={HomeownerScreen}
        options={{headerShown: false, tabBarLabel: 'Home'}}
      />
      <Tab.Screen
        name="HomeownerRequestRFID"
        component={HomeownerRequestRFID}
        options={{headerShown: false, tabBarLabel: 'RFID Registration'}}
      />

      <Tab.Screen
        name="HomeownerSettingScreen"
        component={HomeownerSettingScreen}
        options={{headerShown: false, tabBarLabel: 'Profile'}}
      />
    </Tab.Navigator>
  );
};

export default HomeownerTabNavigator;
