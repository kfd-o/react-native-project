import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const lightStyles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: wp('4%'),
        backgroundColor: '#fff'
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp('2%'),
        gap: hp('3%'),
    },
    headerText: {
        color: '#5D6D7E',
        fontWeight: '500',
        fontSize: hp('2.3%'),
    },
    iconColor: '#5D6D7E',
    subHeader: {
        color: '#5D6D7E', 
        fontSize: hp('2.3%')
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
        paddingVertical: hp('3%'),
    },
    textInput: {
        width: "100%",
        fontSize: hp('1.8%'),
        color: '#85929E',
    },
});

const darkStyles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: wp('4%'),
        backgroundColor: '#0f0f0f'
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp('2%'),
        gap: hp('3%'),
    },
    headerText: {
        color: '#f1f1f1',
        fontWeight: '500',
        fontSize: hp('2.3%'),
    },
    iconColor: '#f1f1f1',
    subHeader: {
        color: '#f1f1f1', 
        fontSize: hp('2.3%')
    },
    containerSettings: {
        backgroundColor: '#272727',
        borderRadius: hp('1%'),
    },
    themeOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp('6%'),
        paddingVertical: hp('3%'),
    },
    textInput: {
        width: "100%",
        fontSize: hp('1.8%'),
        color: '#B0B0B0',
    },
});

export const getStyles = (theme) => (theme === 'dark' ? darkStyles : lightStyles);
