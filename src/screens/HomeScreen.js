import React , {useState} from "react";
import { Text, StyleSheet, View, Button, Picker } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput } from "react-native-gesture-handler";

const HomeScreen = () => {

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
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                        />

                    )}

                />
            </View>
            <View>
                <Text style={styles.label}>Gender:</Text>
                <Controller
                    name="gender"
                    control={control}
                    rules={{required: "This is required."}}
                    defaultValue=""
                    render = {({ onChange, onBlur, value }) =>(
                        <Picker
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
            <Button title="Next" onPress={handleSubmit(onSubmit)} />
        </View>
    );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20
  }
});

export default HomeScreen;
