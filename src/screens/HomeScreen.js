import React , {useState} from "react";
import { Text, StyleSheet, View, Button, Picker } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput } from "react-native-gesture-handler";

const HomeScreen = ({navigation}) => {

    const { control, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log(data);

    const [selectedValue, setSelectedValue] = useState("Male");

    const [selectedValue2, setSelectedValue2] = React.useState('yes');
    const [selectedValue3, setSelectedValue3] = React.useState('yes');
    const [selectedValue4, setSelectedValue4] = React.useState('yes');

    console.log("errors", errors);
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Please fill the details.</Text>
            <View>
                <Text style={styles.label}>Age:</Text>
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
                    rules={{required: "This is required."}}
                    defaultValue=""
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
            <View>
                <Controller
                    name="years"
                    control={control}
                    rules={{required: "This is required."}}
                    defaultValue=""
                    render = {({ onChange, onBlur, value }) =>(
                        <View>
                            <Text>Years</Text>
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
                        <View>
                            <Text>Months</Text>
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
                        rules={{required: "This is required."}}
                        defaultValue=""
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
                        rules={{required: "This is required."}}
                        defaultValue=""
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
                        rules={{required: "This is required."}}
                        defaultValue=""
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
            <Button title="Next" onPress={()=>navigation.navigate('Camera')} />
        </View>
    );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20
  },
  container: {
      flex: 1,
      justifyContent: "center",
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
  }
});

export default HomeScreen;
