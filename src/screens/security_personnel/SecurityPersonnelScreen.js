import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CommonActions } from '@react-navigation/native';


const SecurityPersonnelScreen = ({ navigation }) => {

    const fetchUserData = async () => {
        const accessToken = await AsyncStorage.getItem('accessToken')
        console.log(accessToken)
    }
    const handleSignout = async () => {
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'AuthNavigator' }],
            })
        );
    };

    useEffect(() => {
        fetchUserData()
    }, [])
    return (
        <View style={styles.container}>
            <Pressable onPress={handleSignout}>
                <Text style={styles.signout}>Signout</Text>
            </Pressable>
        </View>
    )
}

export default SecurityPersonnelScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    signout: {
        color: 'black',
        fontSize: hp('4%')
    }

})