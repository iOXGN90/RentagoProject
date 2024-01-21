import React, { useState } from 'react';
import { View, Button, Image, TextInput, StyleSheet, Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

  console.log('FormData:', JSON.stringify(userInfoFromLogin));
  console.log('FormData:', JSON.stringify(coordinatesFromGoogleMap));

  const handleTest = () =>{
    console.log(JSON.stringify('User\'s ID : '+ userInfoFromLogin.id));
    console.log(JSON.stringify('Longitude: ' + coordinatesFromGoogleMap.longitude));
    console.log(JSON.stringify('Latitude: ' + coordinatesFromGoogleMap.latitude));
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
    <SafeAreaView style={styles.body}>
      <View style={styles.headerWrapper}>
        <View style={styles.imageWrapper}>
          <Image 
              source={require('../assets/google/test.png')} 
              style={styles.registerImage}
          />
          <Text  style={styles.headerText}>
            We're almost there, please provide information for the registered location
          </Text>
        </View>
        <View style={styles.inputWrapper}>
          <View style={styles.inputTextWrapper}>
            <TextInput
              style={styles.inputText}
              placeholder="Type something..."
              // onChangeText={(text) => setInputText(text)}
              // value={inputText}
            />
          </View>

        </View>
      </View>




      {/* <Button title="Select Image" onPress={handleTest} />
      {images.map((image, index) => (
        <Image key={index} source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />
      ))}

      <Button title="Upload Image" onPress={handleImageUpload} />
      {imageUrl && <TextInput value={imageUrl} editable={false} />} */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    height: '100%',
    width: '100%',
    // flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    // justifyContent: 'center',
  },
  imageWrapper:{
    width: '100%',
    height: '150%',
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
    elevation: 10,
    // backgroundColor: 'blue',
  },
  registerImage:{
    width: '100%',
    height: '180%',
    borderRadius: 40,
  },

  headerWrapper:{
    width: '100%',
    height: '20%',
    // backgroundColor: 'red',
  },
  headerText:{
    width: '90%',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'normal',
    // marginTop: '5%',
  },

  inputWrapper:{
    alignItems: 'center',
    marginTop: '70%',
    width: '100%',
    height: '50%',
    // elevation: 10,
    // borderWidth: 0.5,
    // backgroundColor: 'gray',
  },
  inputTextWrapper:{
    backgroundColor: 'blue',
    width: '70%',
    borderRadius: 100,
    elevation: 10,
    
  },
  
  inputText:{
    borderRadius: 20,
    width: '70%',
    height: 100,
    // backgroundColor: 'pink'
  },

});

export default ImageUpload;
