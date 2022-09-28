import React, { Component } from 'react'
import { StyleSheet, Text, View,Alert,BackHandler,Modal,Pressable } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderBack from '../components/HeaderBack';
import {Picker} from '@react-native-community/picker';
import { Input,Button  } from 'react-native-elements';
// import DatePicker from 'react-native-datepicker'
import DateTimePicker from '@react-native-community/datetimepicker';
import Loading from '../components/Loading';

export class RegisterCoverageScreen extends Component {


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

  removeInputCoverage (index) {
    var array = [...this.state.ListInputCoverage]; // make a separate copy of the array
    
      array.splice(index, 1);
      this.setState({ListInputCoverage: array});
    
  }

  GetCustomerSearch = async (Keyword) =>{
    console.log("Start GetCustomerSearch")
      const controller = new AbortController();
      setTimeout(()=> controller.abort(), global.TimeOut)

        fetch(global.Api + "/Api/GetCustomerNoETCP?PamCode=" + this.props.route.params.PamCode +"&&Search="+Keyword,
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
                // alert(JSON.stringify(data))
                console.log("Data Outlet",data);
                if (data.Status == "1") {
                    console.log("Success Get GetCustomerSearch");
                    const DataCustomer = [];
                    for (let index = 0; index < data.Return.length; index++) {
                      DataCustomer.push({
                          'Id' : data.Return[index]["IdCustomer"],
                          'Name' : data.Return[index]["CustomerName"]
                        })
                    }
                    this.setState({
                      ListCustomer : DataCustomer
                    })
                }else{
                  // showAlertTokenExpired

                  if(data.Message == "Invalid Token"){
                    this.showAlertTokenExpired();
                   }else{
                    this.showAlert("Error",data.Message);
                   }
                  
                }
          } 
        ).catch(
          e=> {
            
            if (e.message == "Aborted") {
              this.showAlert("Error","Poor Connection !");    
            }else{
              this.showAlert("Error",e.message);
            }
            // console.log("catch error fetch =" + e.message)
          })}



          SaveCoverage = async (Index,Length,IdCustomer) =>{  

            const controller = new AbortController();
            setTimeout(()=> controller.abort(), global.TimeOut);
            var details = {
              IdCustomer: IdCustomer,
              PamCode :this.props.route.params.PamCode,
              Status : "2"
          };
    
          console.log("detail plan",JSON.stringify(details))
          
          var formBody = [];
          for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
          }
          formBody = formBody.join("&");
              fetch(global.Api + "/Api/InsertEtcp",
              {
                "signal": controller.signal,
                method : 'post',
                headers: {
                  'Token' : this.props.route.params.Token,
                  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
                body : formBody
              }).then((response) => response.json()).
              then(
                data =>{
                  // alert(data.Status);
                  console.log("Data User",data);
                  // SetShowLoading(false);
                  
                  if (data.Status == "1" ) {
  
                    if( Index == Length){
                      this.setState({ShowLoading:false});
                    
                      Alert.alert(
                        "Success",
                        "Coverage Data Saved Successfully",
                        [
      
                          { text: "OK", onPress: () => {
                            this.props.navigation.navigate("CoverageScreen",{
                              OnRefreshPerfomance : "1"
                            });
                          } }
                        ]
                      );
                    }
  
                 
                 
                  }else{
                    this.setState({ShowLoading:false});
                    if(data.Message == "Invalid Token"){
                      this.showAlertTokenExpired();
                     }else{
                      this.showAlert("Error",data.Message);
                     }
                  }
    
                  
                }
              ).catch(
                e=> {
                  // SetShowLoading(false);
                  this.setState({ShowLoading:false})
                  if (e.message == "Aborted") {
                    this.showAlert("Error","Poor Connection !");    
                  }else{
                    this.showAlert("Error",e.message);
                  }
                  // console.log("catch error fetch =" + e.message)
    
    
    
    
                
                })
          }

          DoSaveCoverage = async() =>{
            // SavePlan = async (Index,Length,IdTerritoryCoverage,Date,Time,IdWeekOfMonth,IdOutlet)
            if (this.state.ListInputCoverage.length == 0) {
              this.showAlert("Error","List Plan Is Empty !")
            }else{
              this.setState({
                ShowLoading:true
              })
              for (let index = 0; index < this.state.ListInputCoverage.length; index++) {
                
                this.SaveCoverage((index+1),this.state.ListInputCoverage.length,
                this.state.ListInputCoverage[index].IdCustomer,
                )
                
              }
              // this.state.ListCustomer[this.state.indexSelectedCustomer-1].Name
              // datax.push({
              //   'IdTerritoryCoverage' : this.state.IdTerritoryCoverage,
              //   'IdOutlet' : this.state.OutletSelected,
              //   'DatePlan' : this.state.DatePlan,
              //   'Time' : this.state.time,
              //   'DisplayCustomer' : this.state.ListCustomer[this.state.indexSelectedCustomer-1].Name + ' - ' +
              //   this.state.ListOutlet[this.state.indexSelectedOutlet-1].Name,
              //   'DisplayDate' : ("0" + (this.state.DatePlan.getDate())).slice(-2) + "-" + ("0" + (this.state.DatePlan.getMonth() + 1)).slice(-2)  + '-' + this.state.DatePlan.getFullYear(),
              //   'DisplayTime' : this.state.time.getHours() + ":" + this.state.time.getMinutes()
              // });
            }
           }


    constructor(props){
        super(props)
        this.state = {
          // date:"2021-10-04",
          showDate : false,
          showTime : false,
          time : new Date(1598051730000),
          date : new Date(2021,9,1),
          CustomerSelected : '',
          IdCustomerSelected : '',
          ListCustomer: [],
          ListInputCoverage : [],
          ShowModal : false,
          ShowLoading : false
        }
      }
    render() {
        return (
            
            <View style={{flex:1}}>
              {
     this.state.ShowLoading   ? 
   <Loading/>
     :
     <View></View>
   }


<Modal
        animationType="slide"
        transparent={true}
        visible={this.state.ShowModal}
        // onRequestClose={() => {
        //   Alert.alert("Modal has been closed.");
        // }}
        >
          
<View style={{flex:1,padding:20}}>
        <View style={{flex:1}}></View>
        <View style={{flex:2,backgroundColor:'white',borderRadius:20,borderWidth:3,borderColor:'grey'}}>
          <View style={{flexDirection:'row',padding:10}}>
            <Text style={{flex:1,fontWeight:'bold'}}>MASTER CUSTOMER</Text>
            <View style={{width:50}}>
            <Pressable
            onPress={
              ()=>{
                this.setState({
                  ShowModal:false
                })
              }
            }
            style={{}}>
              <Text style={{fontWeight:'bold',fontSize:20,textAlign:'center'}}>X</Text>
            </Pressable>
            </View>

            </View>
          <Input
          placeholder="Search Customer"
          onChangeText={
            (res)=>{

              // GetOutletSearch
              this.GetCustomerSearch(res);
            }
          }
          />
     <View style={{flex:1,paddingLeft:10,paddingRight:10}}>
       <ScrollView>
         

                 {
        this.state.ListCustomer.map((item,key)=>(
          <View style={{padding:5,borderBottomColor:'grey',borderBottomWidth:1,height:35,}} key={key}>
            <Pressable
            onPress={
              ()=>{
                    // var _OutletNameActive = "OutletName" + this.state.OutletActive;
                    // var _OutletIdActive = "Outlet" + this.state.OutletActive;
                    var datax = [...this.state.ListInputCoverage];
                    datax.push({
                      IdCustomer : item.Id,
                      CustomerName : item.Name
                    })
                    this.setState({
                      // [_OutletNameActive] : item.Name,
                      // [_OutletIdActive] : item.Id,
                      ListInputCoverage : datax,
                      ShowModal : false

                    })
              }
            }
            >
              <Text>{item.Name}</Text>
            </Pressable>
         </View>
          // <Picker.Item label={item.Name} value={item.Id} key={key}/>
        ))
      }

       </ScrollView>

     </View>
        </View>
        <View style={{flex:1}}></View>
</View>
</Modal> 

           <HeaderBack Name="Add Coverage" navigation={this.props.navigation}/>
           <View style={{flex:1,paddingLeft:10,paddingRight:10,paddingTop:20, backgroundColor:'white',}}>





<TouchableOpacity style={{height:50,flexDirection:'row',marginTop:15}}
onPress={
  ()=>{
    this.setState({
      ShowModal : true
    })
  }
}
>


    <View style={{flex:1,borderBottomWidth:0.5,paddingRight:10}}>
                <Text style={{fontSize:12}}>Customer Name   <Text style={{color:'red'}}>*</Text> </Text>    
                <Text style={{color:'grey'}}> Tap To Choose Customer  </Text>
    </View>

</TouchableOpacity>





<View style={{height:30,marginTop:20,flexDirection:'row',marginBottom:20}}>

</View>


<View style={{flex:1,borderWidth:0.5,padding:5}}>
    <View style={{height:30,flexDirection:'row'}}>
    <Text>List New Coverage</Text>
    </View>
    <View style={{flex:1,padding:5}}>
    <ScrollView>

    {
    this.state.ListInputCoverage.map((item,index)=>(
      
 

        <View key={index} style={{height:30,flexDirection:'row',borderBottomWidth:0.5,marginBottom:10}}>
            <View style={{flex:1,flexDirection:'row'}}>
            <Icon
      name="user-md"
      size={20}
      color="#0b1013"
    /> 
    <Text style={{marginLeft:10,marginRight:10}}>{item.CustomerName}</Text>
    
            </View>

            <View style={{width:100,paddingBottom:2,paddingRight:10}}>
                <TouchableOpacity
                onPress={
                  ()=>{
                    this.removeInputCoverage(index)
                  }
                }
                >
            <Icon
      name="trash"
      size={20}
      color="#7f8c8d"
      style={{
          textAlign:'right'
      }}
    /> 
    </TouchableOpacity>
            </View>
  
        </View>


))
}




    </ScrollView>
    </View>
    
</View>


<View style={{height:50,marginTop:20,flexDirection:'row',marginBottom:20}}>
    <View style={{flex:1}}></View>
    <View style={{flex:2}}>
    <Button
        onPress={
            ()=>{
                this.DoSaveCoverage()
            }
        }
  icon={
    <Icon
      name="cloud-upload"
      size={18}
      color="white"
    />
  }
  buttonStyle={{
      height:50,
      backgroundColor:'#2ecc71',
      borderRadius:5
  }}
  title="  SAVE"
/>
    </View>
    <View style={{flex:1}}></View>
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

export default RegisterCoverageScreen
