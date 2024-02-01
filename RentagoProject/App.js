import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginPage from './Screens/Login';
import SignupPage from './Screens/SignupPage';
import UserProfilePage from './Screens/UserProfile';
import UserProfileSettingsPage from './Screens/UserProfileSettings';
import SignupConfirmationPage from './Screens/SignupPageConfirmation';
import HomePage from './Screens/Home';
import SignupTermsAndConditionPage from './Screens/SignupPageTermsAndAgreement';
import GoogleMapRegisterSelectPlace from './Screens/GoogleMapRegisterSelectPlace';
import GoogleMapRegisterImage from './Screens/GoogleMapRegisterImage';
import GoogleMapRegisterInformation from './Screens/GoogleMapRegisterInformation'
import GoogleMapSearch from './Screens/GoogleMapSearch';
import GoogleMapRegisterImageConfirmation from './Screens/GoogleMapRegisterImageConfirmation'
import GoogleMapSearchProfile from './Screens/GoogleMapSearchProfile'
import AboutUs from './Screens/AboutUsPage';
import Test from './Screens/Test'

const Stack = createNativeStackNavigator();

export default function App() {
return (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName="GoogleMapSearch"
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right', // Set the animation option
            }}
        >
            <Stack.Screen name="Test" component={Test} />
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="GoogleMapRegister" component={GoogleMapRegisterSelectPlace} />
            <Stack.Screen name="GoogleMapRegisterInformation" component={GoogleMapRegisterInformation} />
            <Stack.Screen name="GoogleMapRegisterImageConfirmation" component={GoogleMapRegisterImageConfirmation} />
            <Stack.Screen name="GoogleMapRegisterImage" component={GoogleMapRegisterImage} />
            <Stack.Screen name="GoogleMapSearch" component={GoogleMapSearch}/>
            <Stack.Screen name="GoogleMapSearchProfile" component={GoogleMapSearchProfile}/>
            <Stack.Screen name="UserProfile" component={UserProfilePage}/>
            <Stack.Screen name="UserProfileSetting" component={UserProfileSettingsPage}/> 
            <Stack.Screen name="SignUp" component={SignupPage}/>
            <Stack.Screen name="SignUpTermsAndCondtion" component={SignupTermsAndConditionPage}/>
            <Stack.Screen name="SignupConfirmation" component={SignupConfirmationPage}/>
            <Stack.Screen name="AboutUs" component={AboutUs}/>
        </Stack.Navigator>
    </NavigationContainer>
    );
};