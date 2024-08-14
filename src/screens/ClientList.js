import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Keyboard,
  ActivityIndicator
} from 'react-native';
import { colors, theme } from '../assets/styles/themeFigma';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { faPenAlt, faRemove } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { useForm, Controller } from "react-hook-form";

import { useSelector } from "react-redux";
import { getAllClient, getClientsSearch } from "../api/endpoint";

import { useIsFocused } from "@react-navigation/native";

function ClientListScreen({ navigation }) {

  const isFocused = useIsFocused();
  const [isLoading, setLoading] = useState(false)

  const { control, formState: { errors }, reset } = useForm({
    defaultValues: {
      search: ''
    }
  });

  const [clients, setClients] = useState([])
  const userAuth = useSelector((state) => state.userAuth.data)

  useEffect(() => {
    setLoading(true)
    getAllClient(userAuth.token).then(result => {
      setClients(result.data)
      setLoading(false)
    })
  }, [isFocused])

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const onResetForm = () => {
    setLoading(true)
    reset({ search: "" })

    getAllClient(userAuth.token).then(result => {
      setClients(result.data)
      setLoading(false)
    })
  }

  return (
    <View style={[theme.container, { flex: 1, backgroundColor: colors.white }]}>
      <StatusBar
        backgroundColor={colors.white}
        barStyle="dark-content"
      />

      <View style={[
        theme.rowBox, {
          alignItems: 'center',
          borderRadius: 5,
          justifyContent: 'space-between',
          marginTop: 20
        }]}>
        <View style={[
          theme.rowBox, {
            maxWidth: '84%',
            borderWidth: .3,
            alignItems: 'center',
            paddingHorizontal: 10,
            borderRadius: 10,
            borderColor: colors.greyDark,
            backgroundColor: "#F6F7F9"
          }]}>
          <FontAwesomeIcon icon={faPenAlt} size={18} color={colors.greyDark} />
          <Controller
            control={control}
            name="search"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onChangeText={(currentValue) => {
                  setLoading(true)
                  onChange(currentValue)
                  if (currentValue.length >= 1) {
                    getClientsSearch(userAuth.token, currentValue).then(result => {
                      setClients(result.data)
                      setLoading(false)
                    })
                  } else {
                    getAllClient(userAuth.token).then(result => {
                      setClients(result.data)
                      setLoading(false)
                    })
                  }
                }}
                style={[theme.inputText, {
                  width: '95%',
                  marginLeft: 2,
                  fontWeight: '500',
                }]}
                onBlur={onBlur}
                value={value}
                placeholderTextColor={colors.greyDark}
                placeholder='Rechercher par le nom'></TextInput>
            )}
          />
        </View>
        <TouchableOpacity
          onPress={onResetForm}
          style={[
            theme.rowBox, {
              marginLeft: 5,
              padding: 15,
              borderRadius: 10,
              alignItems: 'center',
              backgroundColor: "#FF4500"
            }]}>
          <FontAwesomeIcon icon={faRemove} size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
      <View style={[theme.container, { flex: isKeyboardVisible ? 1 : 1.7 }]}>
        <ScrollView showsVerticalScrollIndicator={false} >
          {isLoading ?
            (
              <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={[{ paddingVertical: 10 }]}>Chargement des données</Text>
                <ActivityIndicator size={"large"} color={colors.primary} />
              </View>
            ) : (clients?.map((data, index) => (
              <TouchableOpacity key={index} onPress={() => navigation.navigate('GarmenList', {
                client: data,
              })}>
                <View style={{ flexDirection: "row", marginTop: 30 }}>
                  <View style={{}}>
                    {data ? (
                      <Image
                        source={{ uri: `http://192.168.1.12:8000/storage/uploads/${data.image}` }}
                        style={{
                          height: 64,
                          width: 64,
                          borderRadius: 20,
                          marginRight: 10,
                        }}
                      />
                    ) : (
                      <Image
                        source={require('../assets/images/profile.png')}
                        style={{
                          height: 64,
                          width: 64,
                          borderRadius: 20,
                          marginRight: 10,
                        }}
                      />
                    )}

                  </View>
                  <View style={{
                    flexDirection: "row",
                    justifyContent: 'space-between',
                    alignItems: "center",
                    flexGrow: 1,
                  }}>
                    <View style={{ flexDirection: "column" }}>
                      <Text style={[{
                        fontSize: 18,
                        color: "black",
                        marginBottom: 5
                      }]}
                      >
                        {data.lastName + " " + data.firstName}
                      </Text>
                    </View>
                    <View>
                      <TouchableOpacity onPress={() => navigation.navigate('UpdateClient', {
                        client: data,
                      })}>
                        <FontAwesomeIcon color={colors.blue} size={18} icon={faPencilAlt} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )))
          }

        </ScrollView>
      </View>
      {!isKeyboardVisible && (
        <View style={[theme.container, { flex: 0.3 }]}>
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateClient')}
            style={[theme.btn, { backgroundColor: colors.blue, }]}>
            <Text style={{
              color: colors.white,
              textAlign: "center",
              fontSize: 16,
            }}>
              <Text style={[theme.textFont, {
                color: colors.white,
                textAlign: "center",
                fontSize: 16,
              }]}>Créer un client</Text>
            </Text>
          </TouchableOpacity>
        </View>
      )}

    </View>
  );
}

export default ClientListScreen