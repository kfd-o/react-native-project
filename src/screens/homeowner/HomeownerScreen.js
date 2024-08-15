import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import api from '../../api/api';
import {CommonActions} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import io from 'socket.io-client';

const HomeownerScreen = ({navigation}) => {
  const [userData, setUserData] = useState([]);
  const [badgeCount, setBadgeCount] = useState(0);
  const socket = useRef(null);
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async userId => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    try {
      const response = await api.get(`/homeowner-notification/${userId}`, {
        headers: {Authorization: `Bearer ${accessToken}`},
      });
      setNotifications(response.data);
    } catch (error) {
      setNotifications([]);
    }
  };
  console.log(
    `This is notification from homeowner screen ${notifications.length}`,
  );

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
        routes: [{name: 'AuthNavigation'}],
      }),
    );
  };

  const fetchRequestCount = async () => {
    if (!userData) return;

    const accessToken = await AsyncStorage.getItem('accessToken');
    try {
      const response = await api.get(
        `/request-visit/notification-count/${userData.id}`,
        {
          headers: {Authorization: `Bearer ${accessToken}`},
        },
      );
      setBadgeCount(response.data[0].count);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (userData && userData.id) {
      fetchRequestCount();
    }
  }, [userData]);

  useFocusEffect(
    useCallback(() => {
      fetchRequestCount();
    }, [userData]),
  );

  useFocusEffect(
    useCallback(() => {
      if (userData && userData.id) {
        fetchNotifications(userData.id);
      }
    }, [userData]),
  );

  useEffect(() => {
    socket.current = io('http://192.168.32.11:8080');

    socket.current.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    socket.current.on('new-notification-count', notificationCount => {
      setBadgeCount(notificationCount[0].count);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profile}>
          <TouchableOpacity
            style={[
              styles.profileIcon,
              {backgroundColor: userData.profile_color},
            ]}
            onPress={() => navigation.navigate('HomeownerSettingScreen')}>
            <Text style={styles.profileInitial}>
              {userData.first_name && userData.first_name[0]}
            </Text>
          </TouchableOpacity>
          <Text style={styles.profileName}>{userData.first_name}</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('HomeownerNotificationScreen')}>
            <MaterialIcon
              name={
                notifications.length > 0
                  ? 'notifications'
                  : 'notifications-none'
              }
              size={hp('4%')}
              color="#5D6D7E"
            />
            {badgeCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{badgeCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeownerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: hp('4%'),
    paddingHorizontal: wp('4%'),
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('5%'),
  },
  profileIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('5%'),
    width: hp('5%'),
    borderRadius: 50,
  },
  profileInitial: {
    fontSize: hp('2.5%'),
    color: 'white',
  },
  profileName: {
    color: '#5D6D7E',
    fontSize: hp('2%'),
  },

  badge: {
    position: 'absolute',
    right: -1,
    top: -1,
    backgroundColor: 'red',
    borderRadius: 8,
    width: hp('2%'),
    height: hp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: hp('1.5%'),
  },
});
