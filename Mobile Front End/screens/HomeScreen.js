import { useNavigation } from '@react-navigation/core'
import React, { useState,useEffect,useCallback } from 'react'
import {View,Text,StyleSheet,Image, ImageBackground,SafeAreaView,ActivityIndicator,Alert,BackHandler} from 'react-native'
// import NetInfo from "@react-native-community/netinfo";

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import BottomNavigation from '../components/BottomNavigation'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context';
import LinearGradient from 'react-native-linear-gradient';
import PieChart from 'react-native-pie-chart';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input,Button  } from 'react-native-elements';
import BoxCall from '../components/BoxCall'
import PerfomanceScreen from './PerfomanceScreen'
import RegisterCustomerScreen from './RegisterCustomerScreen'
import Loading from '../components/Loading';
import NetInfo from "@react-native-community/netinfo";
function HomeScreen({route,navigation}) {
    const {navigate} = useNavigation();
    const {signIn,signOut} = React.useContext(AuthContext);
    const [Login,SetLogin] = useState();
    const [ShowLoading,SetShowLoading] =useState(false);


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

    // state perfomance 
    const [ListPlan,SetListPlan] = useState([]);
    const [ListPendingCustomer,SetListPendingCustomer] = useState([]);
    const [Name,SetName] = useState('');
    const [Role,SetRole] = useState('');
    const [Code,SetCode] = useState('');
    const [Year,SetYear] = useState('');
    const [Month,SetMonth] = useState('');
    const [Token,SetToken] = useState('');
    const [Week,SetWeek] = useState('');
    const [TotalCoverage,SetTotalCoverage] = useState('0');
    const [TargetCall,SetTargetCall]= useState('0');
    const [TotalPlan,SetTotalPlan] = useState('0');
    
    const [TotalCall,SetTotalCall] = useState('0');
    const [Perfomance,SetPerfomance] = useState('0');
    const [NotPerfomance,SetNotPerfomance] = useState('0');
    const [DisplayPicture, setDisplayPicture] = useState('')

    const _retrieveData = async () => {
      try {
        const valueLogin = await AsyncStorage.getItem("IsLogin");
        if(valueLogin !== null) {
          // console.log("1. Login");
          SetLogin(valueLogin);
        }

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

        const valueDisplayPicture= await AsyncStorage.getItem("DisplayPicture");
        if(valueDisplayPicture !== null) {
          // SetMonth(valueMonth);
          setDisplayPicture(valueDisplayPicture);
        }
        

      await getPerformance(valueCode,valueToken);
       await getTodayCall(valueCode,valueToken);
       await getPendingCustomer(valueCode,valueToken);
      
        

      } catch(e) {
          console.log("error fetch data",e.message)
        // error reading value
      }
    }

    const getTodayCall = async (PamCode,Token) =>{
      console.log("Token =" + Token)
       const controller = new AbortController();
       setTimeout(()=> controller.abort(), global.TimeOut)

         fetch(global.Api + "/Api/GetPlanToday?PamCode="+PamCode,
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
                      "Images" : data.Return[index]['Images']

                  })
                }
                console.log("Data Plan Today Call",datas);
                SetListPlan(datas);
                console.log("Success Get Plan Today Call")   

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


       const getPendingCustomer = async (PamCode,Token) =>{
        console.log("Token =" + Token)
         const controller = new AbortController();
         setTimeout(()=> controller.abort(), global.TimeOut)
  
           fetch(global.Api + "/Api/GetPendingCustomer?PamCode="+PamCode,
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
                        "IdCustomer" : data.Return[index]['IdCustomer'],
                        "Time" : data.Return[index]['Time'],
                        "StatusApproval" : data.Return[index]['StatusApproval'],
                        "CodeStatus" : data.Return[index]['CodeStatus'],
                        "Images" : data.Return[index]['Images']
  
                    })
                  }
                  console.log("Data Pending Customer",datas);
                  SetListPendingCustomer(datas)
                  console.log("Success Pending Customer Today Call")   
  
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

    

    const getPerformance = async (PamCode,Token) =>{
      // SetShowLoading(true);
      console.log("Token =" + Token)
       const controller = new AbortController();
       setTimeout(()=> controller.abort(), global.TimeOut)

         fetch(global.Api + "/Api/GetPerfomance?PamCode="+PamCode,
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
                 
                 if(data.Message == "Invalid Token"){
                  console.log("Error Retrieve Data GetPerfomance =" + data.Message);
                  // showAlertTokenExpired();
                 }else{
                  console.log("Error Retrieve Data GetPerfomance =" + data.Message);
                 }
             }else{
               console.log("Data Perfomance",data);
               // alert(JSON.stringify(data.Return[0]['TargetCall']))
               SetTotalCoverage(data.Return[0]["TotalCoverage"])
               SetTargetCall(data.Return[0]["TargetCall"])
               SetTotalPlan(data.Return[0]["TotalPlan"])
               SetTotalCall(data.Return[0]["TotalCall"])
               SetPerfomance(data.Return[0]["Perfomance"])
               SetNotPerfomance(data.Return[0]["NotPerfomance"])
               console.log("Success Get Perfomance");
             }

             // SetShowLoading(false);
             



         
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
       



    // end of state perfomance


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
      }, [])


      const widthAndHeight = 135
      const series = [80, 20]
      const sliceColor = ['#00a0e0','#0b1013'];


      const [PlanScreen,SetPlanScreen] = React.useState("1");

      const BorderBottomplan = PlanScreen == "1" ? 2 : 0;
      const BorderBottomCalls = PlanScreen != "1" ? 2 : 0;
      const ColorPlan = PlanScreen == "1" ? "black" : "grey";
      const ColorCall = PlanScreen != "1" ? "black" : "grey";

    return (
<SafeAreaView style={{flex:1}} 
// pointerEvents="none" disable view
>
{
     ShowLoading  ? 
   <Loading/>
     :
     <View></View>
   }

<View style={{height:90,paddingTop:10,backgroundColor:'white'}}>
               <Image
               source={{uri:global.ApiImage+"Asset/etana_logo.png"}}
               style={{
                   width:170,
                   height:80,
                   alignSelf:'center'
               }}
               />
           </View>
           {/* top header */}

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
                name="user-md" 
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
            >Perfomance</Text>
        </View>
        <View style={{flex:1,alignItems:'center',justifyContent:'center',borderBottomWidth:BorderBottomCalls}}>
            <View style={{width:30,height:25,}}>
              <TouchableOpacity
              onPress={
                  ()=>{
                      SetPlanScreen("0")
                  }
              }
              >
                <Icon 
                name="pencil-square-o"
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
            >Register New Customer   </Text>
        </View>


        </View>
{
    PlanScreen == "1" ?
    <PerfomanceScreen 
    Perfomance = {Perfomance}
    NotPerfomance = {NotPerfomance}
    Name={Name} Role={Role} Year={Year} Month={Month} TotalCoverage={TotalCoverage} Week={Week}
    TotalPlan={TotalPlan} TargetCall={TargetCall}
    ListPlan = {ListPlan}
    Token = {Token} Code={Code}
    TotalCall = {TotalCall}
    DisplayPicture = {DisplayPicture}

    />
    : <RegisterCustomerScreen
    Token = {Token} Code={Code}
    ListPendingCustomer = {ListPendingCustomer}
    />
}
      
        <BottomNavigation isPage="Home" navigate={navigate} />
</SafeAreaView>
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

export default HomeScreen
