import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const lightStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('2%')
    },
    headerContainer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        gap: hp('3%'),
        paddingBottom: hp('2%')
    },
    iconColor: '#5D6D7E',
    headerText: {
        color: '#5D6D7E',
        fontWeight: '500',
        fontSize: hp('2.3%'),
    },
    inputContainer: {
        width: '100%',
        borderRadius: 4,
        backgroundColor: '#f6f8fa',
    },
    textInput: {
        width: '100%',
        borderRadius: 4,
        paddingVertical: hp('2%'),
        paddingHorizontal: wp('6%'),
        fontSize: hp('1.8%'),
        color: '#85929E',
    },
    imagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    mainImage:{
        resizeMode: 'stretch',
        height: hp('34%'), 
        marginVertical: hp('1%'),
        borderRadius: 4
    },
    image: {
        width: wp('45%'), 
        height: hp('20%'), 
        marginVertical: hp('1%'),
        borderRadius: 4
    },
    placeholderTextColor: '#85929E',
    subHeader: {
        color: '#5D6D7E', 
        fontSize: hp('2.3%')
    },
    subTextColor: '#85929E',
    imageText: {
        color: '#85929E', 
        fontSize: hp('1.8%')
    },
    imageIconColor: '#85929E',
    imageButton:{
        borderWidth: 1, 
        borderColor: '#85929E', 
        borderStyle: 'dashed', 
        height: hp('20%'), 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginVertical: hp('2%'), 
        gap: hp('1%')
    }
    
});

const darkStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f0f0f',
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('2%')
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp('2%'),
        gap: wp('5%'),
      },
      headerText: {
        color: '#f1f1f1',
        fontWeight: '500',
        fontSize: hp('2.3%'),
      },
      arrowBackColor: '#f1f1f1',
    iconColor: '#f1f1f1',
    inputContainer: {
        width: '100%',
        borderRadius: 4,
        backgroundColor: '#272727',
    },
    textInput: {
        width: '100%',
        borderRadius: 4,
        paddingVertical: hp('2%'),
        paddingHorizontal: wp('6%'),
        fontSize: hp('1.8%'),
        color: '#B0B0B0',
    },
    imagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    mainImage:{
        resizeMode: 'stretch',
        height: hp('34%'), 
        marginVertical: hp('1%'),
        borderRadius: 4
    },
    image: {
        width: wp('45%'), 
        height: hp('20%'), 
        marginVertical: hp('1%'),
        borderRadius: 4
    },
    placeholderTextColor: '#B0B0B0',
    subHeader: {
        color: '#f1f1f1', 
        fontSize: hp('2.3%')
    },
    subTextColor: '#B0B0B0',
    imageText: {
        color: '#B0B0B0', 
        fontSize: hp('1.8%')
    },
    imageIconColor: '#B0B0B0',
    imageButton:{
        borderWidth: 1, 
        borderColor: '#B0B0B0', 
        borderStyle: 'dashed', 
        height: hp('20%'), 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginVertical: hp('2%'), 
        gap: hp('1%')
    }
});

export const getStyles = (theme) => (theme === 'dark' ? darkStyles : lightStyles);
