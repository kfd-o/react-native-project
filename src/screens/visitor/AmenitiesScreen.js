import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Button,
    Platform,
    Image,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const AmenitiesScreen = () => {

    const [selectedId, setSelectedId] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [numberOfPersons, setNumberOfPersons] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');

    const amenities = [
        {
            id: 1,
            uri: require('../../assets/img/playground.jpeg')
        },
        {
            id: 2,
            uri: require('../../assets/img/basketball_court.jpeg')
        },
        {
            id: 3,
            uri: require('../../assets/img/clubhouse.jpeg')
        },
    ];

    const handlePress = (id) => {
        if (selectedId === id) {
            setSelectedId(null); // Deselect if the same box is pressed
        } else {
            setSelectedId(id);
        }
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const handleSubmit = () => {
        // Handle form submission
        console.log('Form submitted with data:', {
            firstName,
            lastName,
            numberOfPersons,
            contactNumber,
            date,
            selectedId,
        });
    };

    return (
        <View style={styles.container}>
            <Text style={{ color: '#5D6D7E', fontWeight: '600', fontSize: hp('2.6%'), marginHorizontal: wp('4%'), marginVertical: hp('2%') }}>Amenities</Text>
            <View style={styles.scrollContainer}>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContentContainer}
                >
                    {amenities.map((a) => (
                        <TouchableOpacity
                            key={a.id}
                            style={[
                                styles.data,
                                selectedId === a.id && styles.selectedData,
                            ]}
                            onPress={() => handlePress(a.id)}
                        >
                            <Image style={{ width: '100%', height: '100%', borderRadius: 4 }} source={a.uri} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <Text style={{ color: '#5D6D7E', fontWeight: '600', fontSize: hp('2.6%'), marginHorizontal: wp('3%'), marginVertical: hp('2%') }}>Visitor Information</Text>
            <View style={{ flexDirection: 'row', gap: 6, paddingHorizontal: wp('3%'), paddingVertical: hp('.5%') }}>
                <TextInput
                    style={{ width: '49.2%', color: '#85929E', paddingHorizontal: wp('3%'), backgroundColor: '#f6f8fa', borderRadius: 2 }}
                    placeholder='First Name'
                    placeholderTextColor="#85929E"
                    value={firstName}
                    onChangeText={setFirstName}
                />
                <TextInput
                    style={{ width: '49.2%', color: '#85929E', paddingHorizontal: wp('3%'), backgroundColor: '#f6f8fa', borderRadius: 2 }}
                    placeholder='Last Name'
                    placeholderTextColor='#85929E'
                    value={lastName}
                    onChangeText={setLastName}
                />
            </View>
            <View style={{ flexDirection: 'row', gap: 6, paddingHorizontal: wp('3%'), paddingVertical: hp('.5%') }}>
                <TextInput
                    style={{ width: '49.2%', color: '#85929E', paddingHorizontal: wp('3%'), backgroundColor: '#f6f8fa', borderRadius: 2 }}
                    placeholder='Number of Persons'
                    placeholderTextColor='#85929E'
                    value={numberOfPersons}
                    onChangeText={setNumberOfPersons}
                    keyboardType='numeric'
                />
                <TextInput
                    style={{ width: '49.2%', color: '#85929E', paddingHorizontal: wp('3%'), backgroundColor: '#f6f8fa', borderRadius: 2 }}
                    placeholder='Contact Number'
                    placeholderTextColor='#85929E'
                    value={contactNumber}
                    onChangeText={setContactNumber}
                    keyboardType='phone-pad'
                />
            </View>
            <View style={styles.dateTimeContainer}>
                {show && (
                    <DateTimePicker
                        value={date}
                        mode={mode}
                        display='default'
                        onChange={onChange}
                        style={styles.dateTimePicker}
                    />
                )}
            </View>
            <Text style={{ color: '#5D6D7E', fontWeight: '600', fontSize: hp('2.6%'), marginHorizontal: wp('3%'), marginVertical: hp('2%') }}>Date of visit</Text>
            <View style={{ flexDirection: 'row', paddingHorizontal: wp('3%'), gap: 6 }}>
                <TouchableOpacity onPress={() => showMode('date')} style={styles.dateButton}>
                    <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => showMode('time')} style={styles.dateButton}>
                    <Text style={styles.dateText}>{date.toLocaleTimeString()}</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ marginTop: hp('4%'), marginHorizontal: wp('3%'), paddingVertical: hp('1.6%'), backgroundColor: '#1ABC9C', borderRadius: 4, borderColor: "#16A085" }} onPress={handleSubmit}>
                <Text style={{ color: '#fff', alignSelf: 'center' }}>Submit</Text>
            </TouchableOpacity>
        </View>

    );
};

export default AmenitiesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: hp('2%'),
    },
    scrollContainer: {
        width: wp('100%'),
        height: hp('30%'),
        backgroundColor: '#fff',

    },
    scrollView: {
        backgroundColor: '#fff',
    },
    scrollContentContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 6,
        paddingTop: hp('2%'),
        paddingBottom: hp('2%'),
        paddingHorizontal: wp('3%'),
    },
    data: {
        height: hp('20%'),
        width: wp('46%'),
        borderRadius: hp('1%'),
        backgroundColor: '#f6f8fa',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedData: {
        borderColor: '#1F618D',
        borderWidth: 3,
    },
    dataText: {
        color: '#85929E',
    },
    formContainer: {
        width: wp('90%'),
    },

    input: {
        height: hp('6%'),
        borderWidth: 1,
        borderRadius: hp('1%'),
        marginBottom: hp('2%'),
        paddingHorizontal: wp('4%'),
    },
    dateTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateText: {
        fontSize: hp('2%'),
        color: '#85929E'
    },
    dateButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp('2%'),
    },
    dateButton: {
        backgroundColor: '#f6f8fa',
        padding: hp('1%'),
        borderRadius: 4,
        alignItems: 'center',
    },
    dateButtonText: {
        color: 'blue',
    },
    dateTimePicker: {
        flex: 1,
    },
});
