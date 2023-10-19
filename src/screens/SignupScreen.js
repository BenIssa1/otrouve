import React, {useEffect, useState} from 'react'
import {
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity, ScrollView,SafeAreaView
  } from 'react-native';
import FontsIcons from 'react-native-vector-icons/FontAwesome6'
import { colors, screenWidth, theme } from '../assets/styles/theme';


function SignupScreen({ navigation }) {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
  
    return (
      <SafeAreaView style={{ flex: 1}}>
        <View style={[{ 
          flex: 1, 
        }, theme.container]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ alignItems: 'center'}}>
              <Image
                source={require('../assets/images/search.png')}
                style={{
                  height: (screenWidth * 40) / 100, 
                  width: (screenWidth * 40) / 100,
                  marginTop: 30, 
                  marginBottom: 30, 
                  borderRadius: 20
                }}
              />
            </View>
              
            <Text style={[{
              fontSize: 25, 
              marginBottom: 10,
              }, theme.textFontBold, colors.secondary]}
            >
              Créer votre compte
            </Text>
            
            <Text style={[{
              fontSize: 16, 
              marginBottom: 20, 
            }, theme.textFont, colors.secondary]}>
              Pour rejoindre notre groupe de chercheurs d'objets perdus inscrivez-vous maintenant.
            </Text>
            
            <View style={{ marginBottom: 30 }}>
                <View style={[theme.formGroupView]}>
                    <TextInput
                        placeholder='Numéro de téléphone'
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
                      placeholder='Mot de passe'
                      placeholderTextColor={colors.greyDark}
                      secureTextEntry={isPasswordShown}
                      style={[theme.fieldText]}
                  />
  
                    <TouchableOpacity
                      onPress={() => setIsPasswordShown(!isPasswordShown)}
                      style={{
                        position: "absolute",
                        right: 12
                      }}
                    >
                      {
                        isPasswordShown == true ? (
                          <FontsIcons name="eye-slash" size={22} color={colors.greyDark} />
                        ) : (
                          <FontsIcons name="eye" size={22} color={colors.greyDark} />
                        )
                      }
  
                    </TouchableOpacity>
  
                    <Text
                      style={{
                        position: "absolute",
                        left: 12,
                      }}
                    >
                      <FontsIcons name="lock" size={23} color={colors.greyDark} />
                    </Text>
                </View>
  
                <View style={[theme.formGroupView]}>
                    <TextInput
                      placeholder='Confirmer le mot de passe'
                      placeholderTextColor={colors.greyDark}
                      secureTextEntry={isPasswordShown}
                      style={[theme.fieldText]}
                    />
  
                    <TouchableOpacity
                      onPress={() => setIsPasswordShown(!isPasswordShown)}
                      style={{
                        position: "absolute",
                        right: 12
                      }}
                    >
                      {
                        isPasswordShown == true ? (
                          <FontsIcons name="eye-slash" size={22} color={colors.greyDark} />
                        ) : (
                          <FontsIcons name="eye" size={22} color={colors.greyDark} />
                        )
                      }
                    </TouchableOpacity>
  
                    <Text
                      style={{
                        position: "absolute",
                        left: 12,
                      }}
                    >
                      <FontsIcons name="lock" size={23} color={colors.greyDark} />
                    </Text>
                </View>
            </View>
  
            <TouchableOpacity
                style={[{
                  marginBottom: 20,
                  borderColor: colors.primary,
                  backgroundColor: colors.primary,
                }, theme.btnTouch]}
            >
              <Text style={[{ 
                fontSize: 18, 
                color: 'white',
              }, theme.textFont]}
              >
                Je m'inscris
              </Text>
            </TouchableOpacity>
  
            <TouchableOpacity
                style={[{
                  borderColor: colors.primary,
                }, theme.btnTouch]}
                onPress={() => {
                  navigation.navigate('Signin')
                }}
            >
              <Text style={[{ 
                fontSize: 18, 
                color: colors.primary,
                }, theme.textFont]}
              >
                Se connecter
              </Text>
            </TouchableOpacity>
  
          </ScrollView>
        </View>
      </SafeAreaView>
    );
}

export default SignupScreen