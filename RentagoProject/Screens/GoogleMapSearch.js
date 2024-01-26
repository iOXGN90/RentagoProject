import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Dimensions, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import axios from 'axios';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from '../environment';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / width;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GoogleMapSearch = () => {
  const Navigation = useNavigation();
  const [positions, setPositions] = useState([]);
  const [searchedPlace, setSearchedPlace] = useState(null);

  const INITIAL_POSITION = {
    latitude: 8.4803,
    longitude: 124.6498,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  useEffect(() => {
    // Fetch positions using Axios
    axios
      .get('http://192.168.1.5:3000/api/find-location', {
        headers: {
          Accept: 'application/json',
        },
      })
      .then((response) => {
        // Set the positions state
        const locations = response.data.data.map((item) => ({ ...item, pressed: false }));
        setPositions(locations);
      })
      .catch((error) => {
        console.error('Error fetching positions:', error);
        Alert.alert('Error', 'Could not fetch positions. Please try again.');
      });
  }, []);

  const handleMarkerPress = (index) => {
    setPositions((prevPositions) => {
      const updatedPositions = [...prevPositions];
      const pressedMarker = updatedPositions[index];
      pressedMarker.pressed = !pressedMarker.pressed;

      // Log the ID and name of the pressed user
      console.log('Pressed user ID:', pressedMarker.id);
      console.log('Pressed user name:', pressedMarker.name);

      // Add a console.log statement for "pressed"
      console.log('Marker pressed:', pressedMarker.pressed);

      return updatedPositions;
    });
  };

  const handleCalloutPress = (index) => {
    const pressedMarker = positions[index];
    console.log('Callout pressed for user ID:', pressedMarker.id);
    console.log('Callout pressed for user name:', pressedMarker.name);
    Navigation.navigate('GoogleMapSearchProfile', { user_id: pressedMarker.id });
  };

  const handlePlaceSelected = (details) => {
    if (details && details.geometry && details.geometry.location) {
      const { location } = details.geometry;
      setSearchedPlace(location);
    }
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} provider={PROVIDER_GOOGLE} initialRegion={INITIAL_POSITION}>
        {/* Display markers for each position in the array */}
        {positions.map((position, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: +position.lat, longitude: +position.long }}
            title={position.name}
            description={`Contact: ${position.contact_number}`}
            pinColor={position.pressed ? 'blue' : 'red'}
            onPress={() => handleMarkerPress(index)}
          >
            <Callout onPress={() => handleCalloutPress(index)}>
              <View>
                <Text>Press me! {position.name}</Text>
                <Text>Contact: {position.contact_number}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
        {searchedPlace && (
          <Marker
            coordinate={searchedPlace}
            title="Searched Place"
            description="This is the searched place"
            pinColor="green"
          />
        )}
      </MapView>
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          styles={{ textInput: styles.input }}
          placeholder="Search a place..."
          fetchDetails
          onFail={(error) => console.error('Autocomplete error:', error)}
          onPress={(data, details = null) => {
            if (details) {
              handlePlaceSelected(details);
            } else {
              console.warn('No details available for selected place.');
            }
          }}
          query={{
            key: GOOGLE_API_KEY,
            language: 'en',
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
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
    width: width * 1,
    borderColor: 'gray',
    borderWidth: 0.3,
    borderRadius: 50,
    elevation: 5,
    height: height * 0.08,
  },
});

export default GoogleMapSearch;
