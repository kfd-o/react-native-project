import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {format} from 'date-fns';
import Ionicons from 'react-native-vector-icons/Ionicons';
import api from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeownerNotificationDetails = ({route, navigation}) => {
  const {id} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSuccessVisible, setModalSuccessVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const fetchNotificationsById = async id => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    try {
      const response = await api.get(`/request-visit/fetch/${id}`, {
        headers: {Authorization: `Bearer ${accessToken}`},
      });
      setNotifications(response.data);
      // console.log(response.data[0])
    } catch (error) {
      console.log(error);
    }
  };

  console.log(notifications);

  const formatDate = dateString => {
    return format(new Date(dateString), 'yyyy-MM-dd');
  };

  const formatTime = timeString => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    date.setSeconds(0);
    return format(date, 'hh:mm a');
  };

  const handleApprove = () => {
    setModalVisible(!modalVisible);
  };

  const handleCancel = () => {
    setModalVisible(!modalVisible);
  };

  const handleConfirm = async () => {
    try {
      const response = await api.patch(
        `/request-visit/approved/${notifications[0].rv_id}`,
      );
      // console.log(response);
      if (response.status === 200) {
        setModalVisible(!modalVisible);
        setModalSuccessVisible(!modalSuccessVisible);
        fetchNotificationsById(id);
        try {
          const response = await api.post(`/qr-code/${notifications[0].id}`, {
            notifications,
          });
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  const handleContinue = () => {
    setModalSuccessVisible(!modalSuccessVisible);
  };

  useEffect(() => {
    fetchNotificationsById(id);
  }, []);

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View
              style={{
                flex: 1,
                paddingHorizontal: wp('4%'),
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#5D6D7E',
                    fontSize: hp('2.4%'),
                    fontWeight: '500',
                  }}>
                  Confirm Visitor Details
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#85929E',
                    textAlign: 'center',
                    fontSize: hp('2%'),
                    lineHeight: hp('3%'),
                  }}>
                  Make sure you review the visitor details before you proceed.
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'flex-end',
                  paddingVertical: hp('2%'),
                  gap: hp('1%'),
                }}>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: '#E57373',
                    backgroundColor: '#FFEBEE',
                    width: wp('30%'),
                    paddingVertical: hp('1.4%'),
                    borderRadius: 6,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={handleCancel}>
                  <Text style={{color: '#D32F2F', fontSize: hp('2%')}}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: '#90CAF9',
                    backgroundColor: '#E3F2FD',
                    borderRadius: 6,
                    width: wp('30%'),
                    paddingVertical: hp('1.4%'),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={handleConfirm}>
                  <Text style={{color: '#1E88E5', fontSize: hp('2%')}}>
                    Confirm
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={modalSuccessVisible}
        onRequestClose={() => setModalSuccessVisible(!modalSuccessVisible)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSuccessContainer}>
            <View
              style={{
                flex: 1,
                paddingHorizontal: wp('4%'),
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: hp('2%'),
                }}>
                <Ionicons
                  name="checkmark-circle"
                  size={hp('6%')}
                  color="#81C784"
                />
                <Text
                  style={{
                    color: '#5D6D7E',
                    fontSize: hp('2.4%'),
                    fontWeight: '500',
                  }}>
                  Approval Successful
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: hp('3%'),
                }}>
                <Text
                  style={{
                    color: '#85929E',
                    textAlign: 'center',
                    fontSize: hp('2%'),
                    lineHeight: hp('3%'),
                  }}>
                  Visitor will be notify that you approved his or her visit,
                  continue.
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  paddingVertical: hp('2%'),
                }}>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: '#81C784',
                    backgroundColor: '#E8F5E9',
                    paddingVertical: hp('1.5%'),
                    borderRadius: 6,
                    width: wp('50%'),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={handleContinue}>
                  <Text style={{color: '#388E3C', fontSize: hp('2%')}}>
                    Continue
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={hp('3.6%')} color="#5D6D7E" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Visitor Details</Text>
      </View>
      {notifications.map(notif => (
        <View key={notif.id}>
          <TouchableWithoutFeedback>
            <View
              style={{
                alignItems: 'center',
                gap: hp('1%'),
                paddingVertical: hp('6%'),
                justifyContent: 'center',
              }}>
              <View
                style={{
                  backgroundColor: notif.profile_color,
                  borderRadius: hp('50%'),
                  width: hp('12%'),
                  height: hp('12%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: hp('4%'),
                    fontWeight: '500',
                  }}>
                  {notif.first_name[0]}
                </Text>
              </View>
              <View
                style={{
                  width: wp('50%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View>
                  <Text
                    style={{
                      color: '#5D6D7E',
                      fontSize: hp('2.4%'),
                      fontWeight: '500',
                    }}>
                    {notif.first_name} {notif.last_name}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View style={{gap: hp('5%')}}>
            <View>
              <Text
                style={{
                  color: '#5D6D7E',
                  fontSize: hp('2.4%'),
                }}>
                Visitor Classification
              </Text>
              <View>
                <Text style={{color: '#85929E', fontSize: hp('2%')}}>
                  {notif.classify_as[0].toUpperCase()}
                  {notif.classify_as.slice(1)}
                </Text>
              </View>
            </View>
            {notif.classify_as === 'contractor' && (
              <View>
                <Text
                  style={{
                    color: '#5D6D7E',
                    fontSize: hp('2.4%'),
                    paddingVertical: hp('1%'),
                  }}>
                  Contract Range
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: wp('2%'),
                  }}>
                  <View>
                    <Text style={{color: '#85929E', fontSize: hp('1.6%')}}>
                      Start Of Contract
                    </Text>
                    <View style={{width: wp('45%')}}>
                      <Text style={{color: '#85929E', fontSize: hp('2%')}}>
                        {formatDate(notif.contract_start_date)}
                      </Text>
                    </View>
                  </View>

                  <View>
                    <Text style={{color: '#85929E', fontSize: hp('1.6%')}}>
                      End Of Contract
                    </Text>
                    <View style={{width: wp('45%')}}>
                      <Text style={{color: '#85929E', fontSize: hp('2%')}}>
                        {formatDate(notif.contract_end_date)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}

            <View>
              <Text
                style={{
                  color: '#5D6D7E',
                  fontSize: hp('2.4%'),
                  paddingVertical: hp('1%'),
                }}>
                Date Visit
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  gap: wp('2%'),
                }}>
                <View>
                  <Text style={{color: '#85929E', fontSize: hp('1.6%')}}>
                    Date
                  </Text>
                  <View style={{width: wp('45%')}}>
                    <Text style={{color: '#85929E', fontSize: hp('2%')}}>
                      {formatDate(notif.date_of_visit)}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text style={{color: '#85929E', fontSize: hp('1.6%')}}>
                    Time
                  </Text>
                  <View style={{width: wp('45%')}}>
                    <Text style={{color: '#85929E', fontSize: hp('2%')}}>
                      {formatTime(notif.time_of_visit)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View>
              <Text
                style={{
                  color: '#5D6D7E',
                  fontSize: hp('2.4%'),
                }}>
                Contact Number
              </Text>
              <View>
                <Text style={{color: '#85929E', fontSize: hp('2%')}}>
                  {notif.contact_num}
                </Text>
              </View>
            </View>
            {notif.status === 'approved' && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#E8F5E9',
                  paddingVertical: hp('2%'),
                  elevation: 4,
                  marginTop: hp('1%'),
                  borderRadius: 50,
                  gap: wp('2%'),
                }}>
                <View style={{}}>
                  <Ionicons
                    name="checkmark-circle"
                    size={hp('4%')}
                    color="#81C784"
                  />
                </View>
                <View>
                  <Text
                    style={{
                      color: '#388E3C',
                      fontSize: hp('2.3%'),
                    }}>
                    Approved
                  </Text>
                </View>
              </View>
            )}
            {notif.status === 'pending' && (
              <View
                style={{
                  flexDirection: 'row',
                  gap: hp('1%'),
                  paddingVertical: hp('2%'),
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#FFEBEE',
                    paddingVertical: hp('2%'),
                    borderColor: '#E57373',
                    borderWidth: 1,
                    width: wp('45%'),
                    borderRadius: 4,
                  }}>
                  <Text
                    style={{
                      color: '#E57373',
                      alignSelf: 'center',
                      fontSize: hp('2%'),
                    }}>
                    Decline
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#E3F2FD',
                    borderWidth: 1,
                    borderColor: '#90CAF9',
                    paddingVertical: hp('2%'),
                    width: wp('45%'),
                    borderRadius: 4,
                  }}
                  onPress={handleApprove}>
                  <Text
                    style={{
                      color: '#1E88E5',
                      alignSelf: 'center',
                      fontSize: hp('2%'),
                    }}>
                    Approve
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      ))}
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
    fontSize: hp('2.6%'),
  },
  inputContainer: {
    backgroundColor: '#f6f8fa',
    paddingHorizontal: wp('3%'),

    borderRadius: 8,
    width: '100%',
  },
  input: {
    color: '#85929E',
    fontSize: hp('2%'),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalProcessContainer: {
    width: wp('90%'),
    height: hp('74%'),
    backgroundColor: '#fff',
    borderRadius: 6,
    alignItems: 'center',
  },
  modalContainer: {
    width: wp('70%'),
    height: hp('30%'),
    backgroundColor: '#fff',
    borderRadius: 6,
    alignItems: 'center',
  },
  modalSuccessContainer: {
    width: wp('70%'),
    height: hp('36%'),
    backgroundColor: '#fff',
    borderRadius: 6,
    alignItems: 'center',
  },
});

export default HomeownerNotificationDetails;
