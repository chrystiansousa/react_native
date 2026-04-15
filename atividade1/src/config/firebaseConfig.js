import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBEY_9wFiYWjev_BEFm6v8ls0qo-MRWXSM",
  authDomain: "pratica02-chrystian.firebaseapp.com",
  projectId: "pratica02-chrystian",
  storageBucket: "pratica02-chrystian.firebasestorage.app",
  messagingSenderId: "764179185621",
  appId: "1:764179185621:web:94b7558f770768d48e475c"
};

// Inicialização segura: 
// Verifica explicitamente se já existe um app instanciado.
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Exporta os serviços passando a instância segura do app
export const auth = getAuth(app);
export const db = getFirestore(app);