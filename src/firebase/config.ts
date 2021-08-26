import * as firebase from 'firebase/app';
import * as firebaseAuth from 'firebase/auth';
import * as firebaseFirestore from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBikp8-zUQI--iwAQkn87KTB1jPsm0-MGs',
  authDomain: 'vue-firebase-efef5.firebaseapp.com',
  projectId: 'vue-firebase-efef5',
  storageBucket: 'vue-firebase-efef5.appspot.com',
  messagingSenderId: '1031618773850',
  appId: '1:1031618773850:web:0a2f00fe6279733e392963',
};

firebase.initializeApp(firebaseConfig);

const auth = firebaseAuth.getAuth();
const firestore = firebaseFirestore.getFirestore();

export {
  firestore, firebaseFirestore, auth, firebaseAuth,
};
