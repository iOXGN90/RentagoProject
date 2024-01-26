// UserProfileScreen.js
import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the appropriate icon
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

const { width, height } = Dimensions.get('window');


const GoogleMapSearchProfile = () => {
    const [data, setData] = useState({
        name: '',
        role: '',
        location: '',
        contact_number: '',
        email: '',
    });

    const route = useRoute();
    const Navigation = useNavigation();
    const user_id = route.params?.user_id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://192.168.1.5:3000/api/profile/${user_id}`);
                console.log(response.data);
                setData({
                    name: response.data.name,
                    role: response.data.role,
                    contact_number: response.data.contact_number,
                    location: response.data.location,
                    email: response.data.email,
                });
            } catch (error) {
                console.log(error.data);
            }
        };

        fetchData(); // Call the function to fetch data when the component mounts
    }, [user_id]); // Add user_id as a dependency to re-run the effect when it changes




    const handleSample = () => {
        // console.log(user_id)
    };

    const handleBackPress = () => {
        Navigation.navigate('GoogleMapSearch'); // Go back to the previous screen with the transition effect
    };

    const handleSettings = () => {
        // futureUse
    };

    return (
        <SafeAreaView style={styles.body}>
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
                        Landlord Profile
                    </Text>
                </View>
                <View style={styles.userProfile_rightNavBar}>
                    <Text style={styles.header}>
                        {/* Landlord Profile */}
                    </Text>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.imageWrapper}>
                    <Image source={require('../assets/home/arthur.jpg')} style={styles.userImage}/>
                </View>
                <View style={styles.userInformation}>
                    <Text style={styles.userName}>
                        {data.name}
                    </Text>
                    <View style={styles.companyWrapper}>
                        <Text style={styles.userRole}>
                            {data.role}
                        </Text>
                        <Text style={styles.userCompany}>
                            University of Science and Technology of Southern Philippines
                        </Text>
                    </View>
                    <View style={styles.userLocationWrapper}>
                        <Image source={require('../assets/profile/blue-user-location.png')} style={styles.userImageLocation}/>
                        <Text style={styles.userLocation}>
                            {data.location}
                        </Text>
                    </View>
                    <View style={styles.contactWrapper}>
                        <Text style={styles.contactText}>
                            Contact Number:
                        </Text>
                        <Text style={styles.contactText}>
                            {data.contact_number}
                        </Text>
                    </View>
                    <View style={styles.userOption}>
                        <TouchableOpacity style={styles.optionButton} onPress={handleSample}>
                            <Text style={styles.optionProfileText}>
                                Apply Reserve
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton} onPress={handleSample}>
                            <Text style={styles.optionProfileText}>
                                Chat Now!
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {/* Add your user profile content here */}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    body: {
        backgroundColor:"#E8EAED",
        width: "100%",
        height: "100%",
    },
    userProfile_navBar:{
        marginTop: "2%",
        width: "100%",
        height: "5%",
        flexDirection: "row",

    },
    userProfile_leftNavBar:{
        justifyContent: "center",
        width: "10%",
        // alignItems: "center",
        // backgroundColor: "pink",
    },
    goBackButton:{
        width: "50%",
        justifyContent: "center",
        // backgroundColor: "gray",
    },

    goBackButtonIcon: {
        borderRadius: 10,
        marginBottom: height * 0.02,
    },
    
    userProfile_centerNavBar:{
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
    },
    
    header:{
        fontSize: 30,
        fontWeight: "bold",
    },

    userProfile_rightNavBar:{
        width: "10%",
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
        borderColor: "#05a3fc",
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
        width: "50%",
        flexDirection: "row",
    },
    optionButton:{
        marginTop: "10%",
        width: '100%',
        padding: 25,
        margin: "2%",
        alignItems: 'center',
        backgroundColor: "#05a3fc",
        borderRadius: 100,
    },

    optionProfileText:{
        fontWeight: "bold",
        fontSize: 20,
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

export default GoogleMapSearchProfile;
