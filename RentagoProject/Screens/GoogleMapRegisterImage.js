import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Text, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const Test = () => {

  const Navigation = useNavigation();
  const route = useRoute();

  const updatedInformation = route.params?.updatedRegisterInfo;
  const userInfoFromLogin = route.params?.userInfo;

  const sample = () => {
    console.log(updatedInformation)
  }
  const [selectedImages, setSelectedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChooseImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsMultipleSelection: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.cancelled) {
    // Append the newly selected images to the existing ones
    setSelectedImages((prevImages) => [...prevImages, ...result.assets]);
  }
};
  const handleRemoveImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  const handleImageUpload = async () => {
    const minImages = 5;
    const maxImages = 10;
  
    if (selectedImages.length < minImages || selectedImages.length > maxImages) {
      // Alert the user or handle the case where the number of images is not within the required range
      Alert.alert(
        'Invalid Number of Images',
        `Please select between ${minImages} and ${maxImages} images.`,
      );
      return;
    }
  
    setIsLoading(true);
  
    const formData = new FormData();
  
    // Define requestData here or get it from somewhere
    const requestData = {
      id: updatedInformation.id,
      long: updatedInformation.longitude,
      lat: updatedInformation.latitude,
      address: updatedInformation.address,
      description: updatedInformation.description,
      price: updatedInformation.price,
    };

    // Add other form fields
    formData.append('user_id', requestData.id);
    formData.append('long', requestData.long);
    formData.append('lat', requestData.lat);
    formData.append('address', requestData.address);
    formData.append('description', requestData.description);
    formData.append('price', requestData.price);
  
    // Handle array of files from selectedImages
    selectedImages.forEach((file, index) => {
      const timestamp = Date.now(); // Generate a unique timestamp
      formData.append(`url[${index}]`, {
        uri: file.uri,
        type: 'image/jpeg',
        name: `Image_from_Android_${timestamp}_${index}.jpg`, // Include timestamp in the file name
      });
    });

    try {
      // Make the POST request to your API endpoint
      let response = await axios.post('http://192.168.1.5:3000/api/store-location', 
      // 'http://10.0.0.53:3000/api/store-location',
      formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Image uploaded!', response.data);
    } catch (error) {
      // console.error('Error uploading image:', error);
    } finally {
      setIsLoading(false);
      Navigation.navigate('GoogleMapRegisterImageConfirmation', {
        userInfo: userInfoFromLogin
      })

    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.body}>
        <View style={styles.imageWrapper}>
          <Image source={require('../assets/google/almostThere.png')} style={styles.registerImage} />
        </View>
        <View style={styles.headerTextWrapper}>
          <Text style={styles.headerText}>
            We're almost there, you are required to upload images of the place!
          </Text>
        </View>
        <View style={styles.selectedImagesWrapper}>
          {selectedImages.map((image, index) => (
            <View key={index} style={styles.selectedImageContainer}>
              <Image source={{ uri: image.uri }} style={styles.selectedImage} />
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={() => handleRemoveImage(index)}>
                <Text style={styles.removeImageButtonText}>
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View style={styles.uploadImagesWrapper}>
          <TouchableOpacity style={styles.selectImageButtonWrapper} onPress={handleChooseImage}>
            <Text style={styles.selectImageButton}>
              Select Image
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.uploadImageButtonWrapper,
              { backgroundColor: selectedImages.length === 0 || isLoading ? '#A9A9A9' : '#55bCF6' },
            ]}
            onPress={handleImageUpload}
            disabled={selectedImages.length === 0 || isLoading}>
            <Text style={styles.uploadImageButton}>
              {isLoading ? 'Uploading...' : 'Upload Image'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageWrapper: {
    width: WIDTH * 0.95,
    height: HEIGHT * 0.63,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    elevation: 10,
    backgroundColor: '#55bCF6',
    borderWidth: 5,
    borderColor: 'violet',
  },

  registerImage: {
    width: WIDTH * 0.95,
    height: HEIGHT * 0.6,
    borderRadius: 40,
  },

  headerTextWrapper: {
    marginTop: HEIGHT * 0.01,
    width: '95%',
    paddingBottom: 30,
    borderBottomWidth: 0.3,
    padding: 10,
    borderRadius: 5,
  },

  headerText: {
    fontSize: 28,
    textAlign: 'center',
  },

  selectedImagesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 25,
  },

  selectedImage: {
    width: WIDTH * 0.4,
    height: HEIGHT * 0.3,
    margin: 5,
    borderRadius: 15,
  },

  selectedImageContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue',
    borderWidth: 0.1,
    margin: 15,
    borderRadius:5,

  },

  removeImageButton: {
    backgroundColor: 'blue',
    // position: 'absolute',
    // top: 5,
    // right: 5,
    backgroundColor: 'red',
    // padding: 10,
    margin: 10,
    height: HEIGHT*0.03,
    width: WIDTH*0.2,
    borderRadius: 15,
    justifyContent: 'center',
  },

  removeImageButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },

  uploadImagesWrapper: {
    height: HEIGHT * 0.2,
    width: WIDTH * 1,
    alignItems: 'center',
  },

  selectImageButtonWrapper: {
    width: WIDTH * 0.95,
    padding: 15,
    marginTop: 20,
    backgroundColor: '#55bCF6',
    borderRadius: 30,
    elevation: 10,
  },

  uploadImageButtonWrapper: {
    width: WIDTH * 0.95,
    padding: 15,
    marginTop: 10,
    backgroundColor: '#55bCF6',
    borderRadius: 30,
    elevation: 10,
  },

  selectImageButton: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
  },

  uploadImageButton: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
  },

})


export default Test;