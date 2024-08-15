import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  BackHandler,
  ToastAndroid,
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  Button,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import io from 'socket.io-client';
import {getStyles} from '../../assets/styles/admin/adminTheme';
import api from '../../api/api';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SOCKET_IO} from '@env';

const AdminScreen = ({navigation}) => {
  const [userData, setUserData] = useState([]);
  const [homeowners, setHomeowners] = useState([]);
  const [securityPersonnels, setSecurityPersonnels] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [todayVisitors, setTodayVisitors] = useState([]);
  const [upcomingVisitors, setUpcomingVisitors] = useState([]);
  const [backPressCount, setBackPressCount] = useState(0);
  const theme = useSelector(state => state.theme.value);
  const styles = getStyles(theme);
  const socket = useRef(null);

  const fetchHomeowners = async () => {
    try {
      const response = await api.get('/protected/homeowner');
      setHomeowners(response.data);
    } catch (error) {
      console.error('Error fetching homeowners:', error);
    }
  };

  const fetchSecurityPersonnels = async () => {
    try {
      const response = await api.get('/protected/security-personnel');
      setSecurityPersonnels(response.data);
    } catch (error) {
      console.error('Error fetching security personnel:', error);
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

  const fetchTodayVisitors = async () => {
    try {
      const response = await api.get('/today-visitors');
      setTodayVisitors(response.data);
    } catch (error) {
      console.error('Error fetching visitors:', error);
    }
  };

  const fetchUpcomingVisitors = async () => {
    try {
      const response = await api.get('/upcoming-visitors');
      setUpcomingVisitors(response.data);
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

  console.log(upcomingVisitors);

  useEffect(() => {
    checkToken();
    fetchHomeowners();
    fetchSecurityPersonnels();
    fetchVisitors();
    fetchTodayVisitors();
    fetchUpcomingVisitors();

    socket.current = io(SOCKET_IO);
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
    <View style={styles.container}>
      <ScrollView>
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
              onPress={() => navigation.navigate('TerminalScreen')}>
              <Ionicons
                name="terminal"
                size={hp('2.8%')}
                color={styles.iconColor}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('NotificationScreen')}>
              <MaterialIcon
                name="notifications"
                size={hp('3.7%')}
                color={styles.iconColor}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.headerAnalytics}>Data Analytics</Text>
        </View>
        <View style={styles.dataContainer}>
          <TouchableOpacity
            style={styles.data}
            onPress={() => navigation.navigate('HomeownerListsScreen')}>
            <View
              style={{
                position: 'absolute',
                left: 10,
                top: 10,
              }}>
              <MaterialIcons
                name="manage-accounts"
                size={hp('3%')}
                color="#000"
              />
            </View>
            <Text style={styles.dataText}>{homeowners.length}</Text>
            <Text style={styles.dataSubText}>
              {homeowners.length > 1 ? 'Homeowners' : 'Homeowner'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.data}
            onPress={() => navigation.navigate('SecurityPersonnelListsScreen')}>
            <View
              style={{
                position: 'absolute',
                left: 10,
                top: 10,
              }}>
              <MaterialIcons
                name="manage-accounts"
                size={hp('3%')}
                color="#000"
              />
            </View>
            <Text style={styles.dataText}>{securityPersonnels.length}</Text>
            <Text style={styles.dataSubText}>
              {securityPersonnels.length > 1
                ? 'Security Personnels'
                : 'Security Personnel'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.data}
            onPress={() => navigation.navigate('VisitorListsScreen')}>
            <View
              style={{
                position: 'absolute',
                left: 10,
                top: 10,
              }}>
              <MaterialIcons
                name="manage-accounts"
                size={hp('3%')}
                color="#000"
              />
            </View>
            <Text style={styles.dataText}>{visitors.length}</Text>
            <Text style={styles.dataSubText}>
              {visitors.length > 1 ? 'Visitors' : 'Visitor'}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.headerAnalytics}>Today's Visitor</Text>
        </View>
        {todayVisitors.map(visitor => (
          <View
            key={visitor.hn_id}
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              backgroundColor: '#f6f8fa',
              borderRadius: 4,
              paddingVertical: hp('2%'),
              paddingHorizontal: hp('2%'),
              gap: 20,
            }}>
            <View
              style={{
                backgroundColor: visitor.profile_color,
                height: hp('5%'),
                width: hp('5%'),
                justifyContent: 'center',
                alignContent: 'center',
                borderRadius: 50,
              }}>
              <Text
                style={{
                  fontSize: hp('2%'),
                  color: '#fff',
                  alignSelf: 'center',
                }}>
                {visitor.first_name[0]}
              </Text>
            </View>
            <View>
              <Text style={{color: '#000', fontSize: hp('2%'), color: '#000'}}>
                {visitor.first_name} {visitor.last_name}
              </Text>
              <Text
                style={{color: '#000', fontSize: hp('1.8%'), color: '#666'}}>
                {visitor.email}
              </Text>
              <Text
                style={{color: '#000', fontSize: hp('1.8%'), color: '#666'}}>
                {visitor.contact_num}
              </Text>
            </View>
          </View>
        ))}
        <View>
          <Text style={styles.headerAnalytics}>Upcoming Visitor</Text>
        </View>
        {upcomingVisitors.map(visitor => (
          <View
            key={visitor.hn_id}
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              backgroundColor: '#f6f8fa',
              borderRadius: 4,
              paddingVertical: hp('2%'),
              paddingHorizontal: hp('2%'),
              gap: 20,
            }}>
            <View
              style={{
                backgroundColor: visitor.profile_color,
                height: hp('5%'),
                width: hp('5%'),
                justifyContent: 'center',
                alignContent: 'center',
                borderRadius: 50,
              }}>
              <Text
                style={{
                  fontSize: hp('2%'),
                  color: '#fff',
                  alignSelf: 'center',
                }}>
                {visitor.first_name[0]}
              </Text>
            </View>
            <View>
              <Text style={{color: '#000', fontSize: hp('2%'), color: '#000'}}>
                {visitor.first_name} {visitor.last_name}
              </Text>
              <Text
                style={{color: '#000', fontSize: hp('1.8%'), color: '#666'}}>
                {visitor.email}
              </Text>
              <Text
                style={{color: '#000', fontSize: hp('1.8%'), color: '#666'}}>
                {visitor.contact_num}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default AdminScreen;
