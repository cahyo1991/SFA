import React, { Component } from 'react'
import { StyleSheet, Text, View,ImageBackground,Alert } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderBack from '../components/HeaderBack';
import {Picker} from '@react-native-community/picker';
import { Input,Button  } from 'react-native-elements';
// import DatePicker from 'react-native-datepicker'
import DateTimePicker from '@react-native-community/datetimepicker';
import Gallery from 'react-native-image-gallery';
export class BrochureScreen extends Component {


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
          ShowImage : false,
          ImageSelected : 'http://i.imgur.com/XP2BE7q.jpg',
          ListBrochure : []
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

      getBrochure = async () =>{
        const controller = new AbortController();
        setTimeout(()=> controller.abort(), global.TimeOut);
          fetch(global.Api + "/Api/GetBrochureImage?PamCode=" + this.props.route.params.PamCode,
          {
            "signal": controller.signal,
            method : 'get',
            headers: {
              'Token' : this.props.route.params.Token,
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
          }).then((response) => response.json()).
          then(
            data =>{
              if (data.Status == "1") {
                
                console.log("Data Brochure",data);
                const datax = [];
                for (let index = 0; index < data.Return.length; index++) {
                    // const element = array[index];
                    datax.push({
                        'Image' : data.Return[index]["Image"],
                        'Title' : data.Return[index]["Title"]
                    })   
                }

                this.setState({
                    ListBrochure : datax
                })
              
             
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

      componentDidMount = () =>{
          this.getBrochure()
      }


      openImage = () =>{
          return (
            <Gallery
            initialPage={0}
            onSingleTapConfirmed={()=>{
                this.setState({
                    ShowImage:false
                })
            }}
            style={{ flex: 1, backgroundColor: 'black' }}
            images={[
              { source: { uri: this.state.ImageSelected } },
            ]}
          />
          )
      }

    render() {
        return (
            
            <View style={{flex:1}}>


                {/* <TouchableOpacity onPress={
                    ()=>{
                        this.props.navigation.navigate("HomeScreen")
                    }
                }>
                    <Text>Tester</Text>
                </TouchableOpacity> */}



           <HeaderBack Name="BROCHURE" navigation={this.props.navigation}/>

{
    this.state.ShowImage == true ?
    <this.openImage/> : 
    <ScrollView>
        <View style={{flex:1,flexDirection:'row',flexWrap:'wrap'}}>

        {
        this.state.ListBrochure.map((item,key)=>(
            <TouchableOpacity key={key}
    onPress= {
        ()=>{
            this.setState({
                ShowImage : true,
                ImageSelected : global.ApiImage+'Brochure/Images/'+item.Image
            })
        }
    }
    >
        <View style={{width:200,height:200,}}>
        <ImageBackground source={{uri:global.ApiImage+'Brochure/Images/'+item.Image}} 
                   style={{
                    flex: 1,
                    justifyContent: "center",
                    padding:5
                    
                   }}
                   imageStyle={{opacity:0.4}}
                   resizeMode="cover"
                   >
                       <Text style={{fontWeight:'bold',textAlign:'center',color:'white',backgroundColor:'#34495e',padding:3}}>{item.Title}</Text>

                       </ImageBackground>
        </View>
        </TouchableOpacity>
        ))
      }

          


        
        </View>
        </ScrollView>
    
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
      }
})

export default BrochureScreen
