import React, { Component } from 'react'
import { StyleSheet, Text, View,Alert,BackHandler,Modal } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderBack from '../components/HeaderBack';
import {Picker} from '@react-native-community/picker';
import { Input,Button  } from 'react-native-elements';
// import DatePicker from 'react-native-datepicker'
import DateTimePicker from '@react-native-community/datetimepicker';
import Loading from '../components/Loading';
import NetInfo from "@react-native-community/netinfo";

export class RegisterPlanScreen extends Component {


   onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };



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


   showAlertTokenExpired = () =>
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

   showAlert = (Title,Message) =>
  Alert.alert(
    Title,
    Message,
    [
      {
          text: 'OK'
        },
    ]
  );


 


  //  getTotalPlanNotCall = async (PamCode,Token) =>{
  //   console.log("Token =" + Token)
  //    const controller = new AbortController();
  //    setTimeout(()=> controller.abort(), global.TimeOut)
  //      fetch(global.Api + "/Api/GetPlanPeriode?PamCode="+PamCode,
  //      {
  //        "signal": controller.signal,
  //        method : 'GET',
  //        headers: {
  //          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  //          'Token' : Token
  //        }
  //      }).then((response) => response.json()).
  //      then(
  //        data =>{
  //          // alert(data.Status);
           
           
  //          SetShowLoading(false);  
  //          if (data.Status !="1") {

  //             if(data.Message == "Invalid Token"){
  //               console.log("Error Retrieve Data GetPerfomance =" + data.Message);
  //               this.showAlertTokenExpired();
  //              }else{
  //               this.showAlert("Error",data.Message)
  //              }
  //          }else{
            
               
              
  //             for (let index = 0; index < data.Return.length; index++) {
  //                 // alert(data.Return[index]['CustomerName'])    
  //               // SetTotalPlan(data.Return[index]['TotalPlan']);  
                

  //             }
              
                 

  //          }

           


       
  //        }
  //      ).catch(
  //        e=> {

  //          console.log("catch error fetch =" + e.message)
  //          if (e.message == "Aborted") {
  //            this.showAlert("Error","Poor Connection !");
  //            SetShowLoading(false);    
  //          }else{
  //            this.showAlert("Error",e.message);
  //            SetShowLoading(false);
  //          }
  //        })
  //    } 

    constructor(props){
        super(props)
        this.state = {
          // date:"2021-10-04",
          showDate : false,
          showTime : false,
          time : new Date(1598051730000),
          date : new Date(2021,9,1),
          DatePlan : '',
          IdWeek : this.props.route.params.IdWeek,
          PamCode : this.props.route.params.PamCode,
          Token : this.props.route.params.Token,
          ListCustomer : [],
          ListOutlet : [],
          OutletSelected : '',
          ShowLoading : false,
          ShowModal : false,
          IdTerritoryCoverage : '',
          ListInputPlan : [],
          indexSelectedCustomer : '',
          indexSelectedOutlet : ''
        }
      }



      getCustomerPam = async () =>{
        console.log("Token =" + this.props.route.params.Token)
         const controller = new AbortController();
         setTimeout(()=> controller.abort(), global.TimeOut)
           fetch(global.Api + "/Api/GetEtcpPlanPAM?PamCode="+this.props.route.params.PamCode+"&&IdWeek="+this.props.route.params.IdWeek,
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
                      'Id' : data.Return[index]['IdTerritoryCoverage'],
                      'Name' : data.Return[index]['CustomerName']

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
         
         

         SavePlan = async (Index,Length,IdTerritoryCoverage,Date,Time,IdWeekOfMonth,IdOutlet) =>{  

          const controller = new AbortController();
          setTimeout(()=> controller.abort(), global.TimeOut);
          var details = {
            IdTerritoryCoverage :IdTerritoryCoverage,
            Date : Date,
            Time : Time,
            PamCode : this.props.route.params.PamCode,
            Status : '2',
            IdWeekOfMonth : IdWeekOfMonth,
            IdOutlet : IdOutlet
        };
  
        console.log("detail call",JSON.stringify(details))
        
        var formBody = [];
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
            fetch(global.Api + "/Api/InsertPlan",
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
                      "Call Data Saved Successfully",
                      [
    
                        { text: "OK", onPress: () => {
                          this.props.navigation.navigate("MyCallScreen",{
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


         getOutletCustomer = async (IdTerritoryCoverage) =>{
          console.log("Token =" + this.props.route.params.Token)
           const controller = new AbortController();
           setTimeout(()=> controller.abort(), global.TimeOut)
             fetch(global.Api + "/Api/GetOutletByCustomer?PamCode="+this.props.route.params.PamCode+"&&IdTerritoryCoverage="+IdTerritoryCoverage,
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
                 if (data.Status !="1") {
      
                    if(data.Message == "Invalid Token"){
                      console.log("Error Retrieve Data GetPerfomance =" + data.Message);
                      this.showAlertTokenExpired();
                      
                     }else{
                      this.showAlert("Error",data.Message)
                     }
                 }else{
                  
                     
                  console.log("Data Outlet",JSON.stringify(data))
                    const _ListOutlet = [];
                    for (let index = 0; index < data.Return.length; index++) {
                      _ListOutlet.push({
                        'Id' : data.Return[index]['Id'],
                        'Name' : data.Return[index]['Name']
                      })
                        // alert(data.Return[index]['CustomerName'])    
                      // SetTotalPlan(data.Return[index]['TotalPlan']); 
      
                    }
      
                    this.setState({
                      ListOutlet : _ListOutlet 
                    })
                 }
               }
             ).catch(
               e=> {
                 console.log("catch error fetch =" + e.message)
                 if (e.message == "Aborted") {
                   this.showAlert("Error","Poor Connection !");    
                 }else{
                   this.showAlert("Error",e.message);
                 }
               })
           } 



           DoSavePlan = async() =>{
            // SavePlan = async (Index,Length,IdTerritoryCoverage,Date,Time,IdWeekOfMonth,IdOutlet)
            if (this.state.ListInputPlan.length == 0) {
              this.showAlert("Error","List Plan Is Empty !")
            }else{
              this.setState({
                ShowLoading:true
              })
              for (let index = 0; index < this.state.ListInputPlan.length; index++) {
                
                this.SavePlan((index+1),this.state.ListInputPlan.length,
                this.state.ListInputPlan[index].IdTerritoryCoverage,
                this.state.ListInputPlan[index].DatePlan.getFullYear()  + "-" + ("0" + (this.state.ListInputPlan[index].DatePlan.getMonth() + 1)).slice(-2)  + '-' + ("0" + (this.state.ListInputPlan[index].DatePlan.getDate())).slice(-2),
                this.state.ListInputPlan[index].Time.getHours()+":"+this.state.ListInputPlan[index].Time.getMinutes(),
                this.state.IdWeek,
                this.state.ListInputPlan[index].IdOutlet
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
    

      retrieveData = async () => {

        await this.getCustomerPam();

      }

       FetchData = async () =>{
        // SetShowLoading(true);
        
        var self = this;

        this.setState({
          ShowLoading : true
        })
        setTimeout(function(){ 
                
            NetInfo.fetch().then(state => {
    
              console.log("Is connected?", state.isConnected);  
              if(state.isConnected){
                self.retrieveData();    
              }else{
                // alert("Connection Internet bloon!")
                console.log("Not Connected")
                // SetShowLoading(false);
                self.setState({
                  ShowLoading : false
                })
                self.showAlertNoInternet("No Internet Connection!","You need to have Mobile Data or Wifi to Access this Page.");
              }
            });
          
          },1000 );
    
    }


    removeInputPlan (index) {
      var array = [...this.state.ListInputPlan]; // make a separate copy of the array
      
        array.splice(index, 1);
        this.setState({ListInputPlan: array});
      
    }


    AddPlan = () =>{
      if (this.state.IdTerritoryCoverage!="" && this.state.OutletSelected!="" && this.state.DatePlan!="" && this.state.time!="") {
        // alert("Go Insert")
        // this.state.ListCustomer[this.state.indexSelectedCustomer-1].Name
        var datax = [...this.state.ListInputPlan];
       datax.push({
          'IdTerritoryCoverage' : this.state.IdTerritoryCoverage,
          'IdOutlet' : this.state.OutletSelected,
          'DatePlan' : this.state.DatePlan,
          'Time' : this.state.time,
          'DisplayCustomer' : this.state.ListCustomer[this.state.indexSelectedCustomer-1].Name + ' - ' +
          this.state.ListOutlet[this.state.indexSelectedOutlet-1].Name,
          'DisplayDate' : ("0" + (this.state.DatePlan.getDate())).slice(-2) + "-" + ("0" + (this.state.DatePlan.getMonth() + 1)).slice(-2)  + '-' + this.state.DatePlan.getFullYear(),
          'DisplayTime' : this.state.time.getHours() + ":" + this.state.time.getMinutes()
        });
        this.setState({
          ListInputPlan : datax,
          OutletSelected : '',
          DatePlan : '',
          IdTerritoryCoverage : '',
          ListOutlet : []
        })

        console.log("List Input Plan",this.state.ListInputPlan)

      }else{
        this.showAlert("Error", "Form Is Not Completed !")
      }
    }

    componentDidMount = () =>{
      this.FetchData();
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


           <HeaderBack Name="Add Schedule - Plan" navigation={this.props.navigation}/>
           <View style={{flex:1,paddingLeft:10,paddingRight:10,paddingTop:20, backgroundColor:'white',}}>
  



<View style={{height:50,flexDirection:'row',marginTop:15}}>
    <View style={{flex:1,borderBottomWidth:0.5,paddingRight:10}}>
                <Text style={{fontSize:12}}>Customer Name</Text>    
                <Picker
  selectedValue={this.state.IdTerritoryCoverage}
  style={{height: 35,
}}
  onValueChange={(itemValue, itemIndex) =>
    this.setState({
      IdTerritoryCoverage: itemValue},()=>{
        this.getOutletCustomer(itemValue)
        this.setState({
          indexSelectedCustomer : itemIndex
        })
      })


  }
  >
      <Picker.Item label="Select Customer Name" value=""  />

      {
        this.state.ListCustomer.map((item,key)=>(
          <Picker.Item label={item.Name} value={item.Id} key={key}/>
        ))
      }



</Picker>
    </View>
    <View style={{width:10}}></View>
    <View style={{flex:1,borderBottomWidth:0.5,paddingRight:10}}>
                <Text style={{fontSize:12}}>Outlet  </Text>    
                <Picker
  selectedValue={this.state.OutletSelected}
  style={{height: 35,
}}
  onValueChange={(itemValue, itemIndex) =>
    this.setState({OutletSelected: itemValue},()=>{
      this.setState({
        indexSelectedOutlet : itemIndex
      })
    })
  }
  >
      <Picker.Item label="Select Outlet" value=""  />
      {
        this.state.ListOutlet.map((item,key)=>(
          <Picker.Item label={item.Name} value={item.Id} key={key}/>
        ))
      }


</Picker>
    </View>
   
</View>

<Text style={{fontSize:12,marginTop:10}}>Call Time  </Text>
<View style={{height:50,flexDirection:'row',marginTop:15}}>
{this.state.showDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={this.state.date}
          mode="date"
          minimumDate={new Date(this.props.route.params.YearStartWeek,this.props.route.params.MonthStartWeek - 1,this.props.route.params.DayStartWeek)}
          maximumDate={new Date(this.props.route.params.YearEndWeek,this.props.route.params.MonthEndWeek - 1,this.props.route.params.DayEndWeek)}
          // is24Hour={true}
          display="default"
          onChange={
            (event, selectedDate) => {
              const currentDate = selectedDate || "";
              
              // setDate(currentDate);
              this.setState({
                DatePlan : currentDate,
                showDate : false
              })
            }
          }
        />
      )}

{this.state.showTime && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date(1598051730000)}
          mode="time"
          is24Hour={true}
          display="clock"
          onChange={
            (event, selectedDate) => {
              const currentDate = selectedDate || this.state.time;
              
              // setDate(currentDate);
              this.setState({
                time : currentDate,
                showTime : false
              })
            }
          }
        />
      )}
      
    <View style={{flex:1,borderBottomWidth:0.5,paddingRight:10}}>

                
<View style={{flex:1,paddingRight:10}}>
                <TouchableOpacity onPress={
                  ()=>{
                    this.setState({
                      showDate : true
                    })
                  }
                }>
                  <Text style={{fontSize:12}}>Date</Text>    
                <Text style={{fontSize:15,marginLeft:20,marginTop:5}}>
                  
                {
                  this.state.DatePlan!="" ?
                  ("0" + (this.state.DatePlan.getDate())).slice(-2) + "-" + ("0" + (this.state.DatePlan.getMonth() + 1)).slice(-2)  + '-' + this.state.DatePlan.getFullYear()
                   :"-"}

                  </Text>    
                
                </TouchableOpacity>
    </View>

    </View>
    <View style={{width:20}}></View>
    
    <View style={{flex:1,borderBottomWidth:0.5,paddingRight:10}}>
                <TouchableOpacity
                onPress={
                  ()=>{
                    this.setState({
                      showTime:true
                    })
                  }
                }
                >
                <Text style={{fontSize:12}}>Best Time</Text>    
                <Text style={{fontSize:15,marginTop:3,marginLeft:10}}>
                  {this.state.time.getHours() + ":" + this.state.time.getMinutes()}
                </Text>
                </TouchableOpacity>
    </View>
</View>



<View style={{height:50,marginTop:20,flexDirection:'row',marginBottom:20}}>
    <View style={{flex:1}}></View>
    <View style={{width:100}}>
    <Button
        onPress={
            ()=>{
                this.AddPlan();
            }
        }
  icon={
    <Icon
      name="cloud-download"
      size={18}
      color="white"
    />
  }
  buttonStyle={{
      height:50,
      backgroundColor:'#00a0e0',
      borderRadius:5
  }}
  title="  ADD"
/>
    </View>
    <View style={{flex:1}}></View>
</View>


<View style={{flex:1,borderWidth:0.5,padding:5}}>
    <View style={{height:30,flexDirection:'row'}}>
    <Text>List Plan Customer</Text>
    </View>
    <View style={{flex:1,padding:5}}>
    <ScrollView>
  

    {
        this.state.ListInputPlan.map((item,key)=>(
          
          <View style={{height:30,flexDirection:'row',borderBottomWidth:0.5,marginBottom:10}} key={key}>
          <View style={{flex:1,flexDirection:'row'}}>
          <Icon
    name="user-md"
    size={20}
    color="#0b1013"
  /> 
  <Text style={{marginLeft:10,marginRight:10}}>{item.DisplayCustomer}</Text>
  <Icon
    name="calendar"
    size={20}
    color="#0b1013"
  /> 
  <Text style={{marginLeft:10,marginRight:10}}>{item.DisplayDate}</Text>
  <Icon
    name="safari"
    size={20}
    color="#0b1013"
  /> 
  <Text style={{marginLeft:10,marginRight:10}}>{item.DisplayTime}</Text>
          </View>

          <View style={{width:100,paddingBottom:2,paddingRight:10}}>
              <TouchableOpacity
              onPress={
                ()=>{
                  this.removeInputPlan(key)
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
              this.DoSavePlan()
                // console.log(
                //   "datasx",this.state.ListCustomer[this.state.indexSelectedCustomer-1].Name
                // )
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

export default RegisterPlanScreen
