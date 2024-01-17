import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginPage from './Screens/Login_Prototype';
import SignupPage from './Screens/SignupPage';
import UserProfilePage from './Screens/UserProfile';
import UserProfileSettingsPage from './Screens/UserProfileSettings';
import SignupConfirmationPage from './Screens/SignupPageConfirmation';
import HomePage from './Screens/Home';
import SignupTermsAndConditionPage from './Screens/SignupPageTermsAndAgreement';
import GoogleMapPage from './Screens/GoogleMap';



const Stack = createNativeStackNavigator();

export default function App() {
return (
    <NavigationContainer>
    <Stack.Navigator
        initialRouteName="GoogleMap"
        screenOptions={{
        headerShown: false,
        animation: 'slide_from_right', // Set the animation option
        }}
    >
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="GoogleMap" component={GoogleMapPage} />
        <Stack.Screen name="UserProfile" component={UserProfilePage} />
        <Stack.Screen name="UserProfileSetting" component={UserProfileSettingsPage} /> 
        <Stack.Screen name="SignUp" component={SignupPage}/>
        <Stack.Screen name="SignUpTermsAndCondtion" component={SignupTermsAndConditionPage}/>
        <Stack.Screen name="SignupConfirmation" component={SignupConfirmationPage}/>
    </Stack.Navigator>
    </NavigationContainer>
);
};

