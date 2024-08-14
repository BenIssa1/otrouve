import React, { useState } from 'react'
import {
  Text,
  View,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import { colors, theme } from '../assets/styles/themeFigma';
import Toast from 'react-native-toast-message';
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { launchCamera } from 'react-native-image-picker';
import { onRegisterClient } from "../api/endpoint";
import { SelectList } from 'react-native-dropdown-select-list'

function CreateClientScreen({ navigation }) {
  const userAuth = useSelector((state) => state.userAuth.data)
  const [isEditable, setEditable] = useState(true)
  const [imageUrl, setImageUrl] = useState(null);
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState(null);

  const { control, setValue, reset, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      phoneNumber: '',
      password: ''
    }
  });

  const lunchPhoneGalerie = async () => {
    const result = await launchCamera();
    if (!result?.didCancel) {
      setImageUrl(result?.assets[0]);
    }

  }

  const onRegister = (data) => {
    setEditable(false)
    const formData = new FormData()

    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("tel", data.tel);
    formData.append("age", age);
    formData.append("gender", gender);

    if (imageUrl != null) {
      formData.append("image", {
        uri: imageUrl.uri,
        type: imageUrl.type,
        name: imageUrl.fileName
      });
    }

    if (age && gender) {
      onRegisterClient(formData, userAuth.token)
        .then(
          async response => {
            setEditable(true)

            if (response.data) {
              navigation.navigate('Clients')
              Toast.show({
                type: 'success',
                text1: 'OTrouve',
                text2: 'Bravo ! Le client a bien été créé avec succès.'
              });
              setValue('firstName', '')
              setValue('lastName', '')
              setValue('tel', '')
              setImageUrl(null)
            } else {
              Toast.show({
                type: 'error',
                text1: 'OTrouve',
                text2: response.message
              });
            }
          }
        )
    } else {
      setEditable(true)

      Alert.alert(
        'Alerte',
        "Remplissez toutes les données du formulaire svp.",
        [
          {
            text: 'Sortir',
            onPress: () => { },
            style: 'cancel',
          },
        ]
      );
    }
  }
  const agesDatas = [
    { key: 1, value: "15 - 18 ans" },
    { key: 2, value: "18 - 25 ans" },
    { key: 3, value: "25 - 35 ans" },
    { key: 4, value: "35 à 45 ans" },
    { key: 4, value: "+ 45 ans" },
  ]


  const genderDatas = [{ key: 1, value: "Homme" }, { key: 1, value: "Femme" }]

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={true}>
        <View style={[theme.container, { backgroundColor: colors.white, marginBottom: 40 }]}>
          <StatusBar
            barStyle={'dark-content'}
          />

          <View  >
            <View>
              <View style={{ alignItems: "center" }} >
                {imageUrl != null ? (
                  <Image
                    source={{ uri: `${imageUrl.uri}` }}
                    style={{
                      height: 120,
                      width: 120,
                      borderRadius: 50,
                      marginRight: 10,
                      marginBottom: 20
                    }}
                  />
                ) : (
                  <Image
                    source={require('../assets/images/profile.png')}
                    style={{
                      height: 120,
                      width: 120,
                    }}
                  />
                )}

                <TouchableOpacity
                  onPress={lunchPhoneGalerie}
                  style={[theme.btnSmall, theme.ligthBtn]}>
                  <Text style={[theme.textFont, {
                    color: colors.blue,
                    textAlign: "center",
                    fontSize: 14,
                  }]}>Ajouter une photo</Text>
                </TouchableOpacity>
              </View>

              <View style={{ paddingHorizontal: 15, marginTop: 20 }} >
                <Text style={{ marginBottom: 5, color: 'black' }}>Nom</Text>
                <View style={[theme.formGroup, { borderColor: errors.firstName ? colors.danger : colors.gray }]}>

                  <Controller
                    control={control}
                    name="firstName"
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

                <Text style={{ marginBottom: 5, color: 'black' }}>Prénom</Text>
                <View style={[theme.formGroup, { borderColor: errors.lastName ? colors.danger : colors.gray }]}>

                  <Controller
                    control={control}
                    name="lastName"
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
                        placeholder={"Entrer prénom"} />
                    )}
                  />
                </View>

                <Text style={{ marginBottom: 5, color: 'black' }}>Numéro</Text>
                <View style={[theme.formGroup, { borderColor: errors.tel ? colors.danger : colors.gray }]}>

                  <Controller
                    control={control}
                    name="tel"
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
                        placeholder={"Numéro de téléphone"} />
                    )}
                  />
                </View>

                <Text style={{ marginBottom: 5, color: 'black' }}>Tranche age</Text>
                <SelectList
                  setSelected={(val) => {
                    setAge(agesDatas[val - 1].value)
                  }}
                  data={agesDatas}
                  placeholder='Sélectionner le modèle'
                  boxStyles={{ marginBottom: 20, borderColor: colors.gray, height: 55, backgroundColor: "#F6F7F9", }}
                />

                <Text style={{ marginBottom: 5, color: 'black' }}>Genre</Text>
                <SelectList
                  setSelected={(val) => {
                    setGender(genderDatas[val - 1].value)
                  }}
                  data={genderDatas}
                  placeholder='Sélectionner le modèle'
                  boxStyles={{ marginBottom: 20, borderColor: colors.gray, height: 55, backgroundColor: "#F6F7F9", }}
                />
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <TouchableOpacity
                onPress={handleSubmit(onRegister)}
                style={[theme.btn, { backgroundColor: colors.blue, }]}>
                {
                  isEditable ?
                    <Text style={{
                      color: colors.white,
                      textAlign: "center",
                      fontSize: 16,
                    }}
                    >
                      Sauvegarder
                    </Text> : <ActivityIndicator color={colors.white} />
                }
              </TouchableOpacity>
            </View>

          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default CreateClientScreen