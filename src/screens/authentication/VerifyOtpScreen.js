import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import api from '../../api/api';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const VerifyOtpScreen = ({ route, navigation }) => {
    const { email } = route.params;
    const [otp, setOtp] = useState(new Array(5).fill(''));
    const [countdown, setCountdown] = useState(300); // 5 minutes in seconds
    const [resendVisible, setResendVisible] = useState(false);
    const [resendCount, setResendCount] = useState(0);

    const inputRefs = useRef([]);

    useEffect(() => {
        let timer;
        if (resendCount === 0) {
            timer = setInterval(() => {
                setCountdown(prev => {
                    if (prev === 1) {
                        clearInterval(timer);
                        setResendVisible(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [resendCount]);

    const handleInputChange = (text, index) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text && index < 4) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const otpString = otp.join('');
            const response = await api.post('/verify-otp', { email, otp: otpString });
            if (response.data.message === 'OTP verified') {
                navigation.navigate('ChangePasswordScreen', { email });
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Failed to verify OTP. Please try again later.');
        }
    };

    const handleResendOtp = async () => {
        try {
            await api.post('/send-otp', { email });
            setCountdown(0); // Set countdown to 0 to hide the countdown text
            setResendVisible(false);
            setResendCount(resendCount + 1); // Increment the resend count to prevent further resends
        } catch (error) {
            console.error('Error resending OTP:', error);
            Alert.alert('Error', 'Failed to resend OTP. Please try again later.');
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='always'>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <View style={[styles.views, styles.one]}>
                            <Text style={styles.header}>Forgot Password Verification</Text>
                            <Text style={styles.subHeader}>Enter your verification code</Text>
                        </View>
                        <View style={[styles.views, styles.two]}>
                            {otp.map((value, index) => (
                                <View key={index} style={styles.inputContainer}>
                                    <TextInput
                                        ref={(ref) => inputRefs.current[index] = ref}
                                        style={styles.textInput}
                                        value={value}
                                        onChangeText={text => handleInputChange(text, index)}
                                        keyboardType='numeric'
                                        maxLength={1}
                                    />
                                </View>
                            ))}
                        </View>
                        {resendVisible ? (
                            <View style={styles.resendButton}>
                                <TouchableOpacity onPress={handleResendOtp}>
                                    <Text style={styles.resendText}>Resend OTP</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            countdown > 0 && (
                                <Text style={styles.countdownText}>
                                    code expiration: {Math.floor(countdown / 60)}:{String(countdown % 60).padStart(2, '0')}
                                </Text>
                            )
                        )}
                        <View style={[styles.views, styles.three]}>
                            <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOtp}>
                                <Text style={styles.verifyText}>Verify</Text>
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
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
        borderRadius: 4,
        backgroundColor: '#f6f8fa',
    },
    textInput: {
        width: wp('15%'),
        height: hp('8%'),
        textAlign: 'center',
        borderRadius: 4,
        fontSize: hp('2.4%'),
        color: '#85929E',
    },
    verifyButton: {
        width: '100%',
        borderRadius: 4,
        backgroundColor: '#2196F3',
        paddingVertical: hp('2%'),
        alignItems: 'center',
        marginTop: hp('2%'),
    },
    verifyText: {
        color: '#fff',
        fontSize: hp('2.6%'),
        fontWeight: '600',
    },
    resendButton: {
        // backgroundColor: '#f44336',
        paddingVertical: hp('2%')
    },
    resendText: {
        fontSize: hp('2%'),
        color: '#2196F3',
        textAlign: 'right'
    },
    countdownText: {
        fontSize: hp('2%'),
        color: '#85929E',
        textAlign: 'right'
    },
});

export default VerifyOtpScreen;
