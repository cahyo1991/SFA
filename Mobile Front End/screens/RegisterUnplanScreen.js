import React, { Component } from 'react'
import { StyleSheet, Text, View,Alert ,TouchableOpacity,BackHandler} from 'react-native'
import { ScrollView,  } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderBack from '../components/HeaderBack';
import {Picker} from '@react-native-community/picker';
import { Input,Button  } from 'react-native-elements';
// import DatePicker from 'react-native-datepicker'
import DateTimePicker from '@react-native-community/datetimepicker';
import BoxCall from '../components/BoxCall';
import Loading from '../components/Loading';


export class RegisterUnplanScreen extends Component {


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
          date : new Date(2021,9,1),
          ListCustomer : [],
          Available : 0,
          Quota : 0
        }
      }


      showAlert = (Title,Message) =>
      Alert.alert(
        Title,
        Message
      );

       showAlertTokenExpired = () =>
      Alert.alert(
        "Error",
        "Login Expired, Please Logout And Login Again !",
        [
          {
              text: 'OK', 
              onPress: () => this.props.navigation.navigate('ProfileScreen')
            },
        ]
      );

      showAlertNoInternet = (Title,Message) =>
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



      getCustomerPam = async () =>{
        console.log("Token =" + this.props.route.params.Token)
         const controller = new AbortController();
         setTimeout(()=> controller.abort(), global.TimeOut)
           fetch(global.Api + "/Api/GetEtcpUnPlanPAM?PamCode="+this.props.route.params.PamCode,
           {
             "signal": controller.signal,
             method : 'GET',
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
               'Token' : this.props.route.params.Token
             }
           }).then((response) => response.json()).
           then(
             data =>{
    
              this.setState({
                ShowLoading : false
              })
               if (data.Status !="1") {
    
                  if(data.Message == "Invalid Token"){
                    console.log("Error Retrieve Data GetPerfomance =" + data.Message);
                    this.showAlertTokenExpired();
                    
                   }else{
                    this.showAlert("Error",data.Message)
                   }
               }else{
                
                   
                console.log("Data ",JSON.stringify(data))
                  const _ListEtcp = [];
                  for (let index = 0; index < data.Return.length; index++) {
                    _ListEtcp.push({
                      'IdCustomer' : data.Return[index]['IdCustomer'],
                      'Name' : data.Return[index]['CustomerName'],
                      'Images' : data.Return[index]['Images'],
                      'IdTerritoryCoverage' : data.Return[index]['IdTerritoryCoverage']

                    })
                      // alert(data.Return[index]['CustomerName'])    
                    // SetTotalPlan(data.Return[index]['TotalPlan']); 
    
                  }
    
                  this.setState({
                    ListCustomer : _ListEtcp 
                  })
               }
             }
           ).catch(
             e=> {
              this.setState({
                ShowLoading : false
              })
    
               console.log("catch error fetch =" + e.message)
               if (e.message == "Aborted") {
                 this.showAlert("Error","Poor Connection !");    
               }else{
                 this.showAlert("Error",e.message);
               }
             })
         }

         getQuota = async () =>{
          console.log("Token =" + this.props.route.params.Token)
           const controller = new AbortController();
           setTimeout(()=> controller.abort(), global.TimeOut)
             fetch(global.Api + "/Api/GetTotalCallUnPlan?PamCode="+this.props.route.params.PamCode,
             {
               "signal": controller.signal,
               method : 'GET',
               headers: {
                 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                 'Token' : this.props.route.params.Token
               }
             }).then((response) => response.json()).
             then(
               data =>{
      
                this.setState({
                  ShowLoading : false
                })
                 if (data.Status !="1") {
      
                    if(data.Message == "Invalid Token"){
                      console.log("Error Retrieve Data GetPerfomance =" + data.Message);
                      this.showAlertTokenExpired();
                      
                     }else{
                      this.showAlert("Error",data.Message)
                     }
                 }else{
                  
                     
                  console.log("Data ",JSON.stringify(data))

                  this.setState({
                    Quota:data.Return[0]['Quota'],
                    Available : data.Return[0]['Available']
                  })

                  this.getCustomerPam();
                      
                        // alert(data.Return[index]['CustomerName'])    
                      // SetTotalPlan(data.Return[index]['TotalPlan']); 
      
                    
      
                  
                 }
               }
             ).catch(
               e=> {
                this.setState({
                  ShowLoading : false
                })
      
                 console.log("catch error fetch =" + e.message)
                 if (e.message == "Aborted") {
                   this.showAlert("Error","Poor Connection !");    
                 }else{
                   this.showAlert("Error",e.message);
                 }
               })
           }


         componentDidMount = () =>{
            
            this.getQuota();
         }

    render() {
        return (
            
            <View style={{flex:1}}>
           <HeaderBack Name="Add Call -  Unplan" navigation={this.props.navigation}/>
           <View style={{height:50,backgroundColor:'#00a0e0',justifyContent:'center',paddingLeft:10}}>
                     <Text style={{color:'white',fontSize:14,fontWeight:'bold'}}>Quota : {this.state.Quota} / Day  |  Available : {this.state.Available}  </Text>
                 </View>
  <View style={{flex:1,padding:5,marginTop:10}}>
      <ScrollView>
      {

parseInt(this.state.Available) > 0 ?
                        this.state.ListCustomer.map((item,key)=>(
<BoxCall key={key} Name={item.Name} OutletName="-" TimePlan="-" CustomerId={item.IdCustomer} Images={item.Images}
  CallType = "2"
  IdTerritoryCoverage = {item.IdTerritoryCoverage}
  Token = {this.props.route.params.Token}
  PlanId = ""
  PamCode = {this.props.route.params.PamCode}

/>
))
:
<View>
      <Text style={{fontWeight:'bold',fontSize:20,}}>Your UnPlan Call Quota Has Run Out</Text>
</View>

}

  
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
        shadowRadius: 3.84,
        
        elevation: 5,
      }
})

export default RegisterUnplanScreen
