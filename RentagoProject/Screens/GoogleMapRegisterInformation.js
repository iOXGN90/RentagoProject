import React, { useState } from 'react';
import { View, Button, Image, TextInput, StyleSheet, Text, ScrollView, TouchableOpacity} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const ImageUpload = () => {
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const Navigation = useNavigation();
  const route = useRoute();

  const userInfoFromLogin = route.params?.userInfo;
  const coordinatesFromGoogleMap = route.params?.coordinate;

  const handleTest = () => {
    // console.log(JSON.stringify('Address: ' + address));
    // console.log(JSON.stringify('Description: ' + description));
    // console.log(JSON.stringify('Price: ' + price));
  }

  const updatedRegisterInfo = {
    id: userInfoFromLogin.id,
    longitude: coordinatesFromGoogleMap.longitude,
    latitude: coordinatesFromGoogleMap.latitude,
    address: address,
    description: description,
    price: price,
  }

  const handleNextButton = () => {
    console.log(JSON.stringify('User\'s ID : '+ updatedRegisterInfo.id));
    console.log(JSON.stringify('Longitude: ' + updatedRegisterInfo.longitude));
    console.log(JSON.stringify('Latitude: ' + updatedRegisterInfo.latitude));
    console.log(JSON.stringify('Address: ' + address));
    console.log(JSON.stringify('Description: ' + description));
    console.log(JSON.stringify('Price: ' + price));
    // Navigation.navigate('', )
  }

  return (
    <ScrollView style={styles.main}>
      <SafeAreaView style={styles.body}>
        <View style={styles.headerWrapper}>
          <View style={styles.imageWrapper}>
            <Image 
                source={require('../assets/google/almostThere.png')} 
                style={styles.registerImage}
            />
            <Text style={styles.headerText}>
              We're almost there, please provide information for the registered location
            </Text>
          </View>
          <View style={styles.inputContent}>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabelText}>
                Address (#/brgy/city/municipal):
              </Text>
              <View style={styles.inputTextWrapper}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Address"
                  value={address}
                  onChangeText={text => setAddress(text)}
                  multiline={true}
                />
              </View>
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabelText}>
                Description:
              </Text>
              <View style={styles.inputTextWrapper}>
                <TextInput
                  style={[styles.inputText, { height: Math.max(80, description.split('\n').length * 20) }]}
                  placeholder="Provide description..."
                  value={description}
                  onChangeText={text => setDescription(text)}
                  multiline={true}
                />
              </View>
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabelText}>
                Price (php/middleContentText):
              </Text>
              <View style={styles.inputTextWrapper}>
                <TextInput
                  style={styles.inputText}
                  placeholder="PHP"
                  value={price}
                  onChangeText={text => setPrice(text)}
                  multiline={true}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.handleNextButtonWrapper} onPress={handleNextButton}>
            <Text style={styles.NextButton}>
              Proceed
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main:{
    // marginTop: '%',
    backgroundColor: 'white'
  },

  body: {
    height: '100%',
    width: '100%',
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    // justifyContent: 'center',
  },
  imageWrapper:{
    marginTop: '1%',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    padding: 5,
    borderRadius: 40,
    elevation: 10,
    backgroundColor: '#55bCF6',
  },

  registerImage:{
    width: '100%',
    height: '180%',
    borderRadius: 40,
  },

  headerWrapper:{
    borderRadius: 40,
    width: '100%',
    height: '20%',
    backgroundColor: 'violet',
  },
  
  inputContent:{
    height: '100%',
    marginTop: '60%',
    // backgroundColor: 'green',
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
    flexDirection: 'row',
    width: '100%',
    height: '60%',
    padding: '2%',
    // marginTop: '70%',
    // marginTop: '5%',
    // elevation: 10,
    // borderWidth: 0.5,
    // backgroundColor: 'gray',
  },

  inputLabelText:{
    fontSize: 18,
    width: '25%',
  },

  inputTextWrapper:{
    // marginLeft: '5%',
    width: '75%',
    borderRadius: 40,
    borderWidth: 0.5,
    // backgroundColor: 'gray',
  },
  
  inputText:{
    borderRadius: 20,
    marginLeft: '5%',
    height: 80,
    // backgroundColor: 'pink'
  },
  handleNextButtonWrapper:{
    // borderTopWidth: 0.2,
    borderColor: 'gray',
    width: '100%',
    marginTop: 140,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue',
  },

  NextButton:{
    marginTop: 20,
    height: 70,
    borderRadius: 50,
    fontSize: 30,
    padding: 15,
    backgroundColor: '#55bCF6',
    color: 'white',
    fontWeight: 'bold',
    elevation: 5,
  },

});

export default ImageUpload;
