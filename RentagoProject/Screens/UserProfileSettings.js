import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {useNavigation} from '@react-navigation/native'
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the appropriate icon
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

const UserProfileSettings = () => {

  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const route = useRoute();
  const userToken = route.params?.token;

  const handleLogout = async () => {
    try {
      // Use the userToken state directly
      if (!userToken) {
        Alert.alert('Error', 'Access token not found');
        return;
      }
      // Show a confirmation prompt before logging out
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: async () => {
              const YOUR_LOGOUT_API_ENDPOINT = 'http://192.168.1.5:3000/api/logout';
              const response = await axios.post(
                YOUR_LOGOUT_API_ENDPOINT,
                {},
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userToken}`,
                  },
                }
              );
              if (response.status === 200) {
                Alert.alert('Logout', 'Logout successful');
                // Optionally clear the userToken from state
                // setUserToken(null);
                navigation.navigate('Login');
              } else {
                Alert.alert('Logout', 'Logout failed');
              }
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.body}>
        <View style={styles.navigation}>
            <View style={styles.leftNav}>
              <TouchableOpacity onPress={handleBackPress} style={styles.goBackButton}>
                  <IconButton
                      icon={() => <Icon name="keyboard-arrow-left" size={50} />} // Use the appropriate icon name
                      style={styles.goBackButtonIcon}
                  />
              </TouchableOpacity>
            </View>
            <View style={styles.centerNav}>
              <Text style={styles.headerText}>
                  Settings
              </Text>
            </View>
            <View style={styles.rightNav}>
              {/* future use */}
            </View>
        </View>
        <View style={styles.content}>
          <View style={styles.leftContent}>
            {/* space */}
          </View>
          <View style={styles.middleContent}>
            <TouchableOpacity style={styles.middleContentButtons}>
              <View style={styles.middleContentIcons}>
                <Image source={require('../assets/navigation/account-circle.png')} style={styles.userImage}/>
              </View>
                <Text style={styles.middleContentText}>
                  Account
                </Text>
              <View style={styles.middleContentArrow}>

              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.middleContentButtons}>
              <View style={styles.middleContentIcons}>
                <Image source={require('../assets/profile/notification_icon1.png')} style={styles.userImage}/>
              </View>
              <Text style={styles.middleContentText}>
                Notifications
              </Text> 
              <View style={styles.middleContentArrow}>

              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.middleContentButtons}>
              <View style={styles.middleContentIcons}>
                <Image source={require('../assets/profile/security.png')} style={styles.userImage}/>
              </View>
              <Text style={styles.middleContentText}>
                Privacy & Security
              </Text>
              <View style={styles.middleContentArrow}>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.middleContentButtons}>
              <View style={styles.middleContentIcons}>
                <Image source={require('../assets/profile/about_us.png')} style={styles.userImage}/>
              </View>
              <Text style={styles.middleContentText}>
                About us
              </Text>
              <View style={styles.middleContentArrow}>

              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.middleContentButtons} onPress={handleLogout}>
              <View style={styles.middleContentIcons}>
                <Image source={require('../assets/profile/logout.png')} style={styles.userImage}/>
              </View>
              <Text style={styles.middleContentText}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rightContent}>
            {/* space */}
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  body:{
    // flex: 1,
    width: "100%",
    height: "100%",
    // backgroundColor: "gray",
  },

  navigation:{
    marginTop: "2%",
    width: "100%",
    height: "5%",
    flexDirection: "row",
    // backgroundColor: "gray",
  },


  leftNav:{
    justifyContent: "center",
    // alignItems: "center",
    width: "33%",
    // backgroundColor: "pink",
  },

  goBackButton:{
    width: "50%",
    justifyContent: "center",
    // backgroundColor: "gray",
  },

  goBackButtonIcon:{
    borderRadius: 10,
    marginBottom: "25%",

    // backgroundColor: "blue",
  },
  centerNav:{
    width: "33%",
    justifyContent: "center",
    alignItems: "center",
  },

  rightNav:{
    width: "33%",
    alignItems: "flex-end",
    justifyContent: "center",
    // marginRight: 30,
    // backgroundColor: "skyblue",
  },

  headerText:{
    fontSize: 30,
    fontWeight: "bold",
  },
  content:{
    width: "100%",
    height: "95%",
    flexDirection: "row",
    },

  leftContent:{
    width:"10%",
    // backgroundColor: "pink",
  },

  middleContent:{
    width:"80%",
    height: "relative",
    // backgroundColor: "lightblue",
    flexDirection: "column",
  },

  middleContentButtons:{
    // paddingBottom: "5%",
    borderBottomWidth: 0.2,
    borderColor: "gray",
    alignItems: "center",
    // marginTop:"15%",
    // justifyContent: "center",
    width: "100%",
    flexDirection: "row",
    // backgroundColor: "blue",
    
  },

  middleContentIcons:{
    width: "15%",
    height: "15%",
    justifyContent: "center",
    // backgroundColor: "blue"
    // borderRightWidth: 0.2,
    // borderColor: "Gray",
  },

  userImage:{
    width: 45,
    height: 45,
  },

  middleContentText:{
    
    width: "80%",
    fontWeight: "bold",
    fontSize: 25,
    // backgroundColor: "gray",
  },

  middleContentArrow:{
    width: "50%",
    backgroundColor: "gray",
  },


  rightContent:{
    width:"10%",
    // backgroundColor: "green",

  },



})
export default UserProfileSettings