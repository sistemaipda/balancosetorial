const campo = document.getElementById("voucher");

campo.addEventListener("input",()=>{

let valor = campo.value.replace(/\D/g,"");

if(valor.length>5){

valor = valor.substring(0,5)+"-"+valor.substring(5);

}

campo.value=valor;

});