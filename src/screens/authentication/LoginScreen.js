import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import notificationPermissions from '../../utils/notificationPermission';
import randomColor from '../../utils/randomColor';
import api from '../../api/api';

const LoginScreen = ({navigation}) => {
  const requestFirebasePermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    console.log(`Firebase can notify: ${enabled}`);
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    // username: 'keanebaul',
    // password: '@Kcprointetris082702',
    // username: 'yangar',
    // password: '@Kcprointetris082702',
    //  username: 'kunse',
    //  password: '@Kcprointetris082702'
    // username: 'johndoe',
    // password: '@Kcprointetris082702',
    username: 'administrator',
    password: 'administrator',
  });

  const handleChange = (name, value) => {
    setFormData(prevState => {
      const newFormData = {
        ...prevState,
        [name]: value,
      };

      if (name === 'username' && value.length > 0) {
        setUsernameError(false);
      }
      if (name === 'password' && value.length > 0) {
        setPasswordError(false);
      }

      return newFormData;
    });
  };

  const handleShow = () => {
    setShowPassword(!showPassword);
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
      setUsernameError(true);
      setPasswordError(true);
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
    setUsernameError(false);
    setPasswordError(false);
    setFormData({
      username: '',
      password: '',
    });
  };

  const handleNavigateSignup = () => {
    navigation.navigate('SignupScreen');
    setUsernameError(false);
    setPasswordError(false);
    setFormData({
      username: '',
      password: '',
    });
  };

  useEffect(() => {
    requestFirebasePermission();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="always">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={[styles.views, styles.one]}>
              <Text style={styles.header}>Welcome</Text>
              <Text style={styles.subHeader}>
                Login with your account to continue
              </Text>
            </View>
            <View style={[styles.views, styles.two]}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.textInput, usernameError && styles.inputError]}
                  placeholder="Username"
                  placeholderTextColor={
                    usernameError
                      ? styles.errorTextColor.color
                      : styles.subTextColor.color
                  }
                  onChangeText={value => handleChange('username', value)}
                  value={formData.username}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.textInput, passwordError && styles.inputError]}
                  placeholder="Password"
                  placeholderTextColor={
                    passwordError
                      ? styles.errorTextColor.color
                      : styles.subTextColor.color
                  }
                  onChangeText={value => handleChange('password', value)}
                  value={formData.password}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={styles.showPassword}
                  onPress={handleShow}>
                  <Ionicons
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={24}
                    color={styles.subTextColor.color}
                  />
                </TouchableOpacity>
              </View>
              <Text
                style={styles.forgotPassword}
                onPress={handleNavigateForgotPassword}>
                Forgot password?
              </Text>
              {usernameError && passwordError && (
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
              <TouchableOpacity
                style={styles.buttonLogin}
                onPress={handleLogin}>
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.views, styles.three]}>
              <Text style={styles.signupText}>
                Don't have an account?{' '}
                <Text style={styles.signupLink} onPress={handleNavigateSignup}>
                  Signup
                </Text>
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  errorTextColor: {
    color: '#DC143C',
  },
  subTextColor: {
    color: '#85929E',
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingVertical: hp('10%'),
    paddingHorizontal: wp('5%'),
  },
  views: {
    flex: 1,
  },
  one: {
    justifyContent: 'center',
  },
  two: {
    justifyContent: 'center',
    gap: 10,
  },
  three: {
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: '500',
    color: '#5D6D7E',
  },
  subHeader: {
    fontSize: 18,
    color: '#85929E',
  },
  inputContainer: {
    width: '100%',
    borderRadius: 4,
    backgroundColor: '#f6f8fa',
  },
  textInput: {
    width: '100%',
    borderRadius: 4,
    paddingVertical: hp('2%'),
    paddingLeft: wp('6%'),
    paddingRight: wp('12%'),
    fontSize: hp('2.4%'),
    color: '#85929E',
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#B22222',
  },
  showPassword: {
    position: 'absolute',
    right: 0,
    top: 10,
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('2%'),
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    fontSize: 16,
    color: '#2196F3',
  },
  buttonLogin: {
    width: '100%',
    borderRadius: 4,
    backgroundColor: '#2196F3',
    paddingVertical: hp('2%'),
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  loginText: {
    color: '#fff',
    fontSize: hp('2.6%'),
    fontWeight: '500',
  },
  signupText: {
    color: '#85929E',
    fontSize: 16,
    textAlign: 'center',
  },
  signupLink: {
    color: '#2196F3',
    fontSize: 16,
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
