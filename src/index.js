import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import firebase from "firebase";
import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyBo3oZG8t4PvM2g7AZ7ihXm0bfaB7KJUK8",
  authDomain: "chatapp-react-488b3.firebaseapp.com",
  databaseURL: "https://chatapp-react-488b3.firebaseio.com",
  projectId: "chatapp-react-488b3",
  storageBucket: "chatapp-react-488b3.appspot.com",
  messagingSenderId: "229468777063",
  appId: "1:229468777063:web:414f508c30d3dffdbf82c2",
  measurementId: "G-39RFBMEYDX",
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
