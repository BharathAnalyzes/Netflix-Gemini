// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA40FIDCxLcdei6-etUFNO3lvCHTXFGIdE",
  authDomain: "bharathgpt-8e9da.firebaseapp.com",
  projectId: "bharathgpt-8e9da",
  storageBucket: "bharathgpt-8e9da.appspot.com",
  messagingSenderId: "588466444668",
  appId: "1:588466444668:web:95d3d2b2f312499093acf9",
  measurementId: "G-7TH5EV5QSK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();