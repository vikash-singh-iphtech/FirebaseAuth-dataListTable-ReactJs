import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging } from "firebase/messaging";


const firebaseConfig = {
  apiKey: "AIzaSyDZLtUPRAH2QiydAymfRf4457j7NyUv8SU",
  authDomain: "pwa-app-2b96d.firebaseapp.com",
  databaseURL: "https://pwa-app-2b96d-default-rtdb.firebaseio.com",
  projectId: "pwa-app-2b96d",
  storageBucket: "pwa-app-2b96d.appspot.com",
  messagingSenderId: "230575406452",
  appId: "1:230575406452:web:fab98689e7446fb3064021",
  measurementId: "G-V2G6MGPNN5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const messaging = getMessaging(app);