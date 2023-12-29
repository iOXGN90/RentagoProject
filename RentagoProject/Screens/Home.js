import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const Navigation = useNavigation();

  const goLogin = () => {
    Navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.Body}>
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