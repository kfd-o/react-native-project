import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const lightStyles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: hp('3%'),
        paddingHorizontal: wp('3%'),
        gap: 20
    },
    header: {
        fontSize: hp('3%'),
        marginVertical: hp('2%'),
        // fontWeight: 'bold',
        color: '#000',
    },

    terminalContainer: {
        flex: 1,
        backgroundColor: '#f6f8fa',
        borderRadius: hp('1%'),
        paddingVertical: hp('2%'),
        paddingHorizontal: wp('3%')
    },
    terminalText: {
        color: 'black',
        fontSize: hp('1.3%')
    },

});

const darkStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f0f0f',
        paddingVertical: hp('3%'),
        paddingHorizontal: wp('3%'),
        gap: 20
    },
    header: {
        fontSize: hp('3%'),
        marginVertical: hp('2%'),
        // fontWeight: 'bold',
        color: '#f1f1f1',
    },
    terminalContainer: {
        flex: 1,
        backgroundColor: '#272727',
        borderRadius: hp('1%'),
        paddingVertical: hp('2%'),
        paddingHorizontal: wp('3%')
    },
    terminalText: {
        color: '#f1f1f1',
        fontSize: hp('1.3%')
    },
});

export const getStyles = (theme) => (theme === 'dark' ? darkStyles : lightStyles);
