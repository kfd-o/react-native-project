import { View, Text, Pressable, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector, useDispatch } from 'react-redux';
import { lightMode, darkMode, systemMode } from '../../features/themeSlice';
import { useColorScheme } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getStyles } from '../../assets/styles/admin/adminSettingStyles';

const SecurityPersonnelSettingScreen = ({ navigation }) => {
    const value = useSelector((state) => state.theme.value);
    const dispatch = useDispatch();
    const color = useColorScheme();
    const [selectedTheme, setSelectedTheme] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);

    const styles = getStyles(value);

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

    useEffect(() => {
        getTheme();
    }, []);

    const handleLogout = async () => {
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'AuthNavigator' }],
            })
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Settings</Text>
            <Text style={styles.subHeader}>General</Text>
            <View style={styles.containerSettings}>

                <View style={styles.themeOption}>
                    <View style={styles.themeOptionIcon}>
                        <Icon name='notifications' size={hp('2%')} color={styles.iconColor} />
                        <Text style={styles.optionText}>Notification</Text>
                    </View>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
            </View>
            <Text style={styles.subHeader}>Theme</Text>
            <View style={styles.containerSettings}>

                <TouchableOpacity style={styles.themeOption} onPress={handleLight}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp('5%') }}>
                        <Icon name='light-mode' size={hp('2%')} color={styles.iconColor} />
                        <Text style={styles.optionText}>Light</Text>
                    </View>
                    <View >
                        <Icon name={selectedTheme === 'light' ? 'radio-button-checked' : 'radio-button-unchecked'} size={hp('2%')} color={styles.iconColor} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.themeOption} onPress={handleDark}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp('5%') }}>
                        <Icon name='dark-mode' size={hp('2%')} color={styles.iconColor} />
                        <Text style={styles.optionText}>Dark</Text>
                    </View>
                    <View >
                        <Icon name={selectedTheme === 'dark' ? 'radio-button-checked' : 'radio-button-unchecked'} size={hp('2%')} color={styles.iconColor} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.themeOption} onPress={handleSystem}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp('5%') }}>
                        <Icon name='contrast' size={hp('2%')} color={styles.iconColor} />
                        <Text style={styles.optionText}>System</Text>
                    </View>
                    <View >
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

export default SecurityPersonnelSettingScreen;

