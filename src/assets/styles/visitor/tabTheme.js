import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const lightStyles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: hp('7%'),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleTab: {
    position: 'absolute',
    bottom: hp('1%'),
    left: '50%',
    transform: [{translateX: -hp('2%')}],
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButton: {
    backgroundColor: '#36454F',
    width: hp('5%'),
    height: hp('5%'),
    borderRadius: hp('3.5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIconColor: {
    color: 'white',
  },
  backgroundStyle: {
    backgroundColor: '#fff',
  },
  handleIndicatorStyle: {
    backgroundColor: '#D3D3D3',
    borderRadius: 100,
  },
  handleStyle: {
    backgroundColor: '#fff',
  },
  style: {
    borderRadius: 100,
  },
  bottomSheetContent: {
    flex: 1,
    gap: 18,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('4%'),
  },
  button: {
    padding: hp('1%'),
    flexDirection: 'row',
    alignItems: 'center',
    gap: 34,
    borderRadius: hp('1%'),
    paddingVertical: hp('1%'),
  },
  text: {
    color: '#5D6D7E',
  },
  iconColor: {
    color: '#5D6D7E',
  },
  vectorIcon: {
    color: '#36454F', //charcoal ya kule
  },

  vectorIconText: {
    color: 'black',
  },
});

const darkStyles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: hp('7%'),
    backgroundColor: '#0f0f0f',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleTab: {
    position: 'absolute',
    bottom: hp('1%'),
    left: '50%',
    transform: [{translateX: -hp('2%')}],
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButton: {
    backgroundColor: '#fff',
    width: hp('5%'),
    height: hp('5%'),
    borderRadius: hp('3.5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIconColor: {
    color: '#36454F',
  },
  backgroundStyle: {
    backgroundColor: '#222222',
  },
  handleIndicatorStyle: {
    backgroundColor: '#4c4c4c',
  },
  handleStyle: {
    backgroundColor: '#222222',
  },
  style: {
    borderRadius: 100,
  },
  button: {
    padding: hp('1%'),
    flexDirection: 'row',
    alignItems: 'center',
    gap: 34,
    borderRadius: hp('1%'),
    paddingVertical: hp('1%'),
  },
  bottomSheetContent: {
    flex: 1,
    gap: 10,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('4%'),
  },
  text: {
    color: '#E0E0E0',
  },
  iconColor: {
    color: '#E0E0E0',
  },
  vectorIcon: {
    color: '#F5F5F5',
  },
  vectorIconText: {
    color: '#F5F5F5',
  },
  tabBarStyle: {
    backgroundColor: '#222222',
  },
});

export const getStyles = theme => (theme === 'dark' ? darkStyles : lightStyles);
