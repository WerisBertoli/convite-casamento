// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDW-QYTaP3YKyTT6xoufmSqmurCXlnuZDU",
  authDomain: "tripfy-9f09b.firebaseapp.com",
  projectId: "tripfy-9f09b",
  storageBucket: "tripfy-9f09b.firebasestorage.app",
  messagingSenderId: "789407223851",
  appId: "1:789407223851:web:7bfb1996e8a62c4e7dda6e",
  measurementId: "G-3RX0B0B1SV"
};

// IMPORTANTE: As regras do Firestore precisam ser atualizadas no console do Firebase
// Regras sugeridas para produção:
/*
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2026, 12, 31);
    }
  }
}
*/

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, analytics };