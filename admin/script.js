import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getFirestore,
    collection,
    doc,
    setDoc,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBg3U-xB-X0ZbpkGa6Yr_Lr1JTVG7ZoWfg",
    authDomain: "voucher-setorial-contagem.firebaseapp.com",
    projectId: "voucher-setorial-contagem",
    storageBucket: "voucher-setorial-contagem.firebasestorage.app",
    messagingSenderId: "269396418254",
    appId: "1:269396418254:web:ed94b6e717de49f543fa9f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const btn = document.getElementById("gerar");
const lista = document.getElementById("listaVouchers");

function gerarCodigo() {

    let a = Math.floor(Math.random() * 100000).toString().padStart(5, "0");
    let b = Math.floor(Math.random() * 100000).toString().padStart(5, "0");

    return a + "-" + b;

}

async function gerarVouchers() {

    btn.disabled = true;

    const quantidade = parseInt(document.getElementById("quantidade").value);
    const duracao = parseInt(document.getElementById("duracao").value);
    const descricao = document.getElementById("descricao").value.trim();

    for (let i = 0; i < quantidade; i++) {

        const codigo = gerarCodigo();

        await setDoc(doc(db, "vouchers", codigo), {

            ativo: true,
            descricao: descricao,
            duracao: duracao,
            criadoEm: new Date(),
            inicio: null,
            fim: null,
            acessos: 0

        });

    }

    await carregar();

    btn.disabled = false;

    alert("Vouchers gerados com sucesso.");

}

async function carregar() {

    lista.innerHTML = "";

    const dados = await getDocs(collection(db, "vouchers"));

    dados.forEach((docSnap) => {

        const d = docSnap.data();

        lista.innerHTML += `
        <tr>
            <td>${docSnap.id}</td>
            <td>${d.ativo ? "Ativo" : "Expirado"}</td>
            <td>${d.duracao} min</td>
        </tr>
        `;

    });

}

btn.onclick = gerarVouchers;

carregar();