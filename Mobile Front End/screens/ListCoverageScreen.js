import { useNavigation } from '@react-navigation/core';
import React, { Component } from 'react'
import {View,Text,StyleSheet,Image,TouchableOpacity} from 'react-native'
import { Button } from 'react-native-elements/dist/buttons/Button';
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome';

function ListCoverageScreen(props) {
    const {navigate} = useNavigation();
    return (
        <View style={{flex:1}}>
        <View style={{height:150,marginTop:10,padding:5}}>
         <View style={[ Styles.boxShadow, {flex:1,}]}>
                 <View style={{height:50,backgroundColor:'#00a0e0',paddingLeft:10,flexDirection:'row'}}>
                     <View style={{flex:1,justifyContent:'center'}}>
                     <Text style={{color:'white',fontSize:14,fontWeight:'bold'}}>Total Coverage : {props.TotalCoverage} </Text>
                     </View>
                     <View style={{width:170,justifyContent:'center',padding:5}}>
                         <Button 
                         onPress={
                             ()=>
                             navigate("RegisterCoverageScreen",{
                                 PamCode : props.PamCode,
                                 Token : props.Token
                             })
                         }
                           icon={
                            <Icon
                              name="user-md"
                              size={15}
                              color="white"
                            />
                          }
                         title="  New Coverage"
                         buttonStyle={{
                             backgroundColor:'#0b1013',

                         }}
                         />
                     </View>
                     
                 </View>
                 <View style={{flex:1,flexDirection:'row'}}>
                 {
                        props.ListTotalSegmentation.map((item,key)=>(

                        
                     <View key={key} style={[Styles.boxShadow,{flex:1,borderRightWidth:0.5,padding:5,justifyContent:'center'}]}>
                         <Text style={{textAlign:'center',}}>{item.Visit}x</Text>
                         <Text style={{textAlign:'center',fontSize:17,fontWeight:'bold'}}>{item.Total}</Text>
                         <Text style={{textAlign:'center',}}>{item.Name}</Text>
                     </View>
))}
                 </View>
         </View>
     </View>
     <View style={{flex:1,marginTop:20,padding:5}}>
         <ScrollView>
         {
                        props.ListTerritoryCoverage.map((item,key)=>(
                            <View key={key} style={[Styles.boxShadow, {borderBottomLeftRadius:10,borderBottomRightRadius:10, height:100,flexDirection:'row',padding:5,backgroundColor:'white',marginBottom:10}]}>
                            <View style={{flex:1,justifyContent:'center'}}>
                            <Image source={{uri:global.ApiImage+"Customer/"+item.Images}}
                       style={{
                        width:80,
                        height:80,
                        borderRadius: 80 / 2,
                overflow: "hidden",
                borderWidth: 2,
                borderColor: "#00a0e0",
                alignSelf:'center',
               
                // marginTop:30
                        }}
                       >
               
                       </Image>
                            </View>
                            <View style={{flex:4,}}>
                                <View style={{flex:1}}>
                                <Text style={{textAlign:'left',fontWeight:'700',fontSize:15,color:'#172127'}}>{item.CustomerName}</Text>
                                </View>
                                <View style={{flex:1}}>
                                <Text style={{textAlign:'left',fontWeight:'700',fontSize:12,color:'grey'}}>{item.IdSegmentation}
                                </Text>
                                </View>
                                <View style={{flex:1,    flexDirection: 'row',}}>
                                <Icon
               name='newspaper-o'
               size={18}
               color='grey'
               />
               <Text style={{marginLeft:5,fontSize:12}}>{item.IdCustomer}</Text>
               
               
                                </View>
                            </View>
                            <TouchableOpacity 
                            onPress={
                                ()=>{
                                    navigate("UpdateCustomerScreen",{
                                        TypeView : "1",
                                        IdTerritoryCoverage : item.IdTerritoryCoverage,
                                        PamCode : props.PamCode,
                                        Token : props.Token,
                                        IdCustomer : item.IdCustomer,
                                        _Address : item._Address,
_Child_Birth_1 : item._Child_Birth_1,
_Child_Birth_2 : item._Child_Birth_2,
_Child_Name_1 : item._Child_Name_1,
_Child_Name_2 : item._Child_Name_2,
_CustomerName : item._CustomerName,
_DateOfBirth : item._DateOfBirth,
_DateOfMarriage : item._DateOfMarriage,
_Email : item._Email,
_Hobby : item._Hobby,
_Husban_Wife_Name : item._Husban_Wife_Name,
_Husband_Wife_Birth : item._Husband_Wife_Birth,
_Id : item._Id,
_IdCustomerType : item._IdCustomerType,
_IdDoctorTitles : item._IdDoctorTitles,
_IdReligion : item._IdReligion,
_IdSegmentation : item._IdSegmentation,
_IdSpecialty : item._IdSpecialty,
_Images : item.Images,
_Note : item._Note,
_OutletId_1 : item._OutletId_1,
_OutletId_2 : item._OutletId_2,
_OutletId_3 : item._OutletId_3,
_PhoneNumber : item._PhoneNumber,
_ProvinceCode : item._ProvinceCode,
_OutletName1 : item._OutletName1,
_OutletName2 : item._OutletName2,
_OutletName3 : item._OutletName3
                                    })
                                }
                            }
                            
                            style={{flex:1,justifyContent:'center',}}>
                            
                            <Icon
               name='angle-right'
               size={30}
               color='#0b1013'
               style={{
               // marginLeft:10
               textAlign:'center'
               }}
               />
               
                            </TouchableOpacity>
                    </View>
               
                        ))}


   
   

     

         </ScrollView>
     </View>
 </View>







    )
}

const Styles = StyleSheet.create({
    boxShadow : {
        backgroundColor:'white',shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        
        elevation: 5,
      }
})

export default ListCoverageScreen
