const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const palabra = document.getElementById("palabra");


const palabras = ["Barco","Cocina","Boca","River","Agosto","Noviembre"];
let palabraSecreta = "";
let palabraAdivinada = "";

let vidas = 6;

iniciar();
const btn = document.getElementById("boton");
btn.addEventListener("click", comprobrar);

function mostrar(){
    document.getElementById("juego").style.display = "flex";
    document.getElementById("inicio").style.display = "none";
}

function iniciar(){
    palabraSecreta = palabras[Math.floor(Math.random()*palabras.length)];
    
    for(let i = 0;i < palabraSecreta.length;i++){
        palabraAdivinada= palabraAdivinada+"_ ";
    }
    palabra.innerHTML=palabraAdivinada;
}

function comprobrar() {
    const letra = document.getElementById("adivina").value.toLowerCase();
    palabraSecreta.toLowerCase();
    let nuevo = "";
    for(let i = 0;i<palabraSecreta.length;i++){
        if(letra== palabraSecreta[i]){
            nuevo =nuevo+ letra + " ";
        }else{
            nuevo = nuevo + palabraAdivinada[i*2] + " ";
        }
    }
    if(nuevo==palabraAdivinada){
        vidas--;
        document.getElementById("vida").innerHTML="las vidas que te quedan son: "+ vidas;
    }
    palabraAdivinada = nuevo;
    palabra.innerHTML=palabraAdivinada;

    if(vidas==0){
        alert("has perdido la palabra secreta era "+palabraSecreta);
    }
    if(palabraAdivinada.search("_")==-1){
        alert("felicidades ganaste ");
    }
}


ctx.fillRect(0,0,canvas.height,canvas.width);