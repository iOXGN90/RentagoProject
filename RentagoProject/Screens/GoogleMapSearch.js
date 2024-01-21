import React from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / width;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const INITIAL_POSITION = {
  latitude: 8.4803,
  longitude: 124.6498,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

const positions = [
  {
    latitude: 8.4803,
    longitude: 124.6498,
  },
  {
    latitude: 8.4359,
    longitude: 124.5196,
  },
  {
    latitude: 8.409092858785751,
    longitude: 124.61538858711721,
  },
  {
    latitude: 8.446009465918543,
    longitude: 124.646406657993,
  },
];

export default function App() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} provider={PROVIDER_GOOGLE} initialRegion={INITIAL_POSITION}>
        {/* Display red markers for each position in the array */}
        {positions.map((position, index) => (
          <Marker key={index} coordinate={{ latitude: position.latitude, longitude: position.longitude }} pinColor="red" />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
