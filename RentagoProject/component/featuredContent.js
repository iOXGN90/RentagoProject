import React from 'react'
import { View, StyleSheet, Image } from 'react-native'

const featuredContent = () => {
    return (
        <View style={styles.body}>
            <View style={styles.content}>
                <View style={styles.leftWrapper}>
                    <Image
                        style={styles.featurePlace}
                        source={require('./../assets/home/sample_image.png')}
                    />
                </View>
                <View style={styles.rightWrapper}>
                    
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    body:{
        flex: 1,
        // height: "100%",
        width: "100%",
        // backgroundColor: "white",
    },

    content:{
        flexDirection: "row",
        width:"100%",
    },
    
    leftWrapper: {
        width: '50%',
    },
    featurePlace:{
        width: 150,
        height: 150,
    },

    rightWrapper:{
        width: "50%",
        // backgroundColor: "white",

    },

})

export default featuredContent