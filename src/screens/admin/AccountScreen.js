import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api/api';
import { useSelector } from 'react-redux';
import { getStyles } from '../../assets/styles/admin/accountScreenTheme';

const AccountScreen = ({navigation}) => {
    const value = useSelector(state => state.theme.value);
    const styles = getStyles(value);

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
            <View style={styles.headerContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={hp('3%')} color={styles.iconColor} />
        </Pressable>
        <Text style={styles.headerText}>Account</Text>
      </View>
            <Text style={styles.subHeader}>Personal Information</Text>
            <View style={{ paddingVertical: hp('2%'), gap: 10}}>
                
                <View style={styles.containerSettings}>
                    <View style={styles.themeOption}>
                    <Text style={styles.textInput}>First Name: {`${userData.first_name}`}</Text>
                </View>
                </View>   
                <View style={styles.containerSettings}>
                <View style={styles.themeOption}> 
                    <Text style={styles.textInput}>Last Name: {`${userData.last_name}`}</Text>
                </View>
                </View>
                <View style={styles.containerSettings}>
                <View style={styles.themeOption}> 
                    <Text style={styles.textInput}>Username: {`${userData.username}`}</Text>
                </View>
                </View>
                <View style={styles.containerSettings}>       
                <View style={styles.themeOption}> 
                    <Text style={styles.textInput}>Email: {`${userData.email}`}</Text>
                </View>
                </View>
                <View style={styles.containerSettings}>
                <View style={styles.themeOption}> 
                    <Text style={styles.textInput}>Contact Number: {`${userData.contact_num}`}</Text>
                </View>
                </View>
            </View>
       </View>
    
  )
}

export default AccountScreen

