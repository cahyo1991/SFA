import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import {View,Text,StyleSheet,Image,ImageBackground,Alert,BackHandler,TouchableOpacity} from 'react-native'
import BottomNavigation from '../components/BottomNavigation'
import { Input,Button  } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView,  } from 'react-native-gesture-handler';
import HeaderTitle from '../components/HeaderTitle';
import LinearGradient from 'react-native-linear-gradient';
import { AuthContext } from '../context';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../components/Loading';
import HeaderBack from '../components/HeaderBack'

function UpdatePasswordScreen({ route, navigation }) {


    const  showAlert = (Title,Message) =>
    Alert.alert(
      Title,
      Message
    );

    const showAlertTokenExpired = () =>
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
    
    const _retrieveData = async () => {
        try {

  
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
            SetToken(valueToken);
          }
          
          const valueWeek = await AsyncStorage.getItem("Week");
          if(valueWeek !== null) {
            SetWeek(valueWeek);
          }

          const valueEmail = await AsyncStorage.getItem("Email");
          if(valueEmail !== null) {
            setEmail(valueEmail)
          }

          const valueGender = await AsyncStorage.getItem("Gender");
          if(valueGender !== null) {
            setGender(valueGender)
          }

          const valuePhone = await AsyncStorage.getItem("Phone");
          if(valuePhone !== null) {
            setPhone(valuePhone)
          }

          const valueIdUser = await AsyncStorage.getItem("Id");
          if(valueIdUser !== null) {
            setIdUser(valueIdUser)
          }



        } catch(e) {
            console.log("error fetch data",e.message)
          // error reading value
        }
      }
      const [Code, SetCode] = useState('');
      const [Role, SetRole] = useState('');
      const [Name, SetName] = useState('')
      const [Year,SetYear] = useState('');
      const [Month,SetMonth] = useState('');
      const [Token,SetToken] = useState('');
      const [Week,SetWeek] = useState('');
      const [Email, setEmail] = useState('');
      const [Gender, setGender] = useState('');
      const [IdUser, setIdUser] = useState('');
      const [Phone, setPhone] = useState('')
    const [FirstPassword, setFirstPassword] = useState("");
    const [ShowLoading, SetShowLoading] = useState(false)
const [SecondPassword, setSecondPassword] = useState("");
const {signIn,signOut} = React.useContext(AuthContext);
const {navigate} = useNavigation();


const LogOutBro = () =>{
    AsyncStorage.clear();
    signOut();
}


function DoUpdatePassword(){
  const controller = new AbortController();
  setTimeout(()=> controller.abort(), global.TimeOut)
  var details = {
    'PamCode': Code,
      'Id': IdUser,
      'NewPassword' : FirstPassword
};

var formBody = [];
for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");

// console.log("FormBody",formBody)
    fetch(global.Api + "/Api/DoUpdatePassword",
    {
      "signal": controller.signal,
      method : 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Token' : Token
      },
      body : formBody
    }).then((response) => response.json()).
    then(
      data =>{
        // alert(data.Status);
        console.log("Data User",data);
       
        if (data.Status == "1") {
          SetShowLoading(false)
          Alert.alert(
              "Success",
              "Password is Changed, Please Login Again With New Password !",
              [
                {
                    text: 'OK', 
                    onPress: () => LogOutBro()
                  },
              ]
            );

        }else{
          SetShowLoading(false);
          showAlert("Error",data.Message);
        }

        
      }
    ).catch(
      e=> {
        SetShowLoading(false);
        if (e.message == "Aborted") {
          showAlert("Error","Poor Connection !");    
        }else{
          showAlert("Error",e.message);
        }
        // console.log("catch error fetch =" + e.message)




      
      })

   



  }

const DoUpdatePassword__ = () =>{
    var details = {
      'PamCode': Code,
      'Id': IdUser,
      'NewPassword' : FirstPassword
  };
  
  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const controller = new AbortController();
  setTimeout(()=> controller.abort(), global.TimeOut)
      fetch(global.Api + "/Api/DoUpdatePassword",
      {
        "signal": controller.signal,
        method : 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'Token' : Token
        },
        body : formBody
      }).then((response) => response.json()).
      then(
        data =>{
          // alert(data.Status);
          console.log("Data User",data);
         
          if (data.Status == "1") {
            SetShowLoading(false);
            Alert.alert(
                "Success",
                "Password is Changed, Please Login Again With New Password !",
                [
                  {
                      text: 'OK', 
                      onPress: () => LogOutBro()
                    },
                ]
              );

          }else{
            SetShowLoading(false);
            showAlert("Error",data.Message);
          }

          
        }
      ).catch(
        e=> {
          SetShowLoading(false);
          if (e.message == "Aborted") {
            showAlert("Error","Poor Connection !");    
          }else{
            showAlert("Error",e.message);
          }
          // console.log("catch error fetch =" + e.message)




        
        })

     



    }


useEffect(() => {
    _retrieveData();
}, )

const Validation = () =>{
    if (FirstPassword!="" && SecondPassword!="") {
    //   alert(FirstPassword + "-" + SecondPassword)
    console.log("FirstPassword",FirstPassword)
    // alert(FirstPassword["valueOf"])
    if (FirstPassword == SecondPassword) {
        // alert("Sama")
        SetShowLoading(true)
        DoUpdatePassword();
    } else {
        showAlert("Error","Password is Not Match !")
    }
    } else {
      showAlert("Error","Form Required is Not Complete !")
    }
  }

    return (
        <View style={{flex:1}}>
            {
     ShowLoading   ? 
   <Loading/>
     :
     <View></View>
   }
            <HeaderBack Name="Update Password" navigation={navigation}/>
        <View style={{flex:1,backgroundColor:'white',padding:20}}>

            <Text style={{fontWeight:'bold',fontSize:20,}}>Change Password</Text>
            <Text style={{marginTop:5,color:'#95a5a6'}}>New Password <Text style={{color:'red'}}>*</Text></Text>
            <Input
            secureTextEntry={true}
            value={FirstPassword}
            onChangeText ={
              value => setFirstPassword(value)
            }
  leftIcon={
    <Icon
      name='lock'
      size={24}
      color='black'
    />
  }
/>


<Text style={{marginTop:5,color:'#95a5a6'}}>Re-Type New Password <Text style={{color:'red'}}>*</Text></Text>
            <Input
            secureTextEntry={true}
            value={SecondPassword}
            onChangeText ={
              value => setSecondPassword(value)
            }
  // placeholder='INPUT WITH CUSTOM ICON'
  leftIcon={
    <Icon
      name='lock'
      size={24}
      color='black'
    />
  }
/>

<TouchableOpacity
onPress={
  ()=>{
    // Validation();
    Validation()
  }
}
style={{height:50,backgroundColor:'#2c3e50',justifyContent:'center'}}
>
<Text style={{textAlign:'center',fontWeight:'bold',color:'white',fontSize:17}}>UPDATE</Text>
</TouchableOpacity>

          </View>
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
export default UpdatePasswordScreen
