import React, { Component } from 'react'
import { StyleSheet, Text, View,ImageBackground } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderBack from '../components/HeaderBack';
import {Picker} from '@react-native-community/picker';
import { Input,Button  } from 'react-native-elements';
// import DatePicker from 'react-native-datepicker'
import DateTimePicker from '@react-native-community/datetimepicker';

export class PromoScreen extends Component {


   onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

    constructor(props){
        super(props)
        this.state = {
          // date:"2021-10-04",
          showDate : false,
          showTime : false,
          time : new Date(1598051730000),
          date : new Date(2021,9,1)
        }
      }
    render() {
        return (
            
            <View style={{flex:1}}>


                {/* <TouchableOpacity onPress={
                    ()=>{
                        this.props.navigation.navigate("HomeScreen")
                    }
                }>
                    <Text>Tester</Text>
                </TouchableOpacity> */}



           <HeaderBack Name="PROMO" navigation={this.props.navigation}/>
           <View style={{flex:1,padding:10, backgroundColor:'white',}}>
                <View style={[ Styles.boxShadow, {flex:1}]}>
                
                <ImageBackground source={{uri:global.ApiImage+"Asset/promo_doctor.jpg"}} 
                   style={{
                    flex: 1,
                    justifyContent: "center",
                    flexDirection:"row"
                    
                   }}
                   imageStyle={{opacity:0.2}}
                   resizeMode="cover"
                   >
                
                       <View style={{flex:1}}>

                       </View>
                       <View style={{flex:1,justifyContent:'center'}}>
                       <Icon
    name='newspaper-o'
    size={48}
    color='#34495e'
    style={{
      textAlign:'center'
    }}
  />
  <Text style={{fontSize:22,textAlign:'center',marginTop:10,color:'#34495e'}}>BROCHURE</Text>
                       </View>
                       <View style={{flex:1,justifyContent:'center'}}>
                         <TouchableOpacity
                         onPress={()=>{
                           this.props.navigation.navigate("BrochureScreen",{
                            Token : this.props.route.params.Token,
                            PamCode : this.props.route.params.PamCode
                          })
                         }}
                         >
                       <Icon
    name='angle-right'
    size={50}
    color='#34495e'
    style={{
      textAlign:'center'
    }}
  />
  </TouchableOpacity>
                       </View>
             
                     
                     </ImageBackground>
                </View>
                
                <View style={{height:10}}></View>
                <View style={[ Styles.boxShadow, {flex:1}]}>
                
                <ImageBackground source={{uri:global.ApiImage+"Asset/video_doctor.jpg"}} 
                   style={{
                    flex: 1,
                    justifyContent: "center",
                    flexDirection:"row"
                    
                   }}
                   imageStyle={{opacity:0.2}}
                   resizeMode="cover"
                   >
                
                       <View style={{flex:1}}>

                       </View>
                       <View style={{flex:1,justifyContent:'center'}}>
                       <Icon
    name='play-circle'
    size={50}
    color='#34495e'
    style={{
      textAlign:'center'
    }}
  />
  <Text style={{fontSize:22,textAlign:'center',marginTop:10,color:'#34495e'}}>VIDEO</Text>
                       </View>
                       <View style={{flex:1,justifyContent:'center'}}>
                         <TouchableOpacity
                         onPress={
                           ()=>{
                             this.props.navigation.navigate("VideoPromoScreen",{
                              Token : this.props.route.params.Token,
                              PamCode : this.props.route.params.PamCode
                            })
                           }
                         }
                         >
                       <Icon
    name='angle-right'
    size={50}
    color='#34495e'
    style={{
      textAlign:'center'
    }}
  />
  </TouchableOpacity>
                       </View>
             
                     
                     </ImageBackground>
                </View>


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
        shadowRadius: 3.84,
        
        elevation: 5,
      }
})

export default PromoScreen
