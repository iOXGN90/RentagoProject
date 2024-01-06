import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import NavigationBar from '../component/Navigation'
import axios from 'axios';

const Home = () => {
  const Navigation = useNavigation();

  const goLogin = async () => {
    try {
      const YOUR_LOGOUT_API_ENDPOINT = 'http://192.168.1.5:3000/api/logout';
      const YOUR_ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN'; // Replace with your actual access token

      const response = await axios.post(
        YOUR_LOGOUT_API_ENDPOINT,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${YOUR_ACCESS_TOKEN}`,
          },
        }
      );

      if (response.status === 200) {
        // Logout successful
        Alert.alert('Logout', 'Logout successful');
        // You can also clear local storage or AsyncStorage here
        // navigation.navigate('Login'); // Redirect to login screen if needed
      } else {
        // Logout failed
        Alert.alert('Logout', 'Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
    // Navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.Body}>
    <NavigationBar/>
    <View style={styles.upper}>
      <Text style={styles.welcomeText}>
        Welcome User!
      </Text>
    </View>
    <View style={styles.lower}>
      <TouchableOpacity style={styles.logoutButton} onPress={goLogin}>
        <Text style={styles.logoutText}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  Body:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upper:{
    padding: 15,
    margin: 20,
  },
  welcomeText:{
    fontSize: 30,
  },
  lower:{
    padding: 15,
    margin: 20,

  },
  logoutButton:{
    borderRadius: 25,
    padding: 20,
    backgroundColor: '#55bCF6',
    elevation: 10,
  },
  logoutText:{
    fontSize: 40,
    color: 'white',
  },
})

export default Home