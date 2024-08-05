import React, {useState, useEffect, useRef} from 'react';
import {View, Text, FlatList, Pressable, TextInput} from 'react-native';
import io from 'socket.io-client';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {getStyles} from '../../assets/styles/admin/visitorListsTheme';
import api from '../../api/api';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const VisitorListsScreen = ({navigation}) => {
  const [visitors, setVisitors] = useState([]);
  const [filteredVisitors, setFilteredVisitors] = useState([]);
  const socket = useRef(null);
  const value = useSelector(state => state.theme.value);

  const [show, setShow] = useState(null);

  const [search, setSearch] = useState('');

  const styles = getStyles(value);

  const fetchVisitors = async () => {
    try {
      const response = await api.get('/protected/visitor');
      setVisitors(response.data);
      setFilteredVisitors(response.data);
    } catch (error) {
      console.error('Error fetching visitors:', error);
    }
  };

  const handleChange = value => {
    setSearch(value);
    const filtered = visitors.filter(
      visitor =>
        visitor.first_name.toLowerCase().includes(value.toLowerCase()) ||
        visitor.last_name.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredVisitors(filtered);
  };

  useEffect(() => {
    fetchVisitors();

    socket.current = io('http://192.168.100.91:8080');

    socket.current.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    socket.current.on('last-user', userData => {
      setVisitors(prevVisitor => [...prevVisitor, userData]);
      setFilteredVisitors(prevVisitor => [...prevVisitor, userData]);
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
        <Text style={styles.headerText}>Visitors</Text>
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
            placeholderTextColor={styles.placeHolderTextColor}
            value={search}
            onChangeText={value => handleChange(value)}
            onFocus={() => setShow(false)}
            style={styles.inputText}
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
                setFilteredVisitors(visitors);
              }}
            />
          </View>
        )}
      </View>
      <Pressable onPress={() => setShow(false)} style={styles.container}>
        <FlatList
          data={filteredVisitors}
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

export default VisitorListsScreen;
