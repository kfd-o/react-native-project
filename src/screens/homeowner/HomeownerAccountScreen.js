import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api/api';

const HomeownerAccountScreen = ({navigation}) => {
    const [userData, setUserData] = useState([])
    const checkToken = async () => {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const refreshToken = await AsyncStorage.getItem('refreshToken');

        try {
            const response = await api.post('/check-token', null, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            setUserData(response.data);
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
    },[])
  return (
    
       <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name='arrow-back' size={hp('3.6%')} color='#5D6D7E' />
                </TouchableOpacity>
                <Text style={styles.headerText}>Account</Text>
            </View>
            <Text style={{color: '#5D6D7E', marginTop: hp('5%')}}>Personal Information</Text>
            <View style={{ paddingVertical: hp('2%'), gap: 10}}>
                
                <View style={styles.containerSettings}>
                    <View style={styles.themeOption}>
                    <Text style={{color: '#85929E'}}>First Name: {`${userData.first_name}`}</Text>
                </View>
                </View>   
                <View style={styles.containerSettings}>
                <View style={styles.themeOption}> 
                    <Text style={{color: '#85929E'}}>Last Name: {`${userData.last_name}`}</Text>
                </View>
                </View>
                <View style={styles.containerSettings}>
                <View style={styles.themeOption}> 
                    <Text style={{color: '#85929E'}}>Username: {`${userData.username}`}</Text>
                </View>
                </View>
                <View style={styles.containerSettings}>       
                <View style={styles.themeOption}> 
                    <Text style={{color: '#85929E'}}>Email: {`${userData.email}`}</Text>
                </View>
                </View>
                <View style={styles.containerSettings}>
                <View style={styles.themeOption}> 
                    <Text style={{color: '#85929E'}}>Contact Number: {`${userData.contact_num}`}</Text>
                </View>
                </View>
            </View>
       </View>
    
  )
}

export default HomeownerAccountScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: wp('4%'),
        backgroundColor: '#fff'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp('2%'),
        gap: hp('3%'),
    },
    headerText: {
        color: '#5D6D7E',
        fontWeight: '500',
        fontSize: hp('2.6%'),
    },
    containerSettings: {
        backgroundColor: '#f6f8fa',
        borderRadius: hp('1%'),
    },
    themeOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp('6%'),
        paddingVertical: hp('2%'),
    },
})