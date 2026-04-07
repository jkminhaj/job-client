// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// const firebaseConfig = {
//     apiKey: import.meta.env.VITE_APIKEY,
//     authDomain: import.meta.env.VITE_AUTHDOMAIN,
//     projectId: import.meta.env.VITE_PROJECTID,
//     storageBucket: import.meta.env.VITE_STORAGEBUCKET,
//     messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
//     appId: import.meta.env.VITE_APPID
// };
const firebaseConfig = {
    apiKey: "AIzaSyCemO3JKQhH6IiEr_ulpAFQBbCMceBasXs",
    authDomain: "job2324-7cf51.firebaseapp.com",
    projectId: "job2324-7cf51",
    storageBucket: "job2324-7cf51.firebasestorage.app",
    messagingSenderId: "961864999700",
    appId: "1:961864999700:web:062bc85ab6593e19fe1801"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);