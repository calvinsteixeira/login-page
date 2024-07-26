import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore, doc, setDoc, getDoc} from 'firebase/firestore';
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";

const isDevelopment = process.env.NODE_ENV === "development";

const firebaseLocalConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
};

const firebaseDeployConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
};

const firebaseConfig = isDevelopment ? firebaseLocalConfig : firebaseDeployConfig

const firebaseErrors: Record<string, { message: string, code: number }> = {
    "auth/email-already-in-use": {
        message: "Email já cadastrado",
        code: 409
    },
    "auth/invalid-credential": {
        message: "Credenciais inválidas",
        code: 401
    },
    "auth/weak-password": {
        message: "A senha escolhida é fraca",
        code: 400
    }
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export {auth, firestore, doc, setDoc, getDoc, firebaseErrors, googleProvider, signInWithPopup};
