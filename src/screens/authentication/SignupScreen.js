import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import randomColor from '../../utils/randomColor';
import api from '../../api/api';
import HeaderComponent from '../../components/HeaderComponent';
import LinkComponent from '../../components/LinkComponent';
import InputComponent from '../../components/InputComponent';
import ButtonComponent from '../../components/ButtonComponent';

const SignupScreen = ({navigation}) => {
  const [usernames, setUsernames] = useState([]);
  const [emails, setEmails] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);

  const [errors, setErrors] = useState({
    first_name: false,
    last_name: false,
    last_name_one_char: false,
    username: false,
    username_exist: false,
    password_length: false,
    email: false,
    email_exist: false,
    email_valid: false,
    contact_num: false,
  });

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    email: '',
    contact_num: '',
    profile_color: randomColor(),
  });

  const handleChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'first_name' && value.length > 0) {
      setErrors(prevState => ({...prevState, first_name: false}));
    }
    if (name === 'last_name' && value.length > 0) {
      setErrors(prevState => ({
        ...prevState,
        last_name: false,
        last_name_one_char: false,
      }));
    }
    if (name === 'username' && value.length > 0) {
      setErrors(prevState => ({
        ...prevState,
        username: false,
        username_exist: false,
      }));
    }
    if (name === 'password' && value.length > 0) {
      setErrors(prevState => ({...prevState, password_length: false}));
    }
    if (name === 'email' && value.length > 0) {
      setErrors(prevState => ({
        ...prevState,
        email: false,
        email_exist: false,
        email_valid: false,
      }));
    }
    if (name === 'contact_num' && value.length > 0) {
      setErrors(prevState => ({...prevState, contact_num: false}));
    }
  };

  const handleShow = () => {
    setShowPassword(!showPassword);
  };

  const fetchAllUsernames = async () => {
    try {
      const response = await api.get('/fetch-users');
      setUsernames(response.data.map(user => user.username));
      setEmails(response.data.map(user => user.email));
    } catch (error) {
      console.error('Error fetching users data:', error);
      console.log(error);
    }
  };

  const trimSpacesFirstName = str => {
    return str.replace(/\s+/g, ' ').trim();
  };
  const trimSpaces = str => {
    return str.replace(/\s+/g, '').trim();
  };

  console.log(errors);

  const handleNext = () => {
    switch (step) {
      case 1:
        const trimed = {
          first_name: formData.first_name.trim(),
          last_name: formData.last_name.trim(),
        };

        const last_name_length = formData.last_name.trim().length;

        trimed.first_name === '' &&
          setErrors(prevState => ({...prevState, first_name: true}));

        trimed.last_name === '' &&
          setErrors(prevState => ({...prevState, last_name: true}));

        setErrors(prevState => ({
          ...prevState,
          last_name_one_char: last_name_length === 1 || last_name_length === 2,
        }));

        if (!errors.first_name && !errors.last_name && last_name_length > 2) {
          setFormData(prevState => ({
            ...prevState,
            first_name: trimSpacesFirstName(formData.first_name),
            last_name: trimSpaces(formData.last_name),
          }));
          setStep(step + 1);
        }
        break;

      case 2:
        const usernameExist = usernames.includes(trimSpaces(formData.username));
        const length_username = formData.username.trim().length;
        const length_password = formData.password.trim().length;

        setErrors(prevState => ({
          ...prevState,
          username: length_username < 5 || length_username > 30,
          username_exist: usernameExist,
        }));

        setErrors(prevState => ({
          ...prevState,
          password_length: length_password <= 8,
        }));

        if (
          !usernameExist &&
          length_username >= 5 &&
          length_username <= 30 &&
          length_password >= 8
        ) {
          setFormData(prevState => ({
            ...prevState,
            username: trimSpaces(formData.username),
            password: trimSpaces(formData.password),
          }));
          setStep(step + 1);
        }
        break;

      default:
        break;
    }
  };

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignup = async () => {
    const validEmail = validateEmail(formData.email);
    setErrors(prevState => ({...prevState, email_valid: !validEmail}));

    const emailExist = emails.includes(trimSpaces(formData.email));
    setErrors(prevState => ({...prevState, email_exist: emailExist}));

    const validContactNumber = formData.contact_num.length === 11;
    setErrors(prevState => ({...prevState, contact_num: !validContactNumber}));

    if (validEmail && validContactNumber && !emailExist) {
      try {
        const response = await api.post('/protected/visitor', formData);
        if (response.status === 201) {
          Alert.alert('Success', 'Signup successfully');
          setStep(1);
          navigation.navigate('LoginScreen');
        }
      } catch (error) {
        Alert.alert('Error', 'Signup Failed. Please try again.');
      } finally {
        setFormData({
          first_name: '',
          last_name: '',
          username: '',
          password: '',
          email: '',
          contact_num: '',
        });
        Keyboard.dismiss();
      }
    }
  };

  const handleNavigateLogin = () => {
    navigation.navigate('LoginScreen');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <InputComponent
              textHeader="First Name"
              handleChange={handleChange}
              name="first_name"
              value={formData.first_name}
              user="user"
            />
            <InputComponent
              textHeader="Last Name"
              handleChange={handleChange}
              name="last_name"
              value={formData.last_name}
              user="user"
            />

            <View>
              {!errors.first_name &&
                !errors.last_name &&
                errors.last_name_one_char && (
                  <View style={styles.errorContainer}>
                    <MaterialIcons
                      name="warning"
                      size={13}
                      color={styles.errorTextColor.color}
                    />
                    <Text style={styles.errorText}>
                      Is this your real name?
                    </Text>
                  </View>
                )}
            </View>
            <View>
              <ButtonComponent name="Continue" press={handleNext} />
            </View>
          </>
        );
      case 2:
        return (
          <>
            <InputComponent
              textHeader="Username"
              handleChange={handleChange}
              name="username"
              value={formData.username}
              user="user"
            />
            <InputComponent
              textHeader="Password"
              handleChange={handleChange}
              name="password"
              value={formData.password}
            />
            <View>
              {errors.username && (
                <View style={styles.errorContainer}>
                  <MaterialIcons
                    name="warning"
                    size={13}
                    color={styles.errorTextColor.color}
                  />
                  <Text
                    style={
                      styles.errorText
                    }>{`Between 5-30 characters (Username)`}</Text>
                </View>
              )}
              {errors.username_exist && (
                <View style={styles.errorContainer}>
                  <MaterialIcons
                    name="warning"
                    size={13}
                    color={styles.errorTextColor.color}
                  />
                  <Text style={styles.errorText}>Username already exists</Text>
                </View>
              )}
              {errors.password_length && (
                <View style={styles.errorContainer}>
                  <MaterialIcons
                    name="warning"
                    size={13}
                    color={styles.errorTextColor.color}
                  />
                  <Text
                    style={
                      styles.errorText
                    }>{`8 characters long (Password)`}</Text>
                </View>
              )}
            </View>
            <View>
              <ButtonComponent name="Continue" press={handleNext} />
            </View>
          </>
        );
      case 3:
        return (
          <>
            <InputComponent
              textHeader="Email"
              handleChange={handleChange}
              name="email"
              value={formData.email}
            />
            <InputComponent
              textHeader="Contact Number"
              handleChange={handleChange}
              name="contact_num"
              value={formData.contact_num}
            />
            <View>
              {errors.email_valid && (
                <View style={styles.errorContainer}>
                  <MaterialIcons
                    name="warning"
                    size={13}
                    color={styles.errorTextColor.color}
                  />
                  <Text style={styles.errorText}>Invalid Email</Text>
                </View>
              )}
              {errors.email_exist && (
                <View style={styles.errorContainer}>
                  <MaterialIcons
                    name="warning"
                    size={13}
                    color={styles.errorTextColor.color}
                  />
                  <Text style={styles.errorText}>Email already exist</Text>
                </View>
              )}
              {errors.contact_num && (
                <View style={styles.errorContainer}>
                  <MaterialIcons
                    name="warning"
                    size={13}
                    color={styles.errorTextColor.color}
                  />
                  <Text style={styles.errorText}>Invalid Contact Number</Text>
                </View>
              )}
            </View>
            <View>
              <ButtonComponent name="Create Account" press={handleSignup} />
            </View>
          </>
        );

      default:
        return null;
    }
  };
  useEffect(() => {
    fetchAllUsernames();
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="always">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={{marginVertical: hp('5%')}}>
            <HeaderComponent
              header="Create your account"
              subHeader="Create an account to get started"
            />
          </View>
          <View style={{marginVertical: hp('5%'), gap: 20}}>
            {renderStep()}
          </View>

          <View
            style={{
              marginVertical: hp('5%'),
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <LinkComponent
              name="Login"
              handleNavigateForgotPassword={handleNavigateLogin}
              withText={true}
              subText="have an account? "
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
    fontWeight: '600',
    color: '#5D6D7E',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '400',
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
  buttonNext: {
    width: '100%',
    borderRadius: 4,
    backgroundColor: '#2196F3',
    paddingVertical: hp('2%'),
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  buttonSignup: {
    width: '100%',
    borderRadius: 4,
    backgroundColor: '#2196F3',
    paddingVertical: hp('2%'),
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  nextText: {
    color: '#fff',
    fontSize: hp('2.6%'),
    fontWeight: '600',
  },
  signupText: {
    color: '#fff',
    fontSize: hp('2.6%'),
    fontWeight: '600',
  },
  loginText: {
    color: '#85929E',
    fontSize: 16,
    textAlign: 'center',
  },
  loginLink: {
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
  showPassword: {
    position: 'absolute',
    right: 0,
    top: 10,
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('2%'),
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#E57373',
    backgroundColor: '#FFEBEE',
  },
  codeContactNumber: {
    position: 'absolute',
    borderRightWidth: 1,
    borderRightColor: '#85929E',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('2%'),
    top: 13,
    pointerEvents: 'none',
  },
});
export default SignupScreen;
