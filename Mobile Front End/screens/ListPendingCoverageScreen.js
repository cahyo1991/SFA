import { useNavigation } from '@react-navigation/core';
import React, { Component } from 'react'
import {View,Text,StyleSheet,Image} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome';
import BoxPendingTerritoryCoverage from '../components/BoxPendingTerritoryCoverage';
import BoxPlan from '../components/BoxPlan';
function ListPendingCoverageScreen(props) {
    const {navigate} = useNavigation();
    return (
        <View style={{flex:1}}>
        <View style={{height:50,marginTop:10,padding:5}}>
         <View style={[ Styles.boxShadow, {flex:1,}]}>
                 <View style={{height:50,backgroundColor:'#00a0e0',justifyContent:'center',paddingLeft:10}}>
                     <Text style={{color:'white',fontSize:14,fontWeight:'bold'}}>Total Pending Coverage : {props.TotalPendingTerritoryCoverage} </Text>
                 </View>
       
         </View>
     </View>
     <View style={{flex:1,marginTop:20,padding:5}}>
         <ScrollView>
         {
                        props.ListPendingTerritoryCoverage.map((item,key)=>(
                            
<BoxPendingTerritoryCoverage
Name={item.CustomerName}
CustomerId ={item.IdCustomer}
Images ={item.Images}
Status = {item.Status}
StatusName = {item.StatusName}
StatusPlanCall={item.Status}
key={key}
IdSegmentation={item.IdSegmentation}
/>
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

export default ListPendingCoverageScreen
