import React, {useState} from 'react';
import {
  TextInput,
  Button,
  Image,
  StyleSheet,
  ScrollView,
  View,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../api/api';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {getStyles} from '../../assets/styles/admin/newHouseModelTheme';
import InputComponent from '../../components/InputComponent';
import HeaderComponent from '../../components/HeaderComponent';
import ButtonComponent from '../../components/ButtonComponent';
import HeaderNavigatorComponent from '../../components/HeaderNavigatorComponent';

const AddHomeScreen = ({navigation}) => {
  const value = useSelector(state => state.theme.value);

  const styles = getStyles(value);

  const [formData, setFormData] = useState({
    model: '',
    description: '',
    bedroom: '',
    bathroom: '',
    carport: '',
    floor_area: '',
    lot_area: '',
    price: '',
    image: null,
    internalImages: [],
  });

  console.log(formData.image);
  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = {uri: response.assets[0].uri};
        setFormData({...formData, image: source});
      }
    });
  };

  const handleChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const selectInternalImages = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      selectionLimit: 0,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const sources = response.assets.map(asset => ({uri: asset.uri}));
        setFormData({...formData, internalImages: sources});
      }
    });
  };

  const handleSubmit = async () => {
    if (!formData.image) {
      console.error('No image selected');
      return;
    }

    const submissionData = new FormData();
    submissionData.append('model', formData.model);
    submissionData.append('description', formData.description);
    submissionData.append('bedroom', parseInt(formData.bedroom));
    submissionData.append('bathroom', parseInt(formData.bathroom));
    submissionData.append('carport', parseInt(formData.carport));
    submissionData.append('floor_area', parseInt(formData.floor_area));
    submissionData.append('lot_area', parseInt(formData.lot_area));
    submissionData.append('price', parseInt(formData.price));
    submissionData.append('image', {
      name: 'photo.jpg',
      type: 'image/jpeg',
      uri: formData.image.uri,
    });

    formData.internalImages.forEach((image, index) => {
      submissionData.append('internal_images', {
        name: `photo_${index}.jpg`,
        type: 'image/jpeg',
        uri: image.uri,
      });
    });

    try {
      const response = await api.post('/upload-house', submissionData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderNavigatorComponent header="House Model" />
      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex: 1}}>
            <View style={{paddingVertical: hp('2%')}}>
              <HeaderComponent header="Create house model" />
            </View>
            <View style={{gap: 20}}>
              <InputComponent
                textHeader="Model"
                handleChange={handleChange}
                name="model"
                value={formData.model}
              />
              <InputComponent
                textHeader="Description"
                handleChange={handleChange}
                name="description"
                value={formData.description}
              />
              <InputComponent
                textHeader="Number of Bedroom"
                handleChange={handleChange}
                name="bedroom"
                value={formData.bedroom}
                numeric={true}
              />
              <InputComponent
                textHeader="Number of Bathroom"
                handleChange={handleChange}
                name="bathroom"
                value={formData.bathroom}
                numeric={true}
              />
              <InputComponent
                textHeader="Number of Carport"
                handleChange={handleChange}
                name="carport"
                value={formData.carport}
                numeric={true}
              />
              <InputComponent
                textHeader="Floor Area"
                handleChange={handleChange}
                name="floor_area"
                value={formData.floor_area}
                numeric={true}
              />
              <InputComponent
                textHeader="Lot Area"
                handleChange={handleChange}
                name="lot_area"
                value={formData.lot_area}
                numeric={true}
              />
              <InputComponent
                textHeader="Price"
                handleChange={handleChange}
                name="price"
                value={formData.price}
                numeric={true}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: hp('3%'),
                paddingVertical: hp('1%'),
                marginTop: hp('4%'),
              }}>
              <Text style={styles.subHeader}>Main Image</Text>
              {formData.image !== null && (
                <TouchableOpacity onPress={selectImage}>
                  <MaterialCommunityIcons
                    name="image"
                    size={hp('4%')}
                    color={styles.imageIconColor}
                  />
                </TouchableOpacity>
              )}
            </View>
            {formData.image === null && (
              <TouchableOpacity
                style={styles.imageButton}
                onPress={selectImage}>
                <MaterialCommunityIcons
                  name="image"
                  size={hp('6%')}
                  color={styles.imageIconColor}
                />
                <Text style={styles.imageText}>Click to add an image</Text>
              </TouchableOpacity>
            )}
            {formData.image && (
              <Image source={formData.image} style={styles.mainImage} />
            )}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: hp('3%'),
                paddingVertical: hp('1%'),
                marginTop: hp('2%'),
              }}>
              <Text style={styles.subHeader}>Internal Images</Text>
              {formData.internalImages.length > 0 && (
                <TouchableOpacity onPress={selectInternalImages}>
                  <MaterialCommunityIcons
                    name="image"
                    size={hp('4%')}
                    color={styles.imageIconColor}
                  />
                </TouchableOpacity>
              )}
            </View>
            {formData.internalImages.length <= 0 && (
              <TouchableOpacity
                style={styles.imageButton}
                onPress={selectInternalImages}>
                <MaterialCommunityIcons
                  name="image"
                  size={hp('6%')}
                  color={styles.imageIconColor}
                />
                <Text style={styles.imageText}>Click to add an image</Text>
              </TouchableOpacity>
            )}
            <View style={styles.imagesContainer}>
              {formData.internalImages.map((image, index) => (
                <Image key={index} source={image} style={styles.image} />
              ))}
            </View>
            <ButtonComponent name="Create House Model" press={handleSubmit} />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
};

export default AddHomeScreen;
