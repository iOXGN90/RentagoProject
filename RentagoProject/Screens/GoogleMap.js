import React, { useState, useRef, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from './../enviroment.ts';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

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
    const [markerPosition, setMarkerPosition] = useState({ latitude: 0, longitude: 0 });
    const mapRef = useRef(null);
  
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
    console.log('Marker Coordinates1:', coordinate.latitude);
    console.log('Marker Coordinates2:', coordinate.longitude);
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
    <View style={styles.container}>
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
        <InputAutocomplete label='Place to register' placeholder='Search..' onPlaceSelected={handlePlaceSelected} />
      </View>
    </View>
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
  map: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    width: '90%',
    backgroundColor: 'white',
    shadowColor: 'black',
    elevation: 5,
    padding: 8,
    borderRadius: 8,
    borderWidth: 0.5,
    top: Constants.statusBarHeight,
  },
  input: {
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
});
