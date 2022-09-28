import React from 'react'
import { useNavigation } from '@react-navigation/core'
import {View,Text,StyleSheet,Image} from 'react-native'
import BottomNavigation from '../components/BottomNavigation'
import { Input,Button  } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
function BoxPendingTerritoryCoverage(props) {
    const {navigate} = useNavigation();
    const Images = props.Images == "-" ? "doctor.jpg" :props.Images;
    return (
<View style={{}}>
    {/* list customer call */}
 <View style={[Styles.boxShadow, {borderBottomLeftRadius:10,borderBottomRightRadius:10, height:100,flexDirection:'row',padding:5,backgroundColor:'white',marginBottom:10}]}>
                        <View style={{flex:1,justifyContent:'center'}}>
                        <Image
                         source={{uri:global.ApiImage+"/Customer/" + Images}} 
                        // source={require('../asset/image/doctor.jpg')}
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
                            <View style={{flex:1}}>
                            <Text style={{textAlign:'left',fontWeight:'700',fontSize:12,color:'grey'}}>{props.IdSegmentation}</Text>
                            </View>
                            <View style={{flex:1,    flexDirection: 'row',}}>
                            <Icon
    name='newspaper-o'
    size={18}
    color='grey'
  />
  <Text style={{marginLeft:5,fontSize:12}}>{props.CustomerId}</Text>

  
                            </View>
                        </View>

{
    props.Status == 0 ?
    <View style={{flex:1,justifyContent:'center',
    backgroundColor:'#e74c3c'
    }}>
    <TouchableOpacity>
        
    <Icon
name='close'
size={25}
color='white'
style={{
textAlign:'center'
}}
/>

<Text style={{color:'white',textAlign:'center'}}>{props.StatusName}</Text>
</TouchableOpacity>
    </View>
    : props.Status > 1  ?
    <View style={{flex:1,justifyContent:'center',
    backgroundColor:'#f1c40f'
    }}>
    <TouchableOpacity
    onPress={
        ()=>{
            // navigate("ReasonNoCallScreen")
        }
    }
    >
        
    <Icon
name='hourglass-o'
size={25}
color='white'
style={{
textAlign:'center'
}}
/>

<Text style={{color:'white',textAlign:'center'}}>{props.StatusName}</Text>
</TouchableOpacity>
    </View> 
    
    :

    <View style={{flex:1,justifyContent:'center',
    backgroundColor:'green'
    }}>
    <TouchableOpacity
    onPress={
        ()=>{
            // navigate("ReasonNoCallScreen")
        }
    }
    >
        
    <Icon
name='check'
size={25}
color='white'
style={{
textAlign:'center'
}}
/>

<Text style={{color:'white',textAlign:'center'}}>{props.StatusName}</Text>
</TouchableOpacity>
    </View> 
   
}

                       
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

export default BoxPendingTerritoryCoverage
