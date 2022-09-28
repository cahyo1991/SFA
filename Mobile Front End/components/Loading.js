import React from 'react'
import { View,Text } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';

function Loading(props) {
    return (
        <Spinner
        visible={true}
        textContent={'Please Wait'}
        textStyle={{color:'white'}}
      />
    )
}

export default Loading
