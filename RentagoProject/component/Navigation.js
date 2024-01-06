import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image, View, StyleSheet, Text } from 'react-native'

const Navigation = () => {
    return (
        <SafeAreaView style={styles.Container}>
            <View style={styles.leftNav}>
                <Text style={styles.greetingsText}>
                    Good day
                </Text>
                <Text style={styles.userName}>
                    Nevin Harold
                </Text>
            </View>
            <View style={styles.rightNav}>
                <Image source={require('../assets/navigation/account-circle.png')} style={styles.userImage}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Container:{
        width: "100%",
        flexDirection: "row",
    },

    leftNav:{
        width: "50%",
    },

    greetingsText:{

    },

    userName:{
        marginTop: 20,
        fontWeight: "bold",
    },

    rightNav:{

    },

    userImage:{

    },

})

export default Navigation