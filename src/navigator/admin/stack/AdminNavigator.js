import HomeownerListsScreen from '../../../screens/admin/HomeownerListsScreen';
import SecurityPersonnelListsScreen from '../../../screens/admin/SecurityPersonnelListsScreen';
import VisitorListsScreen from '../../../screens/admin/VisitorListsScreen';
import SignupHomeownerScreen from '../../../screens/admin/SignupHomeownerScreen';
import SignupSecurityPersonnelScreen from '../../../screens/admin/SignupSecurityPersonnelScreen';
import QRCodeScannerScreen from '../../../screens/admin/QRCodeScannerScreen';
import AccountScreen from '../../../screens/admin/AccountScreen';
import AdminTabNavigator from '../tab/AdminTabNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddHomeScreen from '../../../screens/admin/AddHomeScreen';
import SampleHouse from '../../../screens/admin/SampleHouse';
import {AuthNavigation} from '../../../utils/cycle';
import NotificationScreen from '../../../screens/admin/NotificationScreen';
import TerminalScreen from '../../../screens/admin/TerminalScreen';

const Stack = createNativeStackNavigator();

const AdminNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="AdminTabNavigator"
      component={AdminTabNavigator}
      options={{headerShown: false, animation: 'none'}}
    />
    <Stack.Screen
      name="TerminalScreen"
      component={TerminalScreen}
      options={{headerShown: false, animation: 'none'}}
    />
    <Stack.Screen
      name="NotificationScreen"
      component={NotificationScreen}
      options={{headerShown: false, animation: 'none'}}
    />
    <Stack.Screen
      name="HomeownerListsScreen"
      component={HomeownerListsScreen}
      options={{headerShown: false, animation: 'none'}}
    />
    <Stack.Screen
      name="SecurityPersonnelListsScreen"
      component={SecurityPersonnelListsScreen}
      options={{headerShown: false, animation: 'none'}}
    />
    <Stack.Screen
      name="VisitorListsScreen"
      component={VisitorListsScreen}
      options={{headerShown: false, animation: 'none'}}
    />
    <Stack.Screen
      name="AccountScreen"
      component={AccountScreen}
      options={{headerShown: false, animation: 'none'}}
    />
    <Stack.Screen
      name="AddHomeScreen"
      component={AddHomeScreen}
      options={{headerShown: false, animation: 'none'}}
    />
    <Stack.Screen
      name="SignupHomeownerScreen"
      component={SignupHomeownerScreen}
      options={{headerShown: false, animation: 'none'}}
    />
    <Stack.Screen
      name="SignupSecurityPersonnelScreen"
      component={SignupSecurityPersonnelScreen}
      options={{headerShown: false, animation: 'none'}}
    />
    <Stack.Screen
      name="QRCodeScannerScreen"
      component={QRCodeScannerScreen}
      options={{headerShown: false, animation: 'none'}}
    />
    <Stack.Screen
      name="SampleHouse"
      component={SampleHouse}
      options={{headerShown: false, animation: 'none'}}
    />
    <Stack.Screen
      name="AuthNavigation"
      component={AuthNavigation}
      options={{headerShown: false, animation: 'none'}}
    />
  </Stack.Navigator>
);

export default AdminNavigator;
