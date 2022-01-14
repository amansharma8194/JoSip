import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyCqoT_HCV2Im4JzkO83nopAbJtBQYUCLrI',
  authDomain: 'josip-b69a1.firebaseapp.com',
  databaseURL:
    'https://josip-b69a1-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'josip-b69a1',
  storageBucket: 'josip-b69a1.appspot.com',
  messagingSenderId: '851186823923',
  appId: '1:851186823923:web:a011151c3edda178493d86',
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
export const Storage = app.storage();
