import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBnnrecDkrldG2InvjQYLyVoz_fsOSqbOY',
  authDomain: 'oralcancerdetector.firebaseapp.com',
  databaseURL: 'https://oralcancerdetector.firebaseio.com',
  projectId: 'oralcancerdetector',
  storageBucket: 'oralcancerdetector.appspot.com',
  messagingSenderId: '682198926900',
  appId: '1:682198926900:android:58824763d1fec13bf06c61',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };