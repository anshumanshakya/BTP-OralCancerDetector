import React, { useState, useEffect } from 'react'
import {Text, View, Button, StyleSheet, Alert, Image} from 'react-native'
import {Picker} from '@react-native-picker/picker' 

import { firebase } from '../firebase/config'
import * as Progress from 'react-native-progress';

const ImageScreen = ({route,navigation})=>{
   const photo = route.params.photo;
   const [uploading, setUploading] = useState(false);
   const [transferred, setTransferred] = useState(0);
   const [imageLink, setImageLink] = useState(null);
   const [cancerous, setCancerous] = useState("normal");

   //console.log(route.params);
   //console.log(cancerous);
   //console.log(imageLink)

   const uploadImage = async () => {
      const { uri } = { uri: photo };
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
      firebase.storage().ref().child(filename).getDownloadURL().then(function(url){
         setImageLink(url);
      }).catch(function(error){
         console.log(error);
      });
      
      //console.log(imageLink);
      setUploading(false);

      Alert.alert(
        'Photo uploaded!',
        'Your photo has been uploaded to Firebase Cloud Storage!'
      );
   };
   
   const logout = () => {
      firebase.auth().signOut();
   };

   useEffect(() => {
      if(imageLink != null){
         const dataentry = {
            imageLink,
            userData: route.params.userData,
            cancerous
         };
         const usersRef = firebase.firestore().collection('users')
         usersRef.doc(route.params.uid).collection('images').add(dataentry).then(() => {
            console.log('Data updated!');
         });
      }
   }, [imageLink]);

   return (

      <View style={{ flex: 1, alignItems:'center',justifyContent:'center' }}>
         <View style = {styles.buttonContainer}>
            <Button title="Home " onPress={() => {navigation.navigate('Home')}} />
            <View style={{ marginLeft: 30}}>
               <Button title="Log Out" onPress={logout} />
            </View>
         </View>
         
         <Image source={{ uri: photo }} style={{width:380,height:420}}/>
         <Picker
            style = {styles.dropdown}
            selectedValue={cancerous}
            onValueChange={(itemValue) => {
                  setCancerous(itemValue)
                  }}
         >
            <Picker.Item label="Normal" value="normal" />
            <Picker.Item label="Malignant" value="malignant" />
            <Picker.Item label="Pre-Malignant" value="premalignant" />
         </Picker>
         <View>
            {uploading ? (
            <View style={styles.progressBarContainer}>
               <Progress.Bar progress={transferred} width={300} />
            </View>
            ) : (
               <View style={styles.buttonContainer}>
                  <View style={{ marginRight: 20}}>
                     <Button title="Retake" onPress={()=>{navigation.navigate('ClickPhoto')}}/>
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
   },
   dropdown: {
      height: 50,
      width: 200
   },
   logoutbutton:{
      margin: 20,
      alignItems:'center'
    }
});

export default ImageScreen;