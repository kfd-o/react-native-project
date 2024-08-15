import React, {useEffect, useState, useCallback} from 'react';
import {
  Text,
  View,
  BackHandler,
  ToastAndroid,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useFocusEffect, CommonActions} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import PesoSign from 'react-native-vector-icons/FontAwesome6';
import SkeletonLoader from '../../utils/SkeletonLoader';
import api from '../../api/api';

const VisitorScreen = ({navigation}) => {
  const [userData, setUserData] = useState([]);
  const [houseData, setHouseData] = useState([]);
  const [search, setSearch] = useState('');
  const [backPressCount, setBackPressCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHouses = async () => {
    try {
      const response = await api.get('/retrieve-house');
      setHouseData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = value => {
    setSearch(value);
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

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('HouseDetailScreen', {
            id: item.id,
            model: item.model,
            description: item.description,
            bedroom: item.bedroom,
            bathroom: item.bathroom,
            carport: item.carport,
            floor_area: item.floor_area,
            lot_area: item.lot_area,
            price: item.price,
            img_url: item.img_url,
          })
        }>
        {item.img_url && (
          <Image source={{uri: item.img_url}} style={styles.image} />
        )}
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.model}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <PesoSign name="peso-sign" size={hp('1.8%')} color="#85929E" />
            <Text style={styles.cardDescription}>{`${Intl.NumberFormat(
              'PH',
            ).format(item.price)}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (backPressCount === 0) {
          setBackPressCount(1);
          ToastAndroid.show('Tap again to exit', ToastAndroid.SHORT);

          setTimeout(() => {
            setBackPressCount(0);
          }, 2000);

          return true;
        } else if (backPressCount === 1) {
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
    fetchHouses();

    const timer = setTimeout(() => {
      setIsLoading(false); // Stop loading after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <SkeletonLoader />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.profile}>
            <TouchableOpacity
              style={[
                styles.profileIcon,
                {backgroundColor: userData.profile_color},
              ]}
              onPress={() => navigation.navigate('VisitorSettingScreen')}>
              <Text style={styles.profileInitial}>
                {(userData || userData.first_name) && userData.first_name[0]}
              </Text>
            </TouchableOpacity>
            <Text style={styles.profileName}>{userData.first_name}</Text>
          </View>
          <View style={styles.notificationIcon}>
            <TouchableOpacity
              onPress={() => navigation.navigate('VisitorNotificationScreen')}>
              <MaterialIcon
                name="notifications"
                size={hp('4%')}
                color="#5D6D7E"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: hp('3%'),
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialIcon name="search" size={20} color="#5D6D7E" />
            <TextInput
              placeholder="Search"
              placeholderTextColor={'#5D6D7E'}
              color="#85929E"
              width={290}
              backgroundColor="white"
              value={search}
              onChangeText={value => handleChange(value)}
            />
          </View>
          {search.length >= 1 && (
            <View>
              <MaterialIcon
                name="cancel"
                size={20}
                color="#5D6D7E"
                onPress={() => setSearch('')}
              />
            </View>
          )}
        </View>
        <View style={styles.requestHeaderContainer}>
          <Text style={styles.title}>Request Visit</Text>
        </View>
        <View style={{flexDirection: 'row', gap: 10}}>
          <View
            style={{
              backgroundColor: '#f6f8fa',
              height: hp('14%'),
              width: wp('45%'),
              borderRadius: 6,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#5D6D7E', fontSize: hp('1.8%')}}>
              Amenities
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('RequestScreen', {
                visitor_id: userData.id,
                first_name: userData.first_name,
                last_name: userData.last_name,
                contact_num: userData.contact_num,
              })
            }
            style={{
              backgroundColor: '#f6f8fa',
              height: hp('14%'),
              width: wp('45%'),
              borderRadius: 6,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#5D6D7E', fontSize: hp('1.8%')}}>
              Homeowner
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.homeHeaderContainer}>
          <Text style={styles.title}>Casa Real Models</Text>
        </View>
        <FlatList
          data={houseData}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.flatListContainer}
          horizontal={true}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default VisitorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: wp('4%'),
    paddingBottom: hp('1.4%'),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp('1.6%'),
    marginTop: hp('2%'),
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  profileIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: wp('10%'),
    width: wp('10%'),
    borderRadius: 50,
  },
  profileInitial: {
    fontSize: hp('2.6%'),
    color: 'white',
  },
  profileName: {
    color: '#5D6D7E',
    fontSize: hp('2%'),
  },
  notificationIcon: {
    flexDirection: 'row',
    gap: 14,
  },
  requestHeaderContainer: {
    paddingVertical: hp('1%'),
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
  },
  homeHeaderContainer: {
    paddingVertical: hp('1%'),
    marginTop: hp('4%'),
    marginBottom: hp('2%'),
  },
  title: {
    color: '#5D6D7E',
    fontSize: hp('2.4%'),
  },
  flatListContainer: {
    gap: 20,
  },
  card: {
    width: wp('70%'), // Set a fixed width for horizontal FlatList items
    height: hp('40%'),
    backgroundColor: '#f6f8fa',
    borderRadius: 6,
  },
  cardContent: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
    gap: 2,
  },
  cardTitle: {
    color: '#5D6D7E',
    fontSize: hp('2%'),
  },
  cardDescription: {
    color: '#85929E',
    fontSize: hp('1.8%'),
  },
  image: {
    width: '100%',
    height: hp('30%'),
    resizeMode: 'stretch',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
});
