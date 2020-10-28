import React, {Component} from 'react'
import {Text, View,StyleSheet} from 'react-native'

import { firebase } from '../firebase/config'

class LoadingScreen extends Component {
    state = {loading: true, user: null};

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
    }
    render() {
        return(
          <View>
            <Text>App</Text>
          </View>
        );
      }
}

export default LoadingScreen;