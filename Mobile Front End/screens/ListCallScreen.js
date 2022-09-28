import React from 'react'
import {View,Text,StyleSheet,Image} from 'react-native'
import BottomNavigation from '../components/BottomNavigation'
import { Input,Button  } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {Picker} from '@react-native-community/picker';

function ListCallScreen (props){
  
        return (
          
            <View style={{flex:1,padding:5}}>
             

                <View style={{height:50,backgroundColor:'#00a0e0',justifyContent:'center',paddingLeft:10}}>
                     <Text style={{color:'white',fontSize:14,fontWeight:'bold'}}>Total Call :  {props.TotalCall} </Text>
                 </View>


<View style={{flex:1,padding:5,marginTop:10}}>
  <ScrollView>
       {/* list customer call */}

       {
                        props.ListCall.map((item,key)=>(
                          
                          
                          <View key={key} style={[Styles.boxShadow, {borderBottomLeftRadius:10,borderBottomRightRadius:10, height:100,flexDirection:'row',padding:5,backgroundColor:'white',marginBottom:10}]}>
                          <View style={{flex:1,justifyContent:'center'}}>
                          <Image 
                          // source={require('../asset/image/doctor.jpg')}
                          source={{uri:global.ApiImage+"/Customer/"+item.Images}} 
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
                              <Text style={{textAlign:'left',fontWeight:'700',fontSize:15,color:'#172127'}}>{item.CustomerName}
                              
                              </Text>
                              </View>
                              <View style={{flex:1}}>
                              <Text style={{textAlign:'left',fontWeight:'700',fontSize:12,color:'grey'}}>{item.OutletName} </Text>
                              </View>
                              <View style={{flex:1,    flexDirection: 'row',}}>
                              <Icon
      name='newspaper-o'
      size={18}
      color='grey'
    />
    <Text style={{marginLeft:5,fontSize:12}}>{item.IdCustomer}</Text>
    <Icon
      name='calendar'
      size={18}
      color='grey'
      style={{
          marginLeft:10
      }}
    />
    <Text style={{marginLeft:5,fontSize:12}}>{item.Date} | {item.Time} </Text>


{
  item.CallType == 'Plan' ?
  <Icon
  name='check-square-o'
  size={18}
  color='grey'
  style={{
      marginLeft:10
  }}
/>
:
<Icon
  name='file-o'
  size={18}
  color='grey'
  style={{
      marginLeft:10
  }}
/>
}


        <Text style={{marginLeft:5,fontSize:12}}>{item.CallType}</Text>
    
                              </View>
                          </View>
                          <View style={{flex:1,justifyContent:'center',}}>
                         
                          </View>
                  </View>
                        ))}

    
                {/* close list customer call */}



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
export default ListCallScreen
