import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const LinkComponent = ({
  name,
  handleNavigateForgotPassword,
  withText,
  subText,
  float,
}) => {
  return (
    <>
      <Text style={styles.subText}>{subText}</Text>
      <Text
        style={[
          styles.link,
          !withText && {alignSelf: 'flex-end'},
          float && {position: 'absolute', bottom: 0},
        ]}
        onPress={handleNavigateForgotPassword}>
        {name}
      </Text>
    </>
  );
};

export default LinkComponent;

const styles = StyleSheet.create({
  subText: {
    color: '#000',
    fontSize: hp('2%'),
    fontWeight: '300',
  },
  link: {
    color: '#1E90FF',
    fontSize: hp('2%'),
    fontWeight: '400',
  },
});
