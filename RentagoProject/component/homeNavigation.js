import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import {useNavigation, useRoute} from '@react-navigation/native'

const homeNavigation = ({token, userInfo}) => {
    const Navigation = useNavigation();
    const route = useRoute();
    

    const handleUserImagePress = () => {
        Navigation.navigate('UserProfile',{token : token, userInfo : userInfo})
        // Navigation.navigate('GoogleMap',{userInfo : userInfo})
        // console.log('this is from home ' + JSON.stringify(userInfo.id)); //This is for debugging
        // console.log('This is from Home ' + JSON.stringify(userInfo));
    }

    return (
        <SafeAreaView style={styles.Container}>
            <View style={styles.leftNav}>
                <Image source={require('../assets/home/rentago_cropped.png')} style={styles.logo}/>
                <Text style={styles.logoText}>
                    Alpha
                </Text>
            </View>
            <View style={styles.rightNav}>
                <TouchableOpacity onPress={handleUserImagePress} style={styles.userImageButton}>
                    <Image source={require('../assets/home/arthur.jpg')} style={styles.userImage}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Container:{
        width: "100%",
        height: "10%",
        flexDirection: "row",
        // backgroundColor:'red',
    },
    leftNav:{
        width: "50%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // padding: 10,
        // backgroundColor: "brown",
    },
    logo:{
        width: 100,
        height: 27,
        
    },
    logoText:{
        fontWeight: 'bold',
        marginRight: 30,
    },


    rightNav:{
        width: "50%",
        alignItems: "flex-end",
        justifyContent: "center",
        padding: 15,
        // bottom: 25,
        // backgroundColor: "white",
    },
    userImageButton:{
        backgroundColor: "white",
        borderRadius: 100,
        elevation: 5,
    },


    userImage:{
        width: 40,
        height: 40,
        borderWidth: 5,
        borderRadius: 100,
    },
})

export default homeNavigation