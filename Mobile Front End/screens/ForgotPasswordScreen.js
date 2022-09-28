import React, { useState } from 'react'
import { StyleSheet, Text, View,Alert,BackHandler } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderBack from '../components/HeaderBack';
import {Picker} from '@react-native-community/picker';
import { Input,Button  } from 'react-native-elements';
import HeaderTitle from '../components/HeaderTitle';
import { useNavigation } from '@react-navigation/core';
import Loading from '../components/Loading';

function ForgotPasswordScreen() {
    const navigation = useNavigation();
    const [ShowLoading, setShowLoading] = useState(false);
    const [PamCode, setPamCode] = useState('');

    const showAlert = (Title,Message) =>
    Alert.alert(
      Title,
      Message
    );

    const DoResetPassword = () =>{
      if (PamCode== "") {
        showAlert("Error","Code Cant be Empty !")
      }else{
        ResetPassword();
      }
    }


    const showAlertNoInternet = (Title,Message) =>
    Alert.alert(
      Title,
      Message,
      [
        {
            text: 'OK', 
            onPress: () => BackHandler.exitApp()
          },
      ]
    );

    const   ResetPassword = async () =>{
      setShowLoading(true)
      console.log("PamCode",PamCode)
        const controller = new AbortController();
        setTimeout(()=> controller.abort(), global.TimeOut)
  
          fetch(global.Api + "/Api/ResetPassword?PamCode=" + PamCode,
          {
            "signal": controller.signal,
            method : 'GET'
          }).then((response) => response.json()).
          then(
            data =>{
              setShowLoading(false)
                  // alert(JSON.stringify(data))
                  console.log("Data Product",data);
                  if (data.Status == "1") {
                      showAlert("Success","Password has been successfully reset, please check your email !");
        
                  }else{
                    showAlert("Error",data.Message);
                  }
            } 
          ).catch(
            e=> {
              
              if (e.message == "Aborted") {
                this.showAlert("Error","Poor Connection !");    
              }else{
                this.showAlert("Error",e.message);
              }
              // console.log("catch error fetch =" + e.message)
            })}

    return (
<View style={{flex:1}}>
  {
    ShowLoading ?
    <Loading/>
    : <View></View>
  }
    <HeaderBack Name = "FORGOT PASSWORD" navigation={navigation}/>
    <View style={{height:200,backgroundColor:'white'}}></View>
    <View style={{flex:1,backgroundColor:'white',justifyContent:'center',padding:10}}>
        
    <Icon
name='lock'
size={70}
color='#36434b'
style={{textAlign:'center'}}
/>
<Text style={{fontSize:18,textAlign:'center',fontWeight:'bold'}}>Forgot Password !</Text>
<Text style={{fontSize:15,textAlign:'center',marginTop:10,marginBottom:30}}>Enter Your Code and we will send you new password</Text>
<Input
value={PamCode}
onChangeText={
  res => setPamCode(res)
}
              style={{
                paddingLeft:30,
                fontSize:15,
              }}
        placeholder='Code'
        leftIcon={
          <Icon
            name='user'
            size={20}
            color='#0b1013'
          />
        }
      />
      <View style={{flexDirection:'row',height:50,marginTop:30}}>
            <View style={{flex:1}}></View>
            <View style={{width:150,backgroundColor:'#00a0e0',borderRadius:10,justifyContent:'center'}}>
                <TouchableOpacity
                onPress={
                  ()=>{
                    DoResetPassword()
                  }
                }
                >
                    <Text style={{textAlign:'center',color:'white',fontWeight:'bold'}}>SUBMIT</Text>
                </TouchableOpacity>
            </View>
            <View style={{flex:1}}></View>
      </View>
    </View>
    <View style={{flex:1,backgroundColor:'white'}}></View>
</View>
    )
}

export default ForgotPasswordScreen
