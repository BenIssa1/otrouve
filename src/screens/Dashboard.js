import React, { useEffect, useState } from 'react'
import {
  Text,
  View,
  TouchableOpacity, StatusBar, SafeAreaView, ActivityIndicator
} from 'react-native';
import { colors, theme, screenWidth, screenHeight } from '../assets/styles/themeFigma';

import { useDispatch, useSelector } from "react-redux";
import { addAuthData } from "../redux/features/authUserSlice";
import { logout, statistiques } from "../api/endpoint";
import Toast from 'react-native-toast-message';
import { useIsFocused } from "@react-navigation/native";
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'


function DashboardScreen({ navigation }) {

  const isFocused = useIsFocused();
  const dispatch = useDispatch()
  const userAuth = useSelector((state) => state.userAuth.data)

  const [statistiquesData, setStatistiquesData] = useState({})
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    statistiques(userAuth.token).then(result => {
      setStatistiquesData({
        garmentsPrice: result.garmentsPrice,
        garmentsCounts: result.garmentsCounts,
        clientCounts: result.clientCounts,
        clientRdvToDayCounts: result.clientRdvToDayCounts
      })
      setLoading(false)
    })
  }, [isFocused])

  return (
    <SafeAreaView style={[{
      flex: 1,
      backgroundColor: colors.white
    }, theme.container]}
    >
      <StatusBar
        hidden={true}
        barStyle="dark-content"
      />
      {isLoading ?
        (
          <View style={{
            flex: 1,
            height: screenHeight,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={[{ paddingVertical: 10 }]}>Chargement des données</Text>
            <ActivityIndicator size={"large"} color={colors.primary} />
          </View>
        ) : (
          <View style={[{
            flex: 1,
            marginTop: 20
          }]}
          >
            <TouchableOpacity onPress={() => navigation.navigate('tailorRdv')} style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              position: 'relative',
              marginBottom: 20,
            }}>

              <FontAwesomeIcon color={'#2ECC71'} size={33} icon={faCalendar} />
               <View style={[{
                position: 'absolute',
                top: -5,
                right: -12,
                height: 20,
                width: 20,
                borderRadius: 8,
                backgroundColor: colors.danger,
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 15,
                zIndex: 999

              }]}
              >
                <Text style={[{
                  color: 'white',
                  fontWeight: 800
                },]}
                >
                  {statistiquesData?.clientRdvToDayCounts}
                </Text>
              </View> 
            </TouchableOpacity>

            <View style={{
              backgroundColor: "#2ECC71",
              borderRadius: 10,
              alignItems: 'center',
              paddingVertical: (screenWidth * 10) / 100,
              width: '100%'
            }}

            >
              <Text style={[{
                fontSize: 40,
                color: '#FFF',
              }, theme.textFontBold]}
              >
                {statistiquesData?.garmentsPrice}
              </Text>

              <Text style={[{
                fontSize: 20,
                marginTop: 15,
                color: '#FFF',
              }, theme.textFontBold]}
              >
                Soldes
              </Text>


            </View>

            <View style={{
              backgroundColor: "#FFA500",
              borderRadius: 10,
              alignItems: 'center',
              paddingVertical: (screenWidth * 10) / 100,
              width: '100%',
              marginTop: 15
            }}

            >
              <Text style={[{
                fontSize: 40,
                color: '#FFF',
              }, theme.textFontBold]}
              >
                {statistiquesData?.clientCounts}
              </Text>

              <Text style={[{
                fontSize: 20,
                marginTop: 15,
                color: '#FFF',
              }, theme.textFontBold]}
              >
                Nombre De clients
              </Text>


            </View>

            <View style={{
              backgroundColor: "#FF6F61",
              borderRadius: 10,
              alignItems: 'center',
              paddingVertical: (screenWidth * 10) / 100,
              width: '100%',
              marginTop: 15
            }}

            >
              <Text style={[{
                fontSize: 40,
                color: '#FFF',
              }, theme.textFontBold]}
              >
                {statistiquesData?.garmentsCounts}
              </Text>

              <Text style={[{
                fontSize: 20,
                marginTop: 15,
                color: '#FFF',
              }, theme.textFontBold]}
              >
                Nombre De Vêtements
              </Text>


            </View>

          </View>)}
    </SafeAreaView>
  );
}

export default DashboardScreen