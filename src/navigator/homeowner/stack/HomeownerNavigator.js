import { AuthNavigation } from '../../../utils/cycle';
import HomeownerTabNavigator from '../tab/HomeownerTabNavigator';
import HomeownerAccountScreen from '../../../screens/homeowner/HomeownerAccountScreen';
import HomeownerNotificationDetails from '../../../screens/homeowner/HomeownerNotificationDetails';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeownerNotificationScreen from '../../../screens/homeowner/HomeownerNotificationScreen';

const Stack = createNativeStackNavigator();

const HomeownerNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name="HomeownerTabNavigator" component={HomeownerTabNavigator} options={{ headerShown: false, animation: 'slide_from_bottom' }} />
        <Stack.Screen name="HomeownerAccountScreen" component={HomeownerAccountScreen} options={{ headerShown: false, animation: 'slide_from_bottom' }} />
        <Stack.Screen name="HomeownerNotificationScreen" component={HomeownerNotificationScreen} options={{ headerShown: false, animation: 'slide_from_bottom' }} />
        
        <Stack.Screen name="HomeownerNotificationDetails" component={HomeownerNotificationDetails} options={{ headerShown: false, animation: 'slide_from_bottom' }} />
        
        <Stack.Screen name="AuthNavigation" component={AuthNavigation} options={{ headerShown: false }} />
    </Stack.Navigator>
);

export default HomeownerNavigator