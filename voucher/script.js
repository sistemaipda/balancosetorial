import {
initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getFirestore,
doc,
getDoc,
updateDoc,
increment,
serverTimestamp
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


const campo = document.getElementById("voucher");
const botao = document.getElementById("conectar");
const mensagem = document.getElementById("mensagem");



campo.addEventListener("input",()=>{

let valor = campo.value.replace(/\D/g,"");

if(valor.length > 10){
valor = valor.substring(0,10);
}

if(valor.length > 5){

valor = valor.substring(0,5)+"-"+valor.substring(5);

}

campo.value = valor;

});



botao.onclick = async()=>{


let codigo = campo.value;


if(codigo.length !== 11){

mensagem.innerHTML="Digite o código completo.";

return;

}



const referencia = doc(db,"vouchers",codigo);


const consulta = await getDoc(referencia);



if(!consulta.exists()){

mensagem.innerHTML="Voucher inválido.";

return;

}



const dados = consulta.data();



if(dados.ativo !== true){

mensagem.innerHTML="Voucher expirado.";

return;

}



let agora = new Date();



if(dados.fim){

let fim = dados.fim.toDate();


if(agora > fim){

await updateDoc(referencia,{
ativo:false
});


mensagem.innerHTML="Voucher expirado.";

return;

}

}



if(!dados.inicio){


let inicio = new Date();

let fim = new Date(
inicio.getTime() + dados.duracao * 60000
);


await updateDoc(referencia,{

inicio:serverTimestamp(),
fim:fim,
acessos:increment(1)

});


}else{


await updateDoc(referencia,{

acessos:increment(1)

});


}



mensagem.innerHTML="Acesso autorizado!";


};