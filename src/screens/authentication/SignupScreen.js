import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import randomColor from '../../utils/randomColor';
import api from '../../api/api';

const SignupScreen = ({ navigation }) => {
    const [usernames, setUsernames] = useState([])
    const [emails, setEmails] = useState([])
    const [firstNameError, setFirstNameError] = useState(false)
    const [lastNameError, setLastNameError] = useState(false)
    const [lastNameOneChar, setLastNameOneChar] = useState(false)
    const [usernameError, setUsernameError] = useState(false);
    const [usernameExistError, setUsernameExistError] = useState(false);
    const [emailExistError, setEmailExistError] = useState(false);
    const [passwordLengthError, setPasswordLengthError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [validEmail, setValidEmail] = useState(false)
    const [contactNumError, setContactNumError] = useState(false);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        password: '',
        email: '',
        contact_num: '',
        profile_color: randomColor()
    });
    console.log(formData)
    const handleChange = (name, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleShow = () => {
        setShowPassword(!showPassword);
    };

    const fetchAllUsernames = async () => {
        try {
            const response = await api.get('/fetch-users');
            setUsernames(response.data.map((user) => user.username));
            setEmails(response.data.map((user) => user.email));
        } catch (error) {
            console.error('Error fetching users data:', error);
            console.log(error)
        }
    };

    const trimSpacesFirstName = (str) => {
        return str.replace(/\s+/g, ' ').trim();
    };
    const trimSpaces = (str) => {
        return str.replace(/\s+/g, '').trim();
    };

    const handleNext = () => {
        if (step === 1) {
            const trim_first_name = formData.first_name.trim() === '';
            const trim_last_name = formData.last_name.trim() === '';
            const length_last_name = formData.last_name.trim().length;

            trim_first_name ? setFirstNameError(true) : setFirstNameError(false);
            trim_last_name ? setLastNameError(true) : setLastNameError(false);
            setLastNameOneChar((length_last_name === 1 || length_last_name === 2));

            if (!trim_first_name && !trim_last_name && length_last_name > 2) {
                setFormData((prevState) => ({
                    ...prevState,
                    'first_name': trimSpacesFirstName(formData.first_name),
                    'last_name': trimSpaces(formData.last_name)
                }))
                setStep(step + 1)
            }
        } else if (step === 2) {
            const usernameExists = usernames.includes(trimSpaces(formData.username));
            setUsernameExistError(usernameExists);

            const length_username = formData.username.trim().length;
            setUsernameError((length_username < 5 || length_username > 30));

            const length_password = formData.password.trim().length;
            setPasswordLengthError(length_password <= 8);

            if (!usernameExists && (length_username >= 5 && length_username <= 30) && length_password >= 8) {
                setFormData((prevState) => ({
                    ...prevState,
                    'username': trimSpaces(formData.username),
                    'password': trimSpaces(formData.password)
                }))
                setStep(step + 1);
            }
        }

    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSignup = async () => {
        const validEmail = validateEmail(formData.email);
        setValidEmail(!validEmail);

        const emailExists = emails.includes(trimSpaces(formData.email));
        setEmailExistError(emailExists);

        const validContactNumber = formData.contact_num.length === 11;
        setContactNumError(!validContactNumber);

        if (validEmail && validContactNumber && !emailExists) {
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
                    contact_num: ''
                });
                Keyboard.dismiss();
            }
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[styles.textInput, firstNameError && styles.inputError]}
                                value={formData.first_name}
                                onChangeText={(value) => handleChange('first_name', value)}
                                placeholder='First Name'
                                placeholderTextColor={firstNameError ? styles.errorTextColor.color : styles.subTextColor.color}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[styles.textInput, lastNameError && styles.inputError]}
                                value={formData.last_name}
                                onChangeText={(value) => handleChange('last_name', value)}
                                placeholder='Last Name'
                                placeholderTextColor={lastNameError ? styles.errorTextColor.color : styles.subTextColor.color}
                            />
                        </View>
                        <View>
                            {
                                !firstNameError && !lastNameError && lastNameOneChar && (
                                    <View style={styles.errorContainer}>
                                        <MaterialIcons name='warning' size={13} color={styles.errorTextColor.color} />
                                        <Text style={styles.errorText}>Is this your real name?</Text>
                                    </View>
                                )
                            }
                        </View>
                        <TouchableOpacity style={styles.buttonNext} onPress={handleNext}>
                            <Text style={styles.nextText}>Continue</Text>
                        </TouchableOpacity>
                    </>
                );
            case 2:
                return (
                    <>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[styles.textInput, usernameExistError && styles.inputError, usernameError && styles.inputError]}
                                value={formData.username}
                                onChangeText={(value) => handleChange('username', value)}
                                placeholder='Username'
                                placeholderTextColor={(usernameError || usernameExistError) ? styles.errorTextColor.color : styles.subTextColor.color}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[styles.textInput, passwordLengthError && styles.inputError]}
                                value={formData.password}
                                onChangeText={(value) => handleChange('password', value)}
                                placeholder='Password'
                                placeholderTextColor={passwordLengthError ? styles.errorTextColor.color : styles.subTextColor.color}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity style={styles.showPassword} onPress={handleShow}>
                                <Ionicons name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={24} color={styles.subTextColor.color} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            {
                                usernameError && (
                                    <View style={styles.errorContainer}>
                                        <MaterialIcons name='warning' size={13} color={styles.errorTextColor.color} />
                                        <Text style={styles.errorText}>{`between 5-30 characters (Username)`}</Text>
                                    </View>
                                )
                            }
                            {
                                usernameExistError && (
                                    <View style={styles.errorContainer}>
                                        <MaterialIcons name='warning' size={13} color={styles.errorTextColor.color} />
                                        <Text style={styles.errorText}>Username already exists</Text>
                                    </View>
                                )
                            }
                            {
                                passwordLengthError && (
                                    <View style={styles.errorContainer}>
                                        <MaterialIcons name='warning' size={13} color={styles.errorTextColor.color} />
                                        <Text style={styles.errorText}>{`8 characters long (Password)`}</Text>
                                    </View>
                                )
                            }
                        </View>
                        <TouchableOpacity style={styles.buttonNext} onPress={handleNext}>
                            <Text style={styles.nextText}>Continue</Text>
                        </TouchableOpacity>
                    </>
                );
            case 3:
                return (
                    <>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[styles.textInput, validEmail && styles.inputError]}
                                value={formData.email}
                                onChangeText={(value) => handleChange('email', value)}
                                placeholder='Email'
                                keyboardType='email-address'
                                placeholderTextColor={validEmail ? styles.errorTextColor.color : styles.subTextColor.color}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[styles.textInput, { paddingLeft: wp('13%') }, contactNumError && styles.inputError]}
                                value={formData.contact_num}
                                onChangeText={(value) => handleChange('contact_num', value)}
                                placeholder='Contact Number'
                                keyboardType='phone-pad'
                                placeholderTextColor={contactNumError ? styles.errorTextColor.color : styles.subTextColor.color}
                            />
                            <View style={styles.codeContactNumber}>
                                <Text style={{ color: styles.subTextColor.color }}>+63</Text>
                            </View>
                        </View>
                        <View>
                            {
                                validEmail && (
                                    <View style={styles.errorContainer}>
                                        <MaterialIcons name='warning' size={13} color={styles.errorTextColor.color} />
                                        <Text style={styles.errorText}>Invalid Email</Text>
                                    </View>
                                )
                            }
                            {
                                emailExistError && (
                                    <View style={styles.errorContainer}>
                                        <MaterialIcons name='warning' size={13} color={styles.errorTextColor.color} />
                                        <Text style={styles.errorText}>Email already exist</Text>
                                    </View>
                                )
                            }
                            {
                                contactNumError && (
                                    <View style={styles.errorContainer}>
                                        <MaterialIcons name='warning' size={13} color={styles.errorTextColor.color} />
                                        <Text style={styles.errorText}>Invalid Contact Number</Text>
                                    </View>
                                )
                            }
                        </View>
                        <TouchableOpacity style={styles.buttonSignup} onPress={handleSignup}>
                            <Text style={styles.signupText}>Signup</Text>
                        </TouchableOpacity>
                    </>
                );

            default:
                return null;
        }
    };
    useEffect(() => {
        fetchAllUsernames()
    }, [])


    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='always' >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <View style={[styles.views, styles.one]}>
                            <Text style={styles.header}>Signup</Text>
                            <Text style={styles.subHeader}>Create your account to get started</Text>
                        </View>
                        <View style={[styles.views, styles.two]}>
                            {renderStep()}
                        </View>

                        <View style={[styles.views, styles.three]}>
                            <Text style={styles.loginText}>Already have an account? <Text style={styles.loginLink} onPress={() => navigation.navigate('LoginScreen')}>Login</Text></Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    errorTextColor: {
        color: '#DC143C'
    },
    subTextColor: {
        color: '#85929E'
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
        justifyContent: 'center'
    },
    two: {
        justifyContent: 'center',
        gap: 10
    },
    three: {
        justifyContent: 'center'
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
        paddingHorizontal: wp('2%')
    },
    inputError: {
        borderWidth: 1,
        borderColor: '#B22222'
    },
    codeContactNumber: {
        position: 'absolute',
        borderRightWidth: 1,
        borderRightColor: '#85929E',
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('2%'),
        top: 13,
        pointerEvents: 'none'
    }
});
export default SignupScreen;
