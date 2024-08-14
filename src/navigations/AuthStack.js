import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from '../screens/signupScreen';
import signinScreen from '../screens/signinScreen';
import AppStack from './AppStack'
import { useSelector } from "react-redux";
const Stack = createNativeStackNavigator();

const AuthStack = () => {

  const userAuth = useSelector((state) => state.userAuth.data)

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      headerTransparent: false
    }} >

      {userAuth ? (<>
        <Stack.Screen name="Main" component={AppStack} />
      </>) : ( 
        <>
          <Stack.Screen name="Signin" component={signinScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
  )
}

export default AuthStack