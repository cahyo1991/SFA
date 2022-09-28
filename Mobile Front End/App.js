import React, { useState,useEffect  } from 'react';
import { View,Text,StyleSheet, Image, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input,Button  } from 'react-native-elements';
import LoginScreen from './screens/LoginScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigation from './components/BottomNavigation';
import HomeScreen from './screens/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import MyCallScreen from './screens/MyCallScreen';
import AuthLoginScreen from './screens/AuthLoginScreen';
import { AuthContext } from './context';
import ScheduleScreen from './screens/ScheduleScreen';
import CoverageScreen from './screens/CoverageScreen';
import DetailCustomerScreen from './screens/DetailCustomerScreen';
import ProfileScreen from './screens/ProfileScreen';
import DoCallCustomerScreen from './screens/DoCallCustomerScreen';
import RegisterPlanScreen from './screens/RegisterPlanScreen';
import RegisterUnplanScreen from './screens/RegisterUnplanScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import NewCustomerScreen from './screens/NewCustomerScreen';
import RegisterCoverageScreen from './screens/RegisterCoverageScreen';
import PromoScreen from './screens/PromoScreen';
import BrochureScreen from './screens/BrochureScreen';
import VideoPromoScreen from './screens/VideoPromoScreen';
import ReasonNoCallScreen from './screens/ReasonNoCallScreen';
import DeleteTes from './screens/DeleteTes';
import DoCallUnPlanScreen from './screens/DoCallUnPlanScreen';
import UpdateCustomerScreen from './screens/UpdateCustomerScreen';
import UpdatePasswordScreen from './screens/UpdatePasswordScreen';



const StackHome = createStackNavigator();
const StackLogin = createStackNavigator();
const api = process.env.API;

global.Api = api ;
global.ApiImage = api + "Images/";
global.TimeOut = 20000;
const PageNotLogin = () => {
  return (
    <StackLogin.Navigator
    screenOptions={{
      headerShown : false
    }}
    >
      <StackLogin.Screen name="AuthLoginScreen" component={AuthLoginScreen} />
        <StackLogin.Screen name="LoginScreen" component={LoginScreen} />
        <StackLogin.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
      
    </StackLogin.Navigator>
  )
}

const PageIsLogin = () => {
  return (

    <StackHome.Navigator
    screenOptions={{
      headerShown : false
    }}
    >
      <StackHome.Screen name="HomeScreen" component={HomeScreen} options={{
        animationEnabled:false
      }} />
      <StackHome.Screen name="MyCallScreen" component={MyCallScreen} options={{
        animationEnabled:false
      }}/>
          <StackHome.Screen name="CoverageScreen" component={CoverageScreen} options={{
        animationEnabled:false
      }}/>
      <StackHome.Screen name="ProfileScreen" component={ProfileScreen} options={{
        animationEnabled:false
      }}/>

<StackHome.Screen name="NewCustomerScreen" component={NewCustomerScreen} />
<StackHome.Screen name="ScheduleScreen" component={ScheduleScreen} />
<StackHome.Screen name="RegisterPlanScreen" component={RegisterPlanScreen} />
<StackHome.Screen name="RegisterUnplanScreen" component={RegisterUnplanScreen} />
<StackHome.Screen name="DetailCustomerScreen" component={DetailCustomerScreen} />
<StackHome.Screen name="DoCallCustomerScreen" component={DoCallCustomerScreen} />
<StackHome.Screen name="RegisterCoverageScreen" component={RegisterCoverageScreen} />
<StackHome.Screen name="PromoScreen" component={PromoScreen} />
<StackHome.Screen name="BrochureScreen" component={BrochureScreen} />
<StackHome.Screen name="VideoPromoScreen" component={VideoPromoScreen} />
<StackHome.Screen name="ReasonNoCallScreen" component={ReasonNoCallScreen} />
<StackHome.Screen name="DeleteTes" component={DeleteTes} />
<StackHome.Screen name="DoCallUnPlanScreen" component={DoCallUnPlanScreen} />
<StackHome.Screen name="UpdateCustomerScreen" component={UpdateCustomerScreen} />
<StackHome.Screen name="UpdatePasswordScreen" component={UpdatePasswordScreen} />
    </StackHome.Navigator>
   
  )
}




function App() {

  const [UserToken,SetUserToken] = React.useState(null);



  const authContext = React.useMemo(()=>{
    return {
      signIn : ()=>{
        SetUserToken('asdf');
        
      },
      signOut : ()=>{
        SetUserToken(null);
      }
    }
  })

  useEffect(() =>{
    SplashScreen.hide();
  })
  return (
<AuthContext.Provider value={authContext}>

<NavigationContainer>

  {
    UserToken!=null ? 
    <PageIsLogin/>
    :
    <PageNotLogin/>
  }
</NavigationContainer>

</AuthContext.Provider>
      
      // <BottomNavigation/>
      // <HomeScreen/>
      // <PageIsLogin/>
  )
}

export default App

