import React, { useState, useRef, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { Dimensions, StyleSheet, View, Text, Alert, Image, TouchableOpacity  } from 'react-native';
import { GooglePlacesAutocomplete, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from './../enviroment'; // make environment.ts = API of googlemap; import 
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';


const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


type InputAutocompleteProps = {
  label: string;
  placeholder: string;
  onPlaceSelected: (details: GooglePlaceDetail | null) => void;
};

function InputAutocomplete({
  label,
  placeholder,
  onPlaceSelected,
}: InputAutocompleteProps) {
  return (
    <>
      <Text>{label}</Text>
      <GooglePlacesAutocomplete
        styles={{ textInput: styles.input }}
        placeholder={placeholder || ''}
        fetchDetails
        onPress={(data, details = null) => {
          onPlaceSelected(details);
        }}
        query={{
          key: GOOGLE_API_KEY,
          language: 'en',
        }}
      />
    </>
  );
}

export default function App() {
    const route = useRoute();
    const userInfoFromLogin = route.params?.userInfo;

    const handleTest = () =>{
      console.log(userInfoFromLogin);
    }


    const [markerPosition, setMarkerPosition] = useState({ latitude: 0, longitude: 0 });
    const mapRef = useRef(null);
  
    const Navigation = useNavigation();


  useEffect(() => {
    // Get the device's current location and set it as the initial marker position
    (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          setMarkerPosition({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });

        // Center the map on the current location
        mapRef.current.animateToRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        });
      }
    })();
  }, []);


  const handleMapPress = (event) => {
    // Get the coordinates of the touch event
    const { coordinate } = event.nativeEvent;
  
    // Update the marker position state
    setMarkerPosition(coordinate);
  
    // Log the coordinates to the console
    console.log('location:', coordinate);
    
    // Adjust the map zoom and center to the pressed location
    mapRef.current.animateToRegion({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      latitudeDelta: 0.02, // Adjust the desired zoom level
      longitudeDelta: 0.02 * ASPECT_RATIO, // Adjust the desired zoom level
    });


    // Introduce a delay of 0.5 seconds
    setTimeout(() => {
      // Show an alert for confirmation
      Alert.alert(
        'Confirmation',
        'Do you want to register this location?' + '\nLatitude: ' + JSON.stringify(coordinate.latitude) + '\nLongitude: ' + JSON.stringify(coordinate.longitude),
        [
          {
            text: 'No',
            style: 'cancel',
            onPress: () => {
              console.log('Registration Cancelled')
            },
          },
          {
            text: 'Yes',
            onPress: () => {
              // Handle registration logic here
              // console.log('Location pending for register:', coordinate);
              Navigation.navigate('GoogleMapRegisterImage', {
                coordinate : coordinate,  
                userInfo : userInfoFromLogin,
              });
            },
          },
        ]
      );
    }, 1500); // 1000 milliseconds (1 second)
  };
  
  const handlePlaceSelected = (details) => {
    if (details && details.geometry && details.geometry.location) {
      const { location } = details.geometry;
      setMarkerPosition(location);

      // Center the map on the selected place
      mapRef.current.animateToRegion({
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          onPress={handleMapPress} // Handle map press
        >
          {/* Conditional rendering of Marker based on markerPosition */}
          {markerPosition.latitude !== 0 && markerPosition.longitude !== 0 && (
            <Marker coordinate={markerPosition} title="Red Marker" pinColor="red">
              <Callout>
                <View>
                  <Text>Coordinates: {markerPosition.latitude}, {markerPosition.longitude}</Text>
                </View>
              </Callout>
            </Marker>
          )}
        </MapView>
      </View>
      <View style={styles.searchContainer}>
        <InputAutocomplete placeholder='Search a place to register...' onPlaceSelected={handlePlaceSelected}/>
        <TouchableOpacity onPress={handleTest}>
        {/* <Text>test</Text> */}
      </TouchableOpacity>
      </View>
      <View style={styles.imageWrapper}>
        <Image style={styles.imageRentago} source={require('./../assets/rentago.png')}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapContainer: {
    flex: 1,
    width: '100%',
  },
  imageWrapper: {
    position: 'absolute',
    bottom: -59,
    right: Constants.rightOffset,
    width: '100%',
    height: 'auto',
    flexDirection: 'row-reverse',
  },

  imageRentago:{
    height: 150,
    width: 100,
  },

  map: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    width: '95%',
    backgroundColor: 'white',
    borderColor: 'gray',
    shadowColor: "#05a3fc",
    elevation: 10,
    padding: 20,
    borderRadius: 30,
    borderWidth: 0.4,
    top: Constants.statusBarHeight,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 0.3,
    borderRadius: 20,
    // marginBottom: 20,
  },
});
