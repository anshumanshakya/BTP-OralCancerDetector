import React, { useState, useEffect } from 'react'
import {Text, View, Button, StyleSheet, Alert, Image} from 'react-native'
import {Picker} from '@react-native-picker/picker' 

import { firebase } from '../firebase/config'
import * as Progress from 'react-native-progress';
import * as tf from '@tensorflow/tfjs';
import { fetch, bundleResourceIO } from '@tensorflow/tfjs-react-native';
import * as jpeg from 'jpeg-js'


const PredictionScreen = ({route,navigation})=>{
   const photo = route.params.photo;
   const imageLink = route.params.imageLink;
   const [predictor, setPredictor]=useState("")
   const [prediction, setPrediction] = useState(null)
    const [loading, setLoading] = useState(false);
    const [predicting, setPredicting] = useState(false);
//    const [transferred, setTransferred] = useState(0);
//    const [imageLink, setImageLink] = useState(null);
//    const [cancerous, setCancerous] = useState("normal");

   //console.log(route.params);
   //console.log(cancerous);
   //console.log(imageLink)

   useEffect(() => {
    async function loadModel(){
    //   console.log("[+] Application started")
      //Wait for tensorflow module to be ready
      setLoading(true);
      const tfReady = await tf.ready();
    //   console.log("[+] Loading custom mask detection model")
      //Replce model.json and group1-shard.bin with your own custom model
      const modelJson = await require("../../assets/model/model2.json");
      const modelWeight = await require("../../assets/model/weights2.bin");
      const predictor = await tf.loadLayersModel(bundleResourceIO(modelJson,modelWeight));
    //   console.log("[+] Loading pre-trained face detection model")
      //Blazeface is a face detection model provided by Google
    //   const faceDetector =  await blazeface.load();
      //Assign model to variable
      setPredictor(predictor)
      //console.log(predictor)
    //   setFaceDetector(faceDetector)
      console.log("[+] Model Loaded");
      setLoading(false);
    }
    loadModel()
  }, []); 

  function imageToTensor(rawImageData){
    //Function to convert jpeg image to tensors
    const TO_UINT8ARRAY = true;
    const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY);
    // Drop the alpha channel info for mobilenet
    const buffer = new Uint8Array(width * height * 3);
    let offset = 0; // offset into original data
    for (let i = 0; i < buffer.length; i += 3) {
      buffer[i] = data[offset];
      buffer[i + 1] = data[offset + 1];
      buffer[i + 2] = data[offset + 2];
      offset += 4;
    }
    const tensorImage = tf.tensor3d(buffer, [height, width, 3]);
    return tensorImage.reshape([1,height, width, 3]);
  }

  const classifyImage = async() => {
    try{
    // console.log("[+] Retrieving image from link :"+imageLink)
    //const imageAssetPath = Image.resolveAssetSource({ uri: photo })
      setPredicting(true);
      const response = await fetch(imageLink, {}, { isBinary: true })
      const rawImageData = await response.arrayBuffer();
      const imageTensor = imageToTensor(rawImageData).resizeBilinear([224,224])
    //   const faces = await faceDetector.estimateFaces(imageTensor, false);
    //   var tempArray=[]
        let result = await predictor.predict(imageTensor).dataSync()

        // setPrediction(result)
        if(result[0]>result[1] && result[0]>result[2]){
          setPrediction("Benign")
        }
        else if(result[1]>result[0] && result[1]>result[2]){
          setPrediction("Malignant")
        }
        else{
          setPrediction("Premalignant")
        }
        console.log(result)
      console.log("[+] Prediction Completed")
      setPredicting(false)
    }catch (error){
      console.log(error)
    }
    
  }

   
   const logout = () => {
      firebase.auth().signOut();
   };

   return (

      <View style={{ flex: 1, alignItems:'center',justifyContent:'center' }}>
         <View style = {styles.buttonContainer}>
            <Button title="Home " onPress={() => {navigation.navigate('Home')}} />
            <View style={{ marginLeft: 30}}>
               <Button title="Log Out" onPress={logout} />
            </View>
         </View>
         
         <Image source={{ uri: photo }} style={{width:380,height:420}}/>
         <View>
         {loading ? (
           <Text>Loading Model</Text>
          ) : (
          <View>
          <Button title="Predict" onPress={classifyImage}/>
          </View>
          )}
         </View>
         <View>
         {predicting ? (
           <Text>Predicting..</Text>
          ) : (
          <View>
            <Text style={styles.textSize}>{prediction}</Text>
          </View>
          )}
         </View>
      </View>
   );
};

const styles =StyleSheet.create({
   textSize:{
       fontSize:30,
      fontWeight: "bold",
      textAlign: "center"
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

export default PredictionScreen;