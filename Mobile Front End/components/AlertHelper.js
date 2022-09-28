import React from 'react'
import {Alert,BackHandler} from 'react-native'

function AlertHelper(props) {
    return 
        Alert.alert(
            props.Title,
            props.Message,
            [
              {
                  text: 'OK', 
                  onPress: () => BackHandler.exitApp()
                },
            ]
          );
    
}

export default AlertHelper
