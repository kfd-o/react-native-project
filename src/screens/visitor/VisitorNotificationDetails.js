import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api/api';
import QRCode from 'react-native-qrcode-svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {format} from 'date-fns';

const VisitorNotificationDetails = ({navigation, route}) => {
  const {id} = route.params;
  const [notifications, setNotifications] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  console.log(notifications);

  const fetchNotificationsById = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    try {
      const response = await api.get(`/qr-code-detail/${id}`, {
        headers: {Authorization: `Bearer ${accessToken}`},
      });
      setNotifications(response.data[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotificationsById();
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </Text>
      </View>
    );
  }

  const formattedDate = notifications.valid_until
    ? format(new Date(notifications.valid_until), 'yyyy-MM-dd')
    : '';

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

      <View
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          flex: 1,
        }}>
        <QRCode
          value={notifications.qr_code}
          size={hp('25%')}
          logoBackgroundColor="red"
        />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingVertical: hp('2%'),
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: 'black',
            fontStyle: 'italic',
            textAlign: 'center',
            fontSize: hp('1.6%'),
            paddingHorizontal: wp('2%'),
          }}>
          {`This will be your entry pass, it will expire on ${formattedDate}. Show
          this to security personnel to be scan.`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('4%'),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('5%'),
    paddingVertical: hp('2%'),
  },
  headerText: {
    color: '#5D6D7E',
    fontWeight: '500',
    fontSize: hp('2.3%'),
  },
});

export default VisitorNotificationDetails;
