import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBOsPV93ufLLdU2-eZg07bpPUyDziHp47M",
    authDomain: "tela-login-83c7d.firebaseapp.com",
    projectId: "tela-login-83c7d",
    storageBucket: "tela-login-83c7d.appspot.com",
    messagingSenderId: "228910491338",
    appId: "1:228910491338:web:d604fe45cfcf607a417633"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export default firebase;
