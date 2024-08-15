import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {jwtDecode} from 'jwt-decode';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import notificationPermissions from '../../utils/notificationPermission';
import randomColor from '../../utils/randomColor';
import api from '../../api/api';
import InputComponent from '../../components/InputComponent';
import ButtonComponent from '../../components/ButtonComponent';
import HeaderComponent from '../../components/HeaderComponent';
import LinkComponent from '../../components/LinkComponent';

const LoginScreen = ({navigation}) => {
  const requestFirebasePermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    // console.log(`Firebase can notify: ${enabled}`);
    if (enabled) {
      // console.log('Authorization status:', authStatus);
    }
  };

  const [errors, setErrors] = useState({
    username: false,
    password: false,
  });
  const [formData, setFormData] = useState({
    // username: 'keanebaul',
    // password: '@Kcprointetris082702',
    // username: 'yangar',
    // password: '@Kcprointetris082702',
    // username: 'kunse',
    // password: '@Kcprointetris082702',
    // username: 'johndoe',
    // password: '@Kcprointetris082702',
    // username: 'janesmith',
    // password: '@Kcprointetris082702',
    username: 'administrator',
    password: 'administrator',
  });
  console.log(errors);

  const handleChange = (name, value) => {
    setFormData(prevState => ({...prevState, [name]: value}));

    if (name === 'username' && value.length > 0) {
      setErrors(prevState => ({...prevState, username: false}));
    }
    if (name === 'password' && value.length > 0) {
      setErrors(prevState => ({...prevState, password: false}));
    }
  };

  const handleLogin = async () => {
    try {
      const response = await api.post('/login', formData);
      if (response.status === 200) {
        await AsyncStorage.setItem('accessToken', response.data.token);
        await AsyncStorage.setItem('refreshToken', response.data.refresh_token);
        const profile = await AsyncStorage.getItem('randomColor');

        if (profile === null) {
          await AsyncStorage.setItem('randomColor', randomColor());
        }

        const decodedToken = jwtDecode(response.data.token);

        switch (decodedToken.route) {
          case 0:
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'AdminNavigation'}],
              }),
            );
            notificationPermissions();
            break;
          case 1:
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'HomeownerNavigation'}],
              }),
            );
            notificationPermissions();
            break;
          case 2:
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'SecurityPersonnelNavigation'}],
              }),
            );
            notificationPermissions();
            break;
          case 3:
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'VisitorNavigation'}],
              }),
            );
            notificationPermissions();
            break;
          default:
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'AuthNavigation'}],
              }),
            );
            break;
        }
      }
    } catch (error) {
      setErrors(prevState => ({...prevState, username: true, password: true}));
      console.log('ERROR -------------->', error);
    } finally {
      setFormData({
        username: '',
        password: '',
      });
      Keyboard.dismiss();
    }
  };

  const handleNavigateForgotPassword = () => {
    navigation.navigate('ForgotPasswordScreen');
    setErrors(prevState => ({...prevState, username: false, password: false}));
    setFormData({
      username: '',
      password: '',
    });
  };

  const handleNavigateSignup = () => {
    navigation.navigate('SignupScreen');
    setErrors(prevState => ({...prevState, username: false, password: false}));
    setFormData({
      username: '',
      password: '',
    });
  };

  useEffect(() => {
    requestFirebasePermission();
  }, []);

  console.log(formData);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="always">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={{marginVertical: hp('5%')}}>
            <HeaderComponent
              header="Welcome"
              subHeader="Login with your account to continue"
            />
          </View>

          <View style={{marginVertical: hp('5%'), gap: 20}}>
            <InputComponent
              textHeader="Username"
              user="user"
              handleChange={handleChange}
              name="username"
              value={formData.username}
            />
            <InputComponent
              textHeader="Password"
              handleChange={handleChange}
              name="password"
              value={formData.password}
            />

            <LinkComponent
              name="forgot password?"
              handleNavigateForgotPassword={handleNavigateForgotPassword}
              withText={false}
              float={true}
            />

            {errors.username && errors.password && (
              <View>
                <View style={styles.errorContainer}>
                  <MaterialIcons
                    name="warning"
                    size={13}
                    color={styles.errorTextColor.color}
                  />
                  <Text style={styles.errorText}>Invalid Credentials</Text>
                </View>
              </View>
            )}
          </View>

          <View style={{marginVertical: hp('2%')}}>
            <ButtonComponent name="Login" press={handleLogin} />
          </View>

          <View
            style={{
              paddingVertical: hp('5%'),
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <LinkComponent
              name="Signup"
              handleNavigateForgotPassword={handleNavigateSignup}
              withText={true}
              subText="don't have an account? "
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  errorTextColor: {
    color: '#E57373',
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingVertical: hp('10%'),
    paddingHorizontal: wp('5%'),
  },

  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  errorText: {
    color: '#DC143C',
    fontSize: hp('1.6%'),
  },
});

export default LoginScreen;
