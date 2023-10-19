import React, {useEffect} from 'react'
import {
    Text,
    View,
    Image,
  } from 'react-native';
import { colors, theme } from '../assets/styles/theme';

function HomeScreen({ navigation }) {

    useEffect(() => {
      setTimeout(() => {
        navigation.navigate('Welcome')
      }, 3000);
    }, [])
  
    return (
      <View style={[{ 
        flex: 1, 
        backgroundColor: colors.primary 
        }, theme.centerBox]}
      >
      
        {/* Image */}
        <Image
          source={require('../assets/images/explorer.png')}
          style={{
            height: 150, 
            width: 150, 
            marginTop: 5, 
            borderRadius: 20
          }}
        />
        
        {/* Text */}
        <Text style={[{
          fontSize: 28, 
          fontWeight: 'bold', 
          marginTop: 25, color: colors.white
          }, theme.textFontBold]}
        >
          OTrouve
        </Text>
      </View>
    );
  }

  export default HomeScreen