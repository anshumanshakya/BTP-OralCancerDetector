import React , {useState, useEffect} from "react";
import { Text, StyleSheet, View, Button, BackHandler, Alert} from "react-native";
import {Picker} from '@react-native-picker/picker' 
import { useForm, Controller } from "react-hook-form";
import { TextInput} from "react-native-gesture-handler";
import { Input } from 'react-native-elements';
import { firebase } from '../firebase/config'
import { color } from "react-native-reanimated";


const HomeScreen = ({route,navigation}) => {
    //console.log(props)

    useEffect(() => {
        const handleBackButton = () => {
            Alert.alert(
                'Exit App',
                'Exiting the application?', [{
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                }, {
                    text: 'OK',
                    onPress: () => BackHandler.exitApp()
                }, ], {
                    cancelable: false
                }
             )
             return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          handleBackButton
        );
    
        return () => backHandler.remove();
    }, []);

    const { control, handleSubmit, errors } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        //console.log(route.params.user);
        navigation.navigate('ClickPhoto', {'uid': route.params.user.uid , 'userData' : data});
    };

    const logout = () => {
        firebase.auth().signOut();
    };

    const [selectedValue, setSelectedValue] = useState("male");
    const [selectedValue2, setSelectedValue2] = React.useState('no');
    const [selectedValue3, setSelectedValue3] = React.useState('no');
    const [selectedValue4, setSelectedValue4] = React.useState('no');

    const validateAge =(value)=>{
       if(value==="") return "*This Field is Required";
       else if(isNaN(value)) return "*Age must be number";
       else if(value>120) return "*Please Enter valid Age "
    }
    const validateYears =(value)=>{
        if(value==="") return "*This Field is Required";
        else if(isNaN(value)) return "*No of Years must be number";
        else if(value<0||value>100) return "*Please Enter valid No of Years"
    }
    const validateMonths =(value)=>{
        if(value==="") return "*This Field is Required";
        else if(isNaN(value)) return "*No of Months must be number";
        else if(value<0||value>11) return "*Please Enter valid No of Months"
    }

    console.log("errors", errors);
    const star=<Text style={{color:"red"}}>*</Text>
    return (
        <View style={styles.container}>
            <Text style={{textAlign: 'center'}}>
                Welcome <Text style={{fontWeight: "bold"}}>{route.params.user.email}</Text>
            </Text>
            <View style={styles.logoutbutton}><Button title="Log Out" onPress={logout} /></View>
            <Text style={styles.heading}>Please fill the details.{"\n"}</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Age: </Text>
                <View >
                    <Controller
                        name="age"
                        control={control}
                        rules={{validate:{validateAge}}}
                        defaultValue=""
                        render = {({ onChange, onBlur, value }) =>(
                            <TextInput
                                keyboardType="numeric"
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />             
                        )}
                    />
                <Text style={styles.errorMessage}>{errors?.age?.message}</Text>    
                </View>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Gender:</Text>
                <Controller
                    name="gender"
                    control={control}
                    // rules={{required: "This is required."}}
                    defaultValue="male"
                    render = {({ onChange, onBlur, value }) =>(
                        <Picker
                        style = {styles.dropdown}
                        selectedValue={selectedValue}
                        onValueChange={(itemValue, itemIndex) => {
                            setSelectedValue(itemValue)
                            onChange(itemValue)
                            }}
                        >
                            <Picker.Item label="Male" value="male" />
                            <Picker.Item label="Female" value="female" />
                        </Picker>

                    )}

                />
            </View>
           
            <View style={{margin:10}}>
                <Text>Duration of Problems: </Text>
                <Controller
                    name="years"
                    control={control}
                    rules={{validate:{validateYears}}}
                    defaultValue=""
                    render = {({ onChange, onBlur, value }) =>(
                        <View style={styles.inputContainer}>
                            <Text>Years: </Text>
                            <View>
                                <TextInput
                                    keyboardType="numeric"
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                /> 
                                <Text style={styles.errorMessage}>{errors?.years?.message}</Text>
                            </View>
                        </View>
                    )}

                />
        
                <Controller
                    name="months"
                    control={control}
                    rules={{validate:{validateMonths}}}
                    defaultValue=""
                    render = {({ onChange, onBlur, value }) =>(
                        <View  style={styles.inputContainer}>
                            <Text>Months: </Text>
                            <View>
                                <TextInput
                                    keyboardType="numeric"
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                />
                                <Text style={styles.errorMessage}>{errors?.months?.message}</Text>
                            </View>             
                        </View>
                    )}
                />
            </View>
         
            <View style={{marginLeft:10,marginBottom:10}}>
                <Text>Bad teeth / previous mouth problem: </Text>
                <Controller
                        name="teeth"
                        control={control}
                        defaultValue="no"
                        render = {({ onChange, onBlur, value }) =>(
                            <Picker
                            style = {styles.dropdown}
                                selectedValue={selectedValue2}
                                onValueChange={(itemValue, itemIndex) => {
                                    setSelectedValue2(itemValue)
                                    onChange(itemValue)
                                    }}
                            >
                                    <Picker.Item label="Yes" value="yes" />
                                    <Picker.Item label="No" value="no" />
                            </Picker>
                        )}
                />
            </View>
            
            <View style={{marginLeft:10,marginBottom:10}}>
                 <Text>Do you chew Tobacco:</Text>
                <Controller
                        name="tobacco"
                        control={control}
                        defaultValue="no"
                        render = {({ onChange, onBlur, value }) =>(
                            <Picker
                            style = {styles.dropdown}
                                selectedValue={selectedValue3}
                                onValueChange={(itemValue, itemIndex) => {
                                    setSelectedValue3(itemValue)
                                    onChange(itemValue)
                                    }}
                            >
                                    <Picker.Item label="Yes" value="yes" />
                                    <Picker.Item label="No" value="no" />
                            </Picker>
                        )}
                />
            </View>
       
            <View style={{marginLeft:10,marginBottom:10}}>
                <Text>Do you smoke:</Text>
                <Controller
                        name="smoke"
                        control={control}
                        defaultValue="no"
                        render = {({ onChange, onBlur, value }) =>(
                            <Picker
                            style = {styles.dropdown}
                                selectedValue={selectedValue4}
                                onValueChange={(itemValue, itemIndex) => {
                                    setSelectedValue4(itemValue)
                                    onChange(itemValue)
                                    }}
                            >
                                    <Picker.Item label="Yes" value="yes" />
                                    <Picker.Item label="No" value="no" />
                            </Picker>
                        )}
                />
            </View>

            <View style={styles.button}>
                <Button title="Next" onPress={handleSubmit(onSubmit)} />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor:"white",
      margin: 10,
  },
  inputContainer:{
    flexDirection: "row",
    margin:10
  },
  input: {
    height: 40,
    width: 200,
    padding: 10,
    borderWidth:1,
    borderRadius: 5
  },
  dropdown: {
    height: 50,
    width: 150
  },
  button:{
    alignItems:'center'
  },
  logoutbutton:{
    margin: 20,
    alignItems:'center'
  },
  errorMessage:{
    color :'red',
  }
});

export default HomeScreen;
