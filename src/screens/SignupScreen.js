import React, { useState } from "react";
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { colors, theme } from "../assets/styles/themeFigma";
import { Controller, useForm } from "react-hook-form";
import { registerUser } from "../api/endpoint";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export default function SignupScreen({ navigation }) {

  const [isEditable, setEditable] = useState(true)
  const [hiddenPassword, setHiddenPassword] = useState(true)

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      phoneNumber: '',
      password: ''
    }
  });

  const onRegisterUser = (data) => {
    setEditable(false)

    const queryBody = {
      "name": data.name,
      "tel": data.phoneNumber,
      "password": data.password,
      "password_confirmation": data.validatePassword
    }

    registerUser(queryBody)
      .then(
        response => {
          setEditable(true)
          if (response.data) {
            navigation.navigate('Signin')
            Toast.show({
              type: 'success',
              text1: 'Digital',
              text2: 'Bravo ! Votre compte a été créé avec succès.'
            });
          } else {
            console.log(response.message)
            Toast.show({
              type: 'error',
              text1: 'Digital',
              text2: response.message
            });
          }
        }
      )
  }


  return (

    <ImageBackground style={{ flex: 1 }} source={require('../assets/images/signup.png')}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <StatusBar barStyle="transparent" translucent backgroundColor="transparent" />
        <View style={[theme.containerFluidFigma, {
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 20
        }]}>
          <View
            style={{
            }}>
            <Text style={[theme.title, theme.textFont, { color: 'white', fontWeight: 500 }]}>Créer un compte</Text>
          </View>

          <View
            style={{
              backgroundColor: "white",
              paddingHorizontal: 20,
              paddingVertical: 15,
              borderRadius: 15
            }}>
            <Text style={{ marginBottom: 5, color: 'black' }}>Nom</Text>
            <View style={[theme.formGroup, { borderColor: errors.name ? colors.danger : colors.gray }]}>

              <Controller
                control={control}
                name="name"
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    editable={isEditable}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    maxLength={10}
                    placeholderTextColor={colors.greyDark}
                    style={[theme.inputText, { height: "100%" }]}
                    placeholder={"Entrer nom"} />
                )}
              />
            </View>

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

            <Text style={{ marginBottom: 5, color: 'black' }}>Confirme mot de passe</Text>
            <View style={[theme.formGroup, { borderColor: errors.validatePassword ? colors.danger : colors.gray }]}>

              <Controller
                name="validatePassword"
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
                    placeholder='Confirme mot de passe' />
                )}
              />
              <TouchableOpacity onPress={() => setHiddenPassword(!hiddenPassword)}>
                <FontAwesomeIcon color={colors.greyDark} size={18} icon={hiddenPassword ? faEye : faEyeSlash} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={handleSubmit(onRegisterUser)}
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
                    }]}>Créer un compte</Text>
                    : <ActivityIndicator color={colors.white} />
                }
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Signin')}
              style={[theme.btn, theme.ligthBtn]}>
              <Text style={[theme.textFont, {
                color: colors.blue,
                textAlign: "center",
                fontSize: 16,
              }]}>Connexion</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>

  )
}

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
  }

})