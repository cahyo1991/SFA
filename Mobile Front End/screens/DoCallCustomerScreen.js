import React, { Component } from 'react'
import { StyleSheet, Text, View,ImageBackground,Alert,PermissionsAndroid,BackHandler,FlatList } from 'react-native'
import { TapGestureHandler, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderBack from '../components/HeaderBack';
import {Picker} from '@react-native-community/picker';
import { Input,Button  } from 'react-native-elements';
// import DatePicker from 'react-native-datepicker'
import DateTimePicker from '@react-native-community/datetimepicker';
import CameraRoll from "@react-native-community/cameraroll";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { openDatabase } from 'react-native-sqlite-storage';
import Geolocation from 'react-native-geolocation-service';
import NetInfo from "@react-native-community/netinfo";
import Loading from '../components/Loading';

const db = openDatabase(
  {
    name:'MainDB',
    location:'default'
  },
  ()=>{

  },error => {console.log("Error SQLite =",error)
}
)

export class DoCallCustomerScreen extends Component {




    constructor(props){
        super(props)
        this.state = {
          // date:"2021-10-04",

          showDate : false,
          showTime : false,
          time : new Date(1598051730000),
          date : new Date(2021,9,1),
          uri : global.ApiImage + 'noimage.png',
          ListProduct : [],
          ProductSelected : '',
          Longitude : '',
          Latitude : '',
          Activity : '',
          Remarks : '',
          ShowLoading : false,
          StatusImage : false,
          ListOutlet : [],
          OutletSelected : ''
        }
      }

      

      hasAndroidPermission = async () =>{
        const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
        
      const hasPermission = await PermissionsAndroid.check(permission);
      if (hasPermission) {
        
        return true;
      }
    
      const status = await PermissionsAndroid.request(permission);
      return status === 'granted';

      // console.log("Status Permission Write External ",status)
      }

      CreateTableProduct = async () =>{
        db.transaction(
          (tx)=>{
            tx.executeSql(
              "CREATE TABLE IF NOT EXISTS "
              +"Product  "
              +"(Id INTEGER,Name VARCHAR(200))",
              [],(sqlTxn,res)=>{
                console.log("table Product created successfully")
              },error => console.log("error create table Product",error)
            )
          }
        )
      }

      InsertTableProductSqLite =  (Id,Name,Index,Length) =>{
        if (Index == Length) {
            this.setState({
              ShowLoading:false
            })
        }
        db.transaction(
          (tx)=>{
            tx.executeSql(
              "INSERT INTO "
              +"Product  "
              +"(Id ,Name) VALUES('"+Id+"','"+Name+"')",
              [],(sqlTxn,res)=>{

                console.log("insert Product created successfully" + "-" + Index)
              },error => console.log("error created table Product",error)
            )
          }
        )
      }

      

      GetTableProductSqLite = async () =>{
        console.log("Start Insert To State Product")
        db.transaction(
          (tx) =>{
            tx.executeSql(
              "SELECT *  FROM Product",[],(sqlTxn,res)=>{
                var len = res.rows.length;
                console.log('len', len);
                if (len > 0) {
                  // alert(res.rows.item(0));
                  const datas = [];
                    for (let index = 0; index < len; index++) {
                      datas.push({
                        'Id' : res.rows.item(index)['Id'],
                        'Name' : res.rows.item(index)['Name']
                      })
                      
                    }

                    console.log("Data Product",res.rows)

                    this.setState({
                      ListProduct : datas
                    })
                
                  
                } else {
                  console.log('Product not found');
                }
              },error => console.log("error GET table",error)
            )
          }
        )
      } 

       CekTableProduct = async () =>{
        db.transaction(
          (tx) =>{
            tx.executeSql(
              "SELECT count(*) as Total FROM Product",[],(sqlTxn,res)=>{
                var len = res.rows.length;
                console.log('len', len);
                if (len > 0) {
                  // alert(res.rows.item(0));

                  var cekProducts =  res.rows.item(0)['Total'];

                  if (parseInt(cekProducts) > 0) {
                      console.log("List Product Exists");
                      this.GetTableProductSqLite();
                  }else{
                    
                    this.GetInsertProductSqLite();
                  }

                  console.log("Length Product ",cekProducts);
                
                  
                } else {
                  console.log('Product not found');
                }
              },error => console.log("error GET table",error)
            )
          }
        )
    }

      GetInsertProductSqLite = async () =>{
        this.setState({
          ShowLoading:true
        })
        console.log("Start Insert Product SqlLite")
          const controller = new AbortController();
          setTimeout(()=> controller.abort(), global.TimeOut)
 
            fetch(global.Api + "/Api/GetProducts?PamCode=" + this.props.route.params.PamCode,
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
                    console.log("Data Product",data);
                    if (data.Status == "1") {
                        console.log("Success Get Product From Database");
                        const Datas = [];
                        for (let index = 0; index < data.Return.length; index++) {
                          this.InsertTableProductSqLite(data.Return[index]["Id"],data.Return[index]["Name"],index,(data.Return.length -1));
                            Datas.push({
                              'Id' : data.Return[index]["Id"],
                              'Name' : data.Return[index]["Name"]
                            })
                        }
                        this.setState({
                          ListProduct : Datas
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

      DoCall = async () =>{


        // validation 
        if ((this.state.ProductSelected!="" && this.state.Activity!="" && this.props.route.params.CallType == "1" && this.state.StatusImage ) || 
        (this.state.ProductSelected!="" && this.state.Activity!="" && this.props.route.params.CallType == "2" && this.state.OutletSelected!="" && this.state.StatusImage)
        ) {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log("You can use the location");
              NetInfo.fetch().then(state => {

                console.log("Is connected?", state.isConnected);  
                if(state.isConnected){
                  
                   this.UploadCall();    
                }else{
                  // alert("Connection Internet bloon!")
                  
                  
                  this.showAlertNoInternet("No Internet Connection!","You need to have Mobile Data or Wifi to Access this Page.");
                }
              });
              
            } else {
              this.showAlert("Error","You Can't Call The Customer Before Allowing The Location !");
            }
          } catch (err) {
            console.warn(err);
          }
        }else{
          this.showAlert("Error","Your Form Is Incomplete, Please Check Again")
        }


        
      }

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




      
       UploadImageAndCall = async (Longitude,Latitude) =>  {
        const controller = new AbortController();
        setTimeout(()=> controller.abort(), global.TimeOut);

        var file = new FormData();
        file.append('file', {
          uri: this.state.uri,
          type: this.state.type , // or photo.type
          name: this.state.fileName
        });

        console.log("uri =" + this.state.uri + " type =" + this.state.type + " name =" + this.state.fileName)
 
          fetch(global.Api + "/Api/UploadImageCall",
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
                  this.ExecuteCall(Longitude,Latitude,data.Message);
                }else{
                  this.setState({ShowLoading:false});
                  this.showAlert(data.Message)
                }
              
            }
          ).catch(
            e=> {
              this.setState({ShowLoading:false});
              if (e.message == "Aborted") {
               this.showAlert("Error","Poor Connection !");    
              }else{
                this.showAlert("Error",e.message);
              }
              // console.log("catch error fetch =" + e.message)




            
            })

         



        }

      
      ExecuteCall = async (Longitude,Latitude,ImageName) =>{
        let IdTerritoryCoverage =  this.props.route.params.IdTerritoryCoverage;
        let IdWeekOfMonth = '';
        let IdCallPlan =   this.props.route.params.PlanId;
        let IdProduct = this.state.ProductSelected;
        let Activity = this.state.Activity;
        let Remarks = this.state.Remarks;
        let Creator = this.props.route.params.PamCode;
        let IdCallType = this.props.route.params.CallType;
        let PamCode = this.props.route.params.PamCode;
        console.log("Longitude = " + Longitude +
        "Latitude = " + Latitude +
        "IdTerritoryCoverage = " + IdTerritoryCoverage +
        "IdWeekOfMonth = " + IdWeekOfMonth +
        "IdCallPlan = " + IdCallPlan +
        "IdProduct = " + IdProduct +
        "Activity = " + Activity +
        "Remarks = " + Remarks +
        "Creator = " + Creator +
        "IdCallType = " + IdCallType + 
        "PamCode = " + PamCode);


        const controller = new AbortController();
        setTimeout(()=> controller.abort(), global.TimeOut);
        var details = {
          'IdTerritoryCoverage': IdTerritoryCoverage,
          'IdWeekOfMonth': '0',
          'Longitude' : Longitude,
          'Latitude' : Latitude,
          'IdCallPlan' : IdCallPlan,
          'IdProduct' : IdProduct,
          'Activity' : Activity,
          'Remarks' : Remarks,
          'Creator' : PamCode,
          'IdCallType' : IdCallType,
          'PamCode' : PamCode,
          'ImageName' : ImageName,
          'IdOutlet' : this.state.OutletSelected
      };

      console.log("detail call",JSON.stringify(details))
      
      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
          fetch(global.Api + "/Api/InsertCall",
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
                  "Call Data Saved Successfully",
                  [

                    { text: "OK", onPress: () => {
                      this.props.navigation.navigate("HomeScreen",{
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



      UploadCall =  async () =>{
        this.setState({ShowLoading:true});

        Geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            let Longitude  = position.coords["longitude"];  
            let Latitude  =  position.coords["latitude"];
            
            if (this.state.StatusImage) {
              console.log("ada Gambar");
              
              this.UploadImageAndCall(Longitude,Latitude);
            }else{
              
              console.log("tidak ada gambar");
              this.ExecuteCall(Longitude,Latitude,'0');

            }
          },
          (error) => {
            // See error code charts below.
            this.setState({ShowLoading:false})
            this.showAlert("Error","You Can't Call The Customer Before Activate The Location !");
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
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


      componentDidMount = async() =>{


        
        await this.CreateTableProduct();
        await this.CekTableProduct();

        if (  this.props.route.params.CallType == "2" ) {
          await this.getOutletCustomer(this.props.route.params.IdTerritoryCoverage)
        }
        
      }


      openCam = () =>{
        
        launchCamera({
          mediaType : "photo"
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
            this.setState({
              uri : response.assets[0]['uri'],
              type : response.assets[0]['type'],
              fileName : response.assets[0]['fileName'],
              StatusImage : true
            })
          }
        });
      }

      openGallery = () => {
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
        this.setState({
          uri : response.assets[0]['uri'],
          type : response.assets[0]['type'],
          fileName : response.assets[0]['fileName'],
          StatusImage : true
        })

        

        }
        });
        };

        

    render() {
        return (
            
            <View style={{flex:1}}>
{
     this.state.ShowLoading   ? 
   <Loading/>
     :
     <View></View>
   }




           <HeaderBack Name={this.props.route.params.Name + " - " +this.props.route.params.OutletName} navigation={this.props.navigation}/>
           <View style={{flex:1,paddingLeft:10,paddingRight:10,paddingTop:20, backgroundColor:'white',}}>
                <Text style={{fontSize:12}}>Type</Text>
                <View style={{height:45,borderBottomWidth:0.5}}>
   <Text style={{fontSize:15,marginTop:10}}>
     {
       this.props.route.params.CallType == "1" ? "Planned" : "UnPlan"
     }
   </Text>
</View>

{
  this.props.route.params.CallType == "2" ? 
  
  <View style={{height:55,borderBottomWidth:0.5,marginTop:10}}>
    <Text style={{fontSize:12}}>List Outlet <Text style={{color:'red'}}> *</Text></Text>
    <Picker
  selectedValue={this.state.OutletSelected}
  style={{height: 35,
}}
  onValueChange={(itemValue, itemIndex) =>
    this.setState({OutletSelected: itemValue})
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
:
<View></View>
}

<Text style={{fontSize:12,marginTop:10}}>Product Promotion <Text style={{color:'red'}}> *</Text> </Text>
                <View style={{height:45,
                  // borderBottomWidth:0.5,
                  flexDirection:'row'
                  }}>
                    <View style={{flex:1,borderBottomWidth:0.5,}}>
                    <Picker
  selectedValue={this.state.ProductSelected}
  style={{height: 45,
}}

onValueChange = {
  (val) =>{
    this.setState({
      ProductSelected : val
    })
  }
}

  >
      <Picker.Item label="Select Product"  value="" 
      
      />
      {
        this.state.ListProduct.map((item,key)=>(
          <Picker.Item label={item.Name} value={item.Id} key={key}/>
        ))
      }

</Picker>
                    </View>
<View style={{width:20}}></View>
<View style={{flex:1}}>
  <TouchableOpacity
  onPress={
    ()=>{
      this.props.navigation.navigate("PromoScreen",{
        Token : this.props.route.params.Token,
        PamCode : this.props.route.params.PamCode
      }
      )
    }
  }
  style={{
    backgroundColor:'black',
    height:40,
    justifyContent:'center',
    borderRadius:10
  }}>
    <Text style={{textAlign:'center',color:'white',fontWeight:'bold'}}>BROCHURE / VIDEO PRODUCT</Text>
  </TouchableOpacity>
  </View>                
</View>

<Text style={{fontSize:12,marginTop:10}}>Activity <Text style={{color:'red'}}> *</Text></Text>
                <View style={{height:80,}}>
                
 <Input
   placeholder="Insert Activity"
   style={{
       fontSize:15
   }}
   value={this.state.Activity}
   multiline={true}
   numberOfLines={3}
   onChangeText={
     (res)=>{
        this.setState({
          Activity : res
        })
     }
   }
   />
</View>

<Text style={{fontSize:12,marginTop:10}}>Remarks</Text>
                <View style={{height:80,}}>
                
 <Input
   placeholder="Insert Remarks"
   style={{
       fontSize:15
   }}
   value={this.state.Remarks}
   onChangeText ={
     (res) =>{
       this.setState({
         Remarks : res
       })
     }
   }
   multiline={true}
   numberOfLines={3}
   />

   
</View>

<Text style={{fontSize:12,marginTop:10,marginBottom:20}}>Photo</Text>
                <View style={{height:50,flexDirection:'row'}}>
              <View style={{flex:1,backgroundColor:'black',justifyContent:'center'}}>
                <TouchableOpacity
                onPress={()=>{
                  this.openCam()
                }}
                >
                <Icon
name='camera'
size={26}
color='white'
style={{
alignSelf:'center',
alignItems:'center'
}}
/>
                </TouchableOpacity>
              </View>
              <View style={{width:20}}></View>
              <View style={{flex:1,backgroundColor:'black',justifyContent:'center'}}>
                <TouchableOpacity
                onPress={
                  ()=>{
                    this.openGallery()
                  }
                }
                >
                <Icon
name='photo'
size={26}
color='white'
style={{
alignSelf:'center',
alignItems:'center'
}}
/>
                </TouchableOpacity>
              </View>

   
</View>


<View style={{height:300,flexDirection:'row',marginTop:20}}>
<View style={{flex:1}}></View>
<View style={{width:250}}>
  <View style={{flexDirection:'row'}}>
    <View style={{flex:1}}>
  <Text style={{fontSize:15,marginBottom:10}}>Preview Image</Text>
  </View>
  <View style={{flex:1,paddingRight:10}}>
  <TouchableOpacity
  onPress={
    ()=>{
      this.setState({
        uri : global.ApiImage + 'noimage.png',
        StatusImage : false
      })
    }
  }
  >
  <Icon
name='refresh'
size={16}
color='black'
style={{
  marginLeft:20,
  marginTop:4,
  textAlign:'right',
// alignSelf:'center',
// alignItems:'center'
}}
/>
  </TouchableOpacity>
  </View>
  </View>
  
  <View style={{borderWidth:1,flex:1,borderColor:'#95a5a6',borderRadius:10}}>
  <ImageBackground source={{uri:this.state.uri}} 
                   style={{
                    flex: 1,
                    justifyContent: "center",
                    padding:5,
                    borderRadius:10
                    
                   }}
                   imageStyle={{borderRadius:11}}
                   resizeMode="cover"
                   >


                       </ImageBackground>
  </View>
</View>
<View style={{flex:1}}></View>

</View>




<View style={{height:50,marginTop:70,flexDirection:'row'}}>
    <View style={{flex:1}}></View>
    <View style={{flex:1}}>
    <Button
        onPress={
            ()=>{
                 this.DoCall()
            }
        }
  icon={
    <Icon
      name="phone"
      size={18}
      color="white"
    />
  }
  buttonStyle={{
      height:50,
      backgroundColor:'#00a0e0',
      borderRadius:20
  }}
  title="   Call"
/>
{/* <Text>Longitude : {this.state.Longitude} Latitude : {this.state.Latitude} </Text> */}
    </View>
    <View style={{flex:1}}>
      
    </View>
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

export default DoCallCustomerScreen
