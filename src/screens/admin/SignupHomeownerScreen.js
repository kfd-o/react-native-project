import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
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
import {TouchableOpacity} from 'react-native-gesture-handler';
import randomColor from '../../utils/randomColor';
import api from '../../api/api';
import {getStyles} from '../../assets/styles/admin/signupHomeownerTheme';
import {useSelector} from 'react-redux';

const SignupHomeownerScreen = ({navigation}) => {
  const value = useSelector(state => state.theme.value);
  const styles = getStyles(value);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    address: '',
    email: '',
    contact_num: '',
    profile_color: randomColor(),
  });

  const handleSignup = async () => {
    try {
      const response = await api.post('/protected/homeowner', formData);

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

  const handleChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={hp('3%')} color={styles.iconColor} />
        </Pressable>
        <Text style={styles.headerText}>Homeowner</Text>
      </View>
      <ScrollView>
        <View style={{paddingVertical: hp('2%')}}>
          <Text style={styles.subHeader}>Homeowner Details</Text>
        </View>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inputSection}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={formData.first_name}
                onChangeText={value => handleChange('first_name', value)}
                placeholder="First Name"
                placeholderTextColor={styles.placeholderTextColor}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={formData.last_name}
                onChangeText={value => handleChange('last_name', value)}
                placeholder="Last Name"
                placeholderTextColor={styles.placeholderTextColor}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={formData.username}
                onChangeText={value => handleChange('username', value)}
                placeholder="Username"
                placeholderTextColor={styles.placeholderTextColor}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={formData.password}
                onChangeText={value => handleChange('password', value)}
                placeholder="Password"
                secureTextEntry
                placeholderTextColor={styles.placeholderTextColor}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={formData.address}
                onChangeText={value => handleChange('address', value)}
                placeholder="Address"
                placeholderTextColor={styles.placeholderTextColor}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={formData.email}
                onChangeText={value => handleChange('email', value)}
                placeholder="Email"
                keyboardType="email-address"
                placeholderTextColor={styles.placeholderTextColor}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={formData.contact_num}
                onChangeText={value => handleChange('contact_num', value)}
                placeholder="Contact Number"
                keyboardType="phone-pad"
                placeholderTextColor={styles.placeholderTextColor}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={{paddingVertical: hp('4%')}}>
          <TouchableOpacity style={styles.buttonSignup} onPress={handleSignup}>
            <Text style={styles.signupText}>Signup</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignupHomeownerScreen;
