import React from 'react'
import {Text,View,Button,StyleSheet,Image} from 'react-native'
const SecondScreen = ({route,navigation})=>{
   
    return (
        <View style={styles.container}>
            
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
            <View style={{alignItems: "center"}}>
                <Button title="Take Photo" onPress= {() => {navigation.navigate('Camera', {'uid': route.params.uid, 'userData' : route.params.userData})}}/>
            </View>
        </View>
   );
};

const styles =StyleSheet.create({
    container:{ 
        flex: 1
    },
    heading:{
        fontWeight: 'bold',
        fontSize:20,
        marginTop: 20
   }
});

export default SecondScreen;