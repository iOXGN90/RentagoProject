import React, { useState } from 'react';
import { Button, Image, View, ScrollView, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import mime from "mime";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function GoogleMapRegisterImage() {
  const route = useRoute();
  const registeredInformation = route.params?.updatedRegisterInfo
  const [allSelectedImages, setAllSelectedImages] = useState([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      aspect: [9, 16],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImages = result.assets.map((asset) => ({
        uri: asset.uri,
        id: `${asset.uri}_${Date.now()}`, // Use a combination of URI and timestamp for a unique ID
      }));

      // Use a single array to store all selected images
      setAllSelectedImages([...allSelectedImages, ...selectedImages]);
    }
  };

  const removeImage = (id) => {
    // Filter out the image with the specified id
    const updatedImages = allSelectedImages.filter((image) => image.id !== id);
    setAllSelectedImages(updatedImages);
  };
  
  const collectedImages = [];

const uploadImages = async () => {
  try {
    const apiUrl = 'http://192.168.1.5:3000/api/store-location';
    
    const collectedImages = []; // Initialize an array to collect image names
    
    allSelectedImages.forEach((image, index) => {
      const filename = Date.now() + index + '.jpg';
      collectedImages.push(filename); // Collect the image names
      console.log(`Image ${index + 1}: ${filename}`);
    });

    const requestData = {
      user_id: 1, // Replace with your user_id logic
      long: registeredInformation.longitude,
      lat: registeredInformation.latitude,
      address: registeredInformation.address,
      description: registeredInformation.description,
      price: registeredInformation.price,
      url: collectedImages,
    };

    console.log(requestData);

    const formData = new FormData(); // Create a FormData object
    formData.append('user_id', requestData.user_id);
    formData.append('long', requestData.long);
    formData.append('lat', requestData.lat);
    formData.append('address', requestData.address);
    formData.append('description', requestData.description);
    formData.append('price', requestData.price);

    collectedImages.forEach((imageName, index) => {
      formData.append(`url[${index}]`, imageName); // Append each image name with a unique key
    });

    const response = await axios.post(apiUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set the content type
      },
    });

    console.log('Upload successful!', response.data);
  } catch (error) {
    console.error('Error uploading images:', error.response.data);
    // Handle the error as needed
  }
};



  const test = () =>{
    console.log("Filenames of Stacked Images:");

    allSelectedImages.forEach((image, index) => {
      const filename = Date.now() + index + '.jpg';
      console.log(`Image ${index + 1}: ${filename}`);
    });

    console.log(registeredInformation.user_id)
    console.log(registeredInformation.latitude)
    console.log('this is from address '+ registeredInformation.address)
    console.log(registeredInformation.description)
    console.log(registeredInformation.price)
    // const allUris = allSelectedImages.map(image => image.uri);
    // console.log(JSON.stringify(allUris));
  }

  const filename = new Date().getTime() + '.jpg'
  return (
    <ScrollView style={styles.body}>
      <View style={styles.imageWrapper}>
        <Image 
          source={require('../assets/google/almostThere.png')} 
          style={styles.registerImage}
        />
      </View>
      <View style={styles.headerTextWrapper}>
        <Text style={styles.headerText}>
          Please upload an Image!
        </Text>
      </View>
      <TouchableOpacity style={styles.selectImageButtonWrapper} onPress={pickImage}>
        <Text style={styles.selectImageButton}>
          Select an Image
        </Text>
      </TouchableOpacity>
      <ScrollView style={{ backgroundColor: '#f0f0f0', borderRadius: 5 }} horizontal>
        {allSelectedImages.map((image) => (
          <View key={image.id} style={{ marginHorizontal: 15, marginVertical: 15 }}>
            <Image source={{ uri: image.uri }} style={{ width: 200, height: 300, borderRadius: 30 }} />
            <Text style={{ textAlign: 'center', marginTop: 5 }}>
              {image.filename || filename }
            </Text>
            <TouchableOpacity style={styles.selectImageButtonWrapperRemover} onPress={() => removeImage(image.id)}>
              <Text style={styles.selectImageButtonRemover}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      {allSelectedImages.length > 0 && (
        <TouchableOpacity style={styles.selectImageButtonWrapper} onPress={uploadImages}>
          <Text style={styles.selectImageButton}>
            Upload Image
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'white',
  },

  imageWrapper: {
    marginTop: '1%',
    width: width * 1,
    height: height * 0.525,
    alignItems: 'center',
    padding: 5,
    borderRadius: 40,
    elevation: 10,
    borderWidth: 5,
    borderColor: 'violet',
    backgroundColor: '#55bCF6',
  },

  registerImage: {
    width: '100%',
    height: height * 0.5,
    borderRadius: 40,
  },

  headerTextWrapper: {
    width: width * 1,
    height: height * 0.10,
    // backgroundColor: 'blue'
  },

  headerText: {
    width: '95%',
    fontSize: 28,
    textAlign: 'center',
    marginTop: '5%',
  },

  selectImageButtonWrapper: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.1
  },
  selectImageButtonWrapperRemover:{

    width: width*0.5,
    // backgroundColor: 'blue',
  },


  selectImageButtonRemover:{
    // marginHorizontal: 15,
    marginVertical: 20,
    width: width * 0.47,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 40,
    elevation: 10,
    fontSize: 18,
    marginTop: 10,
    // marginRight: 5,
  },

  selectImageButton: {
    width: width * 0.95,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#55bCF6',
    padding: 15,
    borderRadius: 40,
    elevation: 10,
    fontSize: 25,
  },
});
