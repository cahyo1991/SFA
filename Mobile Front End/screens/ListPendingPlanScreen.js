import React, { Component } from 'react'
import {View,Text,StyleSheet,Image} from 'react-native'
import BottomNavigation from '../components/BottomNavigation'
import { Input,Button  } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {Picker} from '@react-native-community/picker';

export class ListPendingPlanScreen extends Component {
    render() {
        return (
            <View style={{flex:1,padding:5}}>
                     <View style={[Styles.boxShadow,{height:80,padding:5} ]}>
                    <View style={{flex:1}}>
                    <Text> Filter Pending Plan : </Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row'}}>
        
                    <View style={{flex:1}}>
                    <Picker
  selectedValue="java"
  style={{height: 30,
}}
//   onValueChange={(itemValue, itemIndex) =>
//     this.setState({language: itemValue})
//   }
  >
  <Picker.Item label="Select Week" value="call"  />
  <Picker.Item label="1" value="call"  />
  <Picker.Item label="2" value="call"  />
  <Picker.Item label="3" value="call"  />
</Picker>
                    </View>
                    <View style={{width:150,justifyContent:'center'}}>
                    <Button
        // onPress={
        //     ()=>{
        //         navigate("ScheduleScreen")
        //     }
        // }
  icon={
    <Icon
      name="search"
      size={15}
      color="white"
    />
  }
  buttonStyle={{
      height:40,
      backgroundColor:'#00a0e0',
      borderRadius:5,
      width:120,
      alignContent:'center',
      alignSelf:'center',
      marginTop:-10
  }}
  title="  Search"
/>
                    </View>
                    </View>
                
                </View>
          <View style={{height:50,backgroundColor:'#00a0e0',justifyContent:'center',paddingLeft:10}}>
                     <Text style={{color:'white',fontSize:14,fontWeight:'bold'}}>Total Pending Plan : 90  |  Week : 2 </Text>
                 </View>


<View style={{flex:1,padding:5,marginTop:10}}>
  <ScrollView>
       

 {/* list customer call */}
 <View style={[Styles.boxShadow, {borderBottomLeftRadius:10,borderBottomRightRadius:10, height:100,flexDirection:'row',padding:5,backgroundColor:'white',marginBottom:10}]}>
                        <View style={{flex:1,justifyContent:'center'}}>
                        <Image source={{uri:global.ApiImage+"Asset/doctor.jpg"}}
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
                            <Text style={{textAlign:'left',fontWeight:'700',fontSize:15,color:'#172127'}}>dr. Ali Sungkar, SpOG (K)</Text>
                            </View>
                            <View style={{flex:1}}>
                            <Text style={{textAlign:'left',fontWeight:'700',fontSize:12,color:'grey'}}>RS. Pertamina Jakarta</Text>
                            </View>
                            <View style={{flex:1,    flexDirection: 'row',}}>
                            <Icon
    name='newspaper-o'
    size={18}
    color='grey'
  />
  <Text style={{marginLeft:5,fontSize:12}}>50734</Text>
  <Icon
    name='calendar'
    size={18}
    color='grey'
    style={{
        marginLeft:10
    }}
  />
  <Text style={{marginLeft:5,fontSize:12}}>05 October 2021 | 18:00</Text>
  
                            </View>
                        </View>
                        <View style={{flex:1,justifyContent:'center',backgroundColor:'red'}}>
                        
                        <Icon
    name='remove'
    size={30}
    color='white'
    style={{
        // marginLeft:10
        textAlign:'center'
    }}
  />

  <Text style={{color:'white',textAlign:'center'}}>REJECTED</Text>
                        </View>
                </View>
                {/* close list customer call */}


{/* list customer call */}
<View style={[Styles.boxShadow, {borderBottomLeftRadius:10,borderBottomRightRadius:10, height:100,flexDirection:'row',padding:5,backgroundColor:'white',marginBottom:10}]}>
                        <View style={{flex:1,justifyContent:'center'}}>
                        <Image source={{uri:global.ApiImage+"Asset/doctor.jpg"}}
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
                            <Text style={{textAlign:'left',fontWeight:'700',fontSize:15,color:'#172127'}}>dr. Ali Sungkar, SpOG (K)</Text>
                            </View>
                            <View style={{flex:1}}>
                            <Text style={{textAlign:'left',fontWeight:'700',fontSize:12,color:'grey'}}>RS. Pertamina Jakarta</Text>
                            </View>
                            <View style={{flex:1,    flexDirection: 'row',}}>
                            <Icon
    name='newspaper-o'
    size={18}
    color='grey'
  />
  <Text style={{marginLeft:5,fontSize:12}}>50734</Text>
  <Icon
    name='calendar'
    size={18}
    color='grey'
    style={{
        marginLeft:10
    }}
  />
  <Text style={{marginLeft:5,fontSize:12}}>05 October 2021 | 18:00</Text>
  
                            </View>
                        </View>
                        <View style={{flex:1,justifyContent:'center',backgroundColor:'orange'}}>
                        
                        <Icon
    name='exclamation-circle'
    size={30}
    color='white'
    style={{
        // marginLeft:10
        textAlign:'center'
    }}
  />

  <Text style={{color:'white',textAlign:'center'}}>PENDING</Text>
                        </View>
                </View>
                {/* close list customer call */}

  </ScrollView>
</View>

            </View>
        )
    }
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
export default ListPendingPlanScreen
