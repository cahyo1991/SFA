import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome';
function HeaderBack(props) {
    return (
        <View style={[Styles.boxShadow, {height:60,padding:5,flexDirection:'row'}]}>
        <View style={{width:50,justifyContent:'center'}}>
            
        <TouchableOpacity
        onPress={
            ()=> {
                props.navigation.goBack() 
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
            <Text style={{fontSize:17,fontWeight:'bold',textAlign:'center',color:'#36434b'}}>{props.Name}</Text>
        </View>
</View>
    )
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

export default HeaderBack
