import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator
} from 'react-native';
import { colors, theme } from '../assets/styles/themeFigma';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

import { useSelector } from "react-redux";
import { getAllGarment, getAllGarmentFilterDate } from "../api/endpoint";

import { useIsFocused } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

function DetailGarmentScreen({ route, navigation }) {
  const { client } = route.params;
  const isFocused = useIsFocused();
  const [garments, setGarments] = useState([])
  const userAuth = useSelector((state) => state.userAuth.data)
  const [isLoading, setLoading] = useState(false)

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    let dateValue = date.toLocaleDateString("fr")
    hideDatePicker();

    setLoading(true)
    getAllGarmentFilterDate(userAuth.token, client.id, dateValue.replaceAll('/', '-')).then(result => {
      setGarments(result.data)
      setLoading(false)
    })
  };

  useEffect(() => {
    setLoading(true)
    getAllGarment(userAuth.token, client.id).then(result => {
      setGarments(result.data)
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

  return (
    <View style={[theme.container, { flex: 1, backgroundColor: colors.white, }]}>
      <View style={{
        backgroundColor: colors.white,
        paddingVertical: 20,
        alignItems: "center",
        marginTop: 10,
        borderRadius: 20,
        elevation: 4
      }}>
        {client ? (
          <Image
            source={{ uri: `http://192.168.1.12:8000/storage/uploads/${client?.image}` }}
            style={{
              height: 80,
              width: 80,
              borderRadius: 50,
              marginRight: 10,
            }}
          />
        ) : (
          <Image
            source={require('../assets/images/profile.png')}
            style={{
              height: 80,
              width: 80,
              borderRadius: 50,
              marginRight: 10,
            }}
          />
        )}


        <Text style={[{
          fontSize: 21,
          color: "black",
          marginVertical: 7
        }]}
        >
          {client?.lastName + " " + client?.firstName}
        </Text>

        <Text style={[{
          fontSize: 19,
        }]}
        >
          {client?.tel}
        </Text>
      </View>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15
      }}>
        <Text style={[{
          fontSize: 22,
          color: "black",
          fontWeight: 600,
        }]}
        >
          Liste des vêtements
        </Text>

        <TouchableOpacity onPress={showDatePicker}>
          <FontAwesomeIcon color={colors.blue} size={33} icon={faCalendar} />
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <View style={[theme.container, { flex: isKeyboardVisible ? 1 : 1.6 }]}>
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
            ) : (garments?.map((data, index) => (
              <TouchableOpacity key={index} onPress={() => navigation.navigate('DetailsGarment', { data })}>
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                  <View style={{}}>
                    <Image
                      source={{ uri: `http://192.168.1.12:8000/storage/uploads/${data.image}` }}
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
                        {data.relationships.modelName}
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
                      <TouchableOpacity onPress={() => navigation.navigate('UpdateGarment', {
                        client: client,
                        garment: data,
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
        <View style={[theme.container, { flex: 0.4 }]}>
          <TouchableOpacity
            onPress={() => navigation.navigate('createGarment', { client: client })}
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
              }]}>Confectionner un vêtement</Text>

            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default DetailGarmentScreen