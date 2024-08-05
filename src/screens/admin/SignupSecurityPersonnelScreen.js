import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard, TextInput, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import { getStyles } from '../../assets/styles/admin/signupSecurityPersonnelTheme';

const SignupSecurityPersonnelScreen = ({ navigation }) => {
    const value = useSelector(state => state.theme.value);
    const styles = getStyles(value);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [contactNum, setContactNum] = useState('');

    const handleSignup = async () => {
        const userData = {
            first_name: firstName,
            last_name: lastName,
            username: username,
            password: password,
            email: email,
            contact_num: contactNum
        };

        try {
            const response = await fetch('http://192.168.100.91:8080/api/signup/sp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const result = await response.json();

            if (response.status === 201) {
                Alert.alert('Success', 'Signup successful!');
            } else {
                Alert.alert('Error', result.msg || 'Signup failed');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'An error occurred. Please try again.');
        } finally {
            setFirstName('');
            setLastName('');
            setUsername('');
            setPassword('');
            setEmail('');
            setContactNum('');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={hp('3%')} color={styles.iconColor} />
        </Pressable>
        <Text style={styles.headerText}>Homeowner</Text>
      </View>
            <ScrollView >
            <View style={{paddingVertical: hp('2%')}}>
                    <Text style={styles.subHeader}>Security Personnel Details</Text>
                </View>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    

                        <View style={styles.inputSection}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.textInput}
                                value={firstName}
                                onChangeText={setFirstName}
                                placeholder="First Name"
                                placeholderTextColor={styles.placeholderTextColor}
                            />
                            </View>
                            <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.textInput}
                                value={lastName}
                                onChangeText={setLastName}
                                placeholder="Last Name"
                                placeholderTextColor={styles.placeholderTextColor}
                            />
                            </View>
                            <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.textInput}
                                value={username}
                                onChangeText={setUsername}
                                placeholder="Username"
                                placeholderTextColor={styles.placeholderTextColor}
                            />
                            </View>
                            <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.textInput}
                                value={password}
                                onChangeText={setPassword}
                                placeholder="Password"
                                secureTextEntry
                                placeholderTextColor={styles.placeholderTextColor}
                            />
                            </View>
                            <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.textInput}
                                value={email}
                                onChangeText={setEmail}
                                placeholder="Email"
                                keyboardType="email-address"
                                placeholderTextColor={styles.placeholderTextColor}
                            />
                            </View>
                            <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.textInput}
                                value={contactNum}
                                onChangeText={setContactNum}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('2%')
    },
    headerContainer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        gap: hp('3%'),
        paddingBottom: hp('2%')
    },
    iconColor: '#5D6D7E',
    headerText: {
        color: '#5D6D7E',
        fontWeight: '500',
        fontSize: hp('2.6%'),
    },
    inputSection: {
        gap: hp('1%'),
    },
    inputContainer: {
        width: '100%',
        borderRadius: 4,
        backgroundColor: '#f6f8fa',
    },
    input: {
        width: "100%",
        borderRadius: 4,
        paddingVertical: hp('2%'),
        paddingHorizontal: wp('6%'),
        fontSize: hp('1.8%'),
        color: '#85929E',
    },
    buttonSignup: {
        width: "100%",
        borderRadius: 4,
        backgroundColor: "#2196F3",
        paddingVertical: hp('1.8%'),
        alignItems: "center",
        marginTop: hp('1%'),
    },
    signupText: {
        color: "#fff",
        fontSize: hp('2%'),
        fontWeight: '700'
    },

});

export default SignupSecurityPersonnelScreen