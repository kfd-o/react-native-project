import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
  },
  headerContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: hp('3%'),
    paddingBottom: hp('2%'),
  },
  iconColor: '#000',
  headerText: {
    color: '#000',
    fontWeight: '500',
    fontSize: hp('3%'),
  },
  subHeader: {
    color: '#5D6D7E',
    fontSize: hp('2.3%'),
  },
  inputSection: {
    gap: hp('1%'),
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
  buttonSignup: {
    width: '100%',
    borderRadius: 4,
    backgroundColor: '#2196F3',
    paddingVertical: hp('1.8%'),
    alignItems: 'center',
  },
  placeholderTextColor: '#85929E',
  signupText: {
    color: '#fff',
    fontSize: hp('2%'),
    fontWeight: '700',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
  },
  headerContainer: {
    backgroundColor: '#0f0f0f',
    flexDirection: 'row',
    alignItems: 'center',
    gap: hp('3%'),
    paddingBottom: hp('2%'),
  },
  iconColor: '#f1f1f1',
  headerText: {
    color: '#f1f1f1',
    fontWeight: '500',
    fontSize: hp('3%'),
  },
  subHeader: {
    color: '#f1f1f1',
    fontSize: hp('2.3%'),
  },

  inputSection: {
    gap: hp('1%'),
  },
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
  buttonSignup: {
    width: '100%',
    borderRadius: 4,
    backgroundColor: '#2196F3',
    paddingVertical: hp('1.8%'),
    alignItems: 'center',
  },
  placeholderTextColor: '#B0B0B0',
  signupText: {
    color: '#fff',
    fontSize: hp('2%'),
    fontWeight: '700',
  },
});

export const getStyles = theme => (theme === 'dark' ? darkStyles : lightStyles);
