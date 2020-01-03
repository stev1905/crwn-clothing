import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
        apiKey: "AIzaSyAfX5K_G39bWng6XU3xo6lrEFUABKUCggM",
        authDomain: "crown-db-9ac4f.firebaseapp.com",
        databaseURL: "https://crown-db-9ac4f.firebaseio.com",
        projectId: "crown-db-9ac4f",
        storageBucket: "crown-db-9ac4f.appspot.com",
        messagingSenderId: "310583240794",
        appId: "1:310583240794:web:7b48b57f0c7cfc41ce5063",
        measurementId: "G-1XJ8YDHX4C"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters( {prompt: 'select_account'} );

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
