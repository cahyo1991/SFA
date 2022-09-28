import React from 'react'
import { View,Text } from 'react-native'

function HeaderTitle(props) {
    return (
        <View style={{height:50,backgroundColor:'white',justifyContent:'center'}}>
            <Text style={{fontSize:15,textAlign:'center',fontWeight:'bold',color:'#0b1013'}}> {props.Title} </Text>
</View>
    )
}

export default HeaderTitle
