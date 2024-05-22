// const firebase = require("firebase");
import config from "./config.js";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// const config = require("./config");

firebase.initializeApp(config.firebaseConfig);
const db = firebase.firestore();
export default {
  db: db,
  firebase: firebase,
};
