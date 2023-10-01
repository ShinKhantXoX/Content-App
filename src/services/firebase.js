// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJEJvcVWqm8yJNrD3fuFputWKgQrJxm6I",
  authDomain: "content-app-94b96.firebaseapp.com",
  projectId: "content-app-94b96",
  storageBucket: "content-app-94b96.appspot.com",
  messagingSenderId: "1093154817151",
  appId: "1:1093154817151:web:f95f91ab6901649148eb4a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getStorage(app);