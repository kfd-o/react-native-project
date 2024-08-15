import React, {useRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AdminScreen from '../../../screens/admin/AdminScreen';
import AdminSettingScreen from '../../../screens/admin/AdminSettingScreen';
import BottomSheet from '@gorhom/bottom-sheet';
import CustomTabBar from '../../../screens/admin/CustomTabBar';
import {useSelector} from 'react-redux';
import {getStyles} from '../../../assets/styles/admin/tabTheme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Tab = createBottomTabNavigator();

const AdminTabNavigator = ({navigation}) => {
  const theme = useSelector(state => state.theme.value);
  const bottomSheetRef = useRef(null);
  const snapPoints = React.useMemo(() => ['32%'], []);

  const styles = getStyles(theme);

  return (
    <>
      <Tab.Navigator
        initialRouteName="AdminScreen"
        tabBar={props => (
          <CustomTabBar {...props} bottomSheetRef={bottomSheetRef} />
        )}>
        <Tab.Screen
          name="AdminScreen"
          component={AdminScreen}
          options={{headerShown: false, tabBarLabel: 'Home'}}
        />
        <Tab.Screen
          name="AdminSettingScreen"
          component={AdminSettingScreen}
          options={{headerShown: false, tabBarLabel: 'Profile'}}
        />
      </Tab.Navigator>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundStyle={styles.backgroundStyle}
        handleIndicatorStyle={styles.handleIndicatorStyle}
        handleStyle={styles.handleStyle}
        style={styles.style}>
        <View style={styles.bottomSheetContent}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('SignupHomeownerScreen')}>
            <MaterialCommunityIcons
              name="account"
              size={hp('3.6%')}
              color={styles.iconColor}
            />
            <Text style={styles.text}>New Homeowner Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('SignupSecurityPersonnelScreen')
            }>
            <MaterialCommunityIcons
              name="account"
              size={hp('3.6%')}
              color={styles.iconColor}
            />
            <Text style={styles.text}>New Security Personnel Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('AddHomeScreen')}>
            <MaterialCommunityIcons
              name="home-variant"
              size={hp('3.6%')}
              color={styles.iconColor}
            />
            <Text style={styles.text}>New House Model</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('QRCodeScannerScreen')}>
            <MaterialIcon
              name="qr-code-scanner"
              size={20}
              color={styles.iconColor.color}
            />
            <Text style={styles.text}>QR Code Scanner</Text>
          </TouchableOpacity> */}
        </View>
      </BottomSheet>
    </>
  );
};

export default AdminTabNavigator;
