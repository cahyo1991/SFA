import React, { Component } from 'react'
import { StyleSheet, Text, View,ImageBackground,Modal,FlatList,Pressable,Alert } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderBack from '../components/HeaderBack';
import {Picker} from '@react-native-community/picker';
import { Input,Button  } from 'react-native-elements';
// import DatePicker from 'react-native-datepicker'
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import HeaderTitle from '../components/HeaderTitle'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import NetInfo from "@react-native-community/netinfo";
import Loading from '../components/Loading';
import { openDatabase } from 'react-native-sqlite-storage';
import { thisExpression } from '@babel/types';


const db = openDatabase(
  {
    name:'MainDB',
    location:'default'
  },
  ()=>{

  },error => {console.log("Error SQLite =",error)
}
)



export class UpdateCustomerScreen extends Component {


  ItemSeparatorView = () => {
    return (
        <View style={{height:0.5,width:'100%',backgroundColor:'black'}}>

        </View>
    )
}

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


showAlert = (Title,Message) =>
Alert.alert(
  Title,
  Message
);

ItemView = ({item}) =>{
  return (

      <Text
      onPress={
        ()=>{
          alert("tester")
        }
      }
      style={{padding:15}}>
          {item.Id}{'. '}{item.Name.toUpperCase()}
      </Text>
  )
}

  CreateTableMasterField = async () =>{
    db.transaction(
      (tx)=>{
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS "
          +"MasterField  "
          +"(Id VARCHAR(200),Name VARCHAR(200),Type VARCHAR(200))",
          [],(sqlTxn,res)=>{
            console.log("table MasterField created successfully")
          },error => console.log("error create table Product",error)
        )
      }
    )
  }


  InsertTableMasterField =  (Id,Name,Type,Index,Length) =>{
    if (Index == Length) {
        this.setState({
          ShowLoading : false
        })
    }
    db.transaction(
      (tx)=>{
        tx.executeSql(
          "INSERT INTO "
          +"MasterField  "
          +"(Id ,Name ,Type) VALUES('"+Id+"','"+Name+"','"+Type+"')",
          [],(sqlTxn,res)=>{

            console.log("insert MasterField created successfully " + Index)
          },error => console.log("error insert MasterField MasterField",error)
        )
      }
    )
  }



  
  GetOutletSearch = async (Keyword) =>{
    console.log("Start GetOutletSearch")
      const controller = new AbortController();
      setTimeout(()=> controller.abort(), global.TimeOut)

        fetch(global.Api + "/Api/GetSearchOutlet?PamCode=" + this.props.route.params.PamCode +"&&Search="+Keyword,
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
                    console.log("Success Get Outlet");
                    const DataOutlet = [];
                    for (let index = 0; index < data.Return.length; index++) {
                        DataOutlet.push({
                          'Id' : data.Return[index]["Id"],
                          'Name' : data.Return[index]["Name"]
                        })
                    }
                    this.setState({
                      ListOutlet : DataOutlet
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


  GetInsertMasterFieldSqLite = async () =>{

    this.setState({
      ShowLoading : true
    })

    console.log("Start Insert MasterField")
      const controller = new AbortController();
      setTimeout(()=> controller.abort(), global.TimeOut)

        fetch(global.Api + "/Api/GetMasterFields?PamCode=" + this.props.route.params.PamCode,
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
                    const DataSpec = [];
                    const DataCType = [];
                    const DataSeg = [];
                    const DataArea = [];
                    const DataReligion = [];
                    const DataTitle = [];
                    for (let index = 0; index < data.Return.length; index++) {
                      this.InsertTableMasterField(data.Return[index]["Id"],data.Return[index]["Name"],
                      data.Return[index]["Type"] , index,(data.Return.length-1) );

                      if (data.Return[index]["Type"] == "CustomerTypes") {
                        DataCType.push({
                          'Id' : data.Return[index]["Id"],
                          'Name' : data.Return[index]["Name"]
                        })
                      }
                      if (data.Return[index]["Type"] == "DoctorTitle") {
                        console.log("DATA TITLE Success Push")
                        DataTitle.push({
                          'Id' : data.Return[index]["Id"],
                          'Name' : data.Return[index]["Name"]
                        })
                      }
                      if (data.Return[index]["Type"] == "Provinces") {
                        
                        DataArea.push({
                          'Id' : data.Return[index]["Id"],
                          'Name' : data.Return[index]["Name"]
                        })
                      }
                      if (data.Return[index]["Type"] == "Religion") {
                        DataReligion.push({
                          'Id' : data.Return[index]["Id"],
                          'Name' : data.Return[index]["Name"]
                        })
                      }
                      if (data.Return[index]["Type"] == "Segmentations") {
                        DataSeg.push({
                          'Id' : data.Return[index]["Id"],
                          'Name' : data.Return[index]["Name"]
                        })
                      }
                      if (data.Return[index]["Type"] == "Specializations") {
                        DataSpec.push({
                          'Id' : data.Return[index]["Id"],
                          'Name' : data.Return[index]["Name"]
                        })
                      }

                     
                    }
                    this.setState({
                      ListSpecialization : DataSpec,
                      ListCustomerType : DataCType,
                      ListSegmentation : DataSeg,
                      ListArea : DataArea,
                      ListReligion : DataReligion,
                      // ListOutlet : DataOutlet,
                      ListTitle : DataTitle
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

          GetTableMasterFieldSqLite = async () =>{
            console.log("Start Insert To State Product")
            db.transaction(
              (tx) =>{
                tx.executeSql(
                  "SELECT *  FROM MasterField",[],(sqlTxn,res)=>{
                    var len = res.rows.length;
                    console.log('len', len);
                    if (len > 0) {
                      // alert(res.rows.item(0));
                      const DataSpec = [];
                      const DataCType = [];
                      const DataSeg = [];
                      const DataArea = [];
                      const DataReligion = [];
                      const DataTitle = [];
                        for (let index = 0; index < len; index++) {
                          // datas.push({
                          //   'Id' : res.rows.item(index)['Id'],
                          //   'Name' : res.rows.item(index)['Name']
                          // })

                          if (res.rows.item(index)["Type"] == "CustomerTypes") {
                            DataCType.push({
                              'Id' : res.rows.item(index)["Id"],
                              'Name' : res.rows.item(index)["Name"]
                            })
                          }
                          if (res.rows.item(index)["Type"] == "DoctorTitle") {
                            DataTitle.push({
                              'Id' : res.rows.item(index)["Id"],
                              'Name' : res.rows.item(index)["Name"]
                            })
                          }
                          if (res.rows.item(index)["Type"] == "Provinces") {
                            DataArea.push({
                              'Id' : res.rows.item(index)["Id"],
                              'Name' : res.rows.item(index)["Name"]
                            })
                          }
                          if (res.rows.item(index)["Type"] == "Religion") {
                            DataReligion.push({
                              'Id' : res.rows.item(index)["Id"],
                              'Name' : res.rows.item(index)["Name"]
                            })
                          }
                          if (res.rows.item(index)["Type"] == "Segmentations") {
                            DataSeg.push({
                              'Id' : res.rows.item(index)["Id"],
                              'Name' : res.rows.item(index)["Name"]
                            })
                          }
                          if (res.rows.item(index)["Type"] == "Specializations") {
                            DataSpec.push({
                              'Id' : res.rows.item(index)["Id"],
                              'Name' : res.rows.item(index)["Name"]
                            })
                          }
                          
                        }
    
                        console.log("Data MasterField",res.rows)
    
                        this.setState({
                          ListSpecialization : DataSpec,
                          ListCustomerType : DataCType,
                          ListSegmentation : DataSeg,
                          ListArea : DataArea,
                          ListReligion : DataReligion,
                          ListTitle : DataTitle,
                          
                        })
                    
                      
                    } else {
                      console.log('Product not found');
                    }
                  },error => console.log("error GET MasterField",error)
                )
              }
            )
          } 
    

  CekTableMasterField = async () =>{
    db.transaction(
      (tx) =>{
        tx.executeSql(
          "SELECT count(*) as Total FROM MasterField",[],(sqlTxn,res)=>{
            var len = res.rows.length;
            console.log('len', len);
            if (len > 0) {
              // alert(res.rows.item(0));

              var cekProducts =  res.rows.item(0)['Total'];

              if (parseInt(cekProducts) > 0) {
                  console.log("List MasterField Exists");
                  this.GetTableMasterFieldSqLite();
              }else{
                
                this.GetInsertMasterFieldSqLite();
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

  componentDidMount = async () =>{
    await this.CreateTableMasterField();
    await this.CekTableMasterField();
  }

  

    constructor(props){
        super(props)
        this.state = {
          // date:"2021-10-04",
          TypeView : this.props.route.params.TypeView, 
          showDateInput : false,
          showDate : false,
          showTime : false,
          time : new Date(1598051730000),
          date : new  Date(1991,9,1),
          ShowLoading : false,
          StatusImage : false,
          ImageUri : global.ApiImage + "Customer/" + this.props.route.params._Images,
          ImageType : '',
          ImageFileName : '',
          Hobby : this.props.route.params._Hobby,
          Address : this.props.route.params._Address,
          Specialization :  this.props.route.params._IdSpecialty,
          CustomerType : this.props.route.params._IdCustomerType,
          Segmentation : this.props.route.params._IdSegmentation,
          Area  : this.props.route.params._ProvinceCode,
          Religion : this.props.route.params._IdReligion,
          Outlet1 : this.props.route.params._OutletId_1,
          OutletName1:this.props.route.params._OutletName1,
          Outlet2 : this.props.route.params._OutletId_2,
          OutletName2:this.props.route.params._OutletName2,
          Outlet3 : this.props.route.params._OutletId_3,
          OutletName3:this.props.route.params._OutletName3,
          CustomerName : this.props.route.params._CustomerName,
          PhoneNumber : this.props.route.params._PhoneNumber,
          Email : this.props.route.params._Email,
          DateOfBirth: this.props.route.params._DateOfBirth,
          NameDateState : '',
          ListSpecialization : [],
          ListCustomerType : [],
          ListSegmentation : [],
          ListArea : [],
          ListReligion : [],
          ListOutlet : [],
          ListTitle : [],
          Title : this.props.route.params._IdDoctorTitles,
          DateOfMarriage : this.props.route.params._DateOfMarriage,
          SpouseName : this.props.route.params._Husban_Wife_Name,
          
          DataOfBirthSpouse : this.props.route.params._Husband_Wife_Birth,
          DateofBirthChild1: this.props.route.params._Child_Birth_1,
          ChildName1: this.props.route.params._Child_Name_1,
          DateofBirthChild2: this.props.route.params._Child_Birth_2,
          ChildName2: this.props.route.params._Child_Name_2,
          Note : this.props.route.params._Note,
          ShowModal : false,
          OutletActive : '0'

        }
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
          ImageUri : response.assets[0]['uri'],
          ImageType : response.assets[0]['type'],
          ImageFileName : response.assets[0]['fileName'],
          StatusImage : true
        })

        

        }
        });
        };


        

        DatePicker = () =>{
          return(
            <DateTimePicker
            testID="dateTimePicker"
            value={this.state.date}
            mode="date"
            minimumDate={new Date(1910,9,1)}
            maximumDate={new Date(2021,9,8)}
            // is24Hour={true}
            display="default"
            onChange={
              (event, selectedDate) => {
                const currentDate = selectedDate || "";
                // setDate(currentDate);
                console.log("length date " + currentDate)
                this.setState({
                  [this.state.NameDateState] : currentDate,
                  showDateInput : false
                })
              }
            }
          />
          )
        }


        ExecuteNewCustomer = async (ImagesName) =>{
          const controller = new AbortController();
          setTimeout(()=> controller.abort(), global.TimeOut);
          const dataInput = {
            "Title" : this.state.Title,
            "Specialization" : this.state.Specialization,
            "CustomerName" : this.state.CustomerName,
            "PhoneNumber" : this.state.PhoneNumber,
            "Email" : this.state.Email,
            "DateOfBirth" : this.state.DateOfBirth,
            "CustomerType" : this.state.CustomerType,
            "Segmentation" : this.state.Segmentation,
            "Address" : this.state.Address,
            "Area" : this.state.Area,
            "Hobby" : this.state.Hobby,
            "Religion" : this.state.Religion,
            "Outlet1" : this.state.Outlet1,
            "Outlet2" : this.state.Outlet2,
            "Outlet3" : this.state.Outlet3,
            "DateOfMarriage" : this.state.DateOfMarriage,
            "SpouseName" : this.state.SpouseName,
            "DataOfBirthSpouse" : this.state.DataOfBirthSpouse,
            "DateofBirthChild1" : this.state.DateofBirthChild1,
            "DateofBirthChild2" : this.state.DateofBirthChild2,
            "ChildName1" : this.state.ChildName1,
            "ChildName2" : this.state.ChildName2,
            "Note" : this.state.Note,
            "Image" : ImagesName,
          }
          var details = {
            'CustomerName': this.state.CustomerName,
            
            'DateOfBirth' : dataInput.DateOfBirth != "" && dataInput.DateOfBirth.length != 10
             ?  this.state.DateOfBirth.getFullYear()  + "-" + ("0" + (this.state.DateOfBirth.getMonth() + 1)).slice(-2)  + '-' + ("0" + (this.state.DateOfBirth.getDate())).slice(-2)
             : dataInput.DateOfBirth != "" && dataInput.DateOfBirth.length == 10 ? dataInput.DateOfBirth : "" 
             ,
            'CustomerType' : dataInput.CustomerType,
            'PhoneNumber' : dataInput.PhoneNumber,
            'Email' : dataInput.Email,
            'Specialization' : dataInput.Specialization,
            'Address' : dataInput.Address,
            'Area' : dataInput.Area,
            'Outlet1' : dataInput.Outlet1,
            'Outlet2' : dataInput.Outlet2,
            'Outlet3' : dataInput.Outlet3,
            'Hobby' : dataInput.Hobby,
            'Religion' : dataInput.Religion,
            'DateOfMarriage' :
            dataInput.DateOfMarriage != "" && dataInput.DateOfMarriage.length != 10
            ?  this.state.DateOfMarriage.getFullYear()  + "-" + ("0" + (this.state.DateOfMarriage.getMonth() + 1)).slice(-2)  + '-' + ("0" + (this.state.DateOfMarriage.getDate())).slice(-2)
            : dataInput.DateOfMarriage != "" && dataInput.DateOfMarriage.length == 11 ? dataInput.DateOfMarriage : "" ,
            'SpouseName' : dataInput.SpouseName,
            'ChildName1' : dataInput.ChildName1,
            'ChildName2' : dataInput.ChildName2,
            'DateOfBirthSpose' : 
            dataInput.DataOfBirthSpouse != "" && dataInput.DataOfBirthSpouse.length != 10
             ?  this.state.DataOfBirthSpouse.getFullYear()  + "-" + ("0" + (this.state.DataOfBirthSpouse.getMonth() + 1)).slice(-2)  + '-' + ("0" + (this.state.DataOfBirthSpouse.getDate())).slice(-2)
             : dataInput.DataOfBirthSpouse != "" && dataInput.DataOfBirthSpouse.length == 10 ? dataInput.DataOfBirthSpouse : "" ,
            'DateofBirthChild1' : 
            dataInput.DateofBirthChild1 != "" && dataInput.DateofBirthChild1.length != 10
             ?  this.state.DateofBirthChild1.getFullYear()  + "-" + ("0" + (this.state.DateofBirthChild1.getMonth() + 1)).slice(-2)  + '-' + ("0" + (this.state.DateofBirthChild1.getDate())).slice(-2)
             : dataInput.DateofBirthChild1 != "" && dataInput.DateofBirthChild1.length == 10 ? dataInput.DateofBirthChild1 : "" ,
            'DateofBirthChild2' : 
            dataInput.DateofBirthChild2 != "" && dataInput.DateofBirthChild2.length != 10
             ?  this.state.DateofBirthChild2.getFullYear()  + "-" + ("0" + (this.state.DateofBirthChild2.getMonth() + 1)).slice(-2)  + '-' + ("0" + (this.state.DateofBirthChild2.getDate())).slice(-2)
             : dataInput.DateofBirthChild2 != "" && dataInput.DateofBirthChild2.length == 10 ? dataInput.DateofBirthChild2 : "" ,
            'Note' : dataInput.Note,
            'Creator' : this.props.route.params.PamCode,  
            'Title' : dataInput.Title,
            'Segmentation' : dataInput.Segmentation,  
            'Images' : dataInput.Image,
            'PamCode' : this.props.route.params.PamCode,
            "Id" : this.props.route.params.IdCustomer
        };
  
        
        
        var formBody = [];
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        console.log("detail Input Customer",JSON.stringify(details))
        console.log("detail form body",JSON.stringify(formBody))
            
        fetch(global.Api + "/Api/UpdateCustomer",
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
                    "Customer Data Update Successfully",
                    [
  
                      { text: "OK", onPress: () => {
                        this.props.navigation.navigate("CoverageScreen",{
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
                    console.log("Error Log",data.Message);
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



        
        ExecuteDeleteTerritoryCoverage = async () =>{
          const controller = new AbortController();
          setTimeout(()=> controller.abort(), global.TimeOut);

          this.setState({
            ShowLoading : true
          })


          var details = {
            "PamCode" : this.props.route.params.PamCode,
            "Id" : this.props.route.params.IdTerritoryCoverage
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
            
        fetch(global.Api + "/Api/DeleteTerritoryCoverage",
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
                    "Customer Data Delete Successfully",
                    [
  
                      { text: "OK", onPress: () => {
                        this.props.navigation.navigate("CoverageScreen",{
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
                    console.log("Error Log",data.Message);
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
  
        UploadImageAndSaveCustomer = async () =>  {
          this.setState({
            ShowLoading : true
          })
          console.log("Start Upload Image Customer")
          const controller = new AbortController();
          setTimeout(()=> controller.abort(), global.TimeOut);
  
          var file = new FormData();
          file.append('file', {
            uri: this.state.ImageUri,
            type: this.state.ImageType , // or photo.type
            name: this.state.ImageFileName
          });
          
          console.log(" file",file);
          // console.log("uri =" + this.state.ImageUri + " type =" + this.state.ImageType + " name =" + this.state.ImageFileName)
   
            fetch(global.Api + "/Api/UploadImageCustomer",
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
                    this.ExecuteNewCustomer(data.Message);
                    // this.ExecuteCall(Longitude,Latitude,data.Message);
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

  
  
  
  
              
              })
  
           
  
  
  
          }
  


        formValidation = () =>{
          if (this.state.Title!="" ** this.state.Specialization!="" && this.state.CustomerName!=""
                && this.state.CustomerType!="" && this.state.Segmentation!="" && 
                this.state.Area!="" && this.state.Outlet1!="") {
                  this.setState({
                    ShowLoading:true
                  })


                  if (this.state.StatusImage) {
                    this.UploadImageAndSaveCustomer();
                  } else {
                    this.ExecuteNewCustomer(this.props.route.params._Images);
                  }
                  
                  // alert(JSON.stringify(data))
                  
            
          }else{
            
            this.showAlert("Error","Form Required Is Not Complete !")
          }
        }


        ButtonSave = () =>{
          return (
            <View style={{height:112,flexDirection:'row',padding:10,backgroundColor:'white',paddingTop:20}}>
            <View style={{flex:1,backgroundColor:"#27ae60",justifyContent:'center'}}>
              <TouchableOpacity style={{flexDirection:'row'}}
              onPress={
                ()=>{
                  this.formValidation();
                }
              }
              >
              <Icon
              name="upload"
              size={22}
              color="white"
              style={{flex:1,textAlign:'right',marginRight:10}}
              
            />
              <Text style={{flex:1, color:'white',textAlign:'left',fontWeight:'bold',fontSize:20}}>UPDATE</Text>
              </TouchableOpacity>
            </View>
            <View style={{width:20,}}></View>
       
            </View>
          )
        }

        ButtonUpdateDelete = () =>{
          return (
            <View style={{height:112,flexDirection:'row',padding:10,backgroundColor:'white',paddingTop:20}}>
            <View style={{flex:1,backgroundColor:"#2980b9",justifyContent:'center'}}>
              <TouchableOpacity style={{flexDirection:'row'}}
              onPress={
                ()=>{
                  this.setState({
                    TypeView : 2
                  })
                }
              }
              >
              <Icon
              name="pencil"
              size={22}
              color="white"
              style={{flex:1,textAlign:'right',marginRight:10}}
              
            />
              <Text style={{flex:1, color:'white',textAlign:'left',fontWeight:'bold',fontSize:20}}>Edit Form</Text>
              </TouchableOpacity>
            </View>
            <View style={{width:20,}}></View>
            <View style={{flex:1,backgroundColor:"#e74c3c",justifyContent:'center'}}>
              <TouchableOpacity style={{flexDirection:'row'}}
              onPress={
                ()=>{
                  this.ExecuteDeleteTerritoryCoverage();
                }
              }
              >
              <Icon
              name="trash"
              size={22}
              color="white"
              style={{flex:1,textAlign:'right',marginRight:10}}
              
            />
              <Text style={{flex:1, color:'white',textAlign:'left',fontWeight:'bold',fontSize:20}}>Delete</Text>
              </TouchableOpacity>
            </View>
            </View>
                 
          )
        }

    render() {
     const{_DateOfBirth} = this.props.route.params;
        return (
            
            <View style={{flex:1}}>

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
            <Text style={{flex:1,fontWeight:'bold'}}>MASTER OUTLET</Text>
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
          placeholder="Search Outlet"
          onChangeText={
            (res)=>{

              // GetOutletSearch
              this.GetOutletSearch(res);
            }
          }
          />
     <View style={{flex:1,paddingLeft:10,paddingRight:10}}>
       <ScrollView>
         

                 {
        this.state.ListOutlet.map((item,key)=>(
          <View style={{padding:5,borderBottomColor:'grey',borderBottomWidth:1,height:35,}} key={key}>
            <Pressable
            onPress={
              ()=>{
                    var _OutletNameActive = "OutletName" + this.state.OutletActive;
                    var _OutletIdActive = "Outlet" + this.state.OutletActive;
                    this.setState({
                      [_OutletNameActive] : item.Name,
                      [_OutletIdActive] : item.Id,
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
              {
     this.state.ShowLoading   ? 
   <Loading/>
     :
     <View></View>
   }
           <HeaderBack Name={this.state.TypeView  == "1" ? "View Customer" : "Update Customer"} navigation={this.props.navigation}/>
           <View
           style={{flex:1}}
           pointerEvents={this.state.TypeView == "1" ? "none" : "auto"}
           >
           <LinearGradient colors={['#0b1013', '#101416', '#5d5e5e']}
               style={{
                   height:50,
                   flexDirection:'row',
                   justifyContent:'flex-end',
                   padding:10
               }}>

                       <Text style={{color:'white',marginRight:10,fontSize:15}}>Add Customer To Database</Text>
                       
                       <Icon
      name="folder"
      size={18}
      color="white"
    />

                   </LinearGradient>
                   <View style={{padding:10,marginLeft:20,marginTop:-58,}}>
                     <View style={{height:150,width:150,borderWidth:2}}>
                     <ImageBackground source={{uri:this.state.ImageUri}} 
                   style={{
                    flex: 1,
                    justifyContent: "center",
                    // flexDirection:'row',
                    borderRadius:15
                   }}
                   resizeMode="cover"
                   >
                     </ImageBackground>
                   </View>
                   <TouchableOpacity style={{width:150,height:30,backgroundColor:'black',marginTop:10,borderRadius:10,justifyContent:'center'}}
                   onPress={
                     ()=>{
                       this.openGallery();
                     }
                   }
                   >
                      <Text style={{color:'white',textAlign:'center'}}>Choose Photo</Text>
                   </TouchableOpacity>
                   </View>
 
<View style={{height:50,backgroundColor:'grey',justifyContent:'center',marginTop:10,padding:5}}>
            <Text style={{fontSize:16,color:'white',fontStyle:'italic',fontWeight:'500'}}> Personal Information   </Text>
</View>
           <View style={{paddingLeft:10,paddingRight:10,paddingTop:20, backgroundColor:'white',}}>
           <View style={{height:55,flexDirection:'row',marginTop:15}}>
                
                <View style={{height:50,flex:1}}>
                <Text style={{fontSize:12}}>Title <Text style={{color:'red'}}>*</Text> </Text>
                <View style={{borderBottomWidth:0.5,}}>
                <Picker
  selectedValue={this.state.Title}
  style={{height: 45,
}}

onValueChange = {
  (val) =>{
    this.setState({
      Title : val
    })
  }
}

  >
      <Picker.Item label="Choose" value=""  />
      {
        this.state.ListTitle.map((item,key)=>(
          <Picker.Item label={item.Name} value={item.Id} key={key}/>
        ))
      }
  </Picker>
  </View>
</View>

<View style={{width:20}}></View>                
<View style={{height:50,flex:1,}}>
                <Text style={{fontSize:12}}>Specialization <Text style={{color:'red'}}>*</Text> </Text>
                <View style={{borderBottomWidth:0.5,}}>
                <Picker
  selectedValue={this.state.Specialization}
  style={{height: 45,
}}

onValueChange = {
  (val) =>{
    this.setState({
      Specialization : val
    })
  }
}

  >
      <Picker.Item label="Choose" value=""  />
      {
        this.state.ListSpecialization.map((item,key)=>(
          <Picker.Item label={item.Name} value={item.Id} key={key}/>
        ))
      }
  </Picker>
  </View>
</View>
<View style={{width:20}}></View> 
<View style={{flex:1}}></View> 
</View>



<View style={{height:50,flexDirection:'row',marginTop:15}}>
    <View style={{flex:1,}}>
                <Text style={{fontSize:12}}>Customer Name <Text style={{color:'red'}}>*</Text>  </Text>    
               <Input 
               value={this.state.CustomerName}
               onChangeText={
                 (res)=>{this.setState({CustomerName:res})}
               }
               style={{marginTop:-10}} />
    </View>
    {/* <View style={{width:5}}></View> */}
    <View style={{flex:1,}}>
                <Text style={{fontSize:12}}>Phone Number</Text>    
               <Input style={{marginTop:-10}} 
                           value={this.state.PhoneNumber}
                           onChangeText={
                             (res)=>{this.setState({PhoneNumber:res})}
                           }
               />
    </View>

    <View style={{flex:1,}}>
                <Text style={{fontSize:12}}>Email</Text>    
               <Input style={{marginTop:-10}} 
               value={this.state.Email}
               onChangeText={
                 (res)=>{this.setState({Email:res})}
               }
               />
    </View>
   
</View>


<View style={{height:55,flexDirection:'row',marginTop:20}}>
{this.state.showDateInput && (
       this.DatePicker()
      )}


    <View style={{flex:1,borderBottomWidth:0.5,paddingRight:10}}>

                
<View style={{flex:1,paddingRight:10}}>
                <TouchableOpacity onPress={
                  ()=>{
                    this.setState({
                      showDateInput : true,
                      NameDateState : 'DateOfBirth'
                    })
                    
                  }
                }>
                  <Text style={{fontSize:12}}>Date Of Birth 
                  {/* {this.state.DateOfBirth} */}
                  </Text>    
                <Text style={{fontSize:15,marginLeft:20,marginTop:5}}>
                  {
                  this.state.DateOfBirth!="" && this.state.DateOfBirth.length != 10 ?
                  this.state.DateOfBirth.getFullYear() + "-" + ("0" + (this.state.DateOfBirth.getMonth() + 1)).slice(-2)  + '-' +  ("0" + (this.state.DateOfBirth.getDate())).slice(-2)  
                    : this.state.DateOfBirth!="" && this.state.DateOfBirth.length == 10 ? this.state.DateOfBirth :"-"}
                    </Text>    
                
                </TouchableOpacity>
    </View>

    </View>
    <View style={{width:20}}></View>
    
    <View style={{flex:1,borderBottomWidth:0.5,paddingRight:10}}>
      
                <Text style={{fontSize:12}}>Customer Type <Text style={{color:'red'}}>*</Text></Text>    
                <Picker
  selectedValue={this.state.CustomerType}
  style={{height: 40,
}}

onValueChange = {
  (val) =>{
    this.setState({
      CustomerType : val
    })
  }
}

  >
      <Picker.Item label="Choose" value=""  />
      {
        this.state.ListCustomerType.map((item,key)=>(
          <Picker.Item label={item.Name} value={item.Id} key={key}/>
        ))
      }


  </Picker>
    </View>
    <View style={{width:10}}></View>

    <View style={{flex:1,borderBottomWidth:0.5,paddingRight:10}}>
      
                <Text style={{fontSize:12}}>Segmentation <Text style={{color:'red'}}>*</Text></Text>    
                <Picker
  selectedValue={this.state.Segmentation}
  style={{height: 40,
}}

onValueChange = {
  (val) =>{
    this.setState({
      Segmentation : val
    })
  }
}

  >
      <Picker.Item label="Choose" value=""  />

      {
        this.state.ListSegmentation.map((item,key)=>(
          <Picker.Item label={item.Name} value={item.Id} key={key}/>
        ))
      }
  
  
  </Picker>
    </View>
</View>


<View style={{height:55,marginTop:20}}>
<Text style={{fontSize:12}}>Address</Text>    
               <Input style={{marginTop:-10}}
                     value={this.state.Address}
                     onChangeText={
                       (res)=>{this.setState({Address:res})}
                     }
               />
</View>


<View style={{height:55,flexDirection:'row',marginTop:20}}>



    <View style={{flex:1,borderBottomWidth:0.5,paddingRight:10}}>

                
<View style={{flex:1,}}>
       
                  <Text style={{fontSize:12}}>Area <Text style={{color:'red'}}>*</Text></Text>    
                  <Picker
  selectedValue={this.state.Area}
  style={{height: 40,
}}

onValueChange = {
  (val) =>{
    this.setState({
      Area : val
    })
  }
}

  >    
      <Picker.Item label="Choose" value=""  />
      {
        this.state.ListArea.map((item,key)=>(
          <Picker.Item label={item.Name} value={item.Id} key={key}/>
        ))
      }
  </Picker>
          
    </View>

    </View>
    <View style={{width:20}}></View>
    
    <View style={{flex:1,borderBottomWidth:0.5,paddingRight:10}}>
      
                <Text style={{fontSize:12}}>Hobby</Text>    
 <Input
 value={this.state.Hobby}
 onChangeText={
   (res)=>{
     this.setState({Hobby:res})
   }
 }
 style={{
   marginTop:-11
 }}
 />
    </View>
    <View style={{width:20}}></View>

    <View style={{flex:1,borderBottomWidth:0.5,paddingRight:10}}>
      
                <Text style={{fontSize:12}}>Religion</Text>    
                <Picker
  selectedValue={this.state.Religion}
  style={{height: 40,
}}

onValueChange = {
  (val) =>{
    this.setState({
      Religion : val
    })
  }
}

  >      

      <Picker.Item label="Choose" value=""  />
      {
        this.state.ListReligion.map((item,key)=>(
          <Picker.Item label={item.Name} value={item.Id} key={key}/>
        ))
      }
  
  
  </Picker>
    </View>
</View>


<View style={{height:50,backgroundColor:'grey',justifyContent:'center',marginTop:20,padding:5}}>
            <Text style={{fontSize:16,color:'white',fontStyle:'italic',fontWeight:'500'}}> Practice Information </Text>
</View>

<View style={{height:55,flexDirection:'row',marginTop:20}}>



    <View style={{flex:1,borderBottomWidth:0.5,paddingRight:10}}>

                
<View style={{flex:1,paddingRight:10}}>
       
       <TouchableOpacity

       onPress={
         ()=>{
           this.setState({
             ShowModal:true,
             OutletActive : "1"
            })
         }
       }
       >
                  <Text style={{fontSize:12}}>Outlet 1 <Text style={{color:'red'}}>*</Text></Text>    
                  
                  <Text style={{fontSize:15,marginTop:10}}>{this.state.OutletName1 == "" ? "-" : this.state.OutletName1}</Text>
                  </TouchableOpacity>

    </View>

    </View>
    <View style={{width:20,}}></View>

    <View style={{flex:1,borderBottomWidth:0.5,paddingRight:10}}>

                
<View style={{flex:1,paddingRight:10}}>
       
       <TouchableOpacity

       onPress={
         ()=>{
           this.setState({
             ShowModal:true,
             OutletActive : "2"
            })
         }
       }
       >
                  <Text style={{fontSize:12}}>Outlet 2</Text>    
                  
                  <Text style={{fontSize:15,marginTop:10}}>{this.state.OutletName2 == "" ? "-" : this.state.OutletName2}</Text>
                  </TouchableOpacity>

    </View>

    </View>

    <View style={{width:20}}></View>
    <View style={{flex:1,borderBottomWidth:0.5,paddingRight:10}}>

                
<View style={{flex:1,paddingRight:10}}>
       
       <TouchableOpacity

       onPress={
         ()=>{
           this.setState({
             ShowModal:true,
             OutletActive : "3"
            })
         }
       }
       >
                  <Text style={{fontSize:12}}>Outlet 3  </Text>    
                  
                  <Text style={{fontSize:15,marginTop:10}}>{this.state.OutletName3 == "" ? "-" : this.state.OutletName3}</Text>
                  </TouchableOpacity>

    </View>

    </View>
</View>

<View style={{height:50,backgroundColor:'grey',justifyContent:'center',marginTop:20,padding:5}}>
            <Text style={{fontSize:16,color:'white',fontStyle:'italic',fontWeight:'500'}}> Family Information </Text>
</View>

<View style={{height:55,flexDirection:'row',marginTop:20}}>
{this.state.showDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={this.state.date}
          mode="date"
          minimumDate={new Date(2021,9,1)}
          maximumDate={new Date(2021,9,8)}
          // is24Hour={true}
          display="default"
          onChange={
            (event, selectedDate) => {
              const currentDate = selectedDate || this.state.date;
              
              // setDate(currentDate);
              this.setState({
                date : currentDate,
                showDate : false
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
                      showDateInput : true,
                      NameDateState : 'DateOfMarriage'
                    })
                  }
                }>
                  <Text style={{fontSize:12}}>Date Of Marriage</Text>    
                <Text style={{fontSize:15,marginLeft:20,marginTop:5}}>
                <Text style={{fontSize:15,marginLeft:20,marginTop:5}}>
                {
                  this.state.DateOfMarriage!="" && this.state.DateOfMarriage.length != 10 ?
                  this.state.DateOfMarriage.getFullYear() + "-" + ("0" + (this.state.DateOfMarriage.getMonth() + 1)).slice(-2)  + '-' +  ("0" + (this.state.DateOfMarriage.getDate())).slice(-2)  
                    : this.state.DateOfMarriage!="" && this.state.DateOfMarriage.length == 10 ? this.state.DateOfMarriage :"-"}
                   </Text>  </Text>    
                {/* <Text style={{fontSize:15,marginTop:3,marginLeft:10}}>-</Text> */}
                </TouchableOpacity>
    </View>

    </View>
    <View style={{width:20}}></View>
    
    <View style={{flex:1,paddingRight:10}}>
      
                <Text style={{fontSize:12}}>Husband's / Wife Name</Text>    
                <Input style={{marginTop:-10}} 
                onChangeText={
                  (res)=>{
                    this.setState({
                      SpouseName:res
                    })
                  }
                }
                value={this.state.SpouseName}
                />
    </View>
    <View style={{width:10}}></View>

    <View style={{flex:1,borderBottomWidth:0.5,paddingRight:10}}>

                
<View style={{flex:1,paddingRight:10}}>
                <TouchableOpacity onPress={
                  ()=>{
                    this.setState({
                      

          showDateInput : true,
          NameDateState : 'DataOfBirthSpouse'
                    })
                  }
                }>
                  <Text style={{fontSize:12}}>Date Of Birth Husband's / Wife</Text>    
                <Text style={{fontSize:15,marginLeft:20,marginTop:5}}>
                {
                  this.state.DataOfBirthSpouse!="" && this.state.DataOfBirthSpouse.length != 10 ?
                  this.state.DataOfBirthSpouse.getFullYear() + "-" + ("0" + (this.state.DataOfBirthSpouse.getMonth() + 1)).slice(-2)  + '-' +  ("0" + (this.state.DataOfBirthSpouse.getDate())).slice(-2)  
                    : this.state.DataOfBirthSpouse!="" && this.state.DataOfBirthSpouse.length == 10 ? this.state.DataOfBirthSpouse :"-"}
                   </Text>    

                </TouchableOpacity>
    </View>

    </View>
</View>

<View style={{height:55,flexDirection:'row',marginTop:20}}>



    <View style={{flex:1,borderBottomWidth:0.5,paddingRight:10}}>

                
<View style={{flex:1,paddingRight:10}}>
                <TouchableOpacity onPress={
                  ()=>{
                    this.setState({
                      
          showDateInput : true,
          NameDateState : 'DateofBirthChild1'
                    })
                  }
                }>
                  <Text style={{fontSize:12}}>Date Of Birth Child 1</Text>    
                <Text style={{fontSize:15,marginLeft:20,marginTop:5}}>
                {
                  this.state.DateofBirthChild1!="" && this.state.DateofBirthChild1.length != 10 ?
                  this.state.DateofBirthChild1.getFullYear() + "-" + ("0" + (this.state.DateofBirthChild1.getMonth() + 1)).slice(-2)  + '-' +  ("0" + (this.state.DateofBirthChild1.getDate())).slice(-2)  
                    : this.state.DateofBirthChild1!="" && this.state.DateofBirthChild1.length == 10 ? this.state.DateofBirthChild1 :"-"}
                  </Text>    
                {/* <Text style={{fontSize:15,marginTop:3,marginLeft:10}}>-</Text> */}
                </TouchableOpacity>
    </View>

    </View>
    <View style={{width:20}}></View>
    
    <View style={{flex:1,paddingRight:10}}>
      
                <Text style={{fontSize:12}}>Child's Name 1</Text>    
                <Input style={{marginTop:-10}} 
                value={this.state.ChildName1}
                onChangeText={
                  (res)=>{
                    this.setState({ChildName1:res})
                  }
                }
                />
    </View>
    <View style={{width:10}}></View>

    <View style={{flex:1,paddingRight:10}}>
      
      <Text style={{fontSize:12}}>Note</Text>    
      <Input style={{marginTop:-10}} 
             value={this.state.Note}
             onChangeText={
               (res)=>{
                 this.setState({Note:res})
               }
             }
      />
</View>
</View>

<View style={{height:55,flexDirection:'row',marginTop:20}}>


    <View style={{flex:1,borderBottomWidth:0.5,paddingRight:10}}>

                
<View style={{flex:1,paddingRight:10}}>
                <TouchableOpacity onPress={
                  ()=>{
                    this.setState({
                      showDateInput : true,
                      NameDateState : 'DateofBirthChild2'
                    })
                  }
                }>
                  <Text style={{fontSize:12}}>Date Of Birth Child 2</Text>    
                <Text style={{fontSize:15,marginLeft:20,marginTop:5}}>
                {
                  this.state.DateofBirthChild2!="" && this.state.DateofBirthChild2.length != 10 ?
                  this.state.DateofBirthChild2.getFullYear() + "-" + ("0" + (this.state.DateofBirthChild2.getMonth() + 1)).slice(-2)  + '-' +  ("0" + (this.state.DateofBirthChild2.getDate())).slice(-2)  
                    : this.state.DateofBirthChild2!="" && this.state.DateofBirthChild2.length == 10 ? this.state.DateofBirthChild2 :"-"}</Text>    
                {/* <Text style={{fontSize:15,marginTop:3,marginLeft:10}}>-</Text> */}
                </TouchableOpacity>
    </View>

    </View>
    <View style={{width:20}}></View>
    
    <View style={{flex:1,paddingRight:10}}>
      
                <Text style={{fontSize:12}}>Child's Name 2</Text>    
                <Input style={{marginTop:-10}} 
                       value={this.state.ChildName2}
                       onChangeText={
                         (res)=>{
                           this.setState({ChildName2:res})
                         }
                       }
                />
    </View>
    <View style={{width:10}}></View>

    <View style={{flex:1,paddingRight:10}}>
    
</View>
</View>







</View>
 

        </View>
        {/* close pointer    */}

{/* Button Update and Save */}
{
  this.state.TypeView == 1 ? 
  <this.ButtonUpdateDelete/>
  : <this.ButtonSave/>
}
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
      },

      MainContainer: {
        backgroundColor: '#FAFAFA',
        flex: 1,
        padding: 12,
      },
      AutocompleteStyle: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,
       borderWidth:1
      },
      SearchBoxTextItem: {
        margin: 5,
        fontSize: 16,
        paddingTop: 4,
      },
      selectedTextContainer: {
        flex: 1,
        justifyContent: 'center',
      },
      selectedTextStyle: {
        textAlign: 'center',
        fontSize: 18,
      },
})

export default UpdateCustomerScreen
