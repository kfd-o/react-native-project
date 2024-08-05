import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  BackHandler,
  ToastAndroid,
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import io from 'socket.io-client';
import {getStyles} from '../../assets/styles/admin/adminTheme';
import api from '../../api/api';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const AdminScreen = ({navigation}) => {
  const [userData, setUserData] = useState([]);
  const [homeowners, setHomeowners] = useState([]);
  const [securityPersonnels, setSecurityPersonnels] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [backPressCount, setBackPressCount] = useState(0);
  const theme = useSelector(state => state.theme.value);
  const styles = getStyles(theme);
  const socket = useRef(null);

  const fetchHomeowners = async () => {
    try {
      const response = await api.get('/protected/homeowner');
      setHomeowners(response.data);
    } catch (error) {
      console.error('Error fetching visitors:', error);
    }
  };

  const fetchSecurityPersonnels = async () => {
    try {
      const response = await api.get('/protected/security-personnel');
      setSecurityPersonnels(response.data);
    } catch (error) {
      console.error('Error fetching visitors:', error);
    }
  };

  const fetchVisitors = async () => {
    try {
      const response = await api.get('/protected/visitor');
      setVisitors(response.data);
    } catch (error) {
      console.error('Error fetching visitors:', error);
    }
  };

  const checkToken = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    try {
      const response = await api.post('/check-token', null, {
        headers: {Authorization: `Bearer ${accessToken}`},
      });
      setUserData(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          const response = await api.post('/refresh-token', {
            token: refreshToken,
          });
          const {token: newAccessToken, refresh_token: newRefreshToken} =
            response.data;
          await AsyncStorage.setItem('accessToken', newAccessToken);
          await AsyncStorage.setItem('refreshToken', newRefreshToken);
          checkToken();
        } catch (refreshError) {
          handleLogout();
        }
      } else {
        console.error(error);
      }
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'AuthNavigator'}],
      }),
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (backPressCount === 0) {
          setBackPressCount(1);
          ToastAndroid.show('Tap again to exit', ToastAndroid.SHORT);
          setTimeout(() => {
            setBackPressCount(0);
          }, 2000);
          return true;
        } else {
          BackHandler.exitApp();
        }
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [backPressCount]),
  );

  useEffect(() => {
    checkToken();
    fetchHomeowners();
    fetchSecurityPersonnels();
    fetchVisitors();

    socket.current = io('http://192.168.100.91:8080');
    socket.current.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });
    socket.current.on('new-user', userData => {
      console.log(userData);
      setVisitors(prevVisitors => [...prevVisitors, userData]);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profile}>
          <TouchableOpacity
            style={[
              styles.profileIcon,
              {backgroundColor: userData.profile_color},
            ]}
            onPress={() => navigation.navigate('AdminSettingScreen')}>
            <Text style={styles.profileInitial}>
              {userData.first_name && userData.first_name[0]}
            </Text>
          </TouchableOpacity>
          <Text style={styles.profileName}>{userData.first_name}</Text>
        </View>
        <View style={styles.notificationIcon}>
          <TouchableOpacity
            onPress={() => navigation.navigate('NotificationScreen')}>
            <MaterialIcon
              name="notifications"
              size={hp('3.6%')}
              color={styles.iconColor}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 20,
          paddingBottom: 10,
        }}>
        <Text style={styles.headerAnalytics}>Data Analytics</Text>
      </View>
      <View style={styles.dataContainer}>
        <TouchableOpacity
          style={[styles.data, {backgroundColor: '#533747'}]}
          onPress={() => navigation.navigate('HomeownerListsScreen')}>
          <Text style={styles.dataText}>{homeowners.length}</Text>
          <Text style={styles.dataSubText}>
            {homeowners.length > 1 ? 'Homeowners' : 'Homeowner'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.data, {backgroundColor: '#048A81'}]}
          onPress={() => navigation.navigate('SecurityPersonnelListsScreen')}>
          <Text style={styles.dataText}>{securityPersonnels.length}</Text>
          <Text style={styles.dataSubText}>
            {securityPersonnels.length > 1
              ? 'Security Personnels'
              : 'Security Personnel'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.data, {backgroundColor: '#364958'}]}
          onPress={() => navigation.navigate('VisitorListsScreen')}>
          <Text style={styles.dataText}>{visitors.length}</Text>
          <Text style={styles.dataSubText}>
            {visitors.length > 1 ? 'Visitors' : 'Visitor'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.data,
            {backgroundColor: '#44633F'},
          ]}></TouchableOpacity>
      </View>
      <View style={styles.analyticsContainer}>
        <TouchableOpacity style={styles.analytics}></TouchableOpacity>
        <TouchableOpacity style={styles.analytics}></TouchableOpacity>
      </View>
      <View style={styles.analyticsContainer}>
        <Text style={styles.headerAnalytics}>Today's Visitor</Text>
      </View>
      <View style={styles.analyticsContainer}>
        <Text style={{color: 'black'}}>Amenities</Text>
        <View>
          <Text style={{color: 'black'}}>John Doe</Text>
          <Text style={{color: 'black'}}>Swimming Pool</Text>
          <Text style={{color: 'black'}}>5:00 PM - 12:00 PM</Text>
          <Text style={{color: 'black'}}>{`12 people`}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default AdminScreen;
