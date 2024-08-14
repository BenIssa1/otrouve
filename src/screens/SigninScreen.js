import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StatusBar,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { colors, theme } from "../assets/styles/themeFigma";
import { useForm, Controller } from "react-hook-form";
import { authUser } from "../api/endpoint";
import { useDispatch, useSelector } from "react-redux";
import { addAuthData } from "../redux/features/authUserSlice";
import Toast from 'react-native-toast-message';

export default function SigninScreen({ navigation }) {

  const [isEditable, setEditable] = useState(true)
  const [hiddenPassword, setHiddenPassword] = useState(true)

  const userAuth = useSelector((state) => state.userAuth.data)
  const dispatch = useDispatch()

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      phoneNumber: '',
      password: ''
    }
  });

  useEffect(() => {
    if (userAuth) {
      navigation.navigate('Main')
    }
  }, [])

  const onAuthenticate = (data) => {
    setEditable(false)

    const queryBody = {
      "tel": data.phoneNumber,
      "password": data.password
    }

    authUser(queryBody)
      .then(
        async response => {
          setEditable(true)

          if (response.data) {
            dispatch(addAuthData(response.data))
            navigation.navigate('Main')
            Toast.show({
              type: 'success',
              text1: 'OTrouve',
              text2: 'Bravo ! Vous êtes connecté avec succès.'
            });
          } else {
            Toast.show({
              type: 'error',
              text1: 'OTrouve',
              text2: response.message
            });
          }
        }
      )
  }


  return (
    <ImageBackground style={{ flex: 1 }} source={require('../assets/images/login.png')}>
      <StatusBar barStyle="transparent" translucent backgroundColor="transparent" />
      <View style={[theme.containerFluidFigma, {
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20
      }]}>
        <View >
          <Text style={[theme.textFont, { color: 'white', fontWeight: 500, fontSize: 25, }]}>Connexion</Text>
        </View>

        <View
          style={{
            backgroundColor: "white",
            paddingHorizontal: 20,
            paddingVertical: 15,
            borderRadius: 15
          }}>

          <Text style={{ marginBottom: 5, color: 'black' }}>Numéro</Text>
          <View style={[theme.formGroup, { borderColor: errors.phoneNumber ? colors.danger : colors.gray }]}>

            <Controller
              control={control}
              name="phoneNumber"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  editable={isEditable}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  maxLength={10}
                  keyboardType='name-phone-pad'
                  inputMode="numeric"
                  placeholderTextColor={colors.greyDark}
                  style={[theme.inputText, { height: "100%" }]}
                  placeholder={"Numéro de téléphone"} />
              )}
            />
          </View>

          <Text style={{ marginBottom: 5, color: 'black' }}>Mot de passe</Text>
          <View style={[theme.formGroup, { borderColor: errors.password ? colors.danger : colors.gray }]}>

            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  editable={isEditable}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholderTextColor={colors.greyDark}
                  secureTextEntry={hiddenPassword}
                  style={[theme.inputText, { height: "100%", width: "90%" }]}
                  placeholder='Mot de passe' />
              )}
            />
            <TouchableOpacity onPress={() => setHiddenPassword(!hiddenPassword)}>
              <FontAwesomeIcon color={colors.greyDark} size={18} icon={hiddenPassword ? faEye : faEyeSlash} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleSubmit(onAuthenticate)}
            style={[theme.btn, { backgroundColor: colors.blue, }]}>
            <Text style={{
              color: colors.white,
              textAlign: "center",
              fontSize: 16,
            }}>
              {
                isEditable ?
                  <Text style={[theme.textFont, {
                    color: colors.white,
                    textAlign: "center",
                    fontSize: 16,
                  }]}>Connexion</Text>
                  : <ActivityIndicator color={colors.white} />
              }
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}
            style={[theme.btn, theme.ligthBtn]}>
            <Text style={[theme.textFont, {
              color: colors.blue,
              textAlign: "center",
              fontSize: 16,
            }]}>Créer un compter</Text>

          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  )
}
