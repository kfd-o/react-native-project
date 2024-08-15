import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {getStyles} from '../../assets/styles/admin/signupSecurityPersonnelTheme';
import InputComponent from '../../components/InputComponent';
import HeaderComponent from '../../components/HeaderComponent';
import ButtonComponent from '../../components/ButtonComponent';
import randomColor from '../../utils/randomColor';
import HeaderNavigatorComponent from '../../components/HeaderNavigatorComponent';

const SignupSecurityPersonnelScreen = ({navigation}) => {
  const value = useSelector(state => state.theme.value);
  const styles = getStyles(value);

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
  };

  const handleSignup = async () => {
    try {
      const response = await api.post(
        '/protected/security-personnel',
        formData,
      );

      if (response.status === 201) {
        Alert.alert('Success', 'Signup successful!');
      } else {
        Alert.alert('Error', result.msg || 'Signup failed');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    } finally {
      //
    }
  };

  return (
    <View style={styles.container}>
      <HeaderNavigatorComponent header="Security Personnel" />
      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex: 1}}>
            <View style={{paddingVertical: hp('2%')}}>
              <HeaderComponent header="Create an account" />
            </View>
            <View style={{gap: 20}}>
              <InputComponent
                textHeader="First Name"
                user="user"
                handleChange={handleChange}
                name="first_name"
                value={formData.first_name}
              />
              <InputComponent
                textHeader="Last Name"
                user="user"
                handleChange={handleChange}
                name="last_name"
                value={formData.last_name}
              />
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
            </View>

            <View style={{paddingVertical: hp('4%')}}>
              <ButtonComponent name="Create Account" press={handleSignup} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
};

export default SignupSecurityPersonnelScreen;
