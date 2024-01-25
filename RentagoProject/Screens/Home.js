import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ImageBackground, ScrollView, Image } from 'react-native';
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
    // Navigate to 'GoogleMap' screen when search button is pressed
    Navigation.navigate('GoogleMapRegister');
  };

  return (
    <View style={styles.body}>
      <NavigationBar token={tokenFromLogin} userInfo={userInfoFromLogin} />
      <ScrollView style={styles.scrollingContent} showsVerticalScrollIndicator={false}>
        {/* <View style={styles.imageWrapper}>
          <Image 
            source={require('../assets/Login/rentago1.png')} 
            style={styles.loginImage}
          />
          <Text>Alpha Version</Text>
        </View> */}
        <View style={styles.content}>
          <TouchableOpacity onPress={handleSearch} style={styles.searchBarContainer}>
            <Text style={styles.searchText} >Search</Text>
          </TouchableOpacity>
          {/* <View style={styles.featuredContent}>
            <Content />
          </View> */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    // futureUse
  },
  imageWrapper: {
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  scrollingContent: {
    // futureUse
  },
  content: {
    width: "100%",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBarContainer: {
    width: "95%",
    height: 790,
    // position: 'absolute',
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: 'blue',
  },
  searchBarDesign: {
    width: "100%",
    borderRadius: 50,
    height: "10%",
    elevation: 10,
    marginTop: "50%",
  },
  featuredContent: {
    height: 400,
  },
  imageBackground: {
    width: "100%",
  },
});

export default Home;
