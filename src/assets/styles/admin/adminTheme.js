import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: hp('4%'),
    paddingHorizontal: wp('4%'),
  },
  dataContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 6,
    paddingVertical: hp('1%'),
  },
  data: {
    height: hp('17%'),
    width: wp('45%'),
    borderRadius: hp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
    gap: hp('1.4%'),
  },
  dataText: {
    color: '#fff',
    fontSize: hp('3%'),
    textAlign: 'center',
  },
  dataSubText: {
    color: '#fff',
    fontSize: hp('1.5%'),
    textAlign: 'center',
  },
  headerAnalytics: {
    color: '#5D6D7E',
    fontSize: hp('2.4%'),
  },
  analyticsContainer: {
    gap: 6,
    paddingBottom: hp('6%'),
  },
  analytics: {
    backgroundColor: '#f6f8fa',
    height: hp('30%'),
    width: wp('92%'),
    borderRadius: hp('1%'),
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  profileIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: wp('10%'),
    width: wp('10%'),
    borderRadius: 50,
  },
  profileInitial: {
    fontSize: hp('2.6%'),
    color: 'white',
  },
  profileName: {
    color: '#5D6D7E',
    fontSize: hp('2%'),
  },
  notificationIcon: {
    flexDirection: 'row',
    gap: 14,
  },
  iconColor: '#5D6D7E',
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    paddingVertical: hp('4%'),
    paddingHorizontal: wp('4%'),
  },
  dataContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 6,
    paddingTop: hp('3%'),
    paddingBottom: hp('1%'),
  },
  data: {
    height: hp('17%'),
    width: wp('45%'),
    borderRadius: hp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
    gap: hp('1.4%'),
  },
  dataText: {
    color: '#f1f1f1',
    fontSize: hp('3%'),
    textAlign: 'center',
  },
  dataSubText: {
    color: '#fff',
    fontSize: hp('1.5%'),
    textAlign: 'center',
  },
  headerAnalytics: {
    color: '#f1f1f1',
    fontSize: hp('2.4%'),
  },
  analyticsContainer: {
    gap: 6,
    paddingBottom: hp('6%'),
  },
  analytics: {
    backgroundColor: '#272727',
    height: hp('30%'),
    width: wp('92%'),
    borderRadius: hp('1%'),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('5%'),
  },
  profileIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('5%'),
    width: hp('5%'),
    borderRadius: 50,
  },
  profileInitial: {
    fontSize: hp('2.6%'),
    color: 'white',
  },
  profileName: {
    color: '#f1f1f1',
    fontSize: hp('2%'),
  },
  notificationIcon: {
    flexDirection: 'row',
    gap: 14,
  },
});

export const getStyles = theme => (theme === 'dark' ? darkStyles : lightStyles);
