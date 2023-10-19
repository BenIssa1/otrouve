import React from 'react'
import {
    Text,
    View,
    Image,
    TouchableOpacity,SafeAreaView,
  } from 'react-native';
import FontsIcons from 'react-native-vector-icons/FontAwesome6'
import { colors, theme } from '../assets/styles/theme';

function WelcomeScreen({ navigation }) {
    return (
      <SafeAreaView style={[{ 
        flex: 1, 
        marginVertical: 50,
        }, theme.container]}
      >
        <View style={{ 
         position: 'absolute',
         top: -25,
         left: 15
        }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Signup')
            }}
          >
            <FontsIcons name="user" size={25} />
          </TouchableOpacity>
        </View>
      
        <View style={{ 
          flex: 1,
          alignItems: 'center' 
          }}
        >
          
          <Text style={[{
            fontSize: 23, 
            fontWeight: '800', 
            color: colors.textPrimary, 
            }, theme.textFontBold]}
          >
            OTROUVE
          </Text>
  
          <Text style={[{
            fontSize: 18, 
            marginTop: 7, 
            color: colors.textPrimary, 
            width: 300, 
            textAlign: 'center', 
            lineHeight: 25,
            }, theme.textFont]}
          >
            Retrouver vos objectifs perdus devient plus facile.
          </Text>
  
          <Image
            source={require('../assets/images/explorator.png')}
            style={{
              height: 120,
              width: 120, 
              marginTop: 8, 
              borderRadius: 20
            }}
          />
        </View>
  
        <View style={[{ 
          flex: 1,
          marginTop: 15 
          }, theme.centerBox]}
        >
          <TouchableOpacity style={{ 
            backgroundColor: colors.orangeLigth, 
            borderRadius: 10, 
            alignItems: 'center', 
            paddingVertical: 8,
            width: '100%'
            }}
  
            onPress={() => {
              navigation.navigate('RegisterObject')
            }}
          >
            <Image
              source={
                require('../assets/images/lost_or_find_object.png')
              }
              style={{
                height: 100,
                width: 100,
                marginTop: 20, 
                borderRadius: 20
              }}
            />
  
            <Text style={[{
              fontSize: 20, 
              fontWeight: 'bold', 
              marginTop: 15, 
              color: 'black',
              }, theme.textFontBold]}
            >
              J'ai perdu / J'ai retouvé
            </Text>
          </TouchableOpacity>
  
        </View>
  
        <View style={[{ 
          flex: 1,
          }, theme.centerBox]}
        >
          
          <TouchableOpacity style={{ 
            backgroundColor: colors.greenLigth, 
            borderRadius: 10, 
            alignItems: 'center', 
            paddingVertical: 8,
            width: '100%'
            }}
  
            onPress={() => {
              navigation.navigate('ObjectFound')
            }}
          >
            <Image
              source={
                require('../assets/images/trouv_object.png')
              }
              style={{
                height: 100, 
                width: 100, 
                marginTop: 20, 
                borderRadius: 20
              }}
            />
  
            <Text style={[{
              fontSize: 20, 
              fontWeight: 'bold', 
              marginTop: 15, 
              color: 'black',
              }, theme.textFontBold]}
              >
                Objets trouvés
              </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
}

export default WelcomeScreen