import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { useEffect } from 'react'
import { useColorScheme } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { lightMode, darkMode, systemMode } from '../../features/themeSlice';
import { getStyles } from '../../assets/styles/admin/terminalTheme';


const TerminalScreen = () => {
    const value = useSelector((state) => state.theme.value);
    const dispatch = useDispatch();
    const color = useColorScheme();

    const styles = getStyles(value);

    const getTheme = async () => {
        try {
            const phoneTheme = await AsyncStorage.getItem('theme');
            if (phoneTheme === null) {
                dispatch(systemMode(color));
                await AsyncStorage.setItem('theme', 'system');
            } else {
                if (phoneTheme === 'light') {
                    dispatch(lightMode());
                } else if (phoneTheme === 'dark') {
                    dispatch(darkMode());
                } else {
                    dispatch(systemMode(color));
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTheme()
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Client & Server Logs</Text>
            <ScrollView style={styles.terminalContainer}>
                <Text style={styles.terminalText}>{`[07-07-2024] [09:24:23] : Server Disconnected`}</Text>
            </ScrollView>

        </View>
    )
}

export default TerminalScreen

