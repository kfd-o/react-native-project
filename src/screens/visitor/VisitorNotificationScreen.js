import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useCallback, useRef} from 'react';
import {useFocusEffect, CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api/api';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {parseISO, formatDistanceToNowStrict} from 'date-fns';

const VisitorNotificationScreen = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotifications = async userId => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    try {
      const response = await api.get(`/qr-code/${userId}`, {
        headers: {Authorization: `Bearer ${accessToken}`},
      });
      setNotifications(response.data);
    } catch (error) {
      console.log('There is no notifications');
    } finally {
      setIsLoading(false);
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
        routes: [{name: 'AuthNavigation'}],
      }),
    );
  };

  useEffect(() => {
    checkToken();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (userData && userData.id) {
        fetchNotifications(userData.id);
      }
    }, [userData]),
  );

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={hp('3%')}
            color="#5D6D7E"
          />
        </TouchableOpacity>

        <Text style={styles.headerText}>Notification</Text>
      </View>
      {notifications.length <= 0 && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            gap: hp('4%'),
            height: hp('60%'),
          }}>
          <MaterialIcons
            name="notifications-none"
            size={hp('20%')}
            color="#5D6D7E"
          />
          <Text style={{color: '#5D6D7E', fontSize: hp('1.8%')}}>
            You don't have notification
          </Text>
        </View>
      )}

      <ScrollView>
        <View style={{gap: hp('1%')}}>
          {notifications.reverse().map(notif => (
            <TouchableOpacity
              style={styles.notificationItem}
              key={notif.id}
              onPress={() =>
                navigation.navigate('VisitorNotificationDetails', {
                  id: notif.id,
                  visitor_id: userData.id,
                })
              }>
              <View style={styles.notificationLeft}>
                <View
                  style={{
                    ...styles.notificationProfile,
                    backgroundColor: notif.profile_color,
                  }}>
                  <Text
                    style={
                      styles.notificationProfileText
                    }>{`${notif.first_name[0]}`}</Text>
                </View>
                <View>
                  <Text
                    style={
                      styles.notificationName
                    }>{`${notif.first_name} ${notif.last_name}`}</Text>
                  <Text
                    style={{
                      fontSize: hp('1.4%'),
                      color: 'green',
                    }}>
                    {notif.status[0].toUpperCase()}
                    {notif.status.slice(1)}
                  </Text>
                </View>
              </View>

              <View>
                <Text style={styles.notificationTime}>
                  {`${formatDistanceToNowStrict(
                    parseISO(notif.approved_at),
                  )} ago`}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('4%'),
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('2%'),
    gap: wp('5%'),
  },
  headerText: {
    color: '#5D6D7E',
    fontWeight: '500',
    fontSize: hp('2.3%'),
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#f6f8fa',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('4%'),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 4,
  },
  notificationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  notificationProfile: {
    borderRadius: hp('50%'),
    paddingVertical: hp('1.4%'),
    paddingHorizontal: hp('2%'),
  },
  notificationProfileText: {
    color: 'white',
  },
  notificationName: {
    color: 'black',
    fontSize: hp('1.8%'),
  },

  notificationTime: {
    color: 'black',
    fontSize: hp('1.5%'),
  },
});

export default VisitorNotificationScreen;
