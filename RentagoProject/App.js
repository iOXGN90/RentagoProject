import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginPage from './Screens/Login_Prototype';
import SignupPage from './Screens/SignupPage';
import SignupConfirmationPage from './Screens/SignupPageConfirmation';
import HomePage from './Screens/Home';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "Login" screenOptions ={{headerShown: false,}}>
        <Stack.Screen name="Home" component={HomePage}/>
        <Stack.Screen name="Login" component={LoginPage}/>
        <Stack.Screen name="SignUp" component={SignupPage}/>
        <Stack.Screen name="SignupConfirmation" component={SignupConfirmationPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

