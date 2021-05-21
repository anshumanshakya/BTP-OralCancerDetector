import React, { useEffect, useState, Component } from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from "./src/screens/HomeScreen";
import SecondScreen from "./src/screens/SecondScreen";
import ImageScreen from "./src/screens/ImageScreen"
import LoginScreen from "./src/screens/LoginScreen"
import RegistrationScreen from "./src/screens/RegistrationScreen"
import LoadingScreen from "./src/screens/LoadingScreen"
import PredictionScreen from './src/screens/PredictionScreen';


const Stack = createStackNavigator();

class App extends Component {

  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName = "Loading" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Loading" component={LoadingScreen} />
          <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="ClickPhoto" component={SecondScreen} />
          <Stack.Screen name="Image" component={ImageScreen} />
          <Stack.Screen name="Prediction" component={PredictionScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;

// const navigator = createStackNavigator(
//   {
//     Home: HomeScreen,
//     ClickPhoto: Secondscreen,
//     Image: ImageScreen,
//     Camera: CameraScreen,
//     Login: LoginScreen,
//     Registration: RegistrationScreen
//   },
//   {
//     initialRouteName: "Login",
//     defaultNavigationOptions: {
//       title: "App"
//     }
//   }
// );

// export default createAppContainer(navigator);
