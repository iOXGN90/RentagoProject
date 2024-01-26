import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const SignupPageTermsAndAgreement = () => {

    const navigation = useNavigation();
    
    const goBack = () => {
        navigation.goBack();
    };
    return (
        <ScrollView>
        <View style={styles.container}>  
            <View style={styles.Header}>
                <TouchableOpacity onPress={goBack}>
                    <IconButton icon={'arrow-left'} />
                </TouchableOpacity>
            </View>
            <Text style={styles.HeaderContent1}>
                Terms and Condition
            </Text>
            <Text style={styles.HeaderContent2}>
                Welcome to Rentago!
            </Text>
            <Text style={styles.HeaderContent3}>
                By accessing or using Rentago, you agree to comply with and be bound by the following terms and conditions. Please read these carefully.
            </Text>
        </View>
            <View style={styles.Content}>
                <Text style={styles.ContentAgreement}>
                    1. Acceptance of Terms
                </Text>
                <Text style={styles.ContentAgreement}>
                    - By accessing or using the services provided by Rentago, you agree to be bound by these Terms and Conditions.
                </Text>
                <Text style={styles.ContentAgreement}>
                    2. User Conduct
                </Text>
                <Text style={styles.ContentAgreement}>
                    - You agree to use Rentago only for lawful purposes and in a way that does not infringe on the rights of others
                </Text>
                <Text style={styles.ContentAgreement}>
                    3. Privacy Policy
                </Text>
                <Text style={styles.ContentAgreement}>
                    - Your use of Rentago is also governed by our Privacy Policy, which can be found at [link of Privacy Policy].
                </Text>
                <Text style={styles.ContentAgreement}>
                    4. Intellectual Property
                </Text>
                <Text style={styles.ContentAgreement}>
                    - The content, features, and functionality of Rentago are the property of University of Science and Technology of Southern Philippines and are protected by intellectual property laws.
                </Text>
                <Text style={styles.ContentAgreement}>
                    5. Disclaimer
                </Text>
                <Text style={styles.ContentAgreement}>
                    - Rentago is provided "as is" without any warranties, expressed or implied.
                </Text>
                <Text style={styles.ContentAgreement}>
                    6. Termination
                </Text>
                <Text style={styles.ContentAgreement}>
                    - We reserve the right to terminate or suspend your access to Rentago at any time for violations of these Terms.
                </Text>
            </View>
            <TouchableOpacity onPress={goBack} style={styles.agreeButton}>
                <Text style={styles.agreeButtonText}>
                    Agree
                </Text>
            </TouchableOpacity>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    Header: {
        height: '15%',
      },
    HeaderContent1: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 5,
    },
    HeaderContent2: {
        fontSize: 25,
        fontWeight: '500',
        textAlign: 'center',
        padding: 5,
        margin: 5,
    },
    HeaderContent3: {
        width: '100%',
        fontSize: 20,
        textAlign: 'center',
        // paddingHorizontal: 10,
        // margin: 10,
        marginTop: 0,
        paddingTop: 0,
    },
    Content: {
        borderWidth: 2,
        bordercolor: 'blue',
        padding: 15,
        borderRadius: 10,
        margin: 10,
        marginTop: 5,
    },
    ContentAgreement: {
        fontWeight: '500',
        fontSize: 17,
        fontStyle: 'italic',
        textAlign: 'justify',
    },
    agreeButton: {
        width: "100%",
        alignItems: "center",
        height: 100,
    },
    agreeButtonText: {
        width: '95%',
        height: '75%',
        borderRadius: 100,
        textAlign: 'center',
        fontSize: 30,
        color: 'white',
        backgroundColor: '#55bCF6',
        elevation: 10,
        padding: 15,

      },
})

export default SignupPageTermsAndAgreement