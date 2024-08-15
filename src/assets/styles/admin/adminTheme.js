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
    backgroundColor: '#f6f8fa',
  },
  dataText: {
    color: '#000',
    fontSize: hp('3.5%'),
    textAlign: 'center',
  },
  dataSubText: {
    color: '#666666',
    fontSize: hp('2%'),
    textAlign: 'center',
  },
  headerAnalytics: {
    color: '#000',
    fontSize: hp('2.8%'),
    fontWeight: '500',
    marginTop: hp('5%'),
    paddingVertical: hp('2%'),
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
    fontSize: hp('2%'),
    color: 'white',
  },
  profileName: {
    color: '#000',
    fontSize: hp('2%'),
    fontWeight: '500',
  },
  notificationIcon: {
    flexDirection: 'row',
    gap: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconColor: '#000',
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
    backgroundColor: '#f2f2f2',
  },
  dataText: {
    color: '#f1f1f1',
    fontSize: hp('3%'),
    textAlign: 'center',
    fontWeight: '500',
  },
  dataSubText: {
    color: '#fff',
    fontSize: hp('1.5%'),
    textAlign: 'center',
    fontWeight: '500',
  },
  headerAnalytics: {
    color: '#f1f1f1',
    fontSize: hp('3.4%'),
    fontWeight: '500',
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
    color: '#fff',
    fontSize: hp('2%'),
  },
  notificationIcon: {
    flexDirection: 'row',
    gap: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconColor: '#fff',
});

export const getStyles = theme => (theme === 'dark' ? darkStyles : lightStyles);
