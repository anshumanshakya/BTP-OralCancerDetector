import React, {useEffect } from 'react';
import {Text,View,Button,StyleSheet,Image, Platform} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { firebase } from '../firebase/config'

const SecondScreen = ({route,navigation})=>{

    useEffect(() => {
        (async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
        })();
    }, []);

    const logout = () => {
        firebase.auth().signOut();
     };

    const takeImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          quality: 1,
        });
        console.log(result);
        if (!result.cancelled) {
          navigation.navigate('Image',{'photo':result.uri, 'uid': route.params.uid, 'userData' : route.params.userData});
        }
      };


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
        navigation.navigate('Image',{'photo':result.uri, 'uid': route.params.uid, 'userData' : route.params.userData});
        }
    };

    return (
        <View style={styles.container}>
            <View style = {styles.buttonContainer}>
                <Button title="Home " onPress={() => {navigation.navigate('Home')}} />
                <View style={{ marginLeft: 30}}>
                <Button title="Log Out" onPress={logout} />
                </View>
            </View>
            <Text style={styles.heading}>Photo instructions:{"\n"}</Text>
            <Text>
                1. JPG, JPEG or HEIC format.{"\n"}
                2. Light: Daylight with patient facing towards sun with or without flash or white room-light with flash.{"\n"}
                3. Mobile camera setting: Minimum 2 megapixel, without zoom, focus the area of interest by touching the mobile screen before clicking picture, portrait mode i.e. holding the mobile in an upright position.{"\n"}
                4. Patient position: Comfortable sitting or standing position.{"\n"}
                5. Background: Light colour, preferably off-white.{"\n"}
                6. Distance: Mobile to patient, minimum 1 foot, maximum 3 feet.{"\n"}
                7. Confirm a good quality photograph before final submission.{"\n"}
            </Text>
            <View style={{flex: 1, alignItems: "center"}}>
                <View>
                    <Button title="Pick from Gallery" onPress={pickImage} />  
                </View>
                <View style={{marginTop: 20}}>
                    <Button title="Take Photo" onPress= {takeImage}/>
                </View>
            </View>
        </View>
   );
};

const styles =StyleSheet.create({
    container:{ 
        flex: 1,
        marginTop: 50,
    },
    heading:{
        fontWeight: 'bold',
        fontSize:20,
        marginTop: 20
    },
    buttonContainer:{
        flexDirection:"row",
        margin: 20,
        alignItems:'center',
        justifyContent:'center' 
    }
});

export default SecondScreen;