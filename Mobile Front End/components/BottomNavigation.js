import React, { useState, useEffect } from 'react'
import {Platform,StyleSheet,Text,TouchableOpacity,View} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
function BottomNavigation(props) {

    let ColorHome = props.isPage == "Home" ? "black" : "grey"; 
    let ColorCall = props.isPage == "MyCall" ? "black" : "grey"; 
    let ColorCoverage = props.isPage == "Coverage" ? "black" : "grey";
    let ColorProfile = props.isPage == "Profile" ? "black" : "grey";
    return (

        <View style={{height:50,flexDirection:'row',borderTopColor:'grey',borderTopWidth:1,paddingTop:5}}>
        <TouchableOpacity 
        onPress={
            ()=>{
                props.navigate("HomeScreen")
            }
        }
        style={{flex:1,alignItems:'center',justifyContent:'center',}}>
            <View style={{width:30,height:25,}}>
                
                <Icon 
                name="home"
                color={ColorHome}
                size={24}
                style={{
                    
                    alignSelf:'center'
                }}
                />
                
            </View>
            <Text style={{color: ColorHome }}>Home  </Text>
        </TouchableOpacity>
        <TouchableOpacity
              onPress={
                ()=>{
                    props.navigate("MyCallScreen")
                }
            }
        style={{flex:1,alignItems:'center',justifyContent:'center',}}>
            <View style={{width:30,height:25,}}>
    
                <Icon 
                name="phone"
                color={ColorCall}
                size={24}
                style={{
                    
                    alignSelf:'center'
                }}
                />
              
            </View>
            <Text style={{color:ColorCall}}>My Calls</Text>
        </TouchableOpacity>
        <TouchableOpacity 
              onPress={
                ()=>{
                    props.navigate("CoverageScreen")
                }
            } 
        style={{flex:1,alignItems:'center',justifyContent:'center',}}>
            <View style={{width:30,height:25,}}>
  
                <Icon 
                name="street-view"
                color={ColorCoverage}
                size={24}
                style={{
                    
                    alignSelf:'center'
                }}
                />
             
            </View>
            <Text style={{color:ColorCoverage}}>Coverage</Text>
        </TouchableOpacity>
        <TouchableOpacity 
                onPress={
                    ()=>{
                        props.navigate("ProfileScreen")
                    }
                }
        style={{flex:1,alignItems:'center',justifyContent:'center',}}>
            <View style={{width:30,height:25,}}>
      
                <Icon 
                name="user"
                color={ColorProfile}
                size={24}
                style={{
                    
                    alignSelf:'center'
                }}
                />
         
            </View>
            <Text style={{color:ColorProfile}}>Account</Text>
        </TouchableOpacity>
        </View>

    )
}

export default BottomNavigation
