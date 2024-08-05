import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  TextInput,
} from 'react-native';
import io from 'socket.io-client';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useColorScheme} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {lightMode, darkMode, systemMode} from '../../features/themeSlice';
import {getStyles} from '../../assets/styles/admin/visitorListsTheme';
import api from '../../api/api';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';

const SecurityPersonnelListsScreen = ({navigation}) => {
  const [securityPersonnels, setSecurityPersonnels] = useState([]);
  const [filteredSecurityPersonnels, setFilteredSecurityPersonnels] = useState(
    [],
  );
  const socket = useRef(null);
  const value = useSelector(state => state.theme.value);
  const dispatch = useDispatch();
  const color = useColorScheme();
  const [show, setShow] = useState(null);

  const [search, setSearch] = useState('');

  const styles = getStyles(value);

  const fetchSecurityPersonnels = async () => {
    try {
      const response = await api.get('/protected/security-personnel');
      setSecurityPersonnels(response.data);
      setFilteredSecurityPersonnels(response.data);
    } catch (error) {
      console.error('Error fetching security-personnel:', error);
    }
  };

  const handleChange = value => {
    setSearch(value);
    const filtered = securityPersonnels.filter(
      sp =>
        sp.first_name.toLowerCase().includes(value.toLowerCase()) ||
        sp.last_name.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredSecurityPersonnels(filtered);
  };

  useEffect(() => {
    fetchSecurityPersonnels();

    socket.current = io('http://192.168.100.91:8080');

    socket.current.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    socket.current.on('last-user', userData => {
      setSecurityPersonnels(prevState => [...prevState, userData]);
      setFilteredSecurityPersonnels(prevState => [...prevState, userData]);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.data}>
      <View
        style={[styles.profileCircle, {backgroundColor: item.profile_color}]}>
        <Text style={styles.profileInitial}>{item.first_name[0]}</Text>
      </View>
      <View style={{justifyContent: 'center'}}>
        <Text
          style={
            styles.subHeader
          }>{`${item.first_name} ${item.last_name}`}</Text>
        <Text style={styles.text}>{item.email}</Text>
        <Text style={styles.text}>{item.contact_num}</Text>
      </View>
      <View style={{position: 'absolute', right: 0, top: 6}}>
        <Pressable
          style={{padding: hp('.5%'), borderRadius: hp('50%')}}
          onPress={() => setShow(show === item.id ? null : item.id)}>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={hp('2%')}
            color={styles.verticalDotColor}
          />
        </Pressable>
      </View>
      {show === item.id && (
        <View style={styles.deleteContainer}>
          <Pressable style={styles.deleteButton}>
            <MaterialCommunityIcons name="delete" size={hp('2%')} color="red" />
            <Text style={styles.deleteText}>Delete</Text>
          </Pressable>
        </View>
      )}
    </View>
  );

  return (
    <>
      <View style={styles.headerContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={hp('3.6%')} color={styles.iconColor} />
        </Pressable>
        <Text style={styles.headerText}>Security Personnel</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.innerSearchContainer}>
          <MaterialIcon
            name="search"
            size={hp('3%')}
            color={styles.searchIconColor}
          />
          <TextInput
            placeholder="Search"
            placeholderTextColor={styles.primaryTextColor}
            style={styles.inputText}
            value={search}
            onChangeText={value => handleChange(value)}
            onFocus={() => setShow(false)}
          />
        </View>
        {search.length >= 1 && (
          <View>
            <MaterialIcon
              name="cancel"
              size={hp('3%')}
              color={styles.clearIconColor}
              onPress={() => {
                setSearch('');
                setFilteredSecurityPersonnels(securityPersonnels);
              }}
            />
          </View>
        )}
      </View>
      <Pressable onPress={() => setShow(false)} style={styles.container}>
        <FlatList
          data={filteredSecurityPersonnels}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{
            gap: hp('1%'),
            paddingVertical: hp('1%'),
          }}
        />
      </Pressable>
    </>
  );
};

export default SecurityPersonnelListsScreen;
