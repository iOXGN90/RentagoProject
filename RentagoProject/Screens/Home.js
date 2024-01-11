import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Alert, ImageBackground, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import NavigationBar from '../component/homeNavigation';
import axios from 'axios';
import { Searchbar } from 'react-native-paper';
import Content from './../component/featuredContent';
import { useRoute } from '@react-navigation/native';


const Home = () => {
  
  
  const navigation = useNavigation();
  // const [userToken, setUserToken] = useState(null);

  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const route = useRoute();
  const tokenFromLogin = route.params?.token;
  const test = route.params?.userInfo;
  console.log(test);
  
  return (
    <View style={styles.body}>
      <ImageBackground
        source={require('./../assets/home/HomeBackground1.jpg')} // Replace with the actual path to your image
        style={styles.imageBackground}
        resizeMode="cover">
        <NavigationBar token={tokenFromLogin}/>
        <ScrollView style={styles.scrollingContent} showsVerticalScrollIndicator={false} >
          <View style={styles.content}>
            <View style={styles.searchBarContainer}>
              <Searchbar placeholder="Search" onChangeText={onChangeSearch} style={styles.searchBarDesign} value={searchQuery}/>
            </View>
            <View style={styles.featuredContent}>
              <Content/>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  body:{
    // futureUse
    },
  
    scrollingContent:{
    // futureUse
      // height: "100%",
    },
  
    content:{
      width: "100%",
      height: "auto",
      alignItems:"center",
      justifyContent: "center",
      // backgroundColor: "gray",
    },
  
    searchBarContainer:{
      width: "95%",
      height: 790,
      // marginBottom: 200,
      alignItems: "center",
      justifyContent: "center",
      // backgroundColor: "white",
    },
    searchBarDesign:{
      width: "100%",
      borderRadius: 50,
      height: "10%",
      elevation: 10,
      marginBottom: "40%",
    },
    featuredContent:{
      // backgroundColor: "blue",
      height: 400,
      // flexDirection:"row",
    },
      imageBackground:{
        // position: 'absolute',
        width: "100%",
      },
    }
);

export default Home;
