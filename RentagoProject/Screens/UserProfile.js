// UserProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ImageBackground, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the appropriate icon
import { useRoute } from '@react-navigation/native';


const { width, height } = Dimensions.get('window');

const UserProfileScreen = () => {
    const route = useRoute();

    const tokenFromLogin = route.params?.token;
    const userInfoFromLogin = route.params?.userInfo;

    const Navigation = useNavigation();

    const userName = userInfoFromLogin.name;
    const userLocation = userInfoFromLogin.location;
    const userRole = userInfoFromLogin.role;
    const userContactNumber = userInfoFromLogin.contact_number;

    const userID = userInfoFromLogin.id;

    const handleSample = () => {
        // Display an alert to ask for location permission
        Alert.alert(
            'Location Permission',
            'This feature will use your current location.',
            [
            {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => {
                    console.log('Location permission denied');
                },
            },
            {
            text: 'Okay',
                onPress: async () => {
                    console.log('Location permission granted');
                    // Continue with the logic, e.g., navigating to 'GoogleMap'
                    Navigation.navigate('GoogleMapRegister', {userInfo : userInfoFromLogin});
                },
            },
            ]
        );
        };

    const handleBackPress = () => {
        Navigation.goBack(); // Go back to the previous screen with the transition effect
    };

    const handleSettings = () => {
        Navigation.navigate('UserProfileSetting',{token: tokenFromLogin});
        // console.log('This is from userSettings: ' + tokenFromLogin + ' ' + JSON.stringify(userInfoFromLogin)) //This is for debugging
        // console.log(userID);
        // console.log(userLocation);
    };

    return (
        <View style={styles.body}>
            <ImageBackground
                source={{ uri: 'https://i.ibb.co/D5bKCFL/background.png' }}  // Placeholder
                style={styles.imageBackground}
            >
            <View style={styles.userProfile_navBar}>
                <View style={styles.userProfile_leftNavBar}>
                    <TouchableOpacity onPress={handleBackPress} style={styles.goBackButton}>
                        <IconButton
                            icon={() => <Icon name="keyboard-arrow-left" size={50} />} // Use the appropriate icon name
                            style={styles.goBackButtonIcon}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.userProfile_centerNavBar}>
                    <Text style={styles.header}>
                        Profile
                    </Text>
                </View>
                <View style={styles.userProfile_rightNavBar}>
                    <TouchableOpacity style={styles.settingsIconButton} onPress={handleSettings}>
                        <Image source={require('./../assets/home/settings_icon_black.png')} style={styles.settingsIcon}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.imageWrapper}>
                    <Image source={require('../assets/home/arthur.jpg')} style={styles.userImage}/>
                </View>
                <View style={styles.userInformation}>
                    <Text style={styles.userName}>
                        {userName}
                    </Text>
                    <View style={styles.companyWrapper}>
                        <Text style={styles.userRole}>
                            {userRole}
                        </Text>
                        <Text style={styles.userCompany}>
                            University of Science and Technology of Southern Philippines
                        </Text>
                    </View>
                    <View style={styles.userLocationWrapper}>
                        <Image source={require('../assets/profile/blue-user-location.png')} style={styles.userImageLocation}/>
                        <Text style={styles.userLocation}>
                            {userLocation}
                        </Text>
                    </View>
                    <View style={styles.contactWrapper}>
                        <Text style={styles.contactText}>
                            Contact Number:
                        </Text>
                        <Text style={styles.contactText}>
                            {userContactNumber}
                        </Text>
                    </View>
                    <View style={styles.userOption}>
                        <TouchableOpacity style={styles.optionButton} onPress={handleSample}>
                            <Text style={styles.optionProfileText}>
                                Register a place
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </ImageBackground>
            {/* Add your user profile content here */}
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        backgroundColor:"#E8EAED",
        // marginTop: width * 0.1,
        width: "100%",
        height: "100%",
    },
    userProfile_navBar:{
        marginTop: height * 0.05,
        width: "100%",
        height: "5%",
        flexDirection: "row",

    },
    userProfile_leftNavBar:{
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

    goBackButtonIcon: {
        borderRadius: 10,
        marginBottom: "25%",
    },
    
    userProfile_centerNavBar:{
        width: "33%",
        justifyContent: "center",
        alignItems: "center",
    },
    
    header:{
        fontSize: 30,
        fontWeight: "bold",
    },

    userProfile_rightNavBar:{
        width: "33%",
        alignItems: "flex-end",
        justifyContent: "center",
        // marginRight: 30,
        // backgroundColor: "skyblue",
    },
    
    settingsIconButton:{
        width: "30%",
        // padding: "-100%",
        // elevation: 5,
        marginRight:"10%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        // backgroundColor:"gray",
    },
    
    settingsIcon:{
        height: "100%",
        width: "100%",
        // backgroundColor: "white",
        borderRadius: 100,
    },

    container: {
        alignItems: "center",
        width: "95%",
        height: "95%",
        marginHorizontal: "2.5%",
        // backgroundColor: "blue",
    },
    imageWrapper:{
        marginTop: "5%",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "30%",
        // backgroundColor: "#05a3fc",
        // borderRadius: 30,
    },
    userImage:{
        // marginTop: "5%",
        resizeMode: "cover",
        height: "100%",
        width: "60%",
        borderRadius: 1000,
        borderWidth: 5,
        borderColor: "white",
    },
    userInformation:{
        marginTop: "5%",
        alignItems: "center",
        // justifyContent: "center",
    },
    userName:{
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: "1%",
    },
    companyWrapper:{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "1%",
        width: "100%",
    },
    userRole:{
        fontSize: 20,
        marginBottom: "1%",
    },
    userCompany:{
        fontSize: 20,
        textAlign: "center",
        marginBottom: "1%",
        // width: "5%",
    },
    userLocationWrapper:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "1%",
        // height: "30%",
    },
    userImageLocation:{
        width: "5%",
        height: "110%",
        marginRight: "1%",
    },
    userLocation:{
        fontSize: 20,
        // marginLeft: "1%",
    },
    userOption:{
        width: width * 1,
        // backgroundColor: 'blue',
        flexDirection: "row",
        justifyContent: 'center',
        alignItems:'center',
    },
    optionButton:{
        marginTop: "10%",
        width: width * 0.9,
        // padding: 15,
        paddingVertical: 30,
        margin: "2%",
        alignItems: 'center',
        backgroundColor: "#05a3fc",
        borderRadius: 100,
    },

    optionProfileText:{
        // width: width * 0.5,
        fontWeight: "bold",
        fontSize: 28,
        color: "white",
    },
    contactWrapper:{
        flexDirection: 'row'
    },

    contactText:{
        fontSize: 20,
        marginRight: '2%',
    },

});

export default UserProfileScreen;