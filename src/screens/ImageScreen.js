import React from 'react'
import {Text,View,Button,StyleSheet,Image} from 'react-native'
const HomeScreen = ({route,navigation})=>{
   const { photo } = navigation.state.params;
   return (

      <View style={{ flex: 1, alignItems:'center',justifyContent:'center' }}>
         <Image source={{ uri: photo.uri }} style={{width:380,height:550}}/>
         <View style={styles.buttonContainer}>
         <View style={{ marginRight: 20}}>
            <Button title="Retake" onPress={()=>{navigation.navigate('Camera')}}/>
         </View>
            <Button title="Submit"/>
         </View>
      </View>
   );
};

const styles =StyleSheet.create({
   textSize:{
       fontSize:30,
   },
   buttonContainer:{
      flexDirection:"row",
      margin: 20
   }
});

export default HomeScreen;