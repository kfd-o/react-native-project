import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const InputComponent = ({
  textHeader,
  placeholder,
  handleChange,
  name,
  value,
  user,
  numeric,
}) => {
  const [focus, setFocus] = useState(false);
  const [show, setShow] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>{textHeader}</Text>
      <View style={[styles.inputContainer, focus && {borderColor: '#007AFF'}]}>
        {user === 'user' && (
          <MaterialCommunityIcons
            name="account"
            size={20}
            color="#000"
            style={styles.leftIcon}
          />
        )}
        {textHeader === 'Password' && (
          <MaterialCommunityIcons
            name={show ? 'lock-open' : 'lock'}
            size={20}
            color="#000"
            style={styles.leftIcon}
          />
        )}
        {textHeader === 'Email' && (
          <MaterialCommunityIcons
            name="email"
            size={20}
            color="#000"
            style={styles.leftIcon}
          />
        )}
        {textHeader === 'Contact Number' && (
          <MaterialCommunityIcons
            name="cellphone"
            size={20}
            color="#000"
            style={styles.leftIcon}
          />
        )}
        {textHeader === 'Address' && (
          <MaterialIcons
            name="location-on"
            size={20}
            color="#000"
            style={styles.leftIcon}
          />
        )}
        {textHeader === 'Model' && (
          <MaterialCommunityIcons
            name="home-variant"
            size={20}
            color="#000"
            style={styles.leftIcon}
          />
        )}
        {textHeader === 'Description' && (
          <MaterialIcons
            name="description"
            size={20}
            color="#000"
            style={styles.leftIcon}
          />
        )}
        {textHeader === 'Number of Bedroom' && (
          <MaterialIcons
            name="bedroom-parent"
            size={20}
            color="#000"
            style={styles.leftIcon}
          />
        )}
        {textHeader === 'Number of Bathroom' && (
          <MaterialIcons
            name="bathtub"
            size={20}
            color="#000"
            style={styles.leftIcon}
          />
        )}
        {textHeader === 'Number of Carport' && (
          <MaterialCommunityIcons
            name="car"
            size={20}
            color="#000"
            style={styles.leftIcon}
          />
        )}
        {(textHeader === 'Floor Area' || textHeader === 'Lot Area') && (
          <MaterialCommunityIcons
            name="floor-plan"
            size={20}
            color="#000"
            style={styles.leftIcon}
          />
        )}
        {textHeader === 'Price' && (
          <FontAwesome6
            name="peso-sign"
            size={20}
            color="#000"
            style={styles.leftIcon}
          />
        )}

        <TextInput
          value={value}
          onChangeText={value => handleChange(name, value)}
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={{}}
          selectionColor={'#007AFF'}
          secureTextEntry={name === 'password' && !show}
          keyboardType={numeric && 'numeric'}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
        {textHeader === 'Password' && (
          <TouchableOpacity
            style={{
              paddingVertical: hp('2%'),
              paddingHorizontal: hp('1.4%'),
            }}
            onPress={() => setShow(!show)}>
            <MaterialCommunityIcons
              name={show ? 'eye-off' : 'eye'}
              size={20}
              color="#000"
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default InputComponent;

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  textHeader: {
    color: '#000',
    fontSize: hp('2%'),
    fontWeight: '400',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Center items vertically
    borderWidth: 1,
    borderColor: '#DCDCDC',
    borderRadius: 4,
  },
  textInput: {
    flex: 1,
    color: '#000',
    fontSize: hp('2.2%'),
    fontWeight: '300',
  },
  leftIcon: {
    paddingHorizontal: wp('2%'),
  },
});
