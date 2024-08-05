import React, { useState } from 'react';
import { TextInput, Button, Image, StyleSheet, ScrollView, View, Pressable, Text } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons'
import api from '../../api/api';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector } from 'react-redux';
import { getStyles } from '../../assets/styles/admin/newHouseModelTheme';

const AddHomeScreen = ({ navigation }) => {
    const value = useSelector((state) => state.theme.value);

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

console.log(formData.image)
    const selectImage = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                const source = { uri: response.assets[0].uri };
                setFormData({ ...formData, image: source });
            }
        });
    };

    const handleChange = (name, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const selectInternalImages = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            selectionLimit: 0,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                const sources = response.assets.map(asset => ({ uri: asset.uri }));
                setFormData({ ...formData, internalImages: sources });
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
            <View style={styles.headerContainer}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Icon name='arrow-back' size={hp('3%')} color={styles.iconColor} />
                </Pressable>
                <Text style={styles.headerText}>New House Model</Text>
            </View>
            <ScrollView >
                <View style={{ paddingVertical: hp('2%'), gap: hp('1%') }}>
                    <Text style={styles.subHeader}>House Details</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Model"
                            value={formData.model}
                            onChangeText={(value) => handleChange('model', value)}
                            placeholderTextColor={styles.placeholderTextColor}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Description"
                            value={formData.description}
                            onChangeText={(value) => handleChange('description', value)}
                            placeholderTextColor={styles.placeholderTextColor}
                            multiline={true}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Number of Bedroom"
                            value={formData.bedroom}
                            onChangeText={(value) => handleChange('bedroom', value)}
                            placeholderTextColor={styles.placeholderTextColor}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Number of Bathroom"
                            value={formData.bathroom}
                            onChangeText={(value) => handleChange('bathroom', value)}
                            placeholderTextColor={styles.placeholderTextColor}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Number of Carport"
                            value={formData.carport}
                            onChangeText={(value) => handleChange('carport', value)}
                            placeholderTextColor={styles.placeholderTextColor}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Floor Area"
                            value={formData.floor_area}
                            onChangeText={(value) => handleChange('floor_area', value)}
                            placeholderTextColor={styles.placeholderTextColor}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Lot Area"
                            value={formData.lot_area}
                            onChangeText={(value) => handleChange('lot_area', value)}
                            placeholderTextColor={styles.placeholderTextColor}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Price"
                            value={formData.price}
                            onChangeText={(value) => handleChange('price', value)}
                            placeholderTextColor={styles.placeholderTextColor}
                            keyboardType="numeric"
                        />
                    </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: hp('3%'), paddingVertical: hp('1%')}}>
                <Text style={styles.subHeader}>Main Image</Text>
                {
                    formData.image !== null && (
                        <TouchableOpacity  onPress={selectImage}>
                            <MaterialCommunityIcons name='image' size={hp('4%')} color={styles.imageIconColor}/>
                        </TouchableOpacity>
                    )
                }
                </View>
                {
                    formData.image === null && (
                        <TouchableOpacity style={styles.imageButton} onPress={selectImage}>
                            <MaterialCommunityIcons name='image' size={hp('6%')} color={styles.imageIconColor}/>
                            <Text style={styles.imageText}>Click to add an image</Text>
                        </TouchableOpacity>
                    )
                }
                {formData.image && <Image source={formData.image} style={styles.mainImage} />}
                <View style={{flexDirection: 'row', alignItems: 'center', gap: hp('3%'), paddingVertical: hp('1%'), marginTop: hp('2%')}}>
                <Text style={styles.subHeader}>Internal Images</Text>
                {
                    formData.internalImages.length > 0 && (
                        <TouchableOpacity  onPress={selectInternalImages}>
                            <MaterialCommunityIcons name='image' size={hp('4%')} color={styles.imageIconColor}/>
                        </TouchableOpacity>
                    )
                }
                </View>
                {
                    formData.internalImages.length <= 0 && (
                        <TouchableOpacity style={styles.imageButton} onPress={selectInternalImages}>
                            <MaterialCommunityIcons name='image' size={hp('6%')} color={styles.imageIconColor}/>
                            <Text style={styles.imageText}>Click to add an image</Text>
                        </TouchableOpacity>
                
                    )
                }
                <View style={styles.imagesContainer}>
                    {
                        formData.internalImages.map((image, index) => (
                            <Image key={index} source={image} style={styles.image} />
                        ))
                    }
                </View>
                <TouchableOpacity style={{backgroundColor: '#2196F3', padding: hp('1.4%'), marginVertical: hp('2%'), borderRadius: 4}} onPress={handleSubmit}>
                    <Text style={{color: '#fff', alignSelf: 'center'}}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default AddHomeScreen;


