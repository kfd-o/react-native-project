import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  useColorScheme,
  TouchableWithoutFeedback,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import {lightMode, darkMode, systemMode} from '../../features/themeSlice';
import {getAdminStyles} from '../../assets/styles/admin/adminSettingStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../../api/api';

const AdminSettingScreen = ({navigation}) => {
  const value = useSelector(state => state.theme.value);
  const dispatch = useDispatch();
  const color = useColorScheme();
  const [selectedTheme, setSelectedTheme] = useState('');
  const [userData, setUserData] = useState([]);
  const styles = getAdminStyles(value);

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

  const handleLight = async () => {
    try {
      dispatch(lightMode());
      await AsyncStorage.setItem('theme', 'light');
      setSelectedTheme('light');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDark = async () => {
    try {
      dispatch(darkMode());
      await AsyncStorage.setItem('theme', 'dark');
      setSelectedTheme('dark');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSystem = async () => {
    try {
      dispatch(systemMode(color));
      await AsyncStorage.setItem('theme', 'system');
      setSelectedTheme('system');
    } catch (error) {
      console.log(error);
    }
  };

  const getTheme = async () => {
    try {
      const theme = await AsyncStorage.getItem('theme');
      if (theme) {
        setSelectedTheme(theme);
        if (theme === 'light') {
          dispatch(lightMode());
        } else if (theme === 'dark') {
          dispatch(darkMode());
        } else {
          dispatch(systemMode(color));
        }
      } else {
        dispatch(systemMode(color));
        setSelectedTheme('system');
      }
    } catch (error) {
      console.log(error);
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
    getTheme();
    checkToken();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: 'center',
          gap: 10,
          justifyContent: 'center',
          flex: 1,
        }}>
        <TouchableWithoutFeedback>
          <View
            style={[
              styles.profileContainer,
              {backgroundColor: userData.profile_color},
            ]}>
            <Text style={styles.profileInitial}>
              {userData.first_name && userData.first_name[0]}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.primaryText}>
            {userData.first_name} {userData.last_name}
          </Text>
          <Text style={styles.secondaryText}>
            {'@'}
            {userData.username}
          </Text>
        </View>
      </View>
      <View style={styles.themeOptionContainer}>
        <TouchableOpacity
          style={styles.themeOption}
          onPress={() => navigation.navigate('AccountScreen')}>
          <View style={styles.themeOptionIcon}>
            <MaterialCommunityIcons
              name="account"
              size={hp('2.6%')}
              color={styles.iconColor}
            />
            <Text style={styles.optionText}>Account</Text>
          </View>
          <View>
            <MaterialIcons
              name={'keyboard-arrow-right'}
              size={hp('2.4%')}
              color={styles.iconColor}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.themeOption}
          onPress={() => navigation.navigate('AccountScreen')}>
          <View style={styles.themeOptionIcon}>
            <MaterialIcons
              name="notifications"
              size={hp('2.6%')}
              color={styles.iconColor}
            />
            <Text style={styles.optionText}>Notifications</Text>
          </View>
          <View>
            <MaterialIcons
              name={'keyboard-arrow-right'}
              size={hp('2.4%')}
              color={styles.iconColor}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.themeOption}
          onPress={() => navigation.navigate('AccountScreen')}>
          <View style={styles.themeOptionIcon}>
            <MaterialCommunityIcons
              name="circle-opacity"
              size={hp('2.6%')}
              color={styles.iconColor}
            />
            <Text style={styles.optionText}>Appearance</Text>
          </View>
          <View>
            <MaterialIcons
              name={'keyboard-arrow-right'}
              size={hp('2.4%')}
              color={styles.iconColor}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.themeOption} onPress={handleLogout}>
          <View style={styles.themeOptionIcon}>
            <MaterialCommunityIcons
              name="logout"
              size={hp('2.6%')}
              color={styles.iconColor}
            />
            <Text style={styles.optionText}>Sign out</Text>
          </View>
          <View>
            <MaterialIcons
              name={'keyboard-arrow-right'}
              size={hp('2.4%')}
              color={styles.iconColor}
            />
          </View>
        </TouchableOpacity>

        {/* <View>
        <TouchableOpacity style={styles.themeOption} onPress={handleLight}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', gap: wp('5%')}}>
            <MaterialIcons
              name="light-mode"
              size={hp('2%')}
              color={styles.iconColor}
            />
            <Text style={styles.optionText}>Light</Text>
          </View>
          <View>
            <MaterialIcons
              name={
                selectedTheme === 'light'
                  ? 'radio-button-checked'
                  : 'radio-button-unchecked'
              }
              size={hp('2%')}
              color={styles.iconColor}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.themeOption} onPress={handleDark}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', gap: wp('5%')}}>
            <MaterialIcons
              name="dark-mode"
              size={hp('2%')}
              color={styles.iconColor}
            />
            <Text style={styles.optionText}>Dark</Text>
          </View>
          <View>
            <MaterialIcons
              name={
                selectedTheme === 'dark'
                  ? 'radio-button-checked'
                  : 'radio-button-unchecked'
              }
              size={hp('2%')}
              color={styles.iconColor}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.themeOption} onPress={handleSystem}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', gap: wp('5%')}}>
            <MaterialIcons
              name="contrast"
              size={hp('2%')}
              color={styles.iconColor}
            />
            <Text style={styles.optionText}>System</Text>
          </View>
          <View>
            <MaterialIcons
              name={
                selectedTheme === 'system'
                  ? 'radio-button-checked'
                  : 'radio-button-unchecked'
              }
              size={hp('2%')}
              color={styles.iconColor}
            />
          </View>
        </TouchableOpacity>
      </View> */}
      </View>
    </View>
  );
};

export default AdminSettingScreen;
