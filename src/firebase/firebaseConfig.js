import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyB2euIsgJVkZXk2MvqN7x9zg454aAfXBBg",
  authDomain: "playlist-e383a.firebaseapp.com",
  databaseURL: "https://playlist-e383a.firebaseio.com",
  projectId: "playlist-e383a",
  storageBucket: "playlist-e383a.appspot.com",
  messagingSenderId: "616965992070",
  appId: "1:616965992070:web:505ecb8cd55d0702"
};
firebase.initializeApp(config);
export default firebase;
