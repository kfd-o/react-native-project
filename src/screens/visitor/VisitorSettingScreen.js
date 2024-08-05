import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Switch, TouchableOpacity, useColorScheme, TouchableWithoutFeedback } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector, useDispatch } from 'react-redux';
import { lightMode, darkMode, systemMode } from '../../features/themeSlice';
import { getVisitorStyles } from '../../assets/styles/visitor/visitorSettingStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import api from '../../api/api';

const VisitorSettingScreen = ({ navigation }) => {
    const value = useSelector((state) => state.theme.value);
    const dispatch = useDispatch();
    const color = useColorScheme();
    const [userData, setUserData] = useState([]);
    console.log(typeof userData.profile_color)
    const [selectedTheme, setSelectedTheme] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);

    const styles = getVisitorStyles(value);

    const checkToken = async () => {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const refreshToken = await AsyncStorage.getItem('refreshToken');

        try {
            const response = await api.post('/check-token', null, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            setUserData(response.data);
            // console.log(response.data)
        } catch (error) {
            if (error.response && error.response.status === 401) {
                try {
                    const response = await api.post('/refresh-token', { token: refreshToken });

                    const { token: newAccessToken, refresh_token: newRefreshToken } = response.data;
                    await AsyncStorage.setItem('accessToken', newAccessToken);
                    await AsyncStorage.setItem('refreshToken', newRefreshToken);

                    checkToken();
                } catch (refreshError) {
                    handleLogout();
                }
            } else {
                console.error(error);
            }
        }
    };

    const handleLight = async () => {
        try {
            dispatch(lightMode());
            await AsyncStorage.setItem('theme', 'light');
            setSelectedTheme('light');
        } catch (error) {
            console.log(error);
        }
    };

    const handleDark = async () => {
        try {
            dispatch(darkMode());
            await AsyncStorage.setItem('theme', 'dark');
            setSelectedTheme('dark');
        } catch (error) {
            console.log(error);
        }
    };

    const handleSystem = async () => {
        try {
            dispatch(systemMode(color));
            await AsyncStorage.setItem('theme', 'system');
            setSelectedTheme('system');
        } catch (error) {
            console.log(error);
        }
    };

    const getTheme = async () => {
        try {
            const theme = await AsyncStorage.getItem('theme');
            if (theme) {
                setSelectedTheme(theme);
                if (theme === 'light') {
                    dispatch(lightMode());
                } else if (theme === 'dark') {
                    dispatch(darkMode());
                } else {
                    dispatch(systemMode(color));
                }
            } else {
                dispatch(systemMode(color));
                setSelectedTheme('system');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const handleLogout = async () => {
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'AuthNavigation' }],
            })
        );
    };


    useEffect(() => {
        checkToken();
        getTheme();
    }, []);

    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', gap: 10, marginTop: hp('2%'), paddingVertical: hp('5%') }}>
                <TouchableWithoutFeedback>
                    <View style={[styles.profileContainer, { backgroundColor: userData.profile_color }]}>
                        <Text style={styles.profileInitial}>{userData.first_name && userData.first_name[0]}</Text>
                    </View>
                </TouchableWithoutFeedback>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.primaryText}>{userData.first_name} {userData.last_name}</Text>
                    <Text style={styles.secondaryText}>{'@'}{userData.username}</Text>
                </View>
            </View>
            <View style={styles.containerSettings}>
                <View style={styles.themeOption}>
                    <View style={styles.themeOptionIcon}>
                        <FontAwesome6 name='user' size={hp('2%')} color={styles.iconColor} />
                        <Text style={styles.optionText}>Personal Information</Text>
                    </View>
                    <View>
                        <Icon name='arrow-forward-ios' size={hp('2%')} color={styles.iconColor} />
                    </View>
                </View>
            </View>
            <View style={styles.containerSettings}>
                <View style={styles.themeOption}>
                    <View style={styles.themeOptionIcon}>
                        <Icon name='notifications' size={hp('2%')} color={styles.iconColor} />
                        <Text style={styles.optionText}>Notification</Text>
                    </View>
                    <Switch
                        trackColor={{ false: '#767577', true: '#03DAC6' }}
                        thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
            </View>
            <View style={styles.containerSettings}>
                <TouchableOpacity style={styles.themeOption} onPress={handleLight}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp('5%') }}>
                        <Icon name='light-mode' size={hp('2%')} color={styles.iconColor} />
                        <Text style={styles.optionText}>Light</Text>
                    </View>
                    <View>
                        <Icon name={selectedTheme === 'light' ? 'radio-button-checked' : 'radio-button-unchecked'} size={hp('2%')} color={styles.iconColor} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.themeOption} onPress={handleDark}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp('5%') }}>
                        <Icon name='dark-mode' size={hp('2%')} color={styles.iconColor} />
                        <Text style={styles.optionText}>Dark</Text>
                    </View>
                    <View>
                        <Icon name={selectedTheme === 'dark' ? 'radio-button-checked' : 'radio-button-unchecked'} size={hp('2%')} color={styles.iconColor} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.themeOption} onPress={handleSystem}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp('5%') }}>
                        <Icon name='contrast' size={hp('2%')} color={styles.iconColor} />
                        <Text style={styles.optionText}>System</Text>
                    </View>
                    <View>
                        <Icon name={selectedTheme === 'system' ? 'radio-button-checked' : 'radio-button-unchecked'} size={hp('2%')} color={styles.iconColor} />
                    </View>
                </TouchableOpacity>
            </View>
            <View>
                <Pressable style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Sign out</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default VisitorSettingScreen;
