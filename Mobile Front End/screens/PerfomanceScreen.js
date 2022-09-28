import { useNavigation } from '@react-navigation/core'
import React, { useState,useEffect,useCallback } from 'react'
import {View,Text,StyleSheet,Image, ImageBackground,SafeAreaView,ActivityIndicator,Alert,BackHandler } from 'react-native'
import NetInfo from "@react-native-community/netinfo";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import BottomNavigation from '../components/BottomNavigation'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context';
import LinearGradient from 'react-native-linear-gradient';
import PieChart from 'react-native-pie-chart';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input,Button  } from 'react-native-elements';
import BoxCall from '../components/BoxCall';
import Loading from '../components/Loading';
import { openDatabase } from 'react-native-sqlite-storage';


function PerfomanceScreen(props) {


    
      const [Perfom,SetPerfom] = useState(0);
      const [NotPerfom,SetNotPerfom] = useState(100);
      const widthAndHeight = 135
      const series = [Perfom, NotPerfom]
      const sliceColor = ['#00a0e0','#0b1013'];

      const DisplayPic = props.DisplayPicture == "" || props.DisplayPicture == null ? "noimage.png" :  props.DisplayPicture;

useEffect(() => {
  if(props.Perfomance > 0 && props.NotPerfomance > 0){
    SetPerfom(props.Perfomance);
    SetNotPerfom(props.NotPerfomance);
  }
    // ;
    // SetNotPerfom(props.NotPerfomance)
}, )


    return (
<View style={{flex:1}} 
// pointerEvents="none" disable view
>





        <ScrollView>
        <View style={{flex:1,flexDirection:'column',backgroundColor:'#f8f8f8'}}>


    
           <View style={{height:220,padding:10,flexDirection:'column',}}>
               <View style={{height:150,}}>

                   <ImageBackground source={{uri:global.ApiImage+"Asset/bg_profile.jpg"}} 
                   style={{
                    flex: 1,
                    justifyContent: "center",
                    flexDirection:'row',
                    borderRadius:5
                   }}
                   resizeMode="cover"
                   >
                       
                       <View style={{flex:1,justifyContent:'center'}}>
                           <Image source={{uri:global.ApiImage+"Pam/"+DisplayPic}}
                           style={{
                            width:90,
                            height:90,
                            borderRadius: 90 / 2,
                    overflow: "hidden",
                    borderWidth: 1,
                    borderColor: "white",
                    alignSelf:'center',
                    // marginTop:30
                            }}
                           >

                           </Image>
                       </View>
                       <View style={{flex:1,justifyContent:'center'}}>
                           <Text style={{fontSize:12,color:'white'}}>Welcome   ,</Text>
                           <Text style={{fontSize:18,color:'white'}}>{props.Name} - {props.Role}  </Text>
                       </View>

                   </ImageBackground>
               </View>
               <LinearGradient colors={['#0b1013', '#101416', '#5d5e5e']}
               style={{
                   borderBottomRightRadius:10,
                   borderBottomLeftRadius:10
               }}
               >
                   
               <View style={{height:44,flexDirection:'row',borderColor:'#0b1013'}}>
               <View style={{flex:1, justifyContent:'center',borderRightWidth:0.5,borderRightColor:'#d7d0bc'}}>
                   <Text style={{textAlign:'center',color:'white', fontSize:12}}>Year</Text>
                   <Text style={{fontWeight:'bold',textAlign:'center',color:'white', fontSize:14}}>{props.Year}</Text>
               </View>
               <View style={{flex:1, justifyContent:'center',borderRightWidth:0.5,borderRightColor:'#d7d0bc'}}>
                   <Text style={{textAlign:'center',color:'white', fontSize:12}}>Cycle</Text>
                   <Text style={{fontWeight:'bold',textAlign:'center',color:'white', fontSize:14}}>{props.Month}</Text>
               </View>
               <View style={{flex:1, justifyContent:'center',borderRightWidth:0.5,borderRightColor:'#d7d0bc'}}>
                   <Text style={{textAlign:'center',color:'white', fontSize:12}}>Week</Text>
                   <Text style={{fontWeight:'bold',textAlign:'center',color:'white', fontSize:14}}>{props.Week}</Text>
               </View>
               <View style={{flex:1, justifyContent:'center',borderRightWidth:0.5,borderRightColor:'#d7d0bc'}}>
                   <Text style={{textAlign:'center',color:'white', fontSize:12}}>Coverage</Text>
                   <Text style={{fontWeight:'bold',textAlign:'center',color:'white', fontSize:14}}>{props.TotalCoverage}</Text>
               </View>

               </View>
               </LinearGradient>

           </View> 
           {/* close top header */}


               {/* customer call perfomance */}
           <View style={{flexDirection:'column',}}>
           <View style={{height:80,flexDirection:'row',padding:5}}>
                <View style={{flex:1}}>
                    <Text style={{fontSize:15,fontWeight:'bold',textAlign:'left'}}>Customer Call Perfomance</Text>
                </View>
                <View style={{flex:1,paddingRight:3,paddingLeft:3}}>
                    <Text style={{fontSize:15,fontWeight:'bold',textAlign:'center',backgroundColor:'black',color:'white',borderRadius:15,padding:5}}>Based On Cycle</Text>
                </View>
           </View>

                 <View style={{height:200,padding:5}}>
                     <View style={[Styles.boxShadow ,{flexDirection:'row'}]}>
                     
                     {/* chart open  */}
                     <View style={{flex:1,}}>
                         <View style={{flex:1,justifyContent:'center'}}>
                                       <PieChart
            widthAndHeight={widthAndHeight}
            series={series}
            sliceColor={sliceColor}
            doughnut={true}
            coverRadius={0.45}
            coverFill={'#FFF'}
            style={{
                alignContent:'center',
                alignSelf:'center'
            }}
          />
                         </View>
                         <View style={{height:40,}}>
                         <Text style={{textAlign:'center',fontWeight:'700',fontSize:14,}}> {props.Perfomance} % </Text>
                         <Text style={{textAlign:'center',fontSize:12}}>(CALL VS TARGET)</Text>
                         </View>
                     


                     </View>
                     {/* chart close  */}
                            <View style={{flex:1,flexDirection:'column'}}>
                                
                                <View style={{flex:1,flexDirection:'row'}}>
                                    <View style={{justifyContent:'center',flex:1,}}>
                                    <Text style={{textAlign:'center',fontWeight:'700',fontSize:14,color:'#00a0e0'}}>Total Call</Text>
                                    </View>
                                    <View style={{flex:1,backgroundColor:'#00a0e0',justifyContent:'center'}}>
                                    <Text style={{textAlign:'center',fontWeight:'700',fontSize:16,color:'white'}}> {props.TotalCall} </Text>
                                    </View>
                                </View>

                                <View style={{flex:1,flexDirection:'row'}}>
                                    <View style={{justifyContent:'center',flex:1,}}>
                                    <Text style={{textAlign:'center',fontWeight:'700',fontSize:14,color:'#056287'}}>Total Plan Approved</Text>
                                    </View>
                                    <View style={{flex:1,backgroundColor:'#056287',justifyContent:'center'}}>
                                    <Text style={{textAlign:'center',fontWeight:'700',fontSize:16,color:'white'}}>{props.TotalPlan}</Text>
                                    </View>
                                </View>

                                <View style={{flex:1,flexDirection:'row'}}>
                                    <View style={{justifyContent:'center',flex:1,}}>
                                    <Text style={{textAlign:'center',fontWeight:'700',fontSize:14,color:'#0b1013'}}>Target Call</Text>
                                    </View>
                                    <View style={{flex:1,backgroundColor:'#0b1013',justifyContent:'center'}}>
                                    <Text style={{textAlign:'center',fontWeight:'700',fontSize:16,color:'white'}}>{props.TargetCall}</Text>
                                    </View>
                                </View>


                            </View>
                           
                        </View>
                 </View>
               </View> 

               {/* close customer call perfomance */}

        

               {/* Today Call Customer */}
               <View style={{flex:1,padding:5,marginTop:20}}>

               <View style={{height:50,flexDirection:'row',padding:5}}>
                <View style={{flex:1}}>
   

                    <Text style={{fontSize:15,fontWeight:'bold',textAlign:'left'}}>Today Customer Call</Text>
                    

                </View>
                <View style={{flex:1,paddingRight:3,paddingLeft:3}}>
                    
                </View>
           </View>

                <View style={[Styles.boxShadow,{padding:5,height:500,backgroundColor:'#f4f4f4'}]}>
                    <ScrollView>

                      {
                        props.ListPlan.map((item,key)=>(
<BoxCall Name={item.CustomerName} OutletName={item.OutletName} TimePlan={item.Date + " | " + item.Time} CustomerId={item.IdCustomer}  PlanId={item.IdPlan} PamCode={props.Code} key={key}  
IdTerritoryCoverage = {item.IdTerritoryCoverage}
Token = {props.Token}
Images = {item.Images}
CallType = "1"
/>
                        ))
                      }
                        

                        
                        </ScrollView>
                </View>
               </View> 
{/* end of Today Call Customer */}

          
            
        </View>
        </ScrollView>
        
</View>
    )
}

const Styles = StyleSheet.create({
  boxShadow : {
    backgroundColor:'white',flex:1,shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
    elevation: 5,
  }
})

export default PerfomanceScreen
