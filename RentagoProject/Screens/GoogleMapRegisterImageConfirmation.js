import React, {useState, useEffect} from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const GoogleMapRegisterImageConfirmation = () => {

  const route = useRoute();
  const userInfoFromLogin = route.params?.userInfo;

    const [showImage, setShowImage] = useState(false);
    useEffect(() => {
        const timeoutID = setTimeout(() =>{
            setShowImage(true); 
        }, 2000);
        return () => clearTimeout(timeoutID);
        }, []);

    const Navigation = useNavigation(); /// will use the useNavigation that is imported

    const handleProfile = () => {
        Navigation.navigate('UserProfile', {
            userInfo: userInfoFromLogin
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.Body}>
                <Image style={styles.checkImage} source={require('../assets/Confirm_Check_Icon.png')} />
                <Text style={styles.confirmText}>
                    The place is registered, thank you!
                </Text>
                <TouchableOpacity style={styles.loginButton} onPress={handleProfile}>
                    <IconButton icon={"arrow-left"} color="white" />   
                    <Text style={styles.loginText}>
                        Back to Profile
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
    Body:{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '95%',
    }   , 
    confirmText:{
        width: '95%',
        fontSize: 30,
        textAlign: 'center',
        justifyContent: 'center',
    },
    loginButton:{
        flexDirection:'row',
        width: '75%',
        marginTop: 50,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#55bCF6',
        borderRadius: 25,
        elevation: 10,
        height: 70,
    },
    loginText:{
        color: 'white',
        textAlign: 'center',
        fontSize: 22,
        marginBottom: 4,    
        fontWeight: 'bold',
    },
    checkImage:{
        position: 'absolute',
        top:250,
        width: 50,
        height: 50,
    },

})
export default GoogleMapRegisterImageConfirmation;