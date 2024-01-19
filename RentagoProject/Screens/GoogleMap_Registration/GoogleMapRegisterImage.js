import React, { useState } from 'react';
import { View, Button, Image, TextInput, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

const ImageUpload = () => {
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [locationData, setLocationData] = useState({
    long: '',
    lat: '',
    address: '',
    description: '',
    url: '',
  });

  
  const route = useRoute();

  const userInfoFromLogin = route.params?.userInfo;
  const coordinatesFromGoogleMap = route.params?.coordinate;

  const handleTest = () =>{
    console.log(JSON.stringify(userInfoFromLogin.id));
    console.log(JSON.stringify(coordinatesFromGoogleMap.latitude));
    console.log(JSON.stringify(coordinatesFromGoogleMap.longitude));
  }

  const handleImageUpload = async () => {
    

    const formData = new FormData();
    formData.append('long', locationData.long);
    formData.append('lat', locationData.lat);
    formData.append('address', locationData.address);
    formData.append('description', locationData.description);
    formData.append('user_id', '1'); // replace '1' with the actual user ID

    // Assuming 'url' is the key for your image files array
    images.forEach((image, index) => {
      formData.append(`url[${index}]`, {
        uri: image.uri,
        type: 'image/jpeg',
        name: `image_${index}.jpg`,
      });
    });

    console.log('FormData:', JSON.stringify(formData));
    try {
      const response = await axios.post('https://192.168.1.5:3000/api/store-location', formData, {
        headers: {
          'Accept': 'application/json',
        },
      });
    
      setImageUrl(response.data); // assuming 'url' is the key for the image URL
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  const handleImageSelect = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
      multiple: true, // Allow multiple image selection
    });

    console.log(result);

    if (!result.cancelled) {
      setImages(result.assets);
    }
  };

  return (
    <View style={styles.body}>
      <TextInput
        style={styles.signupTextInput}
        label="Long"
        value={locationData.long}
        onChangeText={(text) => setLocationData({ ...locationData, long: text })}
      />

      <TextInput
        style={styles.signupTextInput}
        label="Latitude"
        value={locationData.lat}
        onChangeText={(text) => setLocationData({ ...locationData, lat: text })}
      />

      <TextInput
        style={styles.signupTextInput}
        label="Address"
        value={locationData.address}
        onChangeText={(text) => setLocationData({ ...locationData, address: text })}
      />

      <TextInput
        style={styles.signupTextInput}
        label="Description"
        value={locationData.description}
        onChangeText={(text) => setLocationData({ ...locationData, description: text })}
      />

      <Button title="Select Image" onPress={handleTest} />
      {images.map((image, index) => (
        <Image key={index} source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />
      ))}

      <Button title="Upload Image" onPress={handleImageUpload} />
      {imageUrl && <TextInput value={imageUrl} editable={false} />}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupTextInput: {
    // Your styles for TextInput
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    width: 200,
  },
});

export default ImageUpload;
