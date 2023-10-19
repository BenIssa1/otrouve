import React from 'react'
import {
    Text,
    View,
    TextInput,
    TouchableOpacity, ScrollView,SafeAreaView,FlatList
  } from 'react-native';
import FontsIcons from 'react-native-vector-icons/FontAwesome6'
import { colors, theme } from '../assets/styles/theme';

function ObjectFoundScreen({ navigation }) {

    const DATA = [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'CNI',
        active: 1
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Carte sclaire',
        active: 0
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Passport',
        active: 0
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d73',
        title: 'Permis',
        active: 0
      },
    ];
    
  
      return (
        <SafeAreaView style={{ 
          flex: 1,
          marginHorizontal: 15  
          }}
        >
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 20
            }}
          >
            <TouchableOpacity style={{ 
              width: 40,
              height: 40,
              alignItems:'center',
              justifyContent: 'center',
              borderRadius: 20,
              backgroundColor: colors.gray
            }}
  
            onPress={() => {
              navigation.goBack()
            }}
            >
              <FontsIcons name="chevron-left" size={25} />
            </TouchableOpacity>
  
            <Text style={{
              fontSize: 20, 
              fontWeight: '800', 
              color: 'black',
              marginLeft: 60
              }}
            >
              Objets trouvé
            </Text>
          </View>
      
          <View style={{ 
             flexDirection: 'row',
             marginBottom: 25
            }}
          >
            <View style={[{
                  flexGrow: 1,
                  height: 55,
                  borderColor: colors.gray,
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 50,
              },]}>
                  <TextInput
                      placeholder='Rechercher par le nom'
                      placeholderTextColor={colors.greyDark}
                      style={[theme.fieldText]}
                  />
  
                  <Text
                      style={{
                          position: "absolute",
                          left: 12,
                      }}
                  >
                    <FontsIcons name="pen" size={22} color={'black'} />
                  </Text>
            </View>
  
            <View style={{
              width: 55,
              height: 55,
              borderColor: colors.primary,
              backgroundColor: colors.primary,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 8
              }}>
                 <FontsIcons name="xmark" size={23} color={colors.white} />
            </View>
          </View>
  
          <View style={{ 
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 40
            }}
          >
            <View style={{ 
              flexDirection: 'row'
              }}
            >
              <Text style={{
                fontSize: 20, 
                fontWeight: '800', 
                color: 'black',
                
                }}
              >
                Filtre : 
              </Text>
  
              <FontsIcons 
                style={{marginLeft: 15}} 
                name="filter" 
                size={25} 
                color={'black'} 
              />
            </View>
  
            <FlatList
              data={DATA}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <TouchableOpacity
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  borderColor: item.active == 1 ?  colors.primary : colors.gray,
                  borderWidth: 1,
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: item.active == 1 ? colors.primary  : colors.gray,
                  marginLeft: 8
                }}
              >
                <Text style={{ 
                  fontSize: 18, 
                  color: item.active == 1 ? 'white' : 'black',
                  fontFamily: 'Quicksand-Medium'
                  }}
                >
                    {item.title}
                  </Text>
              </TouchableOpacity>
              ) }
              keyExtractor={item => item.id}
            />
  
          </View>
  
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ 
              borderBottomColor: colors.orange,
              borderBottomWidth: 5,
              paddingBottom: 15,
              paddingHorizontal: 20,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              marginBottom: 30
              }}
            >
              <View style={{ 
                flexGrow: 1
                }}
              >
                <Text style={{
                  fontSize: 18, 
                  color: 'black',
                  }}
                >
                  ID : CI22GGDDS
                </Text>
  
                <View style={{ 
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5
                  }}
                >
                <Text style={{
                  flexGrow: 1,
                  fontSize: 25, 
                  fontWeight: '800', 
                  color: 'black',
                  }}
                >
                  Kakou Brice
                </Text>
  
                <TouchableOpacity
                  style={{
                    paddingVertical: 3,
                    paddingHorizontal: 12,
                    borderColor:  colors.primary ,
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.primary  ,
                    marginRight: 20
                  }}
                >
                  <Text style={{ 
                    fontSize: 15, 
                    fontWeight: '800',
                    color: colors.white ,
                    fontFamily: 'Quicksand-Medium'
                    }}
                  >
                    Trouvé
                  </Text>
                </TouchableOpacity>
                </View>
  
                <View style={{ 
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 8
                  }}
                >
                  <TouchableOpacity
                    style={{
                      paddingVertical: 3,
                      paddingHorizontal: 12,
                      borderColor:  'blue' ,
                      borderWidth: 1,
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: colors.white  ,
                    }}
                  >
                    <Text style={{ 
                      fontSize: 14, 
                      color: 'blue' ,
                      fontFamily: 'Quicksand-Medium'
                      }}
                    >
                      CNI
                    </Text>
                  </TouchableOpacity>
  
                  <Text style={{
                    fontSize: 18, 
                    color: 'black',
                    marginLeft: 10
                    }}
                  >
                    Trouvé le 21/09/2023
                  </Text>
                </View>
              </View>
  
            </View>
            <View style={{ 
              borderBottomColor: colors.orange,
              borderBottomWidth: 5,
              paddingBottom: 15,
              paddingHorizontal: 20,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              marginBottom: 30
              }}
            >
              <View style={{ 
                flexGrow: 1
                }}
              >
                <Text style={{
                  fontSize: 18, 
                  color: 'black',
                  }}
                >
                  ID : CI22GGDDS
                </Text>
  
                <View style={{ 
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5
                  }}
                >
                <Text style={{
                  flexGrow: 1,
                  fontSize: 25, 
                  fontWeight: '800', 
                  color: 'black',
                  }}
                >
                  Kakou Brice
                </Text>
  
                <TouchableOpacity
                  style={{
                    paddingVertical: 3,
                    paddingHorizontal: 12,
                    borderColor:  colors.primary ,
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.primary  ,
                    marginRight: 20
                  }}
                >
                  <Text style={{ 
                    fontSize: 15, 
                    fontWeight: '800',
                    color: colors.white ,
                    fontFamily: 'Quicksand-Medium'
                    }}
                  >
                    Trouvé
                  </Text>
                </TouchableOpacity>
                </View>
  
                <View style={{ 
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 8
                  }}
                >
                  <TouchableOpacity
                    style={{
                      paddingVertical: 3,
                      paddingHorizontal: 12,
                      borderColor:  'blue' ,
                      borderWidth: 1,
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: colors.white  ,
                    }}
                  >
                    <Text style={{ 
                      fontSize: 14, 
                      color: 'blue' ,
                      fontFamily: 'Quicksand-Medium'
                      }}
                    >
                      CNI
                    </Text>
                  </TouchableOpacity>
  
                  <Text style={{
                    fontSize: 18, 
                    color: 'black',
                    marginLeft: 10
                    }}
                  >
                    Trouvé le 21/09/2023
                  </Text>
                </View>
              </View>
  
            </View>
            <View style={{ 
              borderBottomColor: colors.orange,
              borderBottomWidth: 5,
              paddingBottom: 15,
              paddingHorizontal: 20,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              marginBottom: 30
              }}
            >
              <View style={{ 
                flexGrow: 1
                }}
              >
                <Text style={{
                  fontSize: 18, 
                  color: 'black',
                  }}
                >
                  ID : CI22GGDDS
                </Text>
  
                <View style={{ 
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5
                  }}
                >
                <Text style={{
                  flexGrow: 1,
                  fontSize: 25, 
                  fontWeight: '800', 
                  color: 'black',
                  }}
                >
                  Kakou Brice
                </Text>
  
                <TouchableOpacity
                  style={{
                    paddingVertical: 3,
                    paddingHorizontal: 12,
                    borderColor:  colors.primary ,
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.primary  ,
                    marginRight: 20
                  }}
                >
                  <Text style={{ 
                    fontSize: 15, 
                    fontWeight: '800',
                    color: colors.white ,
                    fontFamily: 'Quicksand-Medium'
                    }}
                  >
                    Trouvé
                  </Text>
                </TouchableOpacity>
                </View>
  
                <View style={{ 
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 8
                  }}
                >
                  <TouchableOpacity
                    style={{
                      paddingVertical: 3,
                      paddingHorizontal: 12,
                      borderColor:  'blue' ,
                      borderWidth: 1,
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: colors.white  ,
                    }}
                  >
                    <Text style={{ 
                      fontSize: 14, 
                      color: 'blue' ,
                      fontFamily: 'Quicksand-Medium'
                      }}
                    >
                      CNI
                    </Text>
                  </TouchableOpacity>
  
                  <Text style={{
                    fontSize: 18, 
                    color: 'black',
                    marginLeft: 10
                    }}
                  >
                    Trouvé le 21/09/2023
                  </Text>
                </View>
              </View>
  
            </View>
            <View style={{ 
              borderBottomColor: colors.orange,
              borderBottomWidth: 5,
              paddingBottom: 15,
              paddingHorizontal: 20,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              marginBottom: 30
              }}
            >
              <View style={{ 
                flexGrow: 1
                }}
              >
                <Text style={{
                  fontSize: 18, 
                  color: 'black',
                  }}
                >
                  ID : CI22GGDDS
                </Text>
  
                <View style={{ 
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5
                  }}
                >
                <Text style={{
                  flexGrow: 1,
                  fontSize: 25, 
                  fontWeight: '800', 
                  color: 'black',
                  }}
                >
                  Kakou Brice
                </Text>
  
                <TouchableOpacity
                  style={{
                    paddingVertical: 3,
                    paddingHorizontal: 12,
                    borderColor:  colors.primary ,
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.primary  ,
                    marginRight: 20
                  }}
                >
                  <Text style={{ 
                    fontSize: 15, 
                    fontWeight: '800',
                    color: colors.white ,
                    fontFamily: 'Quicksand-Medium'
                    }}
                  >
                    Trouvé
                  </Text>
                </TouchableOpacity>
                </View>
  
                <View style={{ 
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 8
                  }}
                >
                  <TouchableOpacity
                    style={{
                      paddingVertical: 3,
                      paddingHorizontal: 12,
                      borderColor:  'blue' ,
                      borderWidth: 1,
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: colors.white  ,
                    }}
                  >
                    <Text style={{ 
                      fontSize: 14, 
                      color: 'blue' ,
                      fontFamily: 'Quicksand-Medium'
                      }}
                    >
                      Carte scolaire
                    </Text>
                  </TouchableOpacity>
  
                  <Text style={{
                    fontSize: 18, 
                    color: 'black',
                    marginLeft: 10
                    }}
                  >
                    Trouvé le 21/09/2023
                  </Text>
                </View>
              </View>
  
            </View>
            <View style={{ 
              borderBottomColor: colors.orange,
              borderBottomWidth: 5,
              paddingBottom: 15,
              paddingHorizontal: 20,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              marginBottom: 30
              }}
            >
              <View style={{ 
                flexGrow: 1
                }}
              >
                <Text style={{
                  fontSize: 18, 
                  color: 'black',
                  }}
                >
                  ID : CI22GGDDS
                </Text>
  
                <View style={{ 
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5
                  }}
                >
                <Text style={{
                  flexGrow: 1,
                  fontSize: 25, 
                  fontWeight: '800', 
                  color: 'black',
                  }}
                >
                  Kakou Brice
                </Text>
  
                <TouchableOpacity
                  style={{
                    paddingVertical: 3,
                    paddingHorizontal: 12,
                    borderColor:  colors.primary ,
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.primary  ,
                    marginRight: 20
                  }}
                >
                  <Text style={{ 
                    fontSize: 15, 
                    fontWeight: '800',
                    color: colors.white ,
                    fontFamily: 'Quicksand-Medium'
                    }}
                  >
                    Trouvé
                  </Text>
                </TouchableOpacity>
                </View>
  
                <View style={{ 
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 8
                  }}
                >
                  <TouchableOpacity
                    style={{
                      paddingVertical: 3,
                      paddingHorizontal: 12,
                      borderColor:  'blue' ,
                      borderWidth: 1,
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: colors.white  ,
                    }}
                  >
                    <Text style={{ 
                      fontSize: 14, 
                      color: 'blue' ,
                      fontFamily: 'Quicksand-Medium'
                      }}
                    >
                      CNI
                    </Text>
                  </TouchableOpacity>
  
                  <Text style={{
                    fontSize: 18, 
                    color: 'black',
                    marginLeft: 10
                    }}
                  >
                    Trouvé le 21/09/2023
                  </Text>
                </View>
              </View>
  
            </View>
          </ScrollView>
        </SafeAreaView>
      );
}
export default ObjectFoundScreen