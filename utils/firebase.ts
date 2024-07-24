import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBGPgGmFL8-2HModaiHsvTRIJ4my0EoUZ0",
  authDomain: "login-page-92b25.firebaseapp.com",
  projectId: "login-page-92b25",
  storageBucket: "login-page-92b25.appspot.com",
  messagingSenderId: "201718369967",
  appId: "1:201718369967:web:f31d6ec3d32688649b0e5a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { auth }