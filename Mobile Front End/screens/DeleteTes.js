import React, { Component } from 'react';
import {Text,View,Picker, FlatList,StyleSheet,Image, TouchableOpacity} from 'react-native'

import { Input,Button  } from 'react-native-elements';

class DeleteTes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterData : [],
            masterData : [],
            search : '',
            showListData : false
        }

    }

 
    componentDidMount() {
        this.getKlinik();
    }

    getKlinik = () =>{
        const ApiUrl = "https://jsonplaceholder.typicode.com/posts";
        fetch(ApiUrl).then(
            (response) => response.json()
        ).then(
            (responjson) => {
                // alert(responjson)
                this.setState({
                    filterData : responjson,
                    masterData : responjson,
                    
                })
            }
        ).catch((error)=>{
            console.error(error);
        })
    }

    ItemView = ({item}) =>{
        return (
            <TouchableOpacity style={{flex:1}}>
            <Text style={[styles.itemStyle]}>
                {item.id}{'. '}{item.title.toUpperCase()}
            </Text>
            </TouchableOpacity>
        )
    }

    ItemSeparatorView = () => {
        return (
            <View style={{height:0.5,width:'100%',backgroundColor:'green'}}>

            </View>
        )
    }

    SearchFilter = (text) => {

        if (text) {
            const newData  = this.state.masterData.filter(
                (item) => {
                    const ItemData = item.title ? item.title.toUpperCase():''.toUpperCase();
                    const textData = text.toUpperCase();
                    return ItemData.indexOf(textData) > -1;
                })
                this.setState({
                    filterData : newData,
                    search : text,
                    showListData : true
                })
        }else{
            this.setState({
                filterData : this.state.masterData,
                search : text,
                showListData : true
            })
        }
    }

    render() {
        return (
          <View>
            
              <View style={{flexDirection:'column',height:'100%',padding:20}}>
                    <View style={{flex:3,padding:10}}>
                        <Text style={{fontSize:20,fontWeight:'bold',textAlign:'center'}}>RESERVASI</Text>
                        <View>
                        <Input
                        style={styles.TextInputStyle}
                        value={this.state.search}
                        underlineColor="inactive"
                        
                        onChangeText ={
                            (res) => {
                                this.SearchFilter(res)
                            }
                        }
                        />

                      
                     
                        <FlatList
                        data={ this.state.showListData && this.state.search!="" ? this.state.filterData : ""}
                        keyExtractor={(item,index) => {
                             item.toString()
                        }}
                        ItemSeparatorComponent={this.ItemSeparatorView}
                        renderItem={this.ItemView}
                        style={{
                            height:200,
                            position:'absolute',
                            zIndex:10,
                            top:40,
                            flex:1
                        }}
                        />

<Text>fsdfd</Text>
</View>
                    </View>
                    <View style={{flex:3}}></View>
              </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    tester : {
        backgroundColor:'red'
    },
    itemStyle : {
        padding : 15
    },
    TextInputStyle : {
        height: 40,
        borderRadius:20,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        paddingLeft: 20,
        // margin: 5,
        backgroundColor:'#c3c3c3',
        fontSize:12
    }
})

export default DeleteTes;