import LoginScreen from '../../../screens/authentication/LoginScreen';
import SignupScreen from '../../../screens/authentication/SignupScreen';
import ForgotPasswordScreen from '../../../screens/authentication/ForgotPasswordScreen';
import VerifyOtpScreen from '../../../screens/authentication/VerifyOtpScreen';
import ChangePasswordScreen from '../../../screens/authentication/ChangePasswordScreen';
import {
  VisitorNavigation,
  AdminNavigation,
  HomeownerNavigation,
  SecurityPersonnelNavigation,
} from '../../../utils/cycle';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator initialRouteName="LoginScreen">
    <Stack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{headerShown: false, animation: 'none'}}
    />
    <Stack.Screen
      name="SignupScreen"
      component={SignupScreen}
      options={{headerShown: false, animation: 'none'}}
    />
    <Stack.Screen
      name="ForgotPasswordScreen"
      component={ForgotPasswordScreen}
      options={{headerShown: false, animation: 'none'}}
    />
    <Stack.Screen
      name="VerifyOtpScreen"
      component={VerifyOtpScreen}
      options={{headerShown: false, animation: 'none'}}
    />
    <Stack.Screen
      name="ChangePasswordScreen"
      component={ChangePasswordScreen}
      options={{headerShown: false, animation: 'none'}}
    />
    <Stack.Screen
      name="AdminNavigation"
      component={AdminNavigation}
      options={{headerShown: false, animation: 'none'}}
    />
    <Stack.Screen
      name="HomeownerNavigation"
      component={HomeownerNavigation}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="SecurityPersonnelNavigation"
      component={SecurityPersonnelNavigation}
      options={{headerShown: false, animation: 'none'}}
    />
    <Stack.Screen
      name="VisitorNavigation"
      component={VisitorNavigation}
      options={{headerShown: false, animation: 'none'}}
    />
  </Stack.Navigator>
);

export default AuthNavigator;
