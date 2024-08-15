import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const HeaderComponent = ({header, subHeader}) => {
  return (
    <View>
      <Text style={styles.header}>{header}</Text>
      {subHeader && <Text style={styles.subHeader}>{subHeader}</Text>}
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  header: {
    color: '#000',
    fontSize: hp('4%'),
    fontWeight: '500',
  },
  subHeader: {
    color: '#666',
    fontSize: hp('2.6%'),
    fontWeight: '300',
  },
});
