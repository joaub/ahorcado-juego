const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const palabra = document.getElementById("palabra");

const palabras = ["barco", "cocina", "boca", "river", "agosto", "noviembre"];
let palabraSecreta = "";
let palabraAdivinada = [];
let vidas = 6;
let letrasIngresadas = new Set(); // Guarda letras ingresadas para evitar repeticiones

// Inicializar juego
iniciar();

const btn = document.getElementById("boton");
btn.addEventListener("click", comprobar);

function mostrar() {
    document.getElementById("juego").style.display = "flex";
    document.getElementById("inicio").style.display = "none";
}

function iniciar() {
    palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
    palabraAdivinada = Array(palabraSecreta.length).fill("_");
    vidas = 6;
    letrasIngresadas.clear();
    actualizarUI();
}

function comprobar() {
    const input = document.getElementById("adivina");
    let letra = input.value.trim().toLowerCase();

    // ✅ Verificar que se ingresó una letra válida
    if (letra === "" || !/^[a-zñ]$/.test(letra)) {
        alert("Ingresa una letra válida.");
        return;
    }

    // ✅ Verificar si la letra ya fue ingresada
    if (letrasIngresadas.has(letra)) {
        alert("Ya ingresaste esta letra.");
        return;
    }

    letrasIngresadas.add(letra);
    let acierto = false;

    for (let i = 0; i < palabraSecreta.length; i++) {
        if (palabraSecreta[i] === letra) {
            palabraAdivinada[i] = letra;
            acierto = true;
        }
    }

    if (!acierto) {
        vidas--; //  Solo resta una vida si la letra no está en la palabra
    }

    actualizarUI();

    //  Verificar si ganó
    if (!palabraAdivinada.includes("_")) {
        alert("¡Felicidades, ganaste!");
        reiniciarJuego();
    }

    //  Verificar si perdió
    if (vidas === 0) {
        alert(`Has perdido. La palabra secreta era "${palabraSecreta}".`);
        reiniciarJuego();
    }

    input.value = ""; // Limpiar input
}

function actualizarUI() {
    palabra.innerHTML = palabraAdivinada.join(" ");
    document.getElementById("vida").innerHTML = `Las vidas que te quedan son: ${vidas}`;
    dibujar();
}

function reiniciarJuego() {
    iniciar();
}

// 🎨 Dibujo en canvas
ctx.fillStyle = "#999292";
ctx.fillRect(0, 0, canvas.height, canvas.width);

// Base del ahorcado
ctx.fillStyle = "red";
ctx.fillRect(0, 390, 150, 120);
ctx.fillRect(70, 100, 15, 300);
ctx.fillRect(70, 100, 150, 10);
ctx.fillRect(210, 110, 10, 50);

function dibujar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Redibujar la base
    ctx.fillStyle = "#999292";
    ctx.fillRect(0, 0, canvas.height, canvas.width);

    ctx.fillStyle = "red";
    ctx.fillRect(0, 390, 150, 120);
    ctx.fillRect(70, 100, 15, 300);
    ctx.fillRect(70, 100, 150, 10);
    ctx.fillRect(210, 110, 10, 50);

    if (vidas <= 5) {
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.arc(210, 170, 20, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
    if (vidas <= 4) {
        ctx.beginPath();
        ctx.moveTo(210, 190);
        ctx.lineTo(210, 280);
        ctx.lineWidth = 12;
        ctx.stroke();
    }
    if (vidas <= 3) {
        ctx.beginPath();
        ctx.moveTo(210, 185);
        ctx.lineTo(170, 270);
        ctx.lineWidth = 7;
        ctx.stroke();
    }
    if (vidas <= 2) {
        ctx.beginPath();
        ctx.moveTo(210, 185);
        ctx.lineTo(250, 270);
        ctx.lineWidth = 7;
        ctx.stroke();
    }
    if (vidas <= 1) {
        ctx.beginPath();
        ctx.moveTo(210, 270);
        ctx.lineTo(170, 330);
        ctx.lineWidth = 7;
        ctx.stroke();
    }
    if (vidas === 0) {
        ctx.beginPath();
        ctx.moveTo(210, 270);
        ctx.lineTo(250, 330);
        ctx.lineWidth = 7;
        ctx.stroke();
    }
}
