import React, { useState} from 'react'
import {
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity, ScrollView,SafeAreaView,
  } from 'react-native';
import FontsIcons from 'react-native-vector-icons/FontAwesome6'
import { colors, theme } from '../assets/styles/theme';

function SigninScreen({ navigation }) {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
  
    return (
      <SafeAreaView style={{ flex: 1}}>
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={{
             marginHorizontal: 22 
          }}>
  
          <View style={{ alignItems: 'center'}}>
            <Image
              source={require('../assets/images/authenticate.png')}
              style={{
                resizeMode: 'cover',
                height: 160, 
                width: 160,
                marginTop: 50, 
                marginBottom: 60, 
                borderRadius: 20
              }}
            />
          </View>
            
          <Text style={[{
            fontSize: 30, 
            fontWeight: 'bold', 
            marginBottom: 10,
            }, theme.textFontBold, colors.secondary]}
          >
            Connexion
          </Text>
          
          <View style={{ marginBottom: 60 }}>
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
                  secureTextEntry={isPasswordShown}
                  placeholderTextColor={colors.greyDark}
                  style={[theme.fieldText]}
                />
  
                <TouchableOpacity
                  onPress={() => setIsPasswordShown(!isPasswordShown)}
                  style={{
                    position: "absolute",
                    right: 12,
                    fontFamily: 'Quicksand-Medium'
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
                  <FontsIcons name="lock" size={22} color={colors.greyDark} />
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
            <Text style={{ 
              fontSize: 18, 
              color: 'white',
              fontFamily: 'Quicksand-Medium'
              }}
            >
                Connexion
              </Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            style={[{
              borderColor: colors.primary,
            }, theme.btnTouch]}
            onPress={() => {
              navigation.navigate('Signup')
            }}
          >
            <Text style={{ 
              fontSize: 18, 
              color: colors.primary,
              fontFamily: 'Quicksand-Medium'
              }}
            >
              Créer un compte
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
}

export default SigninScreen