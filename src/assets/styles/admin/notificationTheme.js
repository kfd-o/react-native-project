import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const lightStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: hp("2%"),
        backgroundColor: '#fff'
    },
    notification: {
        backgroundColor: "#f6f8fa",
        height: hp("8%"),
        borderRadius: 10,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: hp("2%")
    },
    notificationText: {
        color: "#000"
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp('2%'),
        gap: wp('5%'),
      },
      headerText: {
        color: '#5D6D7E',
        fontWeight: '500',
        fontSize: hp('2.3%'),
      },
      arrowBackColor: '#5D6D7E',
});

const darkStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: hp("2%"),
        backgroundColor: '#0f0f0f'
    },
    notification: {
        backgroundColor: "#272727",
        height: hp("8%"),
        borderRadius: 10,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: hp("2%")
    },
    notificationText: {
        color: "#f1f1f1"
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
});

export const getStyles = (theme) => (theme === 'dark' ? darkStyles : lightStyles);
