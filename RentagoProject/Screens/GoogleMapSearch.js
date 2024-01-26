import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import axios from 'axios';

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / width;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const YourComponent = () => {
  const [positions, setPositions] = useState([]);
  const [pressedMarker, setPressedMarker] = useState(null);

  const INITIAL_POSITION = {
    latitude: 8.4803,
    longitude: 124.6498,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  useEffect(() => {
    // Fetch positions using Axios
    axios.get('http://192.168.1.5:3000/api/find-location', {
      headers: {
        Accept: 'application/json',
        // You can add more headers if needed
      },
    })
      .then(response => {
        // Set the positions state
        const locations = response.data.data.map(item => ({ ...item, pressed: false }));
        console.log(locations)
        setPositions(locations);
      })
      .catch(error => {
        console.error('Error fetching positions:', error);
        Alert.alert('Error', 'Could not fetch positions. Please try again.');
      });
  }, []);

  const handleMarkerPress = (index) => {
    // Toggle the pressed state of the marker
    setPositions(prevPositions => {
      const updatedPositions = [...prevPositions];
      updatedPositions[index].pressed = !updatedPositions[index].pressed;
      return updatedPositions;
    });
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
            pinColor={position.pressed ? "blue" : "red"}
            onPress={() => handleMarkerPress(index)}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default YourComponent;
