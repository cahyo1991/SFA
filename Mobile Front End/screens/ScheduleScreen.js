import React, { useEffect,useState } from 'react'
import { StyleSheet, Text, View,Alert,BackHandler } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderBack from '../components/HeaderBack';
import {Picker} from '@react-native-community/picker';
import { Input,Button  } from 'react-native-elements';
// import DatePicker from 'react-native-datepicker'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/core';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertHelper from '../components/AlertHelper';
import Loading from '../components/Loading';

// const [navigation] = useNavigation();

function ScheduleScreen({ route, navigation }) {
  const {PamCode,Token} = route.params;
  const {navigate} = useNavigation();
  const [ShowLoading,SetShowLoading] = useState(false);
  const [StartDate, setStartDate] = useState('');
  const [EndDate, setEndDate] = useState(''); 
  const [WeekOfMonth, setWeekOfMonth] = useState('');
  const [Status, setStatus] = useState('0');
  const [IdWeek, setIdWeek] = useState('');

  const [DayStartWeek, setDayStartWeek] = useState('');
  const [MonthStartWeek, setMonthStartWeek] = useState('');
  const [YearStartWeek, setYearStartWeek] = useState('');
  const [DayEndWeek, setDayEndWeek] = useState('');  
  const [MonthEndWeek, setMonthEndWeek] = useState('');
  const [YearEndWeek, setYearEndWeek] = useState('')

  const showAlertNoInternet = (Title,Message) =>
  Alert.alert(
    Title,
    Message,
    [
      {
          text: 'OK', 
          onPress: () => BackHandler.exitApp()
        },
    ]
  );


  const showAlertTokenExpired = () =>
  Alert.alert(
    "Error",
    "Login Expired, Please Logout And Login Again !",
    [
      {
          text: 'OK', 
          onPress: () => navigate('ProfileScreen')
        },
    ]
  );

  const showAlert = (Title,Message) =>
  Alert.alert(
    Title,
    Message,
    [
      {
          text: 'OK'
        },
    ]
  );


  const getTotalPlanNotCall = async (PamCode,Token) =>{
    console.log("Token =" + Token)
     const controller = new AbortController();
     setTimeout(()=> controller.abort(), global.TimeOut)
       fetch(global.Api + "/Api/GetPlanPeriode?PamCode="+PamCode,
       {
         "signal": controller.signal,
         method : 'GET',
         headers: {
           'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
           'Token' : Token
         }
       }).then((response) => response.json()).
       then(
         data =>{
           // alert(data.Status);
           
           
           SetShowLoading(false);  
           if (data.Status !="1") {

              if(data.Message == "Invalid Token"){
                console.log("Error Retrieve Data GetPerfomance =" + data.Message);
                showAlertTokenExpired();
               }else{
                showAlert("Error",data.Message)
               }
           }else{
            
               
              
              for (let index = 0; index < data.Return.length; index++) {
                  // alert(data.Return[index]['CustomerName'])    
                // SetTotalPlan(data.Return[index]['TotalPlan']);  
                setStartDate(data.Return[index]['StartDate'])
                setEndDate(data.Return[index]['EndDate'])
                setWeekOfMonth(data.Return[index]['WeekOfMonth'])
                setStatus(data.Return[index]['Status'])
                setIdWeek(data.Return[index]['IdWeek'])

                setDayStartWeek(data.Return[index]['DayStartWeek'])
                setMonthStartWeek(data.Return[index]['MonthStartWeek'])
                setYearStartWeek(data.Return[index]['YearStartWeek'])
                setDayEndWeek(data.Return[index]['DayEndWeek'])
                setMonthEndWeek(data.Return[index]['MonthEndWeek'])
                setYearEndWeek(data.Return[index]['YearEndWeek'])

              }
              
                 

           }

           


       
         }
       ).catch(
         e=> {

           console.log("catch error fetch =" + e.message)
           if (e.message == "Aborted") {
             showAlert("Error","Poor Connection !");
             SetShowLoading(false);    
           }else{
             showAlert("Error",e.message);
             SetShowLoading(false);
           }
         })
     } 


     const FetchData = async () =>{
      SetShowLoading(true);
      setTimeout(function(){ 
              
          NetInfo.fetch().then(state => {
  
            console.log("Is connected?", state.isConnected);  
            if(state.isConnected){
              getTotalPlanNotCall(PamCode,Token)
              // _retrieveData();    
            }else{
              // alert("Connection Internet bloon!")
              console.log("Not Connected")
              SetShowLoading(false);
              showAlertNoInternet("No Internet Connection!","You need to have Mobile Data or Wifi to Access this Page.");
            }
          });
        
        },1000 );
  
  }

  useEffect(() => {
    FetchData();
  }, [])

        return (
            
            <View style={{flex:1}}>
              {
     ShowLoading  ? 
   <Loading/>
     :
     <View></View>
   }
           {/* <HeaderBack Name="Add Schedule" navigation={navigation}/> */}
           <HeaderBack Name="Add Schedule" navigation={navigation}/>
           <View style={{height:50,backgroundColor:'#00a0e0',justifyContent:'center',paddingLeft:10}}>
                     <Text style={{color:'white',fontSize:14,fontWeight:'bold'}}>Type Plan  </Text>
                 </View>
         <View style={{marginTop:20,height:200,padding:5}}>
            <View style={[ Styles.boxShadow, {flex:1,padding:10,flexDirection:'row'}]}>
                <View style={{flex:1,backgroundColor:'#0b1013',borderRadius:10,justifyContent:'center'}}>
                <TouchableOpacity onPress={
                  ()=>{
                    if (Status == "1") {
                      navigate("RegisterPlanScreen",{
                        IdWeek : IdWeek,
                        PamCode : PamCode,
                        Token : Token,
                        DayStartWeek : DayStartWeek,
                        MonthStartWeek : MonthStartWeek,
                        YearStartWeek : YearStartWeek,
                        DayEndWeek : DayEndWeek,
                        MonthEndWeek : MonthEndWeek,
                        YearEndWeek : YearEndWeek
                      })  
                    }else{
                      let periode = "( " + StartDate + " - " + EndDate + " )"; 
                        showAlert("Error","You Are Not In The Plan Period ! \n" + periode)
                    }
                    
                  }
                }>
                <Icon
      name="check-square-o"
      size={30}
      color="white"
      style={{
        textAlign:'center'
      }}
    />

    <Text style={{color:'white',textAlign:'center',marginTop:10,fontWeight:'bold',fontSize:15}}>PLAN</Text>
    </TouchableOpacity>
                </View>



                <View style={{width:20}}></View>
                <View style={{flex:1,backgroundColor:'#00a0e0',borderRadius:10,justifyContent:'center'}}>
                <TouchableOpacity onPress={
                  ()=>{
                    navigate("RegisterUnplanScreen",{
                      PamCode : PamCode,
                      Token : Token
                    })
                  }
                }>
                <Icon
      name="file-o"
      size={30}
      color="white"
      style={{
        textAlign:'center'
      }}
    />

    <Text style={{color:'white',textAlign:'center',marginTop:10,fontWeight:'bold',fontSize:15}}>UNPLAN</Text>
    </TouchableOpacity>
                </View>
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
        shadowRadius: 3.84,
        
        elevation: 5,
      }
})

export default ScheduleScreen
