import { useNavigation } from '@react-navigation/core'
import React, { useState,useEffect  } from 'react'
import {View,Text,StyleSheet,Image} from 'react-native'
import BottomNavigation from '../components/BottomNavigation'
import { Input,Button  } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import BoxCall from '../components/BoxCall';
import {Picker} from '@react-native-community/picker';
import BoxPlan from '../components/BoxPlan';

function ListPlanScreen(props) {
        const {navigate} = useNavigation();
        const [WeekSelected,SetWeekSelected] = useState('');
        
    return (
        <View style={{flex:1}}>
                
                 <View style={{height:50,backgroundColor:'#00a0e0',justifyContent:'center',paddingLeft:10}}>
                     <Text style={{color:'white',fontSize:14,fontWeight:'bold'}}>Total Plan :
                     
                      {props.TotalPlan}  </Text>
                 </View>
        <View style={{flex:1,padding:5}}>
    <ScrollView>
        
    {
                        props.ListPlan.map((item,key)=>(
    <BoxPlan Name={item.CustomerName} OutletName={item.OutletName} TimePlan={item.Date + " | " + item.Time} CustomerId={item.IdCustomer} key={key}
    StatusPlanCall={item.StatusPlanCall}
    Images = {item.Images}
    Status = {item.Status}
    StatusName = {item.StatusName}
    IdPlan = {item.IdPlan}
    Token = {item.Token}
    PamCode = {item.PamCode}
    />
    ))
}
  


               
    </ScrollView>
</View>
<View style={{height:70,paddingLeft:10,paddingRight:10}}>
<Button
onPress={
    ()=>{
        navigate("ScheduleScreen",{
            // PamCode : 
            PamCode : props.Code,
            Token : props.Token,
            IdWeek : props.IdWeek
        })
    }
}
icon={
<Icon
name="plus"
size={15}
color="white"
/>
}
buttonStyle={{
height:50,
backgroundColor:'#00a0e0',
borderRadius:20
}}
title="   Add Plan Schedule"
/>

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
export default ListPlanScreen
