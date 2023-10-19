import React, {useState} from 'react'
import {
    Text,
    View,
    TextInput,
    TouchableOpacity, ScrollView,SafeAreaView,
  } from 'react-native';
import FontsIcons from 'react-native-vector-icons/FontAwesome6'
import { colors, theme } from '../assets/styles/theme';

function RegisterObjectScreen({ navigation }) {
    const [selectedTab, setSelectedTab] = useState(0);
  
    return (
      <SafeAreaView style={{ 
        flex: 1, 
        }}>
  
        <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[{
        }, theme.container]}
        >
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 40
            }}
          >
            <TouchableOpacity style={[{ 
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: colors.gray
            }, theme.centerBox]} 
  
            onPress={() => {
              navigation.goBack()
            }}
            >
              <FontsIcons name="chevron-left" size={25} />
            </TouchableOpacity>
  
            <Text style={{
              fontSize: 20, 
              fontWeight: '800', 
              color: colors.secondary,
              marginLeft: 60
              }}
            >
                Déclarer un objets
            </Text>
          </View>
  
          <View style={{ 
            marginBottom: 30
            }}
          >
            <View
                style={{
                  height: 50,
                  borderRadius: 30,
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'white'
                }}
            >
              <TouchableOpacity
                style={{
                  width: '50%',
                  height: '100%',
                  backgroundColor: selectedTab == 0 ? colors.primary : 'white',
                  borderRadius: 30,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onPress={() => {
                  setSelectedTab(0)
                }}
              >
                  <Text style={{  color:  selectedTab === 0 ? '#fff' : '#000', fontSize: 18, fontWeight: '700'}}>Trouvé</Text>
              </TouchableOpacity>
  
              <TouchableOpacity
                style={{
                  width: '50%',
                  height: '100%',
                  backgroundColor: selectedTab == 1 ? colors.primary : 'white',
                  borderRadius: 30,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onPress={() => {
                  setSelectedTab(1)
                }}
              >
                  <Text style={{ color:  selectedTab === 1 ? '#fff' : '#000', fontSize: 18, fontWeight: '700'}}>Perdu</Text>
              </TouchableOpacity>
              
            </View> 
          </View>
  
          <View style={{ 
            marginBottom: 40
            }}
          >
  
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center',
              marginBottom: 20
              }}
            >
              <FontsIcons name="clipboard-user" size={25} />
  
              <Text style={{
                fontSize: 20, 
                fontWeight: '800', 
                color: 'black',
                marginLeft: 10
                }}
              >
                  Type d'objet
              </Text>
            </View>
  
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20
              }}
            >
              <View style={{ 
                flexDirection: 'column', 
                alignItems: 'center',
                justifyContent: 'center',
                }}
              >
                <FontsIcons name="address-card" size={35} />
  
                <Text style={{
                  fontSize: 15, 
                  fontWeight: '300', 
                  color: 'black',
                  }}
                >
                    CNI
                </Text>
              </View>
              <View style={{ 
                flexDirection: 'column', 
                alignItems: 'center',
                justifyContent: 'center',
                }}
              >
                <FontsIcons name="building-user" size={35} />
  
                <Text style={{
                  fontSize: 15, 
                  fontWeight: '300', 
                  color: 'black',
                  }}
                >
                  Carte scolaire
                </Text>
              </View>
              <View style={{ 
                flexDirection: 'column', 
                alignItems: 'center',
                justifyContent: 'center',
                }}
              >
                <FontsIcons name="passport" size={35} />
  
                <Text style={{
                  fontSize: 15, 
                  fontWeight: '300', 
                  color: 'black',
                  }}
                >
                  Passport
                </Text>
              </View>
              <View style={{ 
                flexDirection: 'column', 
                alignItems: 'center',
                justifyContent: 'center',
                }}
              >
                <FontsIcons name="chalkboard-user" size={35} />
  
                <Text style={{
                  fontSize: 15, 
                  fontWeight: '300', 
                  color: 'black',
                  }}
                >
                  Permis
                </Text>
              </View>
            </View>
  
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center',
              marginBottom: 20
              }}
            >
              <FontsIcons name="calendar" size={25} />
  
              <Text style={{
                fontSize: 20, 
                fontWeight: '800', 
                color: colors.secondary,
                marginLeft: 10
                }}
              >
                Quand l'avez vous trouvé?
              </Text>
            </View>
  
            <View style={{ 
              marginBottom: 20,
             flexDirection: 'row'
              }}
            >
              <View style={{ 
                flexGrow: 1,
                }}
              >
                <View style={{ 
                  flexDirection: 'row'
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flexGrow: 1,
                      height: 50,
                      borderColor: colors.primary,
                      borderWidth: 2,
                      borderTopLeftRadius: 25,
                      borderBottomLeftRadius: 25,
                      backgroundColor: colors.primary,
                    
                    }}
                  >
                    
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={{
                      flexGrow: 1.5,
                      height: 50,
                      borderColor: colors.primary,
                      marginLeft: 3,
                      borderWidth: 2,
                      backgroundColor: colors.primary,
                      alignItems: 'center',
                      justifyContent: 'center',
                      
                    }}
                  >
                    <Text style={{
                      color: colors.white,
                      fontSize: 16,
                      fontWeight: '700'
                    }}>Aujourd'hui</Text>
                  </TouchableOpacity>
                </View>
  
              </View>
  
              <View style={{ 
                flexGrow: 1,
                }}
              >
                <View style={{ 
                  flexDirection: 'row'
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flexGrow: 1,
                      height: 50,
                      borderColor: colors.primary,
                      borderWidth: 2,
                      marginLeft: 3,
                      backgroundColor: colors.primary,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{
                      color: colors.white,
                      fontSize: 16,
                      fontWeight: '700'
                    }}>Hier</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={{
                      flexGrow: 1.5,
                      height: 50,
                      borderColor: colors.gray,
                      marginLeft: 3,
                      borderWidth: 2,
                      backgroundColor: colors.gray,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderBottomRightRadius: 25,
                      borderTopRightRadius: 25,
                    }}
                  >
                    <TextInput
                      placeholder='12/10/2023'
                      placeholderTextColor={'black'}
                      style={{
                          width: "100%",
                          fontSize: 16,
                          fontFamily: 'Quicksand-Medium'
                      }}
                  />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
  
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center',
              }}
            >
              <FontsIcons name="pen-to-square" size={25} />
  
              <Text style={{
                fontSize: 20, 
                fontWeight: '800', 
                color: colors.secondary,
                marginLeft: 10
                }}
              >
                  Détail de l'objet
              </Text>
            </View>
  
            <Text style={{
              fontSize: 17, 
              color: 'black',
              marginTop: 20
              }}
            >
              Donnez nous plus d'information sur l'objet
            </Text>
  
            <View style={{
              marginTop: 15,
              marginBottom: 25
            }}>
  
              <View style={[theme.formGroupView]}>
                  <TextInput
                      placeholder='Nom complet'
                      placeholderTextColor={colors.greyDark}
                      style={[theme.fieldText]}
                  />
  
                  <Text
                      style={{
                          position: "absolute",
                          left: 12,
                      }}
                  >
                      <FontsIcons name="user" size={22} color={colors.greyDark} />
  
                  </Text>
              </View>
  
              <View style={[theme.formGroupView]}>
                  <TextInput
                      placeholder='Matricule ou Identifiant'
                      placeholderTextColor={colors.greyDark}
                      style={[theme.fieldText]}
                  />
  
                  <Text
                      style={{
                          position: "absolute",
                          left: 12,
                      }}
                  >
                      <FontsIcons name="barcode"  size={22} color={colors.greyDark} />
  
                  </Text>
              </View>
  
              {selectedTab == 0 && (
                <View style={[theme.formGroupView]}>
                    <TextInput
                        placeholder='Ajouter une photo'
                        placeholderTextColor={colors.greyDark}
                        style={[theme.fieldText]}
                    />
  
                    <Text
                        style={{
                            position: "absolute",
                            left: 12,
                        }}
                    >
                        <FontsIcons name="file" size={22} color={colors.greyDark} />
  
                    </Text>
                </View>
                )
              }
              <View style={[theme.formGroupView]}>
                  <TextInput
                      placeholder='Description'
                      placeholderTextColor={colors.greyDark}
                      style={[theme.fieldText]}
                  />
  
                  <Text
                      style={{
                          position: "absolute",
                          left: 12,
                      }}
                  >
                      <FontsIcons name="message" size={22} color={colors.greyDark} />
  
                  </Text>
              </View>
  
            </View>
  
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center',
              }}
            >
              <FontsIcons name="map" size={25} />
  
              <Text style={{
                fontSize: 20, 
                fontWeight: '800', 
                color: colors.secondary,
                marginLeft: 10
                }}
              >
                {selectedTab == 0 ? "Ou l'avez vous trouvé" : "Ou l'avez vous perdu"} 
              </Text>
            </View>
  
            <View style={{
              marginTop: 15,
              marginBottom: 25
            }}>
  
              <View style={[theme.formGroupView]}>
                  <TextInput
                      placeholder='Ville, commune ...etc'
                      placeholderTextColor={colors.greyDark}
                      style={[theme.fieldText]}
                  />
  
                  <Text
                      style={{
                          position: "absolute",
                          left: 12,
                      }}
                  >
                      <FontsIcons name="location-crosshairs" size={22} color={colors.greyDark} />
  
                  </Text>
              </View>
  
            </View>
  
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center',
              }}
            >
              <FontsIcons name="location-pin" size={25} />
  
              <Text style={{
                fontSize: 20, 
                fontWeight: '800', 
                color: colors.secondary,
                marginLeft: 10
                }}
              >
                  Comment vous joindre
              </Text>
            </View>
  
            <View style={{
              marginTop: 15,
              marginBottom: 25
            }}>
  
              <View style={[theme.formGroupView]}>
                  <TextInput
                      placeholder='Quel votre nom'
                      placeholderTextColor={colors.greyDark}
                      style={[theme.fieldText]}
                  />
  
                  <Text
                      style={{
                          position: "absolute",
                          left: 12,
                      }}
                  >
                      <FontsIcons name="user" size={22} color={colors.greyDark} />
  
                  </Text>
              </View>
  
              <View style={[theme.formGroupView]}>
                  <TextInput
                      placeholder='Numéro téléphone'
                      placeholderTextColor={colors.greyDark}
                      style={[theme.fieldText]}
                  />
  
                  <Text
                      style={{
                          position: "absolute",
                          left: 12,
                      }}
                  >
                      <FontsIcons name="phone" size={22} color={colors.greyDark} />
  
                  </Text>
              </View>
  
              <View style={[theme.formGroupView]}>
                  <TextInput
                      placeholder='Numéro whatSapp'
                      placeholderTextColor={colors.greyDark}
                      style={[theme.fieldText]}
                  />
  
                  <Text
                      style={{
                          position: "absolute",
                          left: 12,
                      }}
                  >
                      <FontsIcons name="whatsapp" size={22} color={colors.greyDark} />
  
                  </Text>
              </View>
  
            </View>
  
            <TouchableOpacity
            style={[theme.btnTouch,{
              borderColor: colors.primary,
              backgroundColor: colors.primary,
              borderRadius: 40,
            }]}
          >
            <Text style={{ 
              fontSize: 18, 
              color: 'white',
              fontFamily: 'Quicksand-Medium'
              }}
            >
                Je céé ma déclaration
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
}

export default RegisterObjectScreen