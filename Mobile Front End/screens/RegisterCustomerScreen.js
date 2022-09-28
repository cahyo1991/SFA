
import React, { useState,useEffect,useCallback } from 'react'
import {View,Text,StyleSheet,Image, ImageBackground,SafeAreaView,ActivityIndicator} from 'react-native'
// import NetInfo from "@react-native-community/netinfo";

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import BottomNavigation from '../components/BottomNavigation'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context';
import LinearGradient from 'react-native-linear-gradient';
import PieChart from 'react-native-pie-chart';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input,Button  } from 'react-native-elements';
import BoxPending from '../components/BoxPending';
import { useNavigation } from '@react-navigation/core';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
function RegisterCustomerScreen (props) {


const {navigate} = useNavigation();
const [ImageUri,SetImageUri] = useState('');
const [ImageType, setImageType] = useState('');
const [ImageFileName, setImageFileName] = useState('');
const [ImageStatus, setImageStatus] = useState(false);
const openGallery = () => {
    const options = {
    storageOptions: {
    path: 'movies'
    
    },
    mediaType: 'photo',
    includeBase64: true,
    };
    
    launchImageLibrary({
      mediaType:'photo',
      maxWidth:600,
      maxHeight:800
    }, response => {
    console.log('Response = ', response);
    if (response.didCancel) {
    console.log('User cancelled image picker');
    } else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
    } else {


    console.log("Uri Asset = " + response.assets[0]['uri'] );
    // this.setState({
    //   uri : response.assets[0]['uri'],
    //   type : response.assets[0]['type'],
    //   fileName : response.assets[0]['fileName'],
    //   StatusImage : true
    // })
    SetImageUri(response.assets[0]['uri']);
    setImageType(response.assets[0]['type']);
    setImageFileName(response.assets[0]['fileName'])
    setImageStatus(true);
    

    }
    });
    };



        return (
            <View style={{flex:1}}>
                
                <LinearGradient colors={['#0b1013', '#101416', '#5d5e5e']}
               style={{
                   flex:1,
                   flexDirection:'row'
               }}>

                   <View style={{flex:1,padding:20,justifyContent:'center'}}>
                       <Text style={{color:'white',fontSize:22,fontWeight:'bold'}}>
                       Click the button below to register a new customer
                       </Text>
                       <Button
                       onPress={()=>{
                        navigate("NewCustomerScreen",{
                            // PamCode : 
                            PamCode : props.Code,
                            Token : props.Token
                        })
                       }}
                       title="REGISTER NEW CUSTOMER"
                       titleStyle={{
                           fontSize:17
                       }}
                       buttonStyle={{
                           marginTop:20
                       }}
                       />
                   </View>
                   <View style={{flex:1,justifyContent:'center'}}>
                   <Icon 
                name="edit" 
                color="white"
                size={120}
                style={{
                    
                    alignSelf:'center'
                }}
                />
                   </View>
                   

                   </LinearGradient>

                
                <View style={{flex:2}}>
                    <View style={ [{height:50,borderBottomWidth:1,padding:10,flexDirection:'row',borderBottomColor:'grey'}]}>
                    <Icon 
                name="safari" 
                color="grey"
                size={25}
                style={{
                    
                    // alignSelf:'center'
                }}
                />
                <Text style={{marginLeft:10,fontSize:17,color:'grey',marginTop:2}}>List New Customer Approval </Text>



                    </View>
                    <View style={{flex:1,marginTop:10,padding:5}}>
                        <ScrollView>

                        {
                        props.ListPendingCustomer.map((item,key)=>(
                        <BoxPending Name={item.CustomerName} Status="pending" key={key}
                        Images = {item.Images}
                        Id = {item.IdCustomer}
                        Date = {item.Date}
                        Time = {item.Time}
                        StatusApproval = {item.StatusApproval}
                        CodeStatus = {item.CodeStatus}
                        />
                        ))
                    }
                        </ScrollView>
                    </View>
                </View>
            </View>
        )
    }

const Styles = StyleSheet.create({
    boxShadow : {
      backgroundColor:'white',flex:1,shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      
      elevation: 5,
    }
  })
  
export default RegisterCustomerScreen
