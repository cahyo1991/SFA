import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import {View,Text,StyleSheet,Image,Alert,BackHandler} from 'react-native'
import BottomNavigation from '../components/BottomNavigation'
import { Input,Button  } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import ListCoverageScreen from './ListCoverageScreen';
import HeaderTitle from '../components/HeaderTitle';
import ListPendingCoverageScreen from './ListPendingCoverageScreen';
import Loading from '../components/Loading';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';

function CoverageScreen({route,navigation}) {
    const {navigate} = useNavigation();
    const [PlanScreen,SetPlanScreen] = React.useState("1");

    const [ListPendingTerritoryCoverage, setListPendingTerritoryCoverage] = useState([])
    const [TotalPendingTerritoryCoverage, setTotalPendingTerritoryCoverage] = useState('0')
    const [ListTotalSegmentation, setListTotalSegmentation] = useState([]);
    const [TotalCoverage, setTotalCoverage] = useState('0');
    const [TotalP, setTotalP] = useState('0');
    const [TotalAC, setTotalAC] = useState('0')
    const [TotalR, setTotalR] = useState('0');
    const [ListTerritoryCoverage, setListTerritoryCoverage] = useState([]);
    const [Code, SetCode] = useState('0');
    const [Token, SetToken] = useState('0');
    const [ShowLoading,SetShowLoading] = useState(false);
    const BorderBottomplan = PlanScreen == "1" ? 2 : 0;
    const BorderBottomCalls = PlanScreen != "1" ? 2 : 0;
    const ColorPlan = PlanScreen == "1" ? "black" : "grey";
    const ColorCall = PlanScreen != "1" ? "black" : "grey";

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


    const getPendingCoverage = async (PamCode,Token) =>{
      console.log("Token =" + Token)
       const controller = new AbortController();
       setTimeout(()=> controller.abort(), global.TimeOut)

         fetch(global.Api + "/Api/GetPendingEtcpPAM?PamCode="+PamCode,
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
                
                setTotalPendingTerritoryCoverage(data.Return.length)
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
                      "Images" : data.Return[index]['Images'] == "-" ? "doctor.jpg" : data.Return[index]['Images'],
                      "StatusPlanCall" : data.Return[index]['StatusPlanCall'],
                      "Status" : data.Return[index]['Status'],
                      "StatusName" : data.Return[index]['StatusName'],
                      "Token" : Token,
                      "PamCode" : PamCode,
                      "IdSegmentation" : data.Return[index]['IdSegmentation']

                  })
                }
                console.log("Data ETCP ",datas);
                setListPendingTerritoryCoverage(datas)
                console.log("Success Get ETCP Pending")   

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


    const getCoverage = async (PamCode,Token) =>{
        console.log("Token =" + Token)
         const controller = new AbortController();
         setTimeout(()=> controller.abort(), global.TimeOut)
  
           fetch(global.Api + "/Api/GetEtcpPAM?PamCode="+PamCode,
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
                  setTotalCoverage(data.Return.length)
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
                        "Images" : data.Return[index]['Images'] == "-" ? "doctor.jpg" : data.Return[index]['Images'],
                        "StatusPlanCall" : data.Return[index]['StatusPlanCall'],
                        "Status" : data.Return[index]['Status'],
                        "StatusName" : data.Return[index]['StatusName'],
                        "Token" : Token,
                        "PamCode" : PamCode,
                        "IdSegmentation" : data.Return[index]['IdSegmentation'],

                        // detail Customer
                        "_Address" : data.Return[index]['_Address'],
"_Child_Birth_1" : data.Return[index]['_Child_Birth_1'],
"_Child_Birth_2" : data.Return[index]['_Child_Birth_2'],
"_Child_Name_1" : data.Return[index]['_Child_Name_1'],
"_Child_Name_2" : data.Return[index]['_Child_Name_2'],
"_CustomerName" : data.Return[index]['_CustomerName'],
"_DateOfBirth" : data.Return[index]['_DateOfBirth'],
"_DateOfMarriage" : data.Return[index]['_DateOfMarriage'],
"_Email" : data.Return[index]['_Email'],
"_Hobby" : data.Return[index]['_Hobby'],
"_Husban_Wife_Name" : data.Return[index]['_Husban_Wife_Name'],
"_Husband_Wife_Birth" : data.Return[index]['_Husband_Wife_Birth'],
"_Id" : data.Return[index]['_Id'],
"_IdCustomerType" : data.Return[index]['_IdCustomerType'],
"_IdDoctorTitles" : data.Return[index]['_IdDoctorTitles'],
"_IdReligion" : data.Return[index]['_IdReligion'],
"_IdSegmentation" : data.Return[index]['_IdSegmentation'],
"_IdSpecialty" : data.Return[index]['_IdSpecialty'],
"_Images" : data.Return[index]['_Images'],
"_Note" : data.Return[index]['_Note'],
"_OutletId_1" : data.Return[index]['_OutletId_1'],
"_OutletId_2" : data.Return[index]['_OutletId_2'],
"_OutletId_3" : data.Return[index]['_OutletId_3'],
"_PhoneNumber" : data.Return[index]['_PhoneNumber'],
"_ProvinceCode" : data.Return[index]['_ProvinceCode'],
"_OutletName1" : data.Return[index]['_OutletName1'],
"_OutletName2" : data.Return[index]['_OutletName2'],
"_OutletName3" : data.Return[index]['_OutletName3']
  
                    })
                  }
                  console.log("Data ETCP ",datas);
                  setListTerritoryCoverage(datas)
                  console.log("Success Get ETCP ")   
  
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

         const getTotalSegmentation = async (PamCode,Token) =>{
            console.log("Token =" + Token)
             const controller = new AbortController();
             setTimeout(()=> controller.abort(), global.TimeOut)
      
               fetch(global.Api + "/Api/GetTotalSegmentationPAM?PamCode="+PamCode,
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
                    
                       
                    // data.Return[index]['CustomerName'],
                    setTotalP(data.Return[0]['TotalP'])
                    setTotalR(data.Return[0]['TotalR'])
                    setTotalAC(data.Return[0]['TotalAC'])
      
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
             
             
             const getTotalSegmentationNew = async (PamCode,Token) =>{
              console.log("Token =" + Token)
               const controller = new AbortController();
               setTimeout(()=> controller.abort(), global.TimeOut)
        
                 fetch(global.Api + "/Api/GetTotalSegmentationPAMNew?PamCode="+PamCode,
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
                      
var datas = [];
                      for (let index = 0; index < data.Return.length; index++) {
                        // alert(data.Return[index]['CustomerName'])    
                        datas.push(
                      {
                          // "CustomerName" : data.Return[index]['CustomerName'],
                          "Code" : data.Return[index]['Code'],
                          "Name" : data.Return[index]['Name'],
                          "Total" : data.Return[index]['Total'],
                          "Visit" : data.Return[index]['Visit'],
    
                      })
                    }
                    console.log("Data Total ETCP segmentation",datas);
                    // setListPendingTerritoryCoverage(datas)
                    setListTotalSegmentation(datas)
                    // console.log("Success Get ETCP Pending")   
                      
        
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


    const _retrieveData = async () => {
        try {
          // SetShowLoading(true)
          const valueCode = await AsyncStorage.getItem("Code");
          if(valueCode !== null) {
            // console.log("2. Code");
            SetCode(valueCode);
          }
  
          const valueToken = await AsyncStorage.getItem("Token");
          if(valueToken !== null) {
            // SetMonth(valueMonth);
            SetToken(valueToken);
          }
          
          
         
          await getPendingCoverage(valueCode,valueToken);
          await getTotalSegmentation(valueCode,valueToken);
          await getCoverage(valueCode,valueToken);
          await getTotalSegmentationNew(valueCode,valueToken);
        //   await getTotalPlanNotCall(valueCode,valueToken);
        // await getPlanByWeek(valueCode,valueToken,valueWeek,false);
          
        
        
          
  
        } catch(e) {
            console.log("error fetch data",e.message)
          // error reading value
        }
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
  

    return (
        <View style={{flex:1}}>
            {
     ShowLoading  ? 
   <Loading/>
     :
     <View></View>
   }
            <HeaderTitle Title="COVERAGE"/>


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
            >List Of My Coverage</Text>
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
                name="safari"
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
            >List Of Pending New Coverage  </Text>
        </View>


        </View>

            <View style={{flex:1}}>
            {
    PlanScreen == "1" ? 
<ListCoverageScreen
TotalCoverage = {TotalCoverage}
ListTerritoryCoverage = {ListTerritoryCoverage}
TotalAC = {TotalAC}
TotalP = {TotalP}
TotalR = {TotalR}
PamCode = {Code}
Token ={Token}
ListTotalSegmentation = {ListTotalSegmentation}
/>: 
<ListPendingCoverageScreen
TotalPendingTerritoryCoverage={TotalPendingTerritoryCoverage}
ListPendingTerritoryCoverage={ListPendingTerritoryCoverage}
/>
}

             
            </View>
            <BottomNavigation isPage="Coverage" navigate={navigate}/>
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

export default CoverageScreen
