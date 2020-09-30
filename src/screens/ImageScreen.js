import React from 'react'
import {Text,View,Button,StyleSheet,Image} from 'react-native'
const HomeScreen = ({route,navigation})=>{
   const { photo } = navigation.state.params;
   return (

    <View style={{ flex: 1, alignItems:'center',justifyContent:'center' }}>
       <Image source={{ uri: photo.uri }} style={{width:380,height:550}}/>
    </View>
   );
};

const styles =StyleSheet.create({
   textSize:{
       fontSize:30,
   }
});

export default HomeScreen;