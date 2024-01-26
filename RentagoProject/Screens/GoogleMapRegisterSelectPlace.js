import React, { useState, useRef, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { Dimensions, StyleSheet, View, Text, Alert, Image, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from '../environment';
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
        onFail={(error) => console.error('Autocomplete error:', error)}

        onPress={(data, details = null) => {
          if (details) {
            onPlaceSelected(details);
          } else {
            console.warn('No details available for selected place.');
          }
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
  const [markerPosition, setMarkerPosition] = useState({ latitude: 0, longitude: 0 });
  const [address, setAddress] = useState('');
  const mapRef = useRef(null);
  const Navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setMarkerPosition({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        mapRef.current.animateToRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        });
      }
    })();
  }, []);

  const handleMapPress = async (event) => {
    const { coordinate } = event.nativeEvent;

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinate.latitude},${coordinate.longitude}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();

      if (data.status === 'OK' && data.results.length > 0) {
        const addressComponents = data.results[0].address_components;

        const cityComponent = addressComponents.find(component => component.types.includes('locality'));
        const regionComponent = addressComponents.find(component =>
          component.types.includes('administrative_area_level_1') || component.types.includes('administrative_area_level_2')
        );

        const city = cityComponent ? cityComponent.long_name : '';
        const region = regionComponent ? regionComponent.long_name : '';

        const userAddress = `${city}, ${region}`;
        setAddress(userAddress);

        setMarkerPosition(coordinate);
        mapRef.current.animateToRegion({
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        });

        // Log the address after the state has been updated
        console.log('Address:', userAddress);

        setTimeout(() => {
          Alert.alert(
            'Confirmation',
            `Do you want to register this location?\nLatitude: ${coordinate.latitude}\nLongitude: ${coordinate.longitude}`,
            [
              {
                text: 'No',
                style: 'cancel',
                onPress: () => {
                  console.log('Registration Cancelled');
                },
              },
              {
                text: 'Yes',
                onPress: () => {
                  console.log(coordinate);
                  Navigation.navigate('GoogleMapRegisterInformation', {
                    coordinate: coordinate,
                    userInfo: userInfoFromLogin,
                    userCity: city,
                    userRegion: region,
                  });
                },
              },
            ], 
          );
        }, 1500);
      } else {
        console.error('Error fetching address information');
      }
    } catch (error) {
      console.error('Error fetching address information', error);
    }
  };

  const INITIAL_POSITION = {
    latitude: 8.4803,
    longitude: 124.6498,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  const handlePlaceSelected = (details) => {
    if (details && details.geometry && details.geometry.location) {
      const { location } = details.geometry;
      setMarkerPosition(location);
      mapRef.current.animateToRegion({
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          onPress={handleMapPress}
          initialRegion={INITIAL_POSITION}
        >
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
        <InputAutocomplete placeholder='Search a place...' onPlaceSelected={handlePlaceSelected} style={styles.searchBar} />
        {/* Remove the TouchableOpacity or replace it with the desired functionality */}
      </View>
      <View style={styles.imageWrapper}>
        <Image style={styles.imageRentago} source={require('./../assets/rentago.png')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
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
    flexDirection: 'row-reverse',
  },

  imageRentago: {
    height: 150,
    width: 100,
  },
  
  map: {
    flex: 1,
  },

  searchContainer: {
    justifyContent: 'center',
    position: 'absolute',
    marginHorizontal: width * 0.029,
    width: '95%',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    top: Constants.statusBarHeight * 1.3,
  },

  input: {
    textAlign: 'center',
    width: width * 1,
    borderColor: 'gray',
    borderWidth: 0.3,
    borderRadius: 50,
    elevation: 5,
    height: height * 0.08,
  },
});
