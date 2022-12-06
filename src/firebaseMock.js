// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'MyApiKey',
  authDomain: 'todo-app-react-megas.firebaseapp.com',
  projectId: 'todo-app-react-megas',
  storageBucket: 'todo-app-react-megas.appspot.com',
  messagingSenderId: 'MySandId',
  appId: 'X:MyNumber:Zap:HexaDec',
};

// Initialize Firebase
const appMock = initializeApp(firebaseConfig);
export const dbMock = getFirestore(appMock);
