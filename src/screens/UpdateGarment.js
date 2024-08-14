import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  TextInput,
  TouchableOpacity, ScrollView, SafeAreaView,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import { colors, theme, } from '../assets/styles/themeFigma';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { SelectList } from 'react-native-dropdown-select-list'
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  onRegisterGarment,
  onUpdateGarment,
  getAllModel,
  getAllGarmentModelsItems,
  getClientGarmentModelsItemsValues
} from "../api/endpoint";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import Toast from 'react-native-toast-message';
import DateTimePickerModal from "react-native-modal-datetime-picker";

function UpdateGarmentScreen({ route, navigation }) {
  const { client, garment } = route.params;

  const [imageUrl, setImageUrl] = useState(null);
  const [modelImageUrl, setModelImageUrl] = useState(null);
  const [model, setModel] = useState("");
  const [getModels, setGetModels] = useState([]);
  const [isLoading, setLoading] = useState(false)
  const [isLoadingM, setLoadingM] = useState(false)

  const [isEditable, setEditable] = useState(true)

  const [modelDataDefault, setModelDataDefault] = useState({});

  const { control, reset, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      items: [],
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const isFocused = useIsFocused();

  const lunchPhoneCamera = async () => {
    const result = await launchCamera();
    if (!result?.didCancel) {
      setImageUrl(result?.assets[0]);
    }
  }

  const launchPhoneLibrary = async () => {
    const result = await launchImageLibrary();
    if (!result?.didCancel) {
      setModelImageUrl(result?.assets[0]);
    }
  }

  const userAuth = useSelector((state) => state.userAuth.data)

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateSelect, setDateSelect] = useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
    setDateSelect("")
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDateSelect(date.toLocaleDateString("fr"));
    hideDatePicker();
  };

  const onRegister = (data) => {
    setEditable(false)
    let datas = []
    const { items, models } = data

    items.map((value, index) => {
      datas.push({
        value: models[index].value,
        modelId: value.modelId,
      })
    })

    const formData = new FormData()

    if (imageUrl != null) {
      formData.append("image", {
        uri: imageUrl.uri,
        type: imageUrl.type,
        name: imageUrl.fileName
      });
    }

    if (modelImageUrl != null) {
      formData.append("modelImage", {
        uri: modelImageUrl.uri,
        type: modelImageUrl.type,
        name: modelImageUrl.fileName
      });
    }

    formData.append("client_id", client.id);
    formData.append("model_id", model);
    formData.append("datas", JSON.stringify(datas));

    if (data.numberGarments) formData.append("numberGarments", data.numberGarments);
    if (data.price) formData.append("price", data.price);
    if (data.advance) formData.append("advance", data.advance);
    if (data.withdrawal) formData.append("withdrawal", data.withdrawal);
    if (data.comment) formData.append("comment", data.comment);
    if (dateSelect) formData.append("delivery_date", dateSelect);

    if (model && parseInt(data.price) > parseInt(data.advance) && dateSelect) {
      onUpdateGarment(formData, garment.id, userAuth.token)
        .then(
          async response => {
            setEditable(true)
            if (response.data) {
              navigation.navigate('GarmenList', { client: client })
              Toast.show({
                type: 'success',
                text1: 'OTrouve',
                text2: 'Bravo ! Le vêtement a été crée avec succès.'
              });
              setDateSelect('')
              setImageUrl(null)
              setModelImageUrl(null)
            } else {
              Toast.show({
                type: 'error',
                text1: 'Error',
                text2: response.message
              });
            }
          }
        )
    } else if (parseInt(data.price) < parseInt(data.advance)) {
      setEditable(true)

      Alert.alert(
        'Alerte',
        "Le prix doit être supérieur à l'avance.",
        [
          {
            text: 'Sortir',
            onPress: () => { },
            style: 'cancel',
          },
        ]
      );
    }
    else {
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

  useEffect(() => {
    remove()
    reset()
    setModel("")
    setGetModels([])
    setLoading(true)

    getAllModel(userAuth.token).then(result => {
      if (result.data) {
        let datas = []
        result.data.map((value) => {
          datas.push({
            key: value.id,
            value: value.libelle,
          })
        })

        /* Found Age */
        const foundModel = datas.find((element) => element.key == garment?.model_id);
        if (foundModel) {
          let modelDefault = {}
          modelDefault.key = foundModel.key
          modelDefault.value = foundModel.value

          setModelDataDefault(modelDefault)
        }

        setGetModels(datas)
        setValue('numberGarments', garment.numberGarments.toString())
        setValue('price', garment.price.toString())
        setValue('advance', garment.advance.toString())
        setDateSelect(garment.delivery_date)
        setLoading(false)
      }
    })
  }, [isFocused])


  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white
    }}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[{
        }, theme.container]}
      >

        <View style={{
          marginTop: 20,
          marginBottom: 40,
          paddingHorizontal: 15
        }}
        >
          <View style={{
            marginTop: 15,
          }}>

            <Text style={{ marginBottom: 5, color: 'black' }}>Modèle</Text>
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
              ) : (
                <SelectList
                  setSelected={(val) => {
                    setModel(val)
                    remove()
                    remove(0);
                    setLoadingM(true)
                    getAllGarmentModelsItems(userAuth.token, val).then(result => {
                      if (result.data.length > 0) {

                        getClientGarmentModelsItemsValues(userAuth.token, client.id, val).then(res => {
                          if (res.data) {
                            result.data.map((value) => {

                              let dataBody = {
                                name: value.relationships.garment_model_item_lable.libelle,
                                modelId: value.id,
                              }

                              const found = res.data.find((element) => element.modelId == value.id);

                              if (found) {
                                append({
                                  ...dataBody,
                                  value: found.value
                                })
                              } else {
                                append({
                                  ...dataBody,
                                  value: ''
                                })
                              }

                            })

                          } else {
                            result.data.map((valueData) => {
                              append({
                                name: valueData.relationships.garment_model_item_lable.libelle,
                                modelId: valueData.id,
                                value: ''
                              })
                            })
                          }
                          setLoadingM(false)
                        })

                      } else {
                        setLoadingM(false)
                      }
                    })
                  }}
                  data={getModels}
                  placeholder='Sélectionner le modèle'
                  boxStyles={{ marginBottom: 10, borderColor: colors.gray, height: 50, backgroundColor: "#F6F7F9", justifyContent: 'flex-start', }}
                  defaultOption={modelDataDefault}
                />
              )}

            <Text style={{ marginBottom: 5, color: 'black', }}>Photo du tissu</Text>
            <View style={[theme.formGroupGarment]}>
              <TextInput
                onPressIn={lunchPhoneCamera}
                placeholder='Ajouter une photo'
                placeholderTextColor={colors.greyDark}
                style={[theme.inputText, { height: "100%" }]}
              />
            </View>

            {imageUrl != null ? (
              <Image
                source={{ uri: `${imageUrl.uri}` }}
                style={{
                  height: 150,
                  width: "100%",
                  borderRadius: 10,
                  marginRight: 10,
                  marginBottom: 20
                }}
              />
            ) : (
              <Image
                source={{ uri: `http://192.168.1.12:8000/storage/uploads/${garment.image}` }}
                style={{
                  height: 150,
                  width: "100%",
                  borderRadius: 10,
                  marginRight: 10,
                  marginBottom: 20
                }}
              />
            )}
          </View>

          <Text style={{ marginBottom: 5, color: 'black' }}>Photo du modèle</Text>
          <View style={[theme.formGroupGarment]}>
            <TextInput
              onPressIn={launchPhoneLibrary}
              placeholder='Choisir le modèle'
              placeholderTextColor={colors.greyDark}
              style={[theme.inputText, { height: "100%" }]}
            />
          </View>

          {modelImageUrl != null && (
            <Image
              source={{ uri: `${modelImageUrl.uri}` }}
              style={{
                height: 150,
                width: "100%",
                borderRadius: 10,
                marginRight: 10,
                marginBottom: 20
              }}
            />
          )}

          {isLoadingM ?
            (
              <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={[{ paddingVertical: 10 }]}>Chargement des mesures</Text>
                <ActivityIndicator size={"large"} color={colors.primary} />
              </View>
            ) : (fields.map((field, index) => (
              <View key={field.id}>
                <Text style={{ marginBottom: 5, color: 'black' }}>{field.name}</Text>
                <View style={[theme.formGroupGarment, { borderColor: errors.back_length ? colors.danger : colors.gray }]}>
                  <Controller
                    control={control}
                    name={`models.${index}.value`}
                    rules={{ required: true }}
                    defaultValue={field.value}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        placeholder={`Entrer ${field.name}`}
                        placeholderTextColor={colors.greyDark}
                        style={[theme.inputText, { height: "100%" }]}
                        keyboardType='numeric'
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                      />
                    )}
                  />
                </View>
              </View>
            )))
          }

          <Text style={{ marginBottom: 5, color: 'black' }}>Nombre de vêtements</Text>
          <View style={[theme.formGroupGarment, { borderColor: errors.numberGarments ? colors.danger : colors.gray }]}>
            <Controller
              control={control}
              name="numberGarments"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  editable={isEditable}
                  onChangeText={onChange}
                  placeholder='Entrer nombre'
                  placeholderTextColor={colors.greyDark}
                  style={[theme.inputText, { height: "100%" }]}
                  keyboardType='numeric'
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
          </View>

          <Text style={{ marginBottom: 5, color: 'black' }}>Prix</Text>
          <View style={[theme.formGroupGarment, { borderColor: errors.price ? colors.danger : colors.gray }]}>
            <Controller
              control={control}
              name="price"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder='Entrer prix'
                  placeholderTextColor={colors.greyDark}
                  style={[theme.inputText, { height: "100%" }]}
                  keyboardType='numeric'
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
          </View>

          <Text style={{ marginBottom: 5, color: 'black' }}>Avance</Text>
          <View style={[theme.formGroupGarment]}>
            <Controller
              control={control}
              name="advance"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder='Entrer avance'
                  placeholderTextColor={colors.greyDark}
                  style={[theme.inputText, { height: "100%" }]}
                  keyboardType='numeric'
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
          </View>

          <Text style={{ marginBottom: 5, color: 'black' }}>Retrait</Text>
          <View style={[theme.formGroupGarment]}>
            <Controller
              control={control}
              name="withdrawal"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder='Entrer retrait'
                  placeholderTextColor={colors.greyDark}
                  style={[theme.inputText, { height: "100%" }]}
                  keyboardType='numeric'
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
          </View>

          <Text style={{ marginBottom: 5, color: 'black' }}>Date rdv</Text>
          <View style={[theme.formGroupGarment]}>
            <TextInput
              onPressIn={showDatePicker}
              placeholder='Entrer date Rdv'
              value={dateSelect}
              placeholderTextColor={colors.greyDark}
              style={[theme.inputText, { height: "100%" }]}
            />
          </View>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            style={[theme.fieldText]}
          />

          <Text style={{ marginBottom: 5, color: 'black' }}>Commentaire</Text>
          <View style={[theme.formGroupGarment, { borderColor: errors.firstName ? colors.danger : colors.gray }]}>

            <Controller
              control={control}
              name="comment"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  editable={isEditable}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  multiline={true}
                  placeholderTextColor={colors.greyDark}
                  style={[theme.inputText, { height: "100%" }]}
                  placeholder={"Entrer commentaire"} />
              )}
            />
          </View>

          <TouchableOpacity
            onPress={handleSubmit(onRegister)}
            style={[theme.btn, { backgroundColor: colors.blue, }]}

          >
            {
              isEditable ?
                <Text style={{
                  fontSize: 18,
                  color: 'white',
                  textAlign: "center",
                  fontFamily: 'Quicksand-Medium'
                }}
                >
                  Sauvegarder
                </Text> : <ActivityIndicator color={colors.white} />
            }
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default UpdateGarmentScreen