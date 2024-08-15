import VisitorNotificationScreen from '../../../screens/visitor/VisitorNotificationScreen';
import VisitorNotificationDetails from '../../../screens/visitor/VisitorNotificationDetails';
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
      options={{headerShown: false, animation: 'none'}}
    />
    <Stack.Screen
      name="VisitorNotificationScreen"
      component={VisitorNotificationScreen}
      options={{headerShown: false, animation: 'none'}}
    />
    <Stack.Screen
      name="VisitorNotificationDetails"
      component={VisitorNotificationDetails}
      options={{headerShown: false, animation: 'none'}}
    />
    <Stack.Screen
      name="RequestScreen"
      component={RequestScreen}
      options={{headerShown: false, animation: 'none'}}
    />
    <Stack.Screen
      name="HouseDetailScreen"
      component={HouseDetailScreen}
      options={{headerShown: false, animation: 'none'}}
    />
    <Stack.Screen
      name="AuthNavigation"
      component={AuthNavigation}
      options={{headerShown: false, animation: 'none'}}
    />
  </Stack.Navigator>
);

export default VisitorNavigator;
