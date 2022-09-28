import { useNavigation } from '@react-navigation/core';
import React, { useState,useEffect  } from 'react';
import {Text,View} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context';
function AuthLoginScreen() {
    const {Login,SetLogin} = React.useState();
    const {signIn,signOut} = React.useContext(AuthContext);
    const {navigate} = useNavigation();

    const _retrieveData = async (Name) => {
        try {
          const value = await AsyncStorage.getItem(Name)
          if(value !== null) {
            SetLogin(value);
          }
        } catch(e) {
          // error reading value
        }
      }

    useEffect(()=>{
        
        // AsyncStorage.clear();
        const ValidationSession = async()=>{
          const isLogin  = await AsyncStorage.getItem("IsLogin");
          
          if (isLogin){
            signIn();
          }else{
            signOut();
            navigate('LoginScreen');
          }
        }
        ValidationSession();
      },)
    
    return (
<View style={{flex:1,padding:20}}>
        <Text>Loading ...... </Text>
</View>
    )
}

export default AuthLoginScreen
