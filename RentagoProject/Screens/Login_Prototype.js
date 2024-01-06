import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email or password').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.loginText}>Welcome back!</Text>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting, setFieldError, resetForm }) => {
          try {
            // Use Yup to validate the entire form
            await LoginSchema.validate(values, { abortEarly: false });

            // Simulating API call to login
            const response = await axios.post('http://192.168.1.5:3000/api/login', {
              email: values.email,
              password: values.password,
            });

            console.log(response.data);

            // Simulating successful login, navigate to Home
            navigation.navigate('Home');

            // Reset the form after successful login
            resetForm();
          } catch (error) {
            if (error instanceof Yup.ValidationError) {
              // Yup validation error
              error.inner.forEach((e) => {
                // Set errors for each field
                setFieldError(e.path, e.message);
              });
            } else if (!values.email || !values.password) {
              // Handle empty fields
              setFieldError('email', 'Please fill in the blank');
              setFieldError('password', 'Please fill in the blank');
            } else if (error.response && (error.response.status === 401 || error.response.status === 404)) {
              // Simulating authentication failure
              setFieldError('email', 'Invalid email');
              setFieldError('password', 'Invalid password');
            } else {
              // Handle other errors as needed
              setFieldError('email', 'An unexpected error occurred');
              console.error(error, 'AMang');
            }
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
        // fontWeight: 'bold',
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
        // fontWeight: 'bold',
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
      // fontWeight: 'bold',
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
      // fontWeight: 'bold',
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
      // fontWeight: 'bold'
    },
});

export default Login;
