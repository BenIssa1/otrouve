import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  ImageBackground,
  ActivityIndicator
} from 'react-native';
import { colors, theme, screenHeight } from '../assets/styles/themeFigma';
import { getGarmentModelsItemsValues } from "../api/endpoint";
import { useSelector } from "react-redux";

import { useIsFocused } from "@react-navigation/native";

function DetailGarmentScreen({ route, navigation }) {
  const { data } = route.params;
  const isFocused = useIsFocused();

  const [garmentItemsValues, setGarmentItemsValues] = useState([])
  const userAuth = useSelector((state) => state.userAuth.data)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getGarmentModelsItemsValues(userAuth.token, data.id).then(result => {
      setGarmentItemsValues(result.data)
      setLoading(false)
    })
  }, [isFocused])

  return (
    <View style={[{ flex: 1 }]} >
      <StatusBar
        hidden={true}
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
          <View style={[{ flex: 1 }]}>
            <View style={[{ flex: 1, }]} >
              <ImageBackground
                style={{ flex: 1, alignItems: 'center' }}
                source={{ uri: `http://192.168.1.12:8000/storage/uploads/${data.image}` }}
                imageStyle={{ borderBottomLeftRadius: 23, borderBottomRightRadius: 23 }}
              >
              </ImageBackground>
            </View>

            <View style={[
              theme.container, {
                flex: 1,
              }]} >
              <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: -50 }}>
                <View style={[{
                  backgroundColor: colors.white,
                  borderRadius: 10,
                  paddingVertical: 15,
                  paddingHorizontal: 8,
                  width: '100%',
                  marginBottom: 20,
                  elevation: 10,

                }]}
                >
                  <View style={[{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }]}
                  >
                    <Text style={[{
                      fontSize: 18,
                      color: 'black',
                      fontWeight: 400
                    }]}
                    >
                      Modèle
                    </Text>

                    <Text style={[{
                      fontSize: 15,
                      color: colors.blue
                    }]}
                    >
                      {data?.relationships.modelName}
                    </Text>

                  </View>

                  <View style={[{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTopWidth: 1,
                    borderTopColor: colors.gray,
                    paddingTop: 10,
                    marginTop: 15
                  }]}
                  >
                    <Text style={[{
                      fontSize: 18,
                      color: 'black',
                      fontWeight: 400
                    }]}
                    >
                      Date de rdv
                    </Text>

                    <Text style={[{
                      fontSize: 15,
                      color: colors.blue
                    }]}
                    >
                      {data?.delivery_date}
                    </Text>

                  </View>

                  <View style={[{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTopWidth: 1,
                    borderTopColor: colors.gray,
                    paddingTop: 10,
                    marginTop: 15
                  }]}
                  >
                    <Text style={[{
                      fontSize: 18,
                      color: 'black',
                      fontWeight: 400
                    }]}
                    >
                      Prix
                    </Text>

                    <Text style={[{
                      fontSize: 15,
                      color: colors.blue
                    }]}
                    >
                      {data?.price}
                    </Text>

                  </View>

                  <View style={[{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTopWidth: 1,
                    borderTopColor: colors.gray,
                    paddingTop: 10,
                    marginTop: 15
                  }]}
                  >
                    <Text style={[{
                      fontSize: 18,
                      color: 'black',
                      fontWeight: 400
                    }]}
                    >
                      Avance
                    </Text>

                    <Text style={[{
                      fontSize: 15,
                      color: colors.blue
                    }]}
                    >
                      {data?.advance}
                    </Text>

                  </View>

                  <View style={[{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTopWidth: 1,
                    borderTopColor: colors.gray,
                    paddingTop: 10,
                    marginTop: 15
                  }]}
                  >
                    <Text style={[{
                      fontSize: 18,
                      color: 'black',
                      fontWeight: 400
                    }]}
                    >
                      Reste
                    </Text>

                    <Text style={[{
                      fontSize: 15,
                      color: colors.blue
                    }]}
                    >
                      {data?.stay}
                    </Text>

                  </View>

                  <View style={[{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTopWidth: 1,
                    borderTopColor: colors.gray,
                    paddingTop: 10,
                    marginTop: 15
                  }]}
                  >
                    <Text style={[{
                      fontSize: 18,
                      color: 'black',
                      fontWeight: 400
                    }]}
                    >
                      Nombre de vêtements
                    </Text>

                    <Text style={[{
                      fontSize: 15,
                      color: colors.blue
                    }]}
                    >
                      {data?.numberGarments}
                    </Text>

                  </View>

                  {garmentItemsValues?.map((data, index) => (
                    <View key={index} style={[{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderTopWidth: 1,
                      borderTopColor: colors.gray,
                      paddingTop: 10,
                      marginTop: 15
                    }]}
                    >
                      <Text style={[{
                        fontSize: 18,
                        color: 'black',
                        fontWeight: 400
                      }]}
                      >
                        {data.libelle}
                  </Text>

                      <Text style={[{
                        fontSize: 15,
                        color: colors.blue
                      }]}
                      >
                        {data.value}
                      </Text>

                    </View>
                  ))}

                </View>
              </ScrollView>

            </View>
          </View>
        )}
    </View>
  );
}

export default DetailGarmentScreen