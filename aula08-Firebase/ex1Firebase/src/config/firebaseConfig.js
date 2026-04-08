import { initializeApp } from 'firebase' ;
import { getAuth } from 'firebase/auth' ;
import { getFirestone } from 'firebase/firestone' ;

const firebaseConfig = {
  apiKey: "AIzaSyBX9CbeMTTgq23gADCF9gAwWvWQ_ubncLc",
  authDomain: "aula-rafael-7p.firebaseapp.com",
  projectId: "aula-rafael-7p",
  storageBucket: "aula-rafael-7p.firebasestorage.app",
  messagingSenderId: "337046335036",
  appId: "1:337046335036:web:ea093292b67456e3579d39",
  measurementId: "G-G5QN2Y6Q3L"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestone(app);