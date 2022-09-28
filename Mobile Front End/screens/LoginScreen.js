import React, { useState,useEffect } from 'react'
import { View,Text,StyleSheet, Image, TouchableOpacity,Linking,Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input,Button  } from 'react-native-elements';
import AuthLoginScreen from './AuthLoginScreen';
import { AuthContext } from '../context';
import { useNavigation } from '@react-navigation/core';
import Loading from '../components/Loading';
import NetInfo from "@react-native-community/netinfo";
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase(
  {
    name:'MainDB',
    location:'default'
  },
  ()=>{

  },error => {console.log("Error SQLite =",error)
}
)
function LoginScreen() {

  const ClearDbSQLite = async (Code,Token) =>{
     await  db.transaction(
      (tx) =>{
        tx.executeSql(
          "DROP TABLE IF EXISTS Product",[],(sqlTxn,res)=>{
            console.log("DROP Table IF EXISTS Product  successfully")
            // CreateTableProduct(Code,Token);
          },error =>  console.log("error Delete table Product",error)
        )

      }
    )

    db.transaction(
      (tx) =>{
        tx.executeSql(
          "DROP TABLE IF EXISTS MasterField",[],(sqlTxn,res)=>{
              // CreateTableMasterField(Code,Token);  
            
            console.log("DROP Table MasterField  successfully")
          },error => console.log("error Delete table MasterField",error)
        )

      }
    )


  }


  const   CreateTableMasterField = async (Code,Token) =>{
    db.transaction(
      (tx)=>{
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS "
          +"MasterField  "
          +"(Id VARCHAR(200),Name VARCHAR(200),Type VARCHAR(200))",
          [],(sqlTxn,res)=>{
            console.log("table MasterField created successfully")
            GetInsertMasterFieldSqLite(Code,Token)
          },error => console.log("error create table Product",error)
        )
      }
    )
  }

  const CreateTableProduct = async (Code,Token) =>{
    db.transaction(
      (tx)=>{
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS "
          +"Product  "
          +"(Id INTEGER,Name VARCHAR(200))",
          [],(sqlTxn,res)=>{
            console.log("table Product created successfully");
            GetInsertProductSqLite(Code,Token)

          },error => console.log("error create table Product",error)
        )
      }
    )
  }

  const InsertTableProductSqLite =  (Id,Name,Index,Length,PamCode,Token) =>{
    db.transaction(
      (tx)=>{
        tx.executeSql(
          "INSERT INTO "
          +"Product  "
          +"(Id ,Name) VALUES('"+Id+"','"+Name+"')",
          [],(sqlTxn,res)=>{
            if (Index == Length) {
              console.log("Insert Data SQLite Products Success");
              setStatusDataProduct("1")
            }
            
            console.log("insert Product created successfully")
          },error => console.log("error created table Product",error)
        )
      }
    )
  }

  const   GetInsertMasterFieldSqLite = async (PamCode,Token) =>{
    console.log("Start Insert MasterField")
      const controller = new AbortController();
      setTimeout(()=> controller.abort(), global.TimeOut)

        fetch(global.Api + "/Api/GetMasterFields?PamCode=" + PamCode,
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
                // alert(JSON.stringify(data))
                console.log("Data Product",data);
                if (data.Status == "1") {
                    for (let index = 0; index < data.Return.length; index++) {
            InsertTableMasterField(data.Return[index]["Id"],data.Return[index]["Name"],
                      data.Return[index]["Type"],index,(data.Return.length-1)); 
                     }
      
                }else{
                  showAlert("Error",data.Message);
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

 const InsertTableMasterField =  (Id,Name,Type,Index,Length) =>{
    db.transaction(
      (tx)=>{
        tx.executeSql(
          "INSERT INTO "
          +"MasterField  "
          +"(Id ,Name ,Type) VALUES('"+Id+"','"+Name+"','"+Type+"')",
          [],(sqlTxn,res)=>{
            console.log("insert MasterField created successfully");
            if (Index == Length) {
              setStatusDataMasterFields("1");
              setStatusGetData("1");
            }
          },error => console.log("error insert MasterField MasterField",error)
        )
      }
    )
  }

  const  GetInsertProductSqLite = async (PamCode,Token) =>{
    
    console.log("Start Insert Product SqlLite")
      const controller = new AbortController();
      setTimeout(()=> controller.abort(), global.TimeOut)

        fetch(global.Api + "/Api/GetProducts?PamCode=" + PamCode,
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
                // alert(JSON.stringify(data))
                console.log("Data Product",data);
                if (data.Status == "1") {
                    console.log("Success Get Product From Database");
                    for (let index = 0; index < data.Return.length; index++) {
                      InsertTableProductSqLite(data.Return[index]["Id"],data.Return[index]["Name"],index,(data.Return.length-1),PamCode,Token );
                    }
                    
                }else{
                  showAlert("Error",data.Message);                  
                }
          } 
        ).catch(
          e=> {
            
            if (e.message == "Aborted") {
              showAlert("Error","Poor Connection !");    
            }else{
              showAlert("Error",e.message);
            }
          })  
  }



    const {signIn,signOut} = React.useContext(AuthContext);
    const {navigate} = useNavigation();
    // const {Login,SetLogin} = React.useState();
    const [ShowLoading,SetShowLoading] =useState(false);
    const [Nik,SetNik] = useState("");
    const [Password,SetPassword] = useState("");
    const [StatusDataProduct, setStatusDataProduct] = useState("0");
    const [StatusDataMasterFields, setStatusDataMasterFields] = useState("0");
    const [StatusGetData, setStatusGetData] = useState("0")
    const _storeData = async (key,value) => {
        try {
          await AsyncStorage.setItem(key, value)
        } catch (e) {
          // saving error
        }
      }

      const showAlert = (Title,Message) =>
  Alert.alert(
    Title,
    Message
  );
    


      const _retrieveData = async (Name) => {
        try {
          const value = await AsyncStorage.getItem(Name)
          if(value !== null) {
            SetLogin(value);
          }
        } catch(e) {
          // error reading value
        }
      }



      const FormValidation = ()=>{
        const res = Nik != "" && Password!="" ? true : false;
        return res;

      }

      

      function signOn(){
        const controller = new AbortController();
        setTimeout(()=> controller.abort(), global.TimeOut)
        var details = {
          'Nik': Nik,
          'Password': Password
      };
      
      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
          fetch(global.Api + "/Api/Login",
          {
            "signal": controller.signal,
            method : 'post',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body : formBody
          }).then((response) => response.json()).
          then(
            data =>{
              // alert(data.Status);
              console.log("Data User",data);
             
              if (data.Status == "1") {
                ClearDbSQLite(data.Return[0]["Code"],data.Return[0]["Token"]);
                             _storeData("IsLogin","true");
                  _storeData("Code",data.Return[0]["Code"]);
                  _storeData("Name",data.Return[0]["Name"]);
                  _storeData("Role",data.Return[0]["Role"]);
                  _storeData("Token",data.Return[0]["Token"]);
                  _storeData("Year",data.Return[0]["Year"]);
                  _storeData("Month",data.Return[0]["Month"]);
                  _storeData("Week",data.Return[0]["Week"]);
                  _storeData("IdWeek",data.Return[0]['IdWeek']);    
                  _storeData("DisplayPicture",data.Return[0]['Images']);
                  
                  _storeData("Email",data.Return[0]['Email']);
                  _storeData("Gender",data.Return[0]['Gender']);
                  _storeData("Phone",data.Return[0]['Phone']);
                  _storeData("Id",data.Return[0]['Id']);
                  
                    SetShowLoading(false);
                    signIn();

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

      const doSignIn = async ()=>{
        
        if (FormValidation()) {

          SetShowLoading(true);

          setTimeout(function(){ 
            
            NetInfo.fetch().then(state => {

              console.log("Is connected?", state.isConnected);
              // SetInet(state.isConnected);  
              if(state.isConnected){
                // alert("Connection Internet !")
                
                signOn();
              }else{
                SetShowLoading(false);
                showAlert("Error","No Connection Internet !");
              }
            });
          
          },3000 );


       


       
        }else{
          // alert("Mohon Cek Kembali Form Isian Anda !");
          showAlert("Error","Mohon Cek Kembali Form Isian Anda !");
        }


        // SetShowLoading(true);
        
      }

    
useEffect(() => {
  // CreateTableProduct();
    _retrieveData("IsLogin")
 
}, )




    return (
        <View style={
            [Styles.container,{
              flexDirection:"column"
            }]
          }>
   {
     ShowLoading  ? 
   <Loading/>
     :
     <View></View>
   }


      
            <View style={{flex:2,flexDirection:'column'}}>
              <View style={{flex:2}}></View>
              <View style={{flex:2}}>
              <Image style={Styles.logoImage} source={{uri:global.ApiImage+"Asset/etana_logo.png"}} />
              </View>
              <View style={{flex:2}}>
            
            </View>
            </View>
            <View style={{flex:1}}>
              <View style={{paddingLeft:5,paddingRight:5}}>
              <Input
              value={Nik}
              onChangeText={value => SetNik(value) }
              style={{
                paddingLeft:30,
                fontSize:20
              }}
        placeholder='Code'
        leftIcon={
          <Icon
            name='user'
            size={25}
            color='#0b1013'
          />
        }
      />
      
      <Input
      secureTextEntry={true}
      value={Password}
      onChangeText={
        value => SetPassword(value)
      }
              style={{
                paddingLeft:30,
                fontSize:20,
                marginTop:10
              }}
        placeholder='Password'
        leftIcon={
          <Icon
            name='lock'
            size={25}
            color='#0b1013'
          />
        }
      />
      
              </View>
            </View>
            <View style={{flex:3,}}>
              <TouchableOpacity style={{marginTop:30}} onPress={
                ()=>{
                  navigate("ForgotPasswordScreen")
                }
              } >
                <Text style={{fontSize:12,textAlign:'center',fontWeight:'bold',color:'#0b1013'}}>Forgot Password ? </Text>
              </TouchableOpacity>
              
              
              <Button
              onPress={
                  ()=>{
                    
                      doSignIn();
                  }
              }
              buttonStyle={{
                marginTop:40,
                width:160,
                // padding:20,
                alignItems:'center',
                alignSelf:'center',
                backgroundColor:"#00a0e0",
                borderRadius:15
              }}
              titleStyle={{
                fontSize:15
              }}
        title="LOG IN"
        type="solid"
      />
            </View>
      
      <View style={{height:20,backgroundColor:'grey',flexDirection:'row'}}>
              <View style={{flex:2,backgroundColor:'#0b1013'}}></View>
              <View style={{flex:2,backgroundColor:'#00a0e0'}}></View>
              <View style={{flex:2,backgroundColor:'#0b1013'}}></View>
      </View>
      
          </View>
    )
}



const Styles = StyleSheet.create({
    blue : {
        backgroundColor :'blue'
      },
      container : {
        flex : 1,
        padding:25
      },
      logoImage : {
        width : 170,
        height:70,
        alignSelf:'center'
        
      }
})

export default LoginScreen
