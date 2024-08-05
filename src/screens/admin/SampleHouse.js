import React, {useEffect, useState} from 'react';
import {View, Text, Image, FlatList, StyleSheet} from 'react-native';
import api from '../../api/api';

const SampleHouse = () => {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await api.get('/api/retrieve/house/casa');
        setHouses(response.data);
      } catch (error) {
        console.error(error.response?.data || error.message);
      }
    };

    fetchHouses();
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        {item.img_url && (
          <Image source={{uri: item.img_url}} style={styles.image} />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={houses}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default SampleHouse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black',
  },
  itemContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  description: {
    fontSize: 16,
    marginVertical: 5,
    color: 'white',
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
});
