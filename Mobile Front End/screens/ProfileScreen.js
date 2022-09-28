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
function ProfileScreen() {
    const {navigate} = useNavigation();
    const {signIn,signOut} = React.useContext(AuthContext);

    const [Code, SetCode] = useState('');
    const [Role, SetRole] = useState('');
    const [Name, SetName] = useState('')
    const [Year,SetYear] = useState('');
    const [Month,SetMonth] = useState('');
    const [Token,SetToken] = useState('');
    const [Week,SetWeek] = useState('');
    const [Email, setEmail] = useState('');
    const [Gender, setGender] = useState('');
    const [IdUser, setIdUser] = useState('')
    const [DisplayPicture, setDisplayPicture] = useState('global.ApiImage+"/Pam/noimage.png"');
    const [FirstPassword, setFirstPassword] = useState("");
    const [SecondPassword, setSecondPassword] = useState("");
    const [ShowUpdatePassword, setShowUpdatePassword] = useState(false);
    const [Title, setTitle] = useState(ShowUpdatePassword ? 'Update Password' : 'Account');
    const [ShowLoading, setShowLoading] = useState(false)

    const [Phone, setPhone] = useState('');



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

            const valueDisplayPicture = await AsyncStorage.getItem("DisplayPicture");
          if(valueDisplayPicture !== null) {
            setDisplayPicture(global.ApiImage+"/Pam/"+valueDisplayPicture)
          }else{
            setDisplayPicture(global.ApiImage+"/Pam/noimage.png");
          }

        } catch(e) {
            console.log("error fetch data",e.message)
          // error reading value
        }
      }

      const openGallery = () => {
        const options = {
        storageOptions: {
        path: 'movies'
        
        },
        mediaType: 'photo',
        includeBase64: true,
        };
        
        launchImageLibrary({
          mediaType:'photo',
          maxWidth:600,
          maxHeight:800
        }, response => {
        console.log('Response = ', response);
        if (response.didCancel) {
        console.log('User cancelled image picker');
        } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        } else {


        console.log("Uri Asset = " + response.assets[0]['uri'] );
        // this.setState({
        //   ImageUri : response.assets[0]['uri'],
        //   ImageType : response.assets[0]['type'],
        //   ImageFileName : response.assets[0]['fileName'],
        //   StatusImage : true
        // })
            // setDisplayPicture(response.assets[0]['uri'])
            UploadImageAndUpdateUser(response.assets[0]['uri'],response.assets[0]['type'],response.assets[0]['fileName'])
        

        }
        });
        };


        const UpdateImageUser = async (Image) =>{
            const controller = new AbortController();
            setTimeout(()=> controller.abort(), global.TimeOut);
            var details = {
              "PamCode" : Code,
              "Id" : IdUser,
              "Image" : Image
          };
    
          // alert(JSON.stringify(this.props.route.params.Token))
          
          var formBody = [];
          for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
          }
          formBody = formBody.join("&");
  
          console.log("detail Input Customer",JSON.stringify(details))
          console.log("detail form body",JSON.stringify(formBody))
              
          fetch(global.Api + "/Api/UpdateDisplayPicturePAM",
              {
                "signal": controller.signal,
                method : 'post',
                headers: {
                  'Token' : Token,
                  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
                body : formBody
              }).then((response) => response.json()).
              then(
                data =>{
                  // alert(data.Status);
                  console.log("Data User",data);
                  setShowLoading(false)
                  // SetShowLoading(false);
                  if (data.Status == "1") {
                    Alert.alert(
                      "Success",
                      "Display Picture Sucess Updated , Please Login Again !",
                      [
    
                        { text: "OK", onPress: () => {
                        AsyncStorage.clear();
                        signOut();
                        //   this.props.navigation.navigate("CoverageScreen",{
                        //     OnRefreshPerfomance : "1"
                        //   });
                        } }
                      ]
                    );
                 
                  }else{
                    if(data.Message == "Invalid Token"){
                      showAlertTokenExpired();
                     }else{
                      showAlert("Error",data.Message);
                      console.log("Error Log",data.Message);
                     }
                    
                  }
    
                  
                }
              ).catch(
                e=> {
                  // SetShowLoading(false);
                  setShowLoading(false)
                  if (e.message == "Aborted") {
                    showAlert("Error","Poor Connection !");    
                  }else{
                    showAlert("Error",e.message);
                  }
                  // console.log("catch error fetch =" + e.message)
    
    
    
    
                
                })
          }

        const UploadImageAndUpdateUser = async (ImageUri,ImageType,ImageFileName) =>  {
            setShowLoading(true);
            console.log("Start Upload Image Customer")
            const controller = new AbortController();
            setTimeout(()=> controller.abort(), global.TimeOut);
    
            var file = new FormData();
            file.append('file', {
              uri: ImageUri,
              type: ImageType , // or photo.type
              name: ImageFileName
            });
            
            console.log(" file",file);
            // console.log("uri =" + this.state.ImageUri + " type =" + this.state.ImageType + " name =" + this.state.ImageFileName)
     
              fetch(global.Api + "/Api/UploadImagePAM",
              {
                "signal": controller.signal,
                method : 'post',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'multipart/form-data'
                },
                body : file
              }).then((response) => response.json()).
              then(
                data =>{
                  
                    if (data.Status == "1") {
                      console.log("Success Upload");
                      UpdateImageUser(data.Message)
                    //   this.ExecuteNewCustomer(data.Message);
                      // this.ExecuteCall(Longitude,Latitude,data.Message);
                    }else{
                        setShowLoading(false)
                    //   this.setState({ShowLoading:false});
                    showAlert("Error", data.Message)
                    }
                  
                }
              ).catch(
                e=> {
                //   this.setState({ShowLoading:false});
                setShowLoading(false)
                  if (e.message == "Aborted") {
                   showAlert("Error","Poor Connection !");    
                  }else{
                    showAlert("Error",e.message);
                  }
  
    
    
    
    
                
                })
    
             
    
    
    
            }


      useEffect(() => {
          _retrieveData();
      }, []);


      const Validation = () =>{
        if (NewPassword!="" && SecondPassword!="") {
          alert(NewPassword + "-" + SecondPassword)
        } else {
          showAlert("Error","Form Required is Not Complete !")
        }
      }
  
      const ShowProfile = () =>{
        return (
          <View style={{flex:1}}>
            <HeaderTitle Title={Title} />
             {/* top header */}
           <View style={{height:170,padding:10,flexDirection:'column',}}>
               <View style={{height:150,}}>

                   <ImageBackground source={{uri:global.ApiImage+"/Asset/bg_profile.jpg"}} 
                   style={{
                    flex: 1,
                    justifyContent: "center",
                    flexDirection:'row',
                    borderRadius:5
                   }}
                   resizeMode="cover"
                   >
                       
                       <View style={{flex:1,justifyContent:'center'}}>
                           <Image 
                        //    source={require('../asset/image/profile.jpg')}
                           source={{uri:DisplayPicture}}
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
                           <TouchableOpacity
                           onPress={
                               ()=>{
                                   openGallery()
                               }
                           }
                           style={{
                               alignSelf:'center',
                               marginLeft:80,
                               marginTop:-10,
                               borderRadius:40,
                            width:30,   
                            height:30,
                            backgroundColor:'white',
                            justifyContent:'center'
                            }}
                           >
                                               <Icon
            name='camera'
            size={16}
            color='grey'
            style={{
                textAlign:'center'
            }}
          />
                           </TouchableOpacity>
                       </View>
                       <View style={{flex:1,justifyContent:'center'}}>
                           {/* <Text style={{fontSize:12,color:'white'}}>Welcome ,</Text> */}
                           <Text style={{fontSize:18,color:'white'}}>{Name} - {Role}</Text>
                           <Text style={{fontSize:14,color:'white'}}>{Code}</Text>
                       </View>

                   </ImageBackground>
               </View>
              

           </View> 
           {/* close top header */}
           <View style={{flex:1,padding:5}}>
                <View style={[ Styles.boxShadow, {flex:1,padding:10}]}>
                        <Text style={{fontSize:15,fontWeight:'bold'}}>Profile Data</Text>

                        <View style={{height:50,flexDirection:'row',marginBottom:10,marginTop:20}}>
            <View style={{flex:1,borderBottomWidth:0.5}}>
                <Text style={{fontSize:12}}>Email</Text>
                <View style={{flex:1,flexDirection:'row'}}>
                <Icon
            name='envelope-o'
            size={18}
            color='grey'
            style={{
                marginTop:5
            }}
          />
                <Text style={{fontSize:15,marginLeft:10,marginTop:4}}>{Email}</Text>
                </View>
            </View>
            <View style={{width:15}}></View>
            <View style={{flex:1,borderBottomWidth:0.5}}>
            <Text style={{fontSize:12}}>Phone</Text>
                <View style={{flex:1,flexDirection:'row'}}>
                <Icon
            name='phone'
            size={18}
            color='grey'
            style={{
                marginTop:5
            }}
          />
                <Text style={{fontSize:15,marginLeft:10,marginTop:4}}>{Phone}</Text>
                </View>
            </View>
        </View>

        <View style={{height:50,flexDirection:'row',marginBottom:10,}}>
            <View style={{flex:1,borderBottomWidth:0.5}}>
                <Text style={{fontSize:12}}>Gender</Text>
                <View style={{flex:1,flexDirection:'row'}}>
                <Icon
            name='heart-o'
            size={18}
            color='grey'
            style={{
                marginTop:5
            }}
          />
                <Text style={{fontSize:15,marginLeft:10,marginTop:4}}> {Gender} </Text>
                </View>
            </View>
            <View style={{width:15}}></View>
            <View style={{flex:1,borderBottomWidth:0.5}}>
            <Text style={{fontSize:12}}>Role</Text>
                <View style={{flex:1,flexDirection:'row'}}>
                <Icon
            name='user-md'
            size={18}
            color='grey'
            style={{
                marginTop:5
            }}
          />
                <Text style={{fontSize:15,marginLeft:10,marginTop:4}}>{Role}</Text>
                </View>
            </View>
        </View>


        <View style={{marginTop:30,padding:10,height:60,flexDirection:'row'}}>
                
                <TouchableOpacity style={{flex:1,backgroundColor:'#e74c3c',justifyContent:'center'}}
                onPress={
                  ()=>{
                    AsyncStorage.clear();
                    signOut()
                  }
                }
                >
                  <Text style={{color:'white',textAlign:'center'}}>LOGOUT</Text>
                </TouchableOpacity>
                <View style={{width:10}}></View>
                <TouchableOpacity style={{flex:1,backgroundColor:'#2c3e50',justifyContent:'center'}}
                onPress={
                  ()=>{
                    // setShowUpdatePassword(true);
                    // setTitle("Update Password");
                    navigate("UpdatePasswordScreen")
                  }
                }
                >
                  <Text style={{color:'white',textAlign:'center'}}>UPDATE PASSWORD</Text>
                </TouchableOpacity>
        </View>

                </View>
           </View>
        </View>
        )
      }

      const ViewUpdatePassword = ()=>{
        return (
          <View style={{flex:1,backgroundColor:'white',padding:20}}>
                  <View style={[ {height:60,padding:5,flexDirection:'row',
                      backgroundColor:'white',shadowColor: "#000",
                      shadowOffset: {
                          width: 0,
                          height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      
                      elevation: 5,
                      marginBottom:40
                }]}>
        <View style={{width:50,justifyContent:'center'}}>
            
        <TouchableOpacity
        onPress={
            ()=> {
                setShowUpdatePassword(false)
            }}
        >
<Icon
name='angle-left'
size={20}
color='#36434b'
style={{
alignSelf:'center',
alignItems:'center'
}}
/>
</TouchableOpacity>
        </View>
        <View style={{flex:1,justifyContent:'center'}}>
            <Text style={{fontSize:17,fontWeight:'bold',textAlign:'center',color:'#36434b'}}>Update Password</Text>
        </View>
</View>
            <Text style={{fontWeight:'bold',fontSize:20,}}>Change Password</Text>
            <Text style={{marginTop:20,color:'#95a5a6'}}>New Password {FirstPassword} <Text style={{color:'red'}}>*</Text></Text>
            <Input
value={FirstPassword}
onChangeText={
  setFirstPassword
}
/>


<Text style={{marginTop:5,color:'#95a5a6'}}>Re-Type New Password <Text style={{color:'red'}}>*</Text></Text>
            <Input
            // secureTextEntry={true}
            secureTextEntry={true}
            value={SecondPassword}
            onChange ={
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
        )
      }

    return (
<View style={{flex:1}}>
{
     ShowLoading   ? 
   <Loading/>
     :
     <View></View>
   }
        

{
  ShowUpdatePassword ?
  <ViewUpdatePassword/>
  :<ShowProfile/>
}

      
        <BottomNavigation navigate={navigate} isPage="Profile"/>
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
export default ProfileScreen
