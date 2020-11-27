import React, {Component} from 'react'
import {Text, View, StyleSheet, ActivityIndicator, BackHandler, Alert} from 'react-native'

import { firebase } from '../firebase/config'

class LoadingScreen extends Component {
    state = {loading: true, user: null};

    handleBackButton = () => {
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
    }

    componentDidMount(){
        const usersRef = firebase.firestore().collection('users');
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                usersRef
                .doc(user.uid)
                .get()
                .then((document) => {
                    const userData = document.data()
                    this.setState({user : userData})
                });
                this.props.navigation.navigate('Home', {user});
            } else {
                this.props.navigation.navigate('Login');
            }
          });

          BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    
    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }


    render() {
        return(
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff"/>
          </View>
        );
      }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default LoadingScreen;