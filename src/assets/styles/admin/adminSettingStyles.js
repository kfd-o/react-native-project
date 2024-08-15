import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
    fontSize: hp('1.8%'),
  },
  themeOptionContainer: {
    gap: 10,
    justifyContent: 'flex-start',
    flex: 1,
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f6f8fa',
    paddingLeft: wp('6%'),
    paddingRight: wp('2%'),
    paddingVertical: hp('2%'),
    borderRadius: hp('1%'),
  },
  themeOptionIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('5%'),
  },
  iconColor: '#000',
  optionText: {
    color: '#000',
    fontSize: hp('2%'),
  },

  primaryText: {
    fontSize: hp('2%'),
    color: '#000',
  },
  secondaryText: {
    fontSize: hp('1.8%'),
    color: '#666',
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
    fontSize: hp('1.8%'),
    color: '#f1f1f1',
  },
  containerSettings: {
    backgroundColor: '#2A2A2A',
    borderRadius: hp('1%'),
    marginVertical: hp('2%'),
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

  primaryText: {
    color: '#E0E0E0',
  },
  secondaryText: {
    color: '#B0B0B0',
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

export const getAdminStyles = theme =>
  theme === 'dark' ? darkStyles : lightStyles;
