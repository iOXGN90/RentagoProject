import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AboutUs = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.navigation}>
          <View style={styles.leftNav}>
            <TouchableOpacity onPress={handleBackPress} style={styles.goBackButton}>
              <IconButton
                icon={() => <Icon name="keyboard-arrow-left" size={50} />}
                style={styles.goBackButtonIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.centerNav}>
            <Text style={styles.headerText}>About Us</Text>
          </View>
          <View style={styles.rightNav}>{/* future use */}</View>
        </View> 
      <ScrollView contentContainerStyle={styles.scrollContainer}> 
        <Image
          source={require('../assets/rentago.png')} // Change the path accordingly
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.description}>
          Discover simplicity in renting with Rentago. We're more than an app; 
          we're your guide to effortless living. Our user-friendly platform connects 
          you directly with the perfect rental, fostering transparency and ease. 
          At Rentago, we believe in making your journey to the ideal living space 
          straightforward and enjoyable. Explore, connect, and find your perfect home with Rentago.
        </Text>
        <Text style={styles.creaditsHeader}>App Developed by: </Text>
        <Text style={styles.credits}>
          Jhorne Bhoy D. Acenas{'\n'}
          Nevin Harold D. Cabarrubias{'\n'}
          John Dwight L. Paye{'\n'}
          John Mark U. Tingcay{'\n'}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigation: {
    width: "100%",
    height: "5%",
    flexDirection: "row",
  },

  leftNav: {
    flex: 1,
    justifyContent: "center",
  },
  goBackButton: {
    width: "50%",
    justifyContent: "center",
  },
  goBackButtonIcon: {
    borderRadius: 10,
    marginBottom: "25%",
  },
  centerNav: {
    width: "33%",
    justifyContent: "center",
    alignItems: "center",
  },
  rightNav: {
    width: "33%",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  image: {
    width: '75%',
    height: '50%',
    marginBottom: 10,
    bottom: 50,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    padding: 30,
    bottom: 230,
  },
  creaditsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    bottom: 185,
  },
  credits: {
    fontSize: 16,
    textAlign: 'center',
    bottom: 175,
  }
});

export default AboutUs;