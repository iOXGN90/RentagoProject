import React, {useState, useEffect} from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const AccountRecoveryConfirmationPage = () => {
    const [showImage, setShowImage] = useState(false);
    useEffect(() => {
        const timeoutID = setTimeout(() =>{
            setShowImage(true); 
        }, 2000);
        return () => clearTimeout(timeoutID);
        }, []);

    const navigation = useNavigation(); /// will use the useNavigation that is imported
    const backToLoginText = () => {
        navigation.navigate('Login');
    }
    const backToRecoveryText = () => {
        navigation.pop();
    }
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.Header} onPress={backToRecoveryText}>
                <IconButton icon={"arrow-left"} color="white"/>                 
            </TouchableOpacity>
            <View style={styles.Body}>
                <Image style={styles.checkImage} source={require('../assets/Confirm_Check_Icon.png')} />
                <Text style={styles.confirmText}>
                    Account Created!
                </Text>
                <TouchableOpacity style={styles.loginButton} onPress={backToLoginText}>
                    <IconButton icon={"arrow-left"} color="white" />   
                    <Text style={styles.loginText}>
                        Back to login page
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
export default AccountRecoveryConfirmationPage;