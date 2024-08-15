import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import api from '../../api/api';

const ForgotPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [userEmails, setUserEmails] = useState([]);
  const [emailExistError, setEmailExistError] = useState(false);

  const fetchAllEmail = async () => {
    try {
      const response = await api.get('/fetch-users');
      setUserEmails(response.data.map(user => user.email));
    } catch (error) {
      console.error('Error fetching emails:', error);
    }
  };

  const handleSubmit = async () => {
    const emailExists = userEmails.includes(email);
    setEmailExistError(!emailExists);
    if (emailExists) {
      try {
        await api.post('/send-otp', {email});
        navigation.navigate('VerifyOtpScreen', {email});
        setEmail('');
      } catch (error) {
        console.error('Error sending OTP:', error);
        Alert.alert('Error', 'Failed to send OTP. Please try again later.');
      }
    }
  };

  useEffect(() => {
    fetchAllEmail();
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
              <Text style={styles.header}>Recover your password</Text>
              <Text style={styles.subHeader}>
                Enter your email to receive an OTP
              </Text>
            </View>
            <View style={[styles.views, styles.two]}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[
                    styles.textInput,
                    emailExistError && {
                      borderWidth: 1,
                      borderColor: '#E57373',
                      backgroundColor: '#FFEBEE',
                    },
                  ]}
                  placeholder="Email"
                  placeholderTextColor={emailExistError ? '#E57373' : '#85929E'}
                  onChangeText={text => setEmail(text)}
                  value={email}
                  keyboardType="email-address"
                />
              </View>
            </View>
            {emailExistError && (
              <View style={styles.errorContainer}>
                <MaterialIcons name="warning" size={13} color="#E57373" />
                <Text style={styles.errorText}>Invalid Email</Text>
              </View>
            )}
            <View style={[styles.views, styles.three]}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}>
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: hp('5%'),
    paddingHorizontal: wp('5%'),
    backgroundColor: '#fff',
  },
  views: {
    flex: 1,
  },
  one: {
    justifyContent: 'flex-end',
    // backgroundColor: 'green'
  },
  two: {
    justifyContent: 'center',
    // backgroundColor: 'blue'
  },
  three: {
    justifyContent: 'flex-start',
    // backgroundColor: 'red'
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
  submitButton: {
    width: '100%',
    borderRadius: 4,
    backgroundColor: '#2196F3',
    paddingVertical: hp('2%'),
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  submitText: {
    color: '#fff',
    fontSize: hp('2.6%'),
    fontWeight: '600',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  errorText: {
    color: '#E57373',
    fontSize: hp('1.6%'),
  },
});

export default ForgotPasswordScreen;
