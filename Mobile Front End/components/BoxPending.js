import React from 'react'
import { useNavigation } from '@react-navigation/core'
import {View,Text,StyleSheet,Image} from 'react-native'
import BottomNavigation from '../components/BottomNavigation'
import { Input,Button  } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
function BoxPending(props) {
    const IconCustomer = props.CodeStatus == "2" || props.CodeStatus == "3" || props.CodeStatus == "4" ? "exclamation-circle"  : "remove";
    const ColorCustomer =  props.CodeStatus == "2" || props.CodeStatus == "3" || props.CodeStatus == "4" ? "orange" : "red";
    const {navigate} = useNavigation();
    const Images = props.Images == "-" ? "doctor.jpg" :props.Images;
    return (
<View style={{}}>
 
 {/* list customer call */}
 <View style={[Styles.boxShadow, {borderBottomLeftRadius:10,borderBottomRightRadius:10, height:100,flexDirection:'row',padding:5,backgroundColor:'white',marginBottom:10}]}>
                        <View style={{flex:1,justifyContent:'center'}}>
                        <Image 
                         source={{uri:global.ApiImage+"/Customer/" + Images}} 
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
                            <Text style={{textAlign:'left',fontWeight:'700',fontSize:15,color:'#172127'}}>{props.Name}</Text>
                            </View>
                            <View style={{flex:1,    flexDirection: 'row',}}>
                            <Icon
    name='newspaper-o'
    size={18}
    color='grey'
  />
  <Text style={{marginLeft:5,fontSize:12}}>{props.Id}  </Text>
  <Icon 
    name='calendar'
    size={18}
    color='grey'
    style={{
        marginLeft:10
    }}
  />
  <Text style={{marginLeft:5,fontSize:12}}>{props.Date} | {props.Time}</Text>
  
                            </View>
                        </View>
                        <View style={{flex:1,justifyContent:'center',backgroundColor:ColorCustomer}}>
                        
                        <Icon
    name={IconCustomer}
    size={30}
    color='white'
    style={{
        // marginLeft:10
        textAlign:'center'
    }}
  />

  <Text style={{color:'white',textAlign:'center'}}>{props.StatusApproval.toUpperCase()}</Text>
                        </View>
                </View>
                {/* close list customer call */}


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
        shadowOpacity: 0,
        shadowRadius: 10,
        
        elevation: 3,
      }
})

export default BoxPending
