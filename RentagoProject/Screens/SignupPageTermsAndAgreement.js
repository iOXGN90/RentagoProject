import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { IconButton } from 'react-native-paper';

const SignupPageTermsAndAgreement = () => {

    const goBack = () => {
        navigation.navigate('Signup');
    };
    return (
        <SafeAreaView>
        <View>  
            <View style={styles.Header}>
                <TouchableOpacity onPress={goBack}>
                    <IconButton icon={'arrow-left'} />
                </TouchableOpacity>
            </View>
            <Text>
                Terms and Condition
            </Text>
            <Text>
                Welcome to Rentago!
            </Text>
            <Text>
                By accessing or using Rentago, you agree to comply with and be bound by the following terms and conditions. Please read these carefully.
            </Text>
        </View>
            <View>
                <Text>
                    1. Acceptance of Terms
                </Text>
                <Text>
                    - By accessing or using the services provided by Rentago, you agree to be bound by these Terms and Conditions.
                </Text>
                <Text>
                    2. User Conduct
                </Text>
                <Text>
                    - You agree to use Rentago only for lawful purposes and in a way that does not infringe on the rights of others
                </Text>
                <Text>
                    3. Privacy Policy
                </Text>
                <Text>
                    - Your use of Rentago is also governed by our Privacy Policy, which can be found at [link of Privacy Policy].
                </Text>
                <Text>
                    4. Intellectual Property
                </Text>
                <Text>
                    - The content, features, and functionality of Rentago are the property of University of Science and Technology of Southern Philippines and are protected by intellectual property laws.
                </Text>
                <Text>
                    5. Disclaimer
                </Text>
                <Text>
                    - Rentago is provided "as is" without any warranties, expressed or implied.
                </Text>
                <Text>
                    6. Termination
                </Text>
                <Text>
                    - We reserve the right to terminate or suspend your access to Rentago at any time for violations of these Terms.
                </Text>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    Header: {
        height: '5%',
    },
})

export default SignupPageTermsAndAgreement