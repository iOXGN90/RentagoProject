import React, {useState} from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconButton, TextInput, Checkbox  } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const { width, height } = Dimensions.get('window');


const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  contact_number: Yup.string().required('Contact Number is required'),
  location: Yup.string().required('Location is required'),
  role: Yup.string().required('Role is required'),

});

const SignupPage = () => {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleSignup = async (values, { setSubmitting, setFieldError, resetForm }) => {
    try {
      const response = await axios.post('http://192.168.1.7:3000/api/register', 
      // 'http://10.0.0.53:3000/api/register',
      {
        name: values.name,
        role: values.role,
        email: values.email,
        contact_number: values.contact_number,
        location: values.location,
        password: values.password,
        c_password: values.confirmPassword,
      });

      console.log(response.data);
      navigation.navigate('SignupConfirmation');

      // Reset the form to clear the text inputs
      resetForm();

    } catch (error) {
      if (error.response && (error.response.status === 404 || error.response.status === 409)) {
        // HTTP status 404 corresponds to Not Found (Email already taken)
        // HTTP status 409 corresponds to Conflict (Email already taken)
        // Handle the specific error here, e.g., display a message to the user
        setFieldError('email', 'Email already taken. Please choose another.');
      } else {
        // Handle other errors as needed
      }
    } finally {
      setSubmitting(false);
    }
  };

  const goBack = () => {
    navigation.navigate('Login');
  };

  // handling the terms and condition
  const [isChecked, setChecked] = useState(false);
  const handleCheck = () => {
    setChecked(!isChecked);
  };

  const handleTermsAndCondition = () =>{
    navigation.navigate('SignUpTermsAndCondtion');
  }

  return (
    <SafeAreaView style={styles.Container}>
    <ScrollView>
      <View style={styles.Header}>
        <View style={{
          width: '10%',
          alignItems:'center',
          justifyContent:'center',
        }}>
          <TouchableOpacity onPress={goBack}>
            <IconButton icon={'arrow-left'} />
          </TouchableOpacity>
        </View>
        <View style={{
          width: '80%',
          justifyContent:'center',
          alignItems:'center',
        }}>
          <Text style={{
            textAlignVertical:'center',
            fontSize: 30
          }}>
            Create Account
          </Text>
        </View>
        <View style={{
          width: '10%',
        }}>

        </View>
      </View>
      <View style={styles.Body}>
        <Formik
          style={styles.Container}
          initialValues={
            {
              name: '',
              role: '',
              contact_number: '',
              location: '',
              email: '',
              password: '',
              confirmPassword: '',
            }
          }
          validationSchema={SignupSchema}
          onSubmit={handleSignup}
        >
          {({
            values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, resetForm, // Added resetForm from Formik
          }) => (
            <View>
              <TextInput
                style={styles.signupTextInput}
                label={"Name"}
                autoCapitalize="sentences"
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
              />
              {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

              <TextInput
                style={styles.signupTextInput}
                label={"Location"}
                autoCapitalize="sentences"
                value={values.location}
                onChangeText={handleChange('location')}
                onBlur={handleBlur('location')}
                />{touched.location && errors.location && <Text style={styles.errorText}>{errors.location}</Text>}

                {/* <Text style={styles.signupTextInput}>
                  
                </Text> */}
              <TextInput
                style={styles.signupTextInput}
                label={"Role: Student/Landlord or Both"}
                autoCapitalize="sentences"
                value={values.role}
                onChangeText={handleChange('role')}
                onBlur={handleBlur('role')}
                />
              {touched.role && errors.role && <Text style={styles.errorText}>{errors.role}</Text>}

              <TextInput
                style={styles.signupTextInput}
                label={"Contact Number"}
                autoCapitalize="none"
                keyboardType="phone-pad"
                value={values.contact_number}
                onChangeText={handleChange('contact_number')}
                onBlur={handleBlur('contact_number')}
              />{touched.contact_number && errors.contact_number && (<Text style={styles.errorText}>{errors.contact_number}</Text>)}

              <TextInput
                style={styles.signupTextInput}
                label={"Email"}
                autoCapitalize="none"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
              />{touched.email && errors.email && (<Text style={styles.errorText}>{errors.email}</Text>)}

              <TextInput
                style={styles.signupTextInput}
                label={"Password"}
                autoCapitalize="none"
                secureTextEntry={!passwordVisible}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                right={
                  <TextInput.Icon
                    name={passwordVisible ? 'eye-off' : 'eye'}
                    color="#55bCF6"
                    onPress={() => setPasswordVisible(!passwordVisible)}
                  />
                }
              />{touched.password && errors.password && (<Text style={styles.errorText}>{errors.password}</Text>)}

              <TextInput
                style={styles.signupTextInput}
                label={"Confirm Password"}
                autoCapitalize="none"
                secureTextEntry={!confirmPasswordVisible}
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                right={
                  <TextInput.Icon
                    name={confirmPasswordVisible  ? 'eye-off' : 'eye'}
                    color="#55bCF6"
                    onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                  />
                }
              />{touched.confirmPassword && errors.confirmPassword && (<Text style={styles.errorText}>{errors.confirmPassword}</Text>)}
              <View style={{
                // backgroundColor: 'blue',
              }}>
                
                <View style={styles.checkboxContainer}><Checkbox.Android status={isChecked ? 'checked' : 'unchecked'} onPress={handleCheck}/>
                    <Text style={styles.checkboxLabel}>
                      I agree to the 
                    </Text>
                    <TouchableOpacity style={styles.checkboxLabelWrapper} onPress={handleTermsAndCondition}>
                      <Text style={styles.checkboxLabelBlue}>
                        Terms and Conditions
                      </Text>
                  </TouchableOpacity>
                </View>
                    {isSubmitting ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <View style={styles.signupButtonWrapper}>
                        <TouchableOpacity
                          style={[styles.signupButton, { backgroundColor: isChecked ? '#55bCF6' : 'gray',  }]}
                          onPress={isChecked ? handleSubmit : null}
                          disabled={!isChecked}
                        >
                          <Text style={styles.signupText}>
                            Sign up
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                </View>
            </View>
          )}
        </Formik>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  Header: {
    flexDirection: 'row',
    // height: '5%',
    // justifyContent:'center',
    // alignItems:'center',
  },
  createAccountText: {
    fontSize: 30,
    marginBottom: 20,
  },

  Body: {
    alignItems: 'center',
    justifyContent: 'center',
    // width: '100%',
    // height: '100%',
  },
  signupTextInput: {
    fontSize: 20,
    width: width*0.85,
    marginVertical: height * 0.02,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  signupButtonWrapper:{
    alignItems: 'center',
    // width: width * 0.5,
    // height: '3%',
    // backgroundColor: 'blue',
    justifyContent: 'center',
  },
  signupText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
  },
  signupButton: {
    width: '100%',
    padding: 15,
    marginTop: 20,
    backgroundColor: '#55bCF6',
    borderRadius: 25,
    elevation: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  checkboxContainer: {
    // width: 340,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: "blue",
  },
  checkboxLabelWrapper:{
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkboxLabel: {
    // color: "blue",
    // marginLeft: ,
    fontSize: 16,
  },
  checkboxLabelBlue:{
    color: "#55bCF6",
    marginLeft: 2,
    fontSize: 16,
  }
});

export default SignupPage;