import React, { useState } from 'react';
import { View, Image, TextInput, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';


const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const GoogleMapRegisterInformation = () => {
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
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
  };

  const handleNextButton = async () => {
    if (!userCityFromGoogleMap || !userRegionFromGoogleMap || !description || !price) {
      // Display an alert or a message indicating that the fields need to be filled
      alert('Please fill in all the required fields.');
      return; // Don't proceed further if validation fails
    }

    setLoading(true);

    try {
      // Simulate an asynchronous operation (e.g., API call)
      // Replace this with your actual asynchronous operation
      await new Promise(resolve => setTimeout(resolve, 2000));

      navigation.navigate('GoogleMapRegisterImage', {
        updatedRegisterInfo: updatedRegisterInfo,
        userInfo: userInfoFromLogin,
      });
      setDescription('');
      setPrice('');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.body}>
      <View style={styles.main}>
        <View style={styles.imageWrapper}>
          <Image source={require('../assets/google/almostThere.png')} style={styles.registerImage} />
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
        <TouchableOpacity
          style={[styles.handleNextButtonWrapper, { backgroundColor: '#55bCF6', }]}
          onPress={handleNextButton}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.NextButton}>Proceed</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
  },

  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

  inputContent: {
    height: HEIGHT * 0.40,
    width: WIDTH * 0.95,
  },

  headerText: {
    fontSize: 28,
    textAlign: 'center',
  },

  inputWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: HEIGHT * 0.12,
    marginVertical: HEIGHT * 0.012,
  },

  inputLabelText: {
    marginLeft: 5,
    fontSize: 18,
    width: '25%',
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },

  inputLabelTextWrapper: {
    width: '100%',
    flexDirection: 'row',
  },

  inputLabelTextAddress: {
    fontSize: 18,
    width: '75%',
    flexDirection: 'column',
    textAlignVertical: 'center',
    marginLeft: 5,
    fontWeight: 'bold',
    borderRadius: 40,
    height: 80,
  },

  inputTextWrapper: {
    flexDirection: 'row',
    width: '75%',
    borderRadius: 40,
    borderWidth: 0.5,
    padding: 10,
  },

  inputText: {
    fontSize: 18,
    height: 80,
  },
  handleNextButtonWrapper: {
    width: '95%',
    height: HEIGHT * 0.1,
    marginVertical: HEIGHT * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },

  NextButton: {
    width: '95%',
    textAlign: 'center',
    textAlignVertical: 'center',
    height: HEIGHT * 0.1,
    borderRadius: 50,
    fontSize: 30,
    padding: 15,
    backgroundColor: '#55bCF6',
    color: 'white',
    fontWeight: 'bold',
  }

});

export default GoogleMapRegisterInformation;
