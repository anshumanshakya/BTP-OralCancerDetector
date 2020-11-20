import React,{ useState,useEffect,useRef }from 'react';
import {Text,StyleSheet, View,TouchableOpacity} from 'react-native';
import { Camera } from 'expo-camera';
const CameraScreen=({route,navigation})=>{
    const [hasPermission, setHasPermission] = useState(null);
    const[cameraRef,setCameraRef]=useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  
    if (hasPermission === null) {
      return <View />;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={{ flex: 1 }}>
        <Camera style={{ flex: 1 }} type={type} ref={ref=>{setCameraRef(ref);}} autoFocus='on'>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}>
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignSelf: 'center'}} onPress={async() => {
                if(cameraRef){
                let photo = await cameraRef.takePictureAsync('photo');
                console.log('photo', photo);
                navigation.navigate('Image',{'photo':photo, 'uid': route.params.uid, 'userData' : route.params.userData});
                }
                }}>
                <View style={{ 
                borderWidth: 2,
                borderRadius:50,
                borderColor: 'white',
                height: 50,
                width:50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'}}
                >
                <View style={{
                borderWidth: 2,
                borderRadius:50,
                borderColor: 'white',
                height: 40,
                width:40,
                backgroundColor: 'white'}} >
                </View>
                </View>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
};

const styles=StyleSheet.create({
})

export default CameraScreen;

