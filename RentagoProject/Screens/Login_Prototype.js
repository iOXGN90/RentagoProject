import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet  } from 'react-native';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email or password').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const navigation = useNavigation();
  const [newToken, setNewToken] = useState(null); // Declare newToken with useState
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // This will log the updated value of newToken whenever it changes / Debugging
    // console.log(newToken, "login");
  }, [newToken]); // The effect runs whenever newToken changes


  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting, setFieldError, resetForm }) => {
          try {
            // Use Yup to validate the entire form
            await LoginSchema.validate(values, { abortEarly: false });

            // Simulating API call to login
            const response = await axios.post('http://192.168.1.4:3000/api/login', {
              email: values.email,
              password: values.password,
            });


            const accessToken = response.data.data.token;
            setNewToken(accessToken);
            await AsyncStorage.setItem('userAccessToken', newToken); //no need to stringify since its already a single value compared to userInfo that has "name" and "location" to it. 

            const userInfo = ({
              location: response.data.data.location, 
              name: response.data.data.name
            }) 
            setUserData(userInfo)
            await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo)); //we needed to convert userInfo into JSON because it contains 2 Objects; it cannot read.
          
          //!!!!!!!!!!!!!!!!!!!!!!!!!  The code below for retrieving/accepting(the one who holds and use the data stored) the data; converting from string to JSON process !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          //             const storedUserInfo = await AsyncStorage.getItem('userInfo');

          // if (storedUserInfo) {
          //   // Parse the stored string back into an object
          //   const parsedUserInfo = JSON.parse(storedUserInfo);

          //   // Now you can use parsedUserInfo as an object
          //   setUserData(parsedUserInfo);
          // }



            

            // Reset the navigation stack and navigate to 'Home'
            navigation.navigate('Home', { token: newToken, userInfo: userInfo });
         

            // Navigate to 'UserProfileSettings' and pass the token

            resetForm();
          } catch (error) {
            // ... other error handling remains the same ...
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, resetForm }) => (
          <View style={styles.Body}>
            <TextInput
              style={styles.loginTextInput}
              label="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={touched.email && errors.email}
              clearTextOnFocus  // Add this prop
            />
            <TextInput
              style={styles.loginTextInput}
              label="Password"
              autoCapitalize="none"
              secureTextEntry
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              error={touched.password && errors.password}
              clearTextOnFocus  // Add this prop
            />
            {errors.email && (
              <Text style={styles.errorText}>
                {errors.email}
              </Text>
            )}
            {errors.password && (
              <Text style={styles.errorText}>
                {errors.password}
              </Text>
            )}
            <View style={styles.forgotpassWrapper}>
              <TouchableOpacity style={styles.forgotpassButton} onPress={() => {
                  // Clear email and password fields and reset the form
                  resetForm();
                  navigation.navigate('ForgotPassword');
                }}
              >
                <Text style={styles.forgotpassText}>
                  Forgot Password
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.loginButton} mode="contained" onPress={handleSubmit} disabled={isSubmitting}>
              <Text style={styles.loginButtonText}>
                Login
              </Text>
            </TouchableOpacity>
            <View style={styles.signupWrapper}>
              <Text style={styles.signupInfo}>
                Don't have an account?
              </Text>
              <TouchableOpacity
                onPress={() => {
                  // Clear email and password fields and reset the form
                  resetForm();
                  navigation.navigate('SignUp');
                }}
              >
                <Text style={styles.signupText}>
                  Sign up now!
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: 'auto',
        backgroundColor: '#ffffff',
    },
    Body: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'relative',
    },
    loginText: {
        fontSize: 40,
        width: '60%',
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: "bold",
    },
    loginTextInput: {
        width: '80%',
        marginVertical: 25,
        backgroundColor: '#ffffff',
        fontSize: 25,
    },
    forgotpassWrapper:{
        width: '80%',
        alignItems: 'flex-end',
    },
    forgotpassButton: {
        marginTop: 10,
    },
    forgotpassText: {
        // textDecorationLine: 'underline',
        fontSize: 17,
        color: '#55bCF6',
        fontWeight: 'bold',
    },
    loginButton: {
      width: 340,
      padding: 15,
      marginTop: 40,
      backgroundColor: '#55bCF6',
      borderRadius: 25,
      elevation: 10,
    },
    loginButtonText: {
      textAlign: 'center',
      color: 'white',
      fontWeight: 'bold',
      fontSize: 25,
    },

    signupWrapper: {
      marginTop: 25,
      flexDirection: 'row',
    },
    signupInfo: {
      marginRight: 3,
      fontSize: 20,
    },
    signupText: {
      color: '#55bCF6',
      fontSize: 20,
      fontWeight: 'bold',
    },
    errorText: {
      color: 'red',
      marginTop: 5, // Adjusted the margin for better spacing
      textAlign: 'center',
    },

    signUp:{
      flexDirection: 'row',
      textAlign: 'justify',
      marginTop: 30,
    },
    signUpButton:{

    },
    signUpText:{
      marginRight: 5,
      fontSize: 17,
    },
    
    signUpButtonText:{
      fontSize: 17,
      color: '#55bCF6',
      fontWeight: 'bold'
    },
});

export default Login;
