import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  Alert,
  FlatList,
  Linking,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImageView from 'react-native-image-viewing';
import api from '../../api/api';

const HouseDetailScreen = ({route, navigation}) => {
  const {
    model,
    description,
    bedroom,
    bathroom,
    carport,
    floor_area,
    lot_area,
    price,
    img_url,
    id,
  } = route.params;
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await api.get(`/retrieve-house/${id}`);
        setImages(response.data);
      } catch (error) {
        console.error('Failed to fetch images', error);
      }
    };

    fetchImages();
  }, []);

  const openURL = async url => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open ${url}`);
      }
    } catch (error) {
      console.error('An error occurred', error);
      Alert.alert('Failed to open URL');
    }
  };

  const renderImageItem = ({item, index}) => (
    <Pressable
      onPress={() => {
        setCurrentImageIndex(index);
        setIsImageViewVisible(true);
      }}>
      <Image
        source={{uri: item.image_url}}
        style={styles.additionalImage}
        resizeMode="contain"
      />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={{height: hp('40%'), position: 'relative'}}>
        <Pressable
          style={{position: 'absolute', zIndex: 2, left: 10, top: 10}}
          onPress={() => navigation.goBack()}>
          <MaterialIcon
            name="arrow-back"
            size={30}
            color="white"
            style={{
              borderRadius: 50,
              backgroundColor: 'rgba(0,0,0,.4)',
              padding: 5,
            }}
          />
        </Pressable>
        <Image
          source={{uri: img_url}}
          style={{width: '100%', height: hp('35%'), resizeMode: 'stretch'}}
        />
        <View style={styles.imageOverlay} />
      </View>
      <ScrollView style={styles.detailsContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.model}>{model}</Text>
        </View>
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <MaterialCommunityIcon
              name="floor-plan"
              size={25}
              color="#5D6D7E"
            />
            <Text style={styles.featureText}>{`Floor Area`}</Text>
            <Text style={styles.featureText}>{`(${floor_area} sqm)`}</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialCommunityIcon
              name="floor-plan"
              size={25}
              color="#5D6D7E"
            />
            <Text style={styles.featureText}>{`Lot Area`}</Text>
            <Text style={styles.featureText}>{`(${lot_area} sqm)`}</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialIcon name="king-bed" size={25} color="#5D6D7E" />
            <Text style={styles.featureText}>{`Bedroom`}</Text>
            <Text style={styles.featureText}>{`(${bedroom})`}</Text>
          </View>
          <View style={styles.featureItem}>
            <FontAwesome name="bath" size={25} color="#5D6D7E" />
            <Text style={styles.featureText}>{`Bathroom`}</Text>
            <Text style={styles.featureText}>{`(${bathroom})`}</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialCommunityIcon name="car" size={25} color="#5D6D7E" />
            <Text style={styles.featureText}>{`Carport`}</Text>
            <Text style={styles.featureText}>{`(${carport})`}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
        <View>
          <Text style={styles.photosTitle}>Gallery</Text>

          {images.length === 0 ? (
            <Text style={{color: 'red'}}>No available photos</Text>
          ) : (
            <FlatList
              data={images}
              renderItem={renderImageItem}
              keyExtractor={item => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.imagesContainer}
            />
          )}
        </View>
        <View>
          <Text style={styles.descriptionTitle}>For More Info.</Text>
          <View style={styles.contactContainer}>
            <Text style={styles.descriptionText}>Contact Us:</Text>
            <TouchableOpacity
              onPress={() =>
                openURL('fb-messenger://user-thread/100067924101081')
              }>
              <MaterialCommunityIcon
                name="facebook-messenger"
                size={hp('3.4%')}
                color="#5D6D7E"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => openURL('mailto:samplecasareal@gmail.com')}>
              <MaterialIcon name="email" size={hp('3.4%')} color="#5D6D7E" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openURL('tel:0912 345 6789')}>
              <MaterialIcon name="call" size={hp('3.4%')} color="#5D6D7E" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <ImageView
        images={images.map(img => ({uri: img.image_url}))}
        imageIndex={currentImageIndex}
        visible={isImageViewVisible}
        onRequestClose={() => setIsImageViewVisible(false)}
      />
    </View>
  );
};

export default HouseDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    height: 500,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    height: '65%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.4%'),
  },
  model: {
    color: '#5D6D7E',
    fontSize: hp('2.4%'),
    fontWeight: '600',
    paddingVertical: hp('2%'),
  },
  descriptionTitle: {
    color: '#5D6D7E',
    fontSize: hp('2.4%'),
    fontWeight: '600',
    paddingVertical: hp('2%'),
    marginTop: hp('1%'),
  },
  photosTitle: {
    color: '#5D6D7E',
    fontSize: hp('2.4%'),
    fontWeight: '600',
    paddingVertical: hp('2%'),
    marginTop: hp('1%'),
  },
  featureText: {
    color: '#85929E',
    fontSize: hp('1.4%'),
    textAlign: 'center',
  },
  descriptionText: {
    color: '#85929E',
    fontSize: hp('1.8%'),
    lineHeight: 22,
    paddingBottom: hp('2%'),
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: hp('2%'),
  },
  featureItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('20%'),
  },
  contactContainer: {
    flexDirection: 'row',
    gap: hp('6%'),
    paddingVertical: hp('2%'),
  },
  imagesContainer: {
    paddingVertical: hp('2%'),
  },
  additionalImage: {
    width: wp('50%'),
    height: hp('30%'),
  },
});
