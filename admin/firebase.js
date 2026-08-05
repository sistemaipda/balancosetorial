import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBg3U-xB-X0ZbpkGa6Yr_Lr1JTVG7ZoWfg",
  authDomain: "voucher-setorial-contagem.firebaseapp.com",
  projectId: "voucher-setorial-contagem",
  storageBucket: "voucher-setorial-contagem.firebasestorage.app",
  messagingSenderId: "269396418254",
  appId: "1:269396418254:web:ed94b6e717de49f543fa9f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);