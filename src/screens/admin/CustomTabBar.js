import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getStyles} from '../../assets/styles/admin/tabTheme';
import {useSelector} from 'react-redux';

const CustomTabBar = ({state, descriptors, navigation, bottomSheetRef}) => {
  const theme = useSelector(state => state.theme.value);
  const styles = getStyles(theme);

  const renderIcon = (routeName, focused) => {
    let iconName;
    let IconComponent = MaterialIcons;
    switch (routeName) {
      case 'AdminScreen':
        iconName = 'home-variant';
        IconComponent = MaterialCommunityIcons;
        break;
      case 'AdminSettingScreen':
        iconName = 'account';
        IconComponent = MaterialCommunityIcons;
        break;
      default:
        break;
    }
    return (
      <IconComponent
        name={iconName}
        size={hp('3.6%')}
        color={styles.iconColor}
      />
    );
  };

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tab}>
            {renderIcon(route.name, isFocused)}
            <Text
              style={{
                color: styles.iconColor,
                fontSize: hp('1.4%'),
              }}>
              {options.tabBarLabel}
            </Text>
          </TouchableOpacity>
        );
      })}

      <View style={styles.middleTab} key="middleTab">
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => {
            bottomSheetRef.current.expand();
          }}>
          <MaterialIcons name="add" size={hp('3%')} color={styles.iconColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomTabBar;
