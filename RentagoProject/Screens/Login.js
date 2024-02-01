import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { TextInput, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email or password').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const navigation = useNavigation();
  const [newToken, setNewToken] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={require('../assets/Login/HD_Logo.png')}
          style={styles.loginImage}
        />
      </View>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting, setFieldError, resetForm }) => {
          try {
            setLoading(true);

            await LoginSchema.validate(values, { abortEarly: false });
            const response = await axios.post('http://192.168.1.7:3000/api/login', {
              email: values.email,
              password: values.password,
            });
            const accessToken = response.data.data.token;
            setNewToken(accessToken);
            await AsyncStorage.setItem('userAccessToken', accessToken);

            const userInfo = {
              name: response.data.data.name,
              location: response.data.data.location,
              role: response.data.data.role,
              contact_number: response.data.data.contact_number,
              id: response.data.data.id,
            };

            console.log('Welcome, user: ' + response.data.data.name);

            navigation.navigate('Home', { token: accessToken, userInfo: userInfo });
          } catch (error) {
            // ... (rest of the error handling remains unchanged)
          } finally {
            setLoading(false);
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
              clearTextOnFocus
            />
            <TextInput
              style={styles.loginTextInput}
              label="Password"
              autoCapitalize="none"
              secureTextEntry={!passwordVisible}
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              error={touched.password && errors.password}
              clearTextOnFocus
              right={
                <TextInput.Icon
                  name={passwordVisible ? 'eye-off' : 'eye'}
                  color="#55bCF6"
                  onPress={() => setPasswordVisible(!passwordVisible)}
                />
              }
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            <TouchableOpacity
              style={styles.loginButton}
              mode="contained"
              onPress={handleSubmit}
              disabled={isSubmitting || loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.loginButtonText}>Login</Text>
              )}
            </TouchableOpacity>
            <View style={styles.signupWrapper}>
              <Text style={styles.signupInfo}>
                Don't have an account?
              </Text>
              <TouchableOpacity onPress={() => {
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
        marginBottom: '15%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'relative',
        // backgroundColor: 'blue',
        },
    imageWrapper:{
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
      // backgroundColor: "gray",
    },
    loginImage:{
        resizeMode: 'cover',
        width: 300,
        height: 200,
      // borderRadius: 1000,
      // backgroundColor: 'gray',
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
        backgroundColor: '#05a3fc',
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
