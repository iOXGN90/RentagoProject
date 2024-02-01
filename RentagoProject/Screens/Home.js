import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ImageBackground, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavigationBar from '../component/homeNavigation';
import { Searchbar } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

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
        <NavigationBar style={{
          
        }}
        token={tokenFromLogin} userInfo={userInfoFromLogin} />

        <View style={styles.contentContainer} showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  contentContainer: {
    // flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    height: '90%',
    // backgroundColor:'red',
    justifyContent:"center",

  },
  searchButton: {
    backgroundColor: '#05a3fc',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 10,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default Home;