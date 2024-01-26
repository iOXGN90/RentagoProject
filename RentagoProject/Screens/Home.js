import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavigationBar from '../component/homeNavigation';
import { Searchbar } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

const Home = () => {
  const Navigation = useNavigation();
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const route = useRoute();
  const tokenFromLogin = route.params?.token;
  const userInfoFromLogin = route.params?.userInfo;

  const handleSearch = () => {
    // Navigate to 'GoogleMap' screen when the search button is pressed
    Navigation.navigate('GoogleMapSearch');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://i.ibb.co/D5bKCFL/background.png' }}  // Placeholder
        style={styles.imageBackground}
      >
        <NavigationBar token={tokenFromLogin} userInfo={userInfoFromLogin} />

        <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>

          {/* Other content components can be added here */}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchButton: {
    backgroundColor: '#55bCF6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 250,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Home;
