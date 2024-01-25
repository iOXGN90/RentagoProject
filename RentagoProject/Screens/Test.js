import React from 'react';
import { View, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function Test() {
  const handleImageUpload = async () => {
    // Get permission to access the photo library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access photo library denied');
      return;
    }

    // Launch the image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const requestData = {
        user_id: 1, // Replace with your user ID
        long: 12312, // Replace with your longitude
        lat: 123123,   // Replace with your latitude
        address: 'amang', // Replace with your address
        description: '2323', // Replace with your description
        price: '9232',     // Replace with your price
      };

      const formData = new FormData();
      Object.entries(requestData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      formData.append('image', {
        uri: result.uri,
        type: 'image/jpeg',
        name: 'myImage',
      });

      try {
        // Make the POST request to your API endpoint
        let response = await axios.post('http://192.168.1.5:3000/api/store-location', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Image uploaded!', response.data);
      } catch (error) {
        // console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Other components */}
      <Button title="Upload Image" onPress={handleImageUpload} />
    </View>
  );
}
