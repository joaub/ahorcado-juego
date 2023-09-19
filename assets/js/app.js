const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const palabra = document.getElementById("palabra");


const palabras = ["barco","cocina","boca","river","agosto","noviembre"];
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
    dibujar();
}

ctx.fillStyle = "#999292"
ctx.fillRect(0,0,canvas.height,canvas.width);

//base del ahorcado
ctx.fillStyle = "red";
ctx.fillRect(0,390,150,120);
ctx.fillRect(70,100,15,300);
ctx.fillRect(70,100,150,10);
ctx.fillRect(210,110,10,50);

function dibujar() {
    
    if(vidas <= 5){
         //cabeza
         ctx.fillStyle = "#000000";
         ctx.beginPath();
         ctx.arc(210,170,20,0,2*Math.PI);
         ctx.fill();
         ctx.stroke();
    }
    if(vidas<=4){
        //cuerpo
        ctx.beginPath();
        ctx.moveTo(210,190);
        ctx.lineTo(210,280);
        ctx.lineWidth = 12;
        ctx.stroke();
    }
    if(vidas<=3){
        //brazo
        ctx.beginPath();
        ctx.moveTo(210,185);
        ctx.lineTo(170,270);
        ctx.lineWidth = 7;
        ctx.stroke();
    }
    if(vidas<=2){
        //brazo
        ctx.beginPath();
        ctx.moveTo(210,185);
        ctx.lineTo(250,270);
        ctx.lineWidth = 7;
        ctx.stroke();

    }
    if(vidas<=1){
        //pierna
        ctx.beginPath();
        ctx.moveTo(210,270);
        ctx.lineTo(170,330);
        ctx.lineWidth = 7;
        ctx.stroke();
    }
    if(vidas==0){
        //pierna
        ctx.beginPath();
        ctx.moveTo(210,270);
        ctx.lineTo(250,330);
        ctx.lineWidth = 7;
        ctx.stroke();
    }
        
}


