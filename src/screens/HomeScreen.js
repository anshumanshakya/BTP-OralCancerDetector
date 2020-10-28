import React , {useState} from "react";
import { Text, StyleSheet, View, Button, Picker } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput } from "react-native-gesture-handler";
import { firebase } from '../firebase/config'


const HomeScreen = (props,{navigation}) => {
    console.log(props)
    const { control, handleSubmit, errors } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        navigation.navigate('ClickPhoto');
    };

    const logout = () => {
        firebase.auth().signOut();
    };

    const [selectedValue, setSelectedValue] = useState("male");

    const [selectedValue2, setSelectedValue2] = React.useState('no');
    const [selectedValue3, setSelectedValue3] = React.useState('no');
    const [selectedValue4, setSelectedValue4] = React.useState('no');

    console.log("errors", errors);
    return (
        <View style={styles.container}>
            <Button title="Log Out" onPress={logout} />
            <Text style={styles.heading}>Please fill the details.{"\n"}</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Age: </Text>
                <Controller
                    name="age"
                    control={control}
                    rules={{required: "This is required."}}
                    defaultValue=""
                    render = {({ onChange, onBlur, value }) =>(
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                        />

                    )}

                />
            </View>
            <View >
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
            <Text>Duration of Problems: </Text>
            <View >
                <Controller
                    name="years"
                    control={control}
                    rules={{required: "This is required."}}
                    defaultValue=""
                    render = {({ onChange, onBlur, value }) =>(
                        <View style={styles.inputContainer}>
                            <Text>Years: </Text>
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        </View>
                    )}

                />
                <Controller
                    name="months"
                    control={control}
                    rules={{required: "This is required."}}
                    defaultValue=""
                    render = {({ onChange, onBlur, value }) =>(
                        <View  style={styles.inputContainer}>
                            <Text>Months: </Text>
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        </View>
                    )}

                />
            </View>
            <Text>Bad teeth / previous mouth problem: </Text>
            <View>
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
            <Text>Do you chew Tobacco:</Text>
            <View>
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
            <Text>Do you smoke:</Text>
            <View>
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
  },
  inputContainer:{
    flexDirection: "row",
    margin: 10
  },
  input: {
    height: 40,
    width: 100,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10
  },
  dropdown: {
    height: 50,
    width: 150
  },
  button:{
    alignItems:'center'
  }
});

export default HomeScreen;
