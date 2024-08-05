import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const lightStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: hp('2%'),
        backgroundColor: '#fff',
        gap: 10,
    },
    header: {
        fontSize: hp('3%'),
        marginVertical: hp('2%'),
        color: '#85929E',
    },
    subHeader: {
        color: '#85929E',
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
    themeOptionIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp('5%'),
    },
    iconColor: '#5D6D7E',
    optionText: {
        color: '#5D6D7E',
        fontSize: hp('2%'),
    },
    logoutButton: {
        backgroundColor: '#FFD6CC',
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('6.4%'),
        borderRadius: hp('1%'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutText: {
        fontSize: hp('2%'),
        color: '#FF6347',
    },
    primaryText: {
        color: '#5D6D7E',
    },
    secondaryText: {
        color: '#85929E',
    },
    arrowBack: '#5D6D7E',
    headerText: {
        color: '#5D6D7E',
        fontWeight: '600',
        fontSize: hp('2.6%'),
    },
    profileContainer: {
        borderRadius: hp('100%'),
        width: hp('14%'),
        height: hp('14%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileInitial: {
        fontSize: hp('5%'),
        color: 'white',
    },
});

const darkStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: hp('2%'),
        backgroundColor: '#1C1C1C',
        gap: 10,
    },
    header: {
        fontSize: hp('3%'),
        marginVertical: hp('2%'),
        color: '#f1f1f1',
    },
    subHeader: {
        color: '#f1f1f1',
    },
    containerSettings: {
        backgroundColor: '#2A2A2A',
        borderRadius: hp('1%'),
    },
    themeOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp('6%'),
        paddingVertical: hp('2%'),
    },
    themeOptionIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp('5%'),
    },
    iconColor: '#B0B0B0',
    optionText: {
        color: '#B0B0B0',
        fontSize: hp('2%'),
    },
    logoutButton: {
        backgroundColor: '#FFD6CC',
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('6.4%'),
        borderRadius: hp('1%'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutText: {
        fontSize: hp('2%'),
        color: '#FF6347',
    },
    primaryText: {
        color: '#E0E0E0',
    },
    secondaryText: {
        color: '#B0B0B0',
    },
    arrowBack: '#f1f1f1',
    headerText: {
        color: '#5D6D7E',
        fontWeight: '600',
        fontSize: hp('2.6%'),
    },
    profileContainer: {
        borderRadius: wp('10%'),
        width: wp('20%'),
        height: wp('20%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileInitial: {
        fontSize: hp('3%'),
        color: 'white',
    },
});

export const getVisitorStyles = (theme) => (theme === 'dark' ? darkStyles : lightStyles);
