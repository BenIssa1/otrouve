import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from '../screens/Dashboard';
import ClientListScreen from '../screens/ClientList';
import DetailGarmentScreen from '../screens/DetailsGerment';
import GarmentList from '../screens/GarmentList';
import { colors } from '../assets/styles/themeFigma';
import CreateClientScreen from '../screens/CreateClient';
import RegisterGarment from '../screens/RegisterGarment';
import ClientRdvList from '../screens/ClientRdvList';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { TouchableHighlight } from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import { addAuthData } from "../redux/features/authUserSlice";
import { logout } from "../api/endpoint";
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import UpdateClientScreen from '../screens/UpdateClient';
import UpdateGarmentScreen from '../screens/UpdateGarment';

const Drawer = createDrawerNavigator();

export default function AppStack() {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const userAuth = useSelector((state) => state.userAuth.data)

  return (
    <Drawer.Navigator backBehavior="history" screenOptions={{
      drawerLabelStyle: { fontSize: 18, },
      headerStyle: { backgroundColor: colors.white }, 
      headerTitleAlign: "center",
      drawerActiveBackgroundColor: colors.blue, 
      drawerInactiveTintColor: colors.secondary, 
      drawerActiveTintColor: colors.white,
      headerRight: () => (
        <TouchableHighlight underlayColor={colors.white} onPress={() => {
          logout(userAuth.token)
            .then(
              async response => {
                if (response.data) {
                  dispatch(addAuthData(null))
                  navigation.navigate('Signin')
                } else {
                  Toast.show({
                    type: 'error',
                    text1: 'OTrouve',
                    text2: response.message
                  });
                }
              }
            )
        }}>
          <FontAwesomeIcon size={25} icon={faRightFromBracket} />
        </TouchableHighlight>
      ),
      headerRightContainerStyle: { paddingRight: 10 },
    }}>
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Clients" component={ClientListScreen} />
      <Drawer.Screen name="GarmenList"
        options={{
          title: "Détails du client",
          drawerItemStyle: { height: 0 }
        }}
        component={GarmentList} />
      <Drawer.Screen
        options={{
          headerTransparent: true,
          headerTintColor: colors.white,
          title: "Détails du vêtement",
          drawerItemStyle: { height: 0 },
          headerRight: () => <></>,
          headerRightContainerStyle: { paddingRight: 10 }
        }}
        name="DetailsGarment" component={DetailGarmentScreen}
      />
      <Drawer.Screen
        options={{
          title: "Créer un client",
          drawerItemStyle: { height: 0 }
        }}
        name="CreateClient" component={CreateClientScreen}
      />
      <Drawer.Screen
        options={{
          title: "Modifier un client",
          drawerItemStyle: { height: 0 }
        }}
        name="UpdateClient" component={UpdateClientScreen}
      />
      <Drawer.Screen name="createGarment" component={RegisterGarment} options={{
        title: "Créer un vêtement",
        drawerItemStyle: { height: 0 }
      }} />
      <Drawer.Screen
        options={{
          title: "Modifier un vêtement",
          drawerItemStyle: { height: 0 }
        }}
        name="UpdateGarment" component={UpdateGarmentScreen}
      />
      <Drawer.Screen name="tailorRdv" component={ClientRdvList} options={{
        title: "Les rvds d'aujourd'hui",
        drawerItemStyle: { height: 0 }
      }} />
    </Drawer.Navigator>
  )
}