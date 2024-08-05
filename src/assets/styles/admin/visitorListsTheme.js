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
  },
  data: {
    borderRadius: hp('1%'),
    backgroundColor: '#f6f8fa',
    flexDirection: 'row',
    gap: wp('3%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
  },
  profileCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    height: hp('4%'),
    width: hp('4%'),
  },
  profileInitial: {
    fontSize: hp('2%'),
    color: 'white',
  },
  subHeader: {
    color: '#5D6D7E',
    fontSize: hp('1.8%'),
  },
  text: {
    color: '#85929E',
    fontSize: hp('1.6%'),
  },
  headerContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: hp('3%'),
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('2%'),
  },
  iconColor: '#5D6D7E',
  headerText: {
    color: '#5D6D7E',
    fontWeight: '500',
    fontSize: hp('2.3%'),
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: wp('4%'),
  },
  innerSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIconColor: '#5D6D7E',
  primaryTextColor: '#5D6D7E',
  subTextColor: '#85929E',

  clearIconColor: '#5D6D7E',
  verticalDotColor: '#5D6D7E',
  placeHolderTextColor: '#5D6D7E',
  deleteText: {
    color: '#0f0f0f',
    fontSize: hp('1.4%'),
  },
  deleteContainer: {
    position: 'absolute',
    right: 6,
    top: 30,
    backgroundColor: '#fff',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputText: {
    backgroundColor: '#fff',
    color: '#5D6D7E',
    width: wp('78%'),
    fontSize: hp('2%'),
  },

  deleteButton: {
    width: wp('20%'),
    paddingHorizontal: wp('1%'),
    paddingVertical: hp('1%'),
    alignItems: 'center',
    flexDirection: 'row',
    gap: wp('2%'),
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    paddingHorizontal: wp('4%'),
  },
  data: {
    borderRadius: hp('1%'),
    backgroundColor: '#272727',
    flexDirection: 'row',
    gap: wp('3%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
  },
  profileCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    height: hp('4%'),
    width: hp('4%'),
  },
  profileInitial: {
    fontSize: hp('2%'),
    color: 'white',
  },
  subHeader: {
    color: '#f1f1f1',
    fontSize: hp('1.8%'),
  },
  text: {
    color: '#B0B0B0',
    fontSize: hp('1.6%'),
  },
  headerContainer: {
    backgroundColor: '#0f0f0f',
    flexDirection: 'row',
    alignItems: 'center',
    gap: hp('3%'),
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('3%'),
  },
  iconColor: '#f1f1f1',
  headerText: {
    color: '#f1f1f1',
    fontWeight: '500',
    fontSize: hp('2.6%'),
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0f0f0f',
    paddingHorizontal: wp('4%'),
  },
  innerSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIconColor: '#f1f1f1',
  primaryTextColor: '#f1f1f1',
  subTextColor: '#f1f1f1',

  clearIconColor: '#f1f1f1',
  verticalDotColor: '#f1f1f1',
  placeHolderTextColor: '#f1f1f1',
  deleteText: {
    color: '#0f0f0f',
    fontSize: hp('1.4%'),
  },
  deleteContainer: {
    position: 'absolute',
    right: 6,
    top: 30,
    backgroundColor: '#fff',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  deleteButton: {
    width: wp('20%'),
    paddingHorizontal: wp('1%'),
    paddingVertical: hp('1%'),
    alignItems: 'center',
    flexDirection: 'row',
    gap: wp('2%'),
  },
  inputText: {
    backgroundColor: '#0f0f0f',
    color: '#f1f1f1',
    width: wp('78%'),
    fontSize: hp('2%'),
  },
});

export const getStyles = theme => (theme === 'dark' ? darkStyles : lightStyles);
