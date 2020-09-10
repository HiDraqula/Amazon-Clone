import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAZIEn4lpGDxLr1HwoHZs2Lce7VxR4-JzY",
  authDomain: "clones-25409.firebaseapp.com",
  databaseURL: "https://clones-25409.firebaseio.com",
  projectId: "clones-25409",
  storageBucket: "clones-25409.appspot.com",
  messagingSenderId: "503290387402",
  appId: "1:503290387402:web:2aaaad042bbcc0819e4d33"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };