import VisitorNotificationScreen from '../../../screens/visitor/VisitorNotificationScreen';
import HouseDetailScreen from '../../../screens/visitor/HouseDetailScreen';
import RequestScreen from '../../../screens/visitor/RequestScreen';
import VisitorTabNavigator from '../tab/VisitorTabNavigator';
import {AuthNavigation} from '../../../utils/cycle';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const VisitorNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="VisitorTabNavigator"
      component={VisitorTabNavigator}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="VisitorNotificationScreen"
      component={VisitorNotificationScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="RequestScreen"
      component={RequestScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="HouseDetailScreen"
      component={HouseDetailScreen}
      options={{headerShown: false, animation: 'slide_from_bottom'}}
    />
    <Stack.Screen
      name="AuthNavigation"
      component={AuthNavigation}
      options={{headerShown: false, animation: 'slide_from_bottom'}}
    />
  </Stack.Navigator>
);

export default VisitorNavigator;
