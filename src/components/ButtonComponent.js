import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ButtonComponent = ({name, press}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={press}>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1E90FF',
    height: hp('7%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  text: {
    color: '#fff',
    fontSize: hp('2.4%'),
    fontWeight: '500',
  },
});
