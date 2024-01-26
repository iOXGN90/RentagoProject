import React, { useState } from 'react';
import {
  View,  Button, Image, 
  TextInput, StyleSheet, Text, 
  ScrollView, TouchableOpacity, Dimensions} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const ImageUpload = () => {
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const Navigation = useNavigation();
  const route = useRoute();

  const userInfoFromLogin = route.params?.userInfo;
  const coordinatesFromGoogleMap = route.params?.coordinate;
  const userCityFromGoogleMap = route.params?.userCity;
  const userRegionFromGoogleMap = route.params?.userRegion;

  const updatedRegisterInfo = {
    id: userInfoFromLogin.id,
    longitude: coordinatesFromGoogleMap.longitude,
    latitude: coordinatesFromGoogleMap.latitude,
    address: userCityFromGoogleMap + ', ' + userRegionFromGoogleMap,
    description: description,
    price: price,
  }
  const handleTest = () => {
    // console.log(JSON.stringify('Description: ' + description));
    // console.log(JSON.stringify('Price: ' + 'PHP'+price));
    // console.log(updatedRegisterInfo)
    // console.log()
  }

  const handleNextButton = () => {
    if (!userCityFromGoogleMap || !userRegionFromGoogleMap || !description || !price) {
      // Display an alert or a message indicating that the fields need to be filled
      alert('Please fill in all the required fields.');
      return; // Don't proceed further if validation fails
    }
  
    console.log(JSON.stringify(userInfoFromLogin))
    console.log(JSON.stringify(updatedRegisterInfo))

    Navigation.navigate('GoogleMapRegisterImage', {
      updatedRegisterInfo: updatedRegisterInfo
    });
    setDescription('');
    setPrice('');
  }

  return (
    <ScrollView style={styles.body}>
      <SafeAreaView style={styles.main}>
        <View style={styles.imageWrapper}>
          <Image source={require('../assets/google/almostThere.png')} style={styles.registerImage}/>
        </View>
          <View style={styles.headerTextWrapper}>
            <Text style={styles.headerText}>
              Please provide information for the registered location
            </Text>
          </View>
          <View style={styles.inputContent}>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabelText}>
                Address:
              </Text>
              <View style={styles.inputLabelTextWrapper}>
                <Text style={styles.inputLabelTextAddress}>
                  {userCityFromGoogleMap + ' | ' + userRegionFromGoogleMap}
                </Text>
              </View>
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabelText}>
                Description:
              </Text>
              <View style={styles.inputTextWrapper}>
                <TextInput
                  style={[styles.inputText, { height: Math.max(80, description.split('\n').length * 20) }]}
                  placeholder="Provide specific features in the place"
                  value={description}
                  onChangeText={text => setDescription(text)}
                  multiline={true}
                />
              </View>
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabelText}>
                Price: 
              </Text>
              <View style={styles.inputTextWrapper}>
                <Text style={styles.inputLabelText}>
                  PHP   | 
                </Text>
                <TextInput
                  style={styles.inputText}
                  placeholder="PHP/Month"
                  value={price}
                  onChangeText={text => setPrice(text)}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.handleNextButtonWrapper} onPress={handleNextButton}>
            <Text style={styles.NextButton}>
              Proceed
            </Text>
          </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
  },

  main:{
    // width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  imageWrapper:{
    // marginTop: '5%',
    width: WIDTH*0.95,
    height: HEIGHT*0.63,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    elevation: 10,
    backgroundColor: '#55bCF6',
    borderWidth: 5,
    borderColor: 'violet',
  },

  registerImage:{
    width: WIDTH * 0.95,
    height: HEIGHT * 0.6,
    // padding: 10,
    borderRadius: 40,
  },

  headerWrapper:{
    borderRadius: 40,
    width: '100%',
    height: '100%',
    backgroundColor: 'violet',
  },

  headerTextWrapper:{
    marginTop: HEIGHT * 0.01,
    width: '95%',
    paddingBottom: 30,
    borderBottomWidth: 0.3,
    padding: 10,
    borderRadius: 5,
    // backgroundColor: 'blue',
    // elevation: 1,
  },
  
  inputContent:{
    height: HEIGHT * 0.40,
    width: WIDTH * 0.95 ,
    // marginTop: '5%',
    // backgroundColor: 'green',

  },

  headerText:{
    fontSize: 28,
    textAlign: 'center',
  },

  inputWrapper:{
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: HEIGHT *0.12,
    marginVertical: HEIGHT * 0.012,
    // padding: '2%',
  },

  inputLabelText:{
    marginLeft: 5,
    fontSize: 18,
    width: '25%',
    fontWeight: 'bold',
    textAlignVertical: 'center',
    // backgroundColor: 'red',
  },

  inputLabelTextWrapper:{
    width: '100%',
    flexDirection: 'row',
    // backgroundColor: 'blue', 
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  inputLabelTextAddress:{
    fontSize: 18,
    width: '75%',
    flexDirection: 'column',
    textAlignVertical: 'center',
    marginLeft: 5,
    fontWeight: 'bold',
    borderRadius: 40,
    height: 80,
  },

  inputTextWrapper:{
    flexDirection: 'row',
    width: '75%',
    borderRadius: 40,
    borderWidth: 0.5,
    padding:10,
    // justifyContent: 'center',
    // textAlignVertical: 'center',
    // backgroundColor: 'gray',
  },
  
  inputText:{
    fontSize: 18,
    height: 80,
  },
  handleNextButtonWrapper:{
    width: '100%',
    height: HEIGHT * 0.1,
    marginVertical: HEIGHT * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 140,
    // borderTopWidth: 0.2,
    // elevation: 5,
    // backgroundColor: 'blue',
  },

  NextButton:{
    width: '95%',
    textAlign: 'center',
    textAlignVertical: 'center',
    // marginTop: 20,
    height: HEIGHT * 0.1,
    borderRadius: 50,
    fontSize: 30,
    padding: 15,
    backgroundColor: '#55bCF6',
    color: 'white',
    fontWeight: 'bold',
  }

});

export default ImageUpload;
