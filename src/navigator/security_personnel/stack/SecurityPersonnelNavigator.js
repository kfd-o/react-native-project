import SecurityPersonnelScreen from '../../../screens/security_personnel/SecurityPersonnelScreen';
import {AuthNavigation} from '../../../utils/cycle';
import SecurityPersonnelSettingScreen from '../../../screens/security_personnel/SecurityPersonnelSettingScreen';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const SecurityPersonnelNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="SecurityPersonnelScreen"
      component={SecurityPersonnelScreen}
      options={{headerShown: false, animation: 'none'}}
    />
    <Stack.Screen
      name="SecurityPersonnelSettingScreen"
      component={SecurityPersonnelSettingScreen}
      options={{headerShown: false, animation: 'none'}}
    />
    <Stack.Screen
      name="AuthNavigation"
      component={AuthNavigation}
      options={{headerShown: false, animation: 'none'}}
    />
  </Stack.Navigator>
);

export default SecurityPersonnelNavigator;
