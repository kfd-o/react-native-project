import { View, Text, StyleSheet, Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, TextInput, Platform, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import api from '../../api/api';
import { CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ChangePasswordScreen = ({ route, navigation }) => {
    const { email } = route.params;
    const [isChange, setIsChange] = useState(false);
    const [modalSuccessVisible, setModalSuccessVisible] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: email,
        new_password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleShow = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async () => {

        try {
            const response = await api.post('/change-password', formData);
            if (response.status === 201) {

                setIsChange(!isChange);
                setModalSuccessVisible(!modalSuccessVisible);
            }
        } catch (error) {
            console.error(`ERROR ${error}`);
            setError('An error occurred. Please try again.');
        } finally {
            setFormData({
                email,
                new_password: ''
            });
            Keyboard.dismiss()
        }
    };

    const handleContinue = () => {
        setFormData({
            email: '',
            new_password: ''
        });
        setModalSuccessVisible(!modalSuccessVisible)
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' }],
            })
        )
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='always'>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <Modal
                            transparent={true}
                            visible={modalSuccessVisible}
                            onRequestClose={() => setModalSuccessVisible(!modalSuccessVisible)}
                        >
                            <View style={styles.modalOverlay}>
                                <View style={styles.modalSuccessContainer}>
                                    <View style={{ flex: 1, paddingVertical: hp('2%'), paddingHorizontal: wp('4%') }}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Icon name='check-circle' size={hp('18%')} color='green' />
                                        </View>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: hp('2%') }}>
                                            <Text style={{ color: '#5D6D7E', fontSize: hp('2.4%'), fontWeight: 600 }}>Password has been change</Text>
                                        </View>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('2%'), paddingHorizontal: wp('5%') }}>
                                            <Text style={{ color: '#85929E', textAlign: 'center' }}>Continue to login with your new password.</Text>
                                        </View>
                                        <View style={{ alignItems: 'center', paddingVertical: hp('2%'), marginTop: hp('3%') }}>
                                            <TouchableOpacity style={{ borderWidth: 1, borderColor: '#1ABC9C', paddingVertical: hp('1.5%'), paddingHorizontal: wp('2%'), borderRadius: 6, width: wp('50%'), justifyContent: 'center', alignItems: 'center' }} onPress={handleContinue}>
                                                <Text style={{ color: '#1ABC9C' }}>Continue</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        <View style={[styles.views, styles.one]}>
                            <Text style={styles.header}>Change Password</Text>
                            <Text style={styles.subHeader}>Enter your new password</Text>
                        </View>
                        <View style={[styles.views, styles.two]}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder='new-password'
                                    placeholderTextColor='#85929E'
                                    onChangeText={value => handleChange('new_password', value)}
                                    value={formData.new_password}
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity style={styles.showPassword} onPress={handleShow}>
                                    <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={24} color={'#85929E'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {isChange && (
                            <View>
                                <Text style={{ color: 'green' }}>Password Changed Successfully</Text>
                            </View>
                        )}
                        {error && (
                            <View>
                                <Text style={{ color: 'red' }}>{error}</Text>
                            </View>
                        )}
                        <View style={[styles.views, styles.three]}>
                            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
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
    },
    two: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    three: {
        justifyContent: 'flex-start',
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalSuccessContainer: {
        width: wp('90%'),
        height: hp('50%'),
        backgroundColor: '#fff',
        borderRadius: 6,
        alignItems: 'center',
    },
    showPassword: {
        position: 'absolute',
        right: 0,
        top: 10,
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('2%')
    },
});

export default ChangePasswordScreen;
