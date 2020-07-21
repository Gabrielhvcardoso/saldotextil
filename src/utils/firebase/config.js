import firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import 'firebase/firebase-auth';
import 'firebase/database';
import 'firebase/storage';


const firebaseConfig = {
  apiKey: 'AIzaSyCEAyO23MGvI5OyD7zMSyZo3I_TdY5NcQ0',
  authDomain: 'saldo-textil-ef063.firebaseapp.com',
  databaseURL: 'https://saldo-textil-ef063.firebaseio.com',
  projectId: 'saldo-textil-ef063',
  storageBucket: 'saldo-textil-ef063.appspot.com',
  messagingSenderId: '794757747072',
  appId: '1:794757747072:web:e6f44e5cce736bf823f165',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
