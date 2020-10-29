import React, { useState } from 'react'
import {Text, View, Button, StyleSheet, Alert, Image} from 'react-native'

import { firebase } from '../firebase/config'
import * as Progress from 'react-native-progress';

const ImageScreen = ({route,navigation})=>{
   const { photo } = route.params;
   const [uploading, setUploading] = useState(false);
   const [transferred, setTransferred] = useState(0);

   const uploadImage = async () => {
      const { uri } = { uri: photo.uri };
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      setUploading(true);
      setTransferred(0);
      const response = await fetch(uri);
      const blob = await response.blob();
      const task = firebase.storage()
        .ref().child(filename)
        .put(blob);
      // set progress state
      task.on('state_changed', snapshot => {
        setTransferred(
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
        );
      });
      try {
        await task;
      } catch (e) {
        console.error(e);
      }
      setUploading(false);
      Alert.alert(
        'Photo uploaded!',
        'Your photo has been uploaded to Firebase Cloud Storage!'
      );
   };
   
   const logout = () => {
      firebase.auth().signOut();
   };

   return (

      <View style={{ flex: 1, alignItems:'center',justifyContent:'center' }}>
         <Button title="Log Out" onPress={logout} />
         <Image source={{ uri: photo.uri }} style={{width:380,height:550}}/>
         <View>
            {uploading ? (
            <View style={styles.progressBarContainer}>
               <Progress.Bar progress={transferred} width={300} />
            </View>
            ) : (
               <View style={styles.buttonContainer}>
                  <View style={{ marginRight: 20}}>
                     <Button title="Retake" onPress={()=>{navigation.navigate('Camera')}}/>
                  </View>
                     <Button title="Submit" onPress={uploadImage}/>
               </View>
            )}
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
   },
   progressBarContainer: {
      marginTop: 20
   }
});

export default ImageScreen;