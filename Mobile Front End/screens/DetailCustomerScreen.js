import React from 'react'
import { StyleSheet, Text, View,ImageBackground } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderBack from '../components/HeaderBack';
import {Picker} from '@react-native-community/picker';
import { Input,Button  } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';

function DetailCustomerScreen() {
    const navigation = useNavigation();
    const {navigate} = useNavigation();
    return (
<View style={{flex:1}}>
        <HeaderBack Name="Detail Customer" navigation={navigation}/>
        <View style={{
            height:140,
            
        }}>
            <View style={[{flex:1}]}>
            <ImageBackground source={{uri:global.ApiIMage+"Images/Asset/bg_profile.jpg"}} 
                   style={{
                    flex: 1,
                    justifyContent: "center",
                    // flexDirection:'row',
                    padding:5,
                    borderRadius:5
                   }}
                   resizeMode="cover"
                   >
                       <Text style={{color:'white',fontSize:15,fontWeight:'bold',textAlign:'right'}}>dr. Ali Sungkar Sp.OG (K)</Text>
                       </ImageBackground>
                       
            </View>
            <View style={{flex:1}}>
                <View style={{flex:1,flexDirection:'row',justifyContent:"flex-end",padding:5}}>
            <Icon
name='newspaper-o'
size={18}
color='grey'
/> 
<Text style={{marginLeft:5,fontSize:13}}>50734</Text>
            </View>
        </View>
        </View>

<View style={{flex:1,padding:5,marginTop:-30}}>
<View style={{flex:1,backgroundColor:'white',padding:5}}>
    <ScrollView>
        <View style={{height:50,flexDirection:'row',marginBottom:10}}>
            <View style={{flex:1,borderBottomWidth:0.5}}>
                <Text style={{fontSize:12}}>Gender</Text>
                <Text style={{fontSize:15,marginLeft:10,marginTop:4}}>Male</Text>
            </View>
            <View style={{width:20}}></View>
            <View style={{flex:1,borderBottomWidth:0.5}}>
                <Text style={{fontSize:12}}>Birthdate</Text>
                <Text style={{fontSize:15,marginLeft:10,marginTop:4}}>13 December 1991</Text>
            </View>
        </View>
        <View style={{height:50,flexDirection:'row',marginBottom:10}}>
            <View style={{flex:1,borderBottomWidth:0.5}}>
                <Text style={{fontSize:12}}>Customer Type</Text>
                <Text style={{fontSize:15,marginLeft:10,marginTop:4}}>Scientific</Text>
            </View>
            <View style={{width:20}}></View>
            <View style={{flex:1,borderBottomWidth:0.5}}>
                <Text style={{fontSize:12}}>Specialty</Text>
                <Text style={{fontSize:15,marginLeft:10,marginTop:4}}>OBG</Text>
            </View>
        </View>
        <View style={{height:50,flexDirection:'row',marginBottom:10}}>
            <View style={{flex:1,borderBottomWidth:0.5}}>
                <Text style={{fontSize:12}}>Email</Text>
                <Text style={{fontSize:15,marginLeft:10,marginTop:4}}>ali.sungkar@gmail.com</Text>
            </View>
            <View style={{width:20}}></View>
            <View style={{flex:1,borderBottomWidth:0.5}}>
                <Text style={{fontSize:12}}>Phone</Text>
                <Text style={{fontSize:15,marginLeft:10,marginTop:4}}>081398483777</Text>
            </View>
        </View>
        <View style={{height:50,flexDirection:'row',marginBottom:10}}>
            <View style={{flex:1,borderBottomWidth:0.5}}>
                <Text style={{fontSize:12}}>Segmentation</Text>
                <Text style={{fontSize:15,marginLeft:10,marginTop:4}}>Retention</Text>
            </View>
            <View style={{width:20}}></View>
            <View style={{flex:1,borderBottomWidth:0.5}}>
                <Text style={{fontSize:12}}>Visit Per Month</Text>
                <Text style={{fontSize:15,marginLeft:10,marginTop:4}}>4 x</Text>
            </View>
        </View>
        <Text style={{marginTop:10,fontSize:20,fontWeight:'bold'}}>Outlet Information</Text>
        <View style={{height:50,flexDirection:'row',marginBottom:10,marginTop:20}}>
            <View style={{flex:1,borderBottomWidth:0.5}}>
                <Text style={{fontSize:12}}>Outlet Name 1</Text>
                <Text style={{fontSize:15,marginLeft:10,marginTop:4}}>RS. Fatmawati</Text>
            </View>
            <View style={{width:20}}></View>
            <View style={{flex:1,borderBottomWidth:0.5}}>
                <Text style={{fontSize:12}}>Area 1</Text>
                <Text style={{fontSize:15,marginLeft:10,marginTop:4}}>Jakarta</Text>
            </View>
        </View>
        <View style={{height:50,flexDirection:'row',marginBottom:10,}}>
            <View style={{flex:1,borderBottomWidth:0.5}}>
                <Text style={{fontSize:12}}>Outlet Name 2</Text>
                <Text style={{fontSize:15,marginLeft:10,marginTop:4}}>RSUP Pasar Minggu</Text>
            </View>
            <View style={{width:20}}></View>
            <View style={{flex:1,borderBottomWidth:0.5}}>
                <Text style={{fontSize:12}}>Area 2</Text>
                <Text style={{fontSize:15,marginLeft:10,marginTop:4}}>Jakarta</Text>
            </View>
        </View>
        <View style={{height:50,flexDirection:'row',marginBottom:10,}}>
            <View style={{flex:1,borderBottomWidth:0.5}}>
                <Text style={{fontSize:12}}>Outlet Name 3</Text>
                <Text style={{fontSize:15,marginLeft:10,marginTop:4}}>RS Marinir Cilandak</Text>
            </View>
            <View style={{width:20}}></View>
            <View style={{flex:1,borderBottomWidth:0.5}}>
                <Text style={{fontSize:12}}>Area 3</Text>
                <Text style={{fontSize:15,marginLeft:10,marginTop:4}}>Jakarta</Text>
            </View>
        </View>

<View style={{marginTop:50,height:50,flexDirection:'row'}}>
    <View style={{flex:1}}></View>
    <View style={{flex:1,flexDirection:'row'}}>
    <View style={{flex:1,backgroundColor:'red',justifyContent:'center',flexDirection:'row'}}>
    
    <Icon
name='trash'
size={20}
color='white'
style={{marginRight:10,marginTop:10}}
/> 
        <Text style={{color:'white',fontSize:17,textAlign:'center',marginTop:10}}>Delete</Text>
    </View>
    <View style={{width:10}}></View>

    <View style={{flex:1,backgroundColor:'#00a0e0',justifyContent:'center',flexDirection:'row'}}>
    <TouchableOpacity style={{flexDirection:'row'}}
    onPress={
        ()=>{
            navigate("NewCustomerScreen")
        }
    }
    >
    <Icon
name='edit'
size={20}
color='white'
style={{marginRight:10,marginTop:10}}
/> 
        <Text style={{color:'white',fontSize:17,textAlign:'center',marginTop:10}}>Update</Text>
        </TouchableOpacity>
    </View>
    </View>
    <View style={{flex:1}}></View>
</View>

    </ScrollView>
</View>
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

export default DetailCustomerScreen
