import React, { useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getStyles } from '../../assets/styles/admin/notificationTheme';
import api from '../../api/api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const NotificationScreen = ({navigation}) => {
    const value = useSelector((state) => state.theme.value);

    const styles = getStyles(value);

    const notification = async () => {
        try {
            const response = await api.get('/request-visit/homeowner');
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        notification();
    }, [])
    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
        <TouchableOpacity  onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name='arrow-left' size={hp('3%')} color={styles.arrowBackColor}/>
        </TouchableOpacity>
        
        <Text style={styles.headerText}>Notification</Text>
      </View>
            <View style={styles.notification}>
                <Text style={styles.notificationText}>Notification</Text>
                <Text style={styles.notificationText}>8 min ago</Text>
            </View>
        </ScrollView>
    )
}

export default NotificationScreen

