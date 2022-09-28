import React, { Component } from 'react'
import { StyleSheet, Text, View,Alert,BackHandler } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderBack from '../components/HeaderBack';
import {Picker} from '@react-native-community/picker';
import { Input,Button  } from 'react-native-elements';
// import DatePicker from 'react-native-datepicker'
import DateTimePicker from '@react-native-community/datetimepicker';
import NetInfo from "@react-native-community/netinfo";
import Loading from '../components/Loading';
export class ReasonNoCallScreen extends Component {


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
          Reason : '',
          ShowLoading : false
        }
      }

      ExecuteReason = async () =>{



        const controller = new AbortController();
        setTimeout(()=> controller.abort(), global.TimeOut);
        var details = {
            'PamCode' : this.props.route.params.PamCode,
            'ReasonNoCall' : this.state.Reason,
            'IdPlan' : this.props.route.params.IdPlan
      };


      
      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
          fetch(global.Api + "/Api/UpdateReasonNoCall",
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
              this.setState({ShowLoading:false})
              if (data.Status == "1") {
                Alert.alert(
                  "Success",
                  "Reason Data Saved Successfully",
                  [

                    { text: "OK", onPress: () => {
                      this.props.navigation.navigate("MyCallScreen",{
                        OnRefreshPerfomance : "1"
                      });
                    } }
                  ]
                );
             
              }else{
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

      SaveReason = async () =>{


        // validation 
        if (this.state.Reason!="") {
          try {
            NetInfo.fetch().then(state => {

              console.log("Is connected?", state.isConnected);  
              if(state.isConnected){
                this.setState({ShowLoading:true})
                  this.ExecuteReason()
              }else{
                // alert("Connection Internet bloon!")
                
                
                this.showAlertNoInternet("No Internet Connection!","You need to have Mobile Data or Wifi to Access this Page.");
              }
            });
          } catch (err) {
            console.warn(err);
          }
        }else{
          this.showAlert("Error","Your Form Is Incomplete, Please Check Again")
        }


        
      }
      
    render() {
      const Title = "Reason No Call - " + this.props.route.params.CustomerName
        return (
            
            <View style={{flex:1}}>
              {
     this.state.ShowLoading   ? 
   <Loading/>
     :
     <View></View>
   }
           <HeaderBack Name={Title} navigation={this.props.navigation}/>
           <View style={{flex:1,paddingLeft:10,paddingRight:10,paddingTop:20, backgroundColor:'white',}}>
                <View style={{height:65,
                  // borderBottomWidth:0.5,
                  flexDirection:'row'
                  }}>
                    <View style={{flex:1,borderBottomWidth:0.5,}}>
                    <Text style={{fontSize:12,marginTop:10}}>Time Plan </Text>
 <Text style={{marginTop:10}}>{this.props.route.params.TimePlan}</Text>
                    </View>
<View style={{width:20}}></View>


                    <View style={{width:20}}></View>
<View style={{flex:1,borderBottomWidth:0.5,}}>
                    <Text style={{fontSize:12,marginTop:10}}>Outlet </Text>
 <Text style={{marginTop:10}}>{this.props.route.params.OutletName}</Text>
                    </View>              
</View>

<Text style={{fontSize:12,marginTop:10}}>Reason</Text>
                <View style={{height:80,}}>
                
 <Input
   placeholder="Insert Activity"
   style={{
       fontSize:15
   }}
   value={this.state.Reason}
   onChangeText={
     (res)=>{
       this.setState({Reason:res})
     }
   }
   multiline={true}
   numberOfLines={3}
   />
</View>








<View style={{height:50,marginTop:70,flexDirection:'row'}}>
    <View style={{flex:1}}></View>
    <View style={{flex:1}}>
    <Button
        onPress={
            ()=>{
                this.SaveReason()
            }
        }
  icon={
    <Icon
      name="download"
      size={18}
      color="white"
    />
  }
  buttonStyle={{
      height:50,
      backgroundColor:'#00a0e0',
      borderRadius:20
  }}
  title="   SAVE"
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

export default ReasonNoCallScreen
