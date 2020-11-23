import React, {Component} from 'react'
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native'

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