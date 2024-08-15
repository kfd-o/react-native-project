import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const HeaderNavigatorComponent = ({header}) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <MaterialIcons
          name="arrow-back"
          size={hp('4%')}
          color={styles.iconColor}
        />
      </Pressable>
      <Text style={styles.headerText}>{header}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: hp('3%'),
    paddingBottom: hp('2%'),
  },
  headerText: {
    color: '#000',
    fontWeight: '500',
    fontSize: hp('3%'),
  },
  iconColor: '#000',
});

export default HeaderNavigatorComponent;
