import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './assets/screens/WelcomeScreen';
import SignupScreen from './assets/screens/SignupScreen';
import SigninScreen from './assets/screens/SigninScreen';
import RegisterObjectScreen from './assets/screens/RegisterObjectScreen';
import ObjectFoundScreen from './assets/screens/ObjectFoundScreen';
import HomeScreen from './assets/screens/HomeScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Signin" component={SigninScreen} />
      <Stack.Screen name="RegisterObject" component={RegisterObjectScreen} />
      <Stack.Screen name="ObjectFound" component={ObjectFoundScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}