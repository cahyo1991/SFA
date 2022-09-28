import { useNavigation } from '@react-navigation/core'
import React,{useState,useEffect} from 'react'
import {View,Text,StyleSheet,Image,Alert,BackHandler} from 'react-native'
import BottomNavigation from '../components/BottomNavigation'
import { Input,Button  } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import ListPlanScreen from '../screens/ListPlanScreen';
import ListCallScreen from '../screens/ListCallScreen'
import HeaderTitle from '../components/HeaderTitle';
import ListPendingPlanScreen from './ListPendingPlanScreen';
import Loading from '../components/Loading';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-community/picker';
function MyCallScreen({route,navigation}) {
    const {navigate} = useNavigation();
    const [PlanScreen,SetPlanScreen] = React.useState("1");

    const [ListPlan,SetListPlan] = useState([]);

    const [ListCall,SetListCall] = useState([]);
    
    const [TotalPlan,SetTotalPlan] = useState('');
    const [Name,SetName] = useState('');
    const [Role,SetRole] = useState('');
    const [Code,SetCode] = useState('');
    const [Year,SetYear] = useState('');
    const [Month,SetMonth] = useState('');
    const [Token,SetToken] = useState('');
    const [Week,SetWeek] = useState('');
    const [IdWeek,SetIdWeek] = useState('');
    const [ShowLoading,SetShowLoading] = useState(false);
    const [WeekSelected,SetWeekSelected] = useState('');

    const [MonthSelected, setMonthSelected] = useState('');
    const [TotalCall, setTotalCall] = useState('0')

    const BorderBottomplan = PlanScreen == "1" ? 2 : 0;
    const BorderBottomCalls = PlanScreen == "2" ? 2 : 0;
    const BorderBottomPendingPlan = PlanScreen == "3" ? 2 : 0;
    const ColorPlan = PlanScreen == "1" ? "black" : "grey";
    const ColorCall = PlanScreen == "2" ? "black" : "grey";
    const ColorPendingPlan = PlanScreen == "3" ? "black" : "grey";

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

    
    const _retrieveData = async () => {
      try {
        // const valueLogin = await AsyncStorage.getItem("IsLogin");
        // if(valueLogin !== null) {
        //   // console.log("1. Login");
        //   SetLogin(valueLogin);
        // }

        const valueCode = await AsyncStorage.getItem("Code");
        if(valueCode !== null) {
          // console.log("2. Code");
          SetCode(valueCode);
        }

        const valueRole = await AsyncStorage.getItem("Role");
        if(valueRole !== null) {
          // console.log("3. Role");
          SetRole(valueRole);
        }

        const valueName = await AsyncStorage.getItem("Name");
        if(valueName !== null) {
          // console.log("4. Name");
          SetName(valueName);
        }
        const valueYear = await AsyncStorage.getItem("Year");
        if(valueYear !== null) {
          SetYear(valueYear);
        }

        const valueMonth = await AsyncStorage.getItem("Month");
        if(valueMonth !== null) {
          SetMonth(valueMonth);
        }

        const valueToken = await AsyncStorage.getItem("Token");
        if(valueToken !== null) {
          // SetMonth(valueMonth);
          SetToken(valueToken);
        }
        
        const valueWeek = await AsyncStorage.getItem("Week");
        if(valueWeek !== null) {
          // SetMonth(valueMonth);
          SetWeek(valueWeek);
        }

        const valueIdWeek = await AsyncStorage.getItem("IdWeek");
        if(valueIdWeek !== null) {
          // SetMonth(valueMonth);
          SetIdWeek(valueIdWeek);
        }
        
        await getTotalPlanNotCall(valueCode,valueToken);
      await getPlanByWeek(valueCode,valueToken,valueWeek,false);
        
      //  await getPendingCustomer(valueCode,valueToken);
      
        

      } catch(e) {
          console.log("error fetch data",e.message)
        // error reading value
      }
    }


    const getTotalPlanNotCall = async (PamCode,Token) =>{
      console.log("Token =" + Token)
       const controller = new AbortController();
       setTimeout(()=> controller.abort(), global.TimeOut)

         fetch(global.Api + "/Api/GetTotalPlanNotCall?PamCode="+PamCode,
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
             
             
             if (data.Status !="1") {
                //  console.log("Error Retrieve Data List Plan =" + data.Message);
                if(data.Message == "Invalid Token"){
                  console.log("Error Retrieve Data GetPerfomance =" + data.Message);
                  // showAlertTokenExpired();
                 }else{
                  console.log("Error Retrieve Data GetPerfomance =" + data.Message);
                 }
             }else{
              
                 
                
                for (let index = 0; index < data.Return.length; index++) {
                    // alert(data.Return[index]['CustomerName'])    
                  SetTotalPlan(data.Return[index]['TotalPlan']);    
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


    const getPlanByWeek = async (PamCode,Token,Week,IsLoading) =>{

      if (IsLoading == true) {
          SetShowLoading(true)
      }

      console.log("Token =" + global.Api + "/Api/GetPlanByWeek?PamCode="+PamCode+"&&WeekOfMonth="+Week+"Token="+Token)
       const controller = new AbortController();
       setTimeout(()=> controller.abort(), global.TimeOut)
       


         fetch(global.Api + "/Api/GetPlanByWeek?PamCode="+PamCode+"&&WeekOfMonth="+Week,
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
             
             
             if (data.Status !="1") {
                //  console.log("Error Retrieve Data List Plan =" + data.Message);
                if(data.Message == "Invalid Token"){
                  // console.log("Error Retrieve Data GetPerfomance =" + data.Message);
                  showAlertTokenExpired();
                 }else{
                  console.log("Error Retrieve Data GetPerfomance =" + data.Message);
                 }
             }else{
              
                 
                const datas = [];
                for (let index = 0; index < data.Return.length; index++) {
                    // alert(data.Return[index]['CustomerName'])    
                    datas.push(
                  {
                      "CustomerName" : data.Return[index]['CustomerName'],
                      "Date" : data.Return[index]['Date'],
                      "OutletName" : data.Return[index]['OutletName'],
                      "IdCustomer" : data.Return[index]['IdCustomer'],
                      "IdPlan" : data.Return[index]['IdPlan'],
                      "Time" : data.Return[index]['Time'],
                      "IdTerritoryCoverage" : data.Return[index]['IdTerritoryCoverage'],
                      "Images" : data.Return[index]['Images'],
                      "StatusPlanCall" : data.Return[index]['StatusPlanCall'],
                      "Status" : data.Return[index]['Status'],
                      "StatusName" : data.Return[index]['StatusName'],
                      "Token" : Token,
                      "PamCode" : PamCode

                  })
                }
                console.log("Data Plan ",datas);
                SetListPlan(datas);
                console.log("Success Get Plan ")   

             }

             SetShowLoading(false);


         
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


       const getCallByPAM = async (Month,IsLoading) =>{
        console.log("Token =" + Token + " PamCode=" + Code)
        if (IsLoading == true) {
            SetShowLoading(true)
        }
  
       
         const controller = new AbortController();
         setTimeout(()=> controller.abort(), global.TimeOut)
  
           fetch(global.Api + "/Api/GetCallByPAM?PamCode="+Code+"&&Month="+Month,
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
               
               
               if (data.Status !="1") {
                  //  console.log("Error Retrieve Data List Plan =" + data.Message);
                  if(data.Message == "Invalid Token"){
                    // console.log("Error Retrieve Data GetPerfomance =" + data.Message);
                    showAlertTokenExpired();
                   }else{
                    console.log("Error Retrieve Data GetPerfomance =" + data.Message);
                   }
               }else{
                
                   
                  const datas = [];
                  setTotalCall(data.Return.length);
                  for (let index = 0; index < data.Return.length; index++) {
                      // alert(data.Return[index]['CustomerName'])    
                      datas.push(
                    {
                        "CustomerName" : data.Return[index]['CustomerName'],
                        "Date" : data.Return[index]['Date'],
                        "OutletName" : data.Return[index]['OutletName'],
                        "IdCustomer" : data.Return[index]['IdCustomer'],
                        "IdCal" : data.Return[index]['IdCall'],
                        "Time" : data.Return[index]['Time'],
                        "IdTerritoryCoverage" : data.Return[index]['IdTerritoryCoverage'],
                        "Images" : data.Return[index]['Images'] == "-" ? "doctor.jpg" : data.Return[index]['Images'],
                        "StatusPlanCall" : data.Return[index]['StatusPlanCall'],
                        "Status" : data.Return[index]['Status'],
                        "StatusName" : data.Return[index]['StatusName'],
                        "Token" : Token,
                        "PamCode" : Code,
                        "CallType" : data.Return[index]['CallType'],
  
                    })
                  }
                  console.log("Data Ca;; ",datas);
                  SetListCall(datas);
                  console.log("Success Get Call ")   
  
               }
  
               SetShowLoading(false);
  
  
           
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
                _retrieveData();    
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
      navigation.addListener('focus', async () =>{
        console.log("plan refresh");
        FetchData();
        // alert("Navigate Refresh");
        // SetPlanScreen("1")
      } )
      FetchData();
      
      
      // const a = console.log("biji")
        return () => {
          // const a = console.log("biji")
        }
    }, []);


const FilterCall = () =>{
  return(
    <View style={[Styles.boxShadow,{height:80,padding:5} ]}>
    <View style={{flex:1}}>
    <Text> Filter Call : </Text>
    </View>
    <View style={{flex:1,flexDirection:'row'}}>
    <View style={{flex:1}}>
    <Picker
selectedValue={MonthSelected}
style={{height: 30,
}}
  onValueChange={(itemValue, itemIndex) =>
    setMonthSelected(itemValue)
  }
>
<Picker.Item label="Select Cycle" value=""  />
<Picker.Item label="1" value="1"  />
<Picker.Item label="2" value="2"  />
<Picker.Item label="3" value="3"  />
<Picker.Item label="4" value="4"  />
<Picker.Item label="5" value="5"  />
<Picker.Item label="6" value="6"  />
<Picker.Item label="7" value="7"  />
<Picker.Item label="8" value="8"  />
<Picker.Item label="9" value="9"  />
<Picker.Item label="10" value="10"  />
<Picker.Item label="11" value="11"  />
<Picker.Item label="12" value="12"  />
</Picker>
    </View>
    {/* <View style={{flex:1}}>
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
    </View> */}
    <View style={{width:150,justifyContent:'center'}}>
    <Button
onPress={
    ()=>{
        getCallByPAM(MonthSelected,true)
    }
}
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
  )
}


    const FilterPlan = () =>{
      return (
        
<View style={[Styles.boxShadow,{height:80,padding:5} ]}>
                    <View style={{flex:1}}>
                    <Text> Filter Plan  : </Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row'}}>
        
                    <View style={{flex:1}}>
                    <Picker
  selectedValue={WeekSelected== "" ? Week : WeekSelected}
  style={{height: 30,
}}
  onValueChange={(itemValue, itemIndex) =>
    // this.setState({language: itemValue})
    SetWeekSelected(itemValue)
  }

  >

  <Picker.Item label="1" value="1"  />
  <Picker.Item label="2" value="2"  />
  <Picker.Item label="3" value="3"  />
  <Picker.Item label="4" value="4"  />
  <Picker.Item label="5" value="5"  />
</Picker>
                    </View>
                    <View style={{width:150,justifyContent:'center'}}>
                    <Button
        onPress={
            ()=>{
              // getPlanByWeek = async (PamCode,Token,Week,IsLoading) 
              getPlanByWeek(Code,Token,WeekSelected,true)
                // navigate("HomeScreen")
            }
        }
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
      )
    }

    
    return (
        
<View style={{flex:1}}>
{
     ShowLoading  ? 
   <Loading/>
     :
     <View></View>
   }

<HeaderTitle Title="MY CALLS"/>

<View style={{height:55,flexDirection:'row',backgroundColor:'white', paddingTop:5}}>
        <View style={{flex:1,alignItems:'center',justifyContent:'center',borderBottomWidth:BorderBottomplan}}>
            <View style={{width:30,height:25,}}>
                <TouchableOpacity
                     onPress={
                        ()=>{
                            SetPlanScreen("1")
                        }
                    }
                >
                <Icon 
                name="list"
                color={ColorPlan}
                size={20}
                style={{
                    
                    alignSelf:'center'
                }}
                />
                </TouchableOpacity>
            </View>
            <Text 
            style={{fontSize:12,color:ColorPlan }}
            >List Plan</Text>
        </View>
{/* 
        <View style={{flex:1,alignItems:'center',justifyContent:'center',borderBottomWidth:BorderBottomPendingPlan}}>
            <View style={{width:30,height:25,}}>
                <TouchableOpacity
                     onPress={
                        ()=>{
                            SetPlanScreen("3")
                        }
                    }
                >
                <Icon 
                name="safari"
                color={ColorPendingPlan}
                size={20}
                style={{
                    
                    alignSelf:'center'
                }}
                />
                </TouchableOpacity>
            </View>
            <Text 
            style={{fontSize:12,color:ColorPendingPlan }}
            >List Of Pending Plan</Text>
        </View> */}

        <View style={{flex:1,alignItems:'center',justifyContent:'center',borderBottomWidth:BorderBottomCalls}}>
            <View style={{width:30,height:25,}}>
              <TouchableOpacity
              onPress={
                  ()=>{
                      SetPlanScreen("2")
                  }
              }
              >
                <Icon 
                name="phone"
                color={ColorCall}
                size={20}
                style={{
                    
                    alignSelf:'center'
                }}
                />
                </TouchableOpacity>
            </View>
            <Text 
            style={{fontSize:12, color:ColorCall }}
            >List Calls  </Text>
        </View>


        </View>

        {/* <View style={{height:40,padding:5,marginBottom:15,flexDirection:'row',marginTop:20}}>
         
            <View style={{flex:1}}>
        <Input
              style={{
                paddingLeft:30,
                fontSize:14,
                // borderWidth:1,
                height:38
              }}
        placeholder='Search Plan By Customer'
        leftIcon={
          <Icon
            name='search'
            size={18}
            color='#0b1013'
          />
        }
      />
      </View>
      <View style={{width:80,justifyContent:'center',height:50}}>
          <TouchableOpacity>
      <Icon
            name='refresh'
            size={20}
            color='#0b1013'
            style={{
                alignSelf:'center',
                alignItems:'center'
            }}
          />
          </TouchableOpacity>
      </View>
        </View> */}


{
    PlanScreen == "1" ? 

    <FilterPlan/>
 : 
PlanScreen == "2" ? 
<FilterCall/> : 
<FilterCall/>
}


{
    PlanScreen == "1" ? 
    
<ListPlanScreen
TotalPlan = {TotalPlan}
ListPlan={ListPlan}
Week = {Week}
Code ={Code}
Token = {Token}
IdWeek = {IdWeek}
/> : 
PlanScreen == "2" ? 
<ListCallScreen 
ListCall = {ListCall}
TotalCall ={TotalCall}
/> : 
<ListPendingPlanScreen/>
}


       
       
        <BottomNavigation isPage="MyCall" navigate={navigate}/>
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
export default MyCallScreen
