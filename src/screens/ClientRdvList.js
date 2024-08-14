import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { colors, theme, screenHeight } from '../assets/styles/themeFigma';
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"

import { useSelector } from "react-redux";
import { getAllClientRdv } from "../api/endpoint";

import { useIsFocused } from "@react-navigation/native";

function ClientRdvList({ navigation }) {

  const isFocused = useIsFocused();

  const [clients, setClients] = useState([])
  const [isLoading, setLoading] = useState(false)
  const userAuth = useSelector((state) => state.userAuth.data)

  useEffect(() => {
    setLoading(true)
    getAllClientRdv(userAuth.token).then(result => {
      setClients(result.data)
      setLoading(false)
    })
  }, [isFocused])


  return (
    <View style={[theme.container, { flex: 1, backgroundColor: colors.white }]}>
      <StatusBar
        backgroundColor={colors.white}
        barStyle="dark-content"
      />
      <View style={[{ flex: 1 }]}>
        <ScrollView showsVerticalScrollIndicator={false} >
          {isLoading ?
            (
              <View style={{
                flex: 1,
                height: screenHeight,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={[ { paddingVertical: 10 }]}>Chargement des données</Text>
                <ActivityIndicator size={"large"} color={colors.primary} />
              </View>
            ) : (clients?.map((data, index) => (
              <View key={index} style={{ flexDirection: "row", marginTop: 20 }}>
                <View style={{}}>
                  <Image
                    source={require('../assets/images/profile.png')}
                    style={{
                      height: 80,
                      width: 80,
                      borderRadius: 20,
                      marginRight: 10,
                    }}
                  />
                </View>
                <View style={{
                  flexDirection: "row",
                  justifyContent: 'space-between',
                  alignItems: "center",
                  flexGrow: 1,
                }}>
                  <View style={{ flexDirection: "column" }}>
                    <Text style={[{
                      fontSize: 21,
                      color: "black",
                      marginBottom: 5
                    }]}
                    >
                      {data.relationships.firstName}
                    </Text>
                    <Text style={[{
                      fontSize: 15,
                      color: '#5A6672'
                    }]}
                    >
                      {data.delivery_date}
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity onPress={() => navigation.navigate('DetailsGarment', { data })}>
                      <FontAwesomeIcon color={colors.blue} size={18} icon={faEye} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )))
          }


        </ScrollView>
      </View>
    </View>
  );
}

export default ClientRdvList