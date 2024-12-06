import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2EOX1qBqrBBrtLtyZoZxqjOMSRdgmVvY",
  authDomain: "book-exchange-8d39d.firebaseapp.com",
  projectId: "book-exchange-8d39d",
  storageBucket: "book-exchange-8d39d.firebasestorage.app",
  messagingSenderId: "328048386879",
  appId: "1:328048386879:web:e3c64beeb5a5116be0298a",
  measurementId: "G-TLJ46L8QCV"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
const auth = getAuth(app);
export const storage = getStorage(app);

export default auth;