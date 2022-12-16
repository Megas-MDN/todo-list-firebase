// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'MyApiKey',
  authDomain: 'myDom.firebaseapp.com',
  projectId: 'myId-react-megas',
  storageBucket: 'myStorage-megas.appspot.com',
  messagingSenderId: 'MySandId',
  appId: 'X:MyNumber:Zap:HexaDec',
};

// Initialize Firebase
const appMock = initializeApp(firebaseConfig);
export const dbMock = getFirestore(appMock);
