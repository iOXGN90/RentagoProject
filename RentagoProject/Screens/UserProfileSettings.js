import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the appropriate icon
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Import MaterialCommunityIcons
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
          // 'http://10.0.0.53:3000/api/logout';
              // console.log('Token Deleted: ' + userToken);
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

  const handleAboutUs = () => {
    navigation.navigate('AboutUs');
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
            <Text style={styles.headerText}>Settings</Text>
          </View>
          <View style={styles.rightNav}>{/* future use */}</View>
        </View>
        <View style={styles.content}>
          <View style={styles.leftContent}>
            {/* space */}
          </View>
          <View style={styles.middleContent}>
            <TouchableOpacity style={styles.middleContentButtons}>
              <View style={styles.middleContentIcons}>
                <MaterialCommunityIcons name="account" size={40} color="black" />
              </View>
              <Text style={styles.middleContentText}>
                Account
              </Text>
              <View style={styles.middleContentArrow}>
                <IconButton
                  icon={() => <Icon name="keyboard-arrow-right" size={50} />} // Use the appropriate icon name
                  style={styles.middleArrow}
                />
              </View>
              <View style={styles.middleContentArrow}>
              
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.middleContentButtons}>
              <View style={styles.middleContentIcons}>
                <MaterialCommunityIcons name="bell" size={40} color="black" />
              </View>
              <Text style={styles.middleContentText}>Notifications</Text>
              <View style={styles.middleContentArrow}>
                <IconButton
                  icon={() => <Icon name="keyboard-arrow-right" size={50} />} // Use the appropriate icon name
                  style={styles.middleArrow}
                />
              </View>
              <View style={styles.middleContentArrow}></View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.middleContentButtons}>
              <View style={styles.middleContentIcons}>
                <MaterialCommunityIcons name="lock" size={40} color="black" />
              </View>
              <Text style={styles.middleContentText}>Privacy & Security</Text>
              <View style={styles.middleContentArrow}>
                <IconButton
                  icon={() => <Icon name="keyboard-arrow-right" size={50} />} // Use the appropriate icon name
                  style={styles.middleArrow}
                />
              </View>
              <View style={styles.middleContentArrow}></View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.middleContentButtons} onPress={handleAboutUs}>
              <View style={styles.middleContentIcons}>
                <MaterialCommunityIcons name="information" size={40} color="black" />
              </View>
              <Text style={styles.middleContentText}>About Us</Text>
              <View style={styles.middleContentArrow}>
                <IconButton
                  icon={() => <Icon name="keyboard-arrow-right" size={50} />}
                  style={styles.middleArrow}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.middleContentButtons} onPress={handleLogout}>
              <View style={styles.middleContentIcons}>
                <MaterialCommunityIcons name="logout" size={40} color="black" />
              </View>
              <Text style={styles.middleContentText}>Logout</Text>
              <View style={styles.middleContentArrow}>
                <IconButton
                  icon={() => <Icon name="keyboard-arrow-right" size={50} />} // Use the appropriate icon name
                  style={styles.middleArrow}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.rightContent}>
           {/* space */}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

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
  },

  middleContent:{
    width: '80%',
    flexDirection: 'column',
    // marginBottom: 0,
    // backgroundColor: 'gray'
  },

  middleContentButtons:{
    borderBottomWidth: 0.2,
    borderColor: "gray",
    alignItems: "center",
    height: '15%',
    // marginTop:"%",
    width: "100%",
    flexDirection: "row",
    // backgroundColor: 'red'
  },

  middleContentIcons:{
    width: "20%",
    height: "40%",
    justifyContent: "center",
    // backgroundColor: 'blue'
  },

  middleContentText:{
    width: "80%",
    fontWeight: "bold",
    fontSize: 25,
    // paddingLeft: 30,
    //  backgroundColor: 'yellow'
  },

  middleContentArrow:{
    alignItems: 'center',
    height: '40%',
    // backgroundColor: "gray",
  },
  middleArrow:{
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 15,
    right: 20
    // backgroundColor: 'blue',
  },

  rightContent:{
    width:"10%",
  },
})
export default UserProfileSettings