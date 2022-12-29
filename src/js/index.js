import "boxicons";
/* ¡Bienvenidos y Bienvenidas a nuestro primer desafío!

Durante estas cuatro semanas, vamos a trabajar en una aplicación que encripta textos, así podrás intercambiar mensajes secretos con otras personas que sepan el secreto de la encriptación utilizada.

Las "llaves" de encriptación que utilizaremos son las siguientes:

La letra "e" es convertida para "enter"
La letra "i" es convertida para "imes"
La letra "a" es convertida para "ai"
La letra "o" es convertida para "ober"
La letra "u" es convertida para "ufat"

Requisitos:
- Debe funcionar solo con letras minúsculas
- No deben ser utilizados letras con acentos ni caracteres especiales
- Debe ser posible convertir una palabra para la versión encriptada también devolver una palabra encriptada para su versión original.

Por ejemplo:
"gato" => "gaitober"
gaitober" => "gato"

La página debe tener campos para
inserción del texto que será encriptado o desencriptado, y el usuario debe poder escoger entre as dos opciones.
El resultado debe ser mostrado en la pantalla. */

// Variables
const btnToggle = document.querySelector("#dark-mode");
const borrarTexto = document.querySelector(".borrar-texto");
const iconoSol = document.querySelector(".sun");
const iconoLuna = document.querySelector(".moon");
const textarea = document.querySelector(".textarea");
const btnEncriptar = document.querySelector(".encriptar");
const btnDesencriptar = document.querySelector(".desencriptar");
const resultado = document.querySelector(".contenedor-msj");
const tablaDeEncriptacion = {
    e: "enter",
    i: "imes",
    a: "ai",
    o: "ober",
    u: "ufat"
};
// Add Event listeners
// Añadir el data-theme="dark" al elemento html
btnToggle.addEventListener("change", function () {
    if (this.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
        iconoSol.style.display = "none";
        iconoLuna.style.display = "block";
    } else {
        // document.documentElement.setAttribute("data-theme", "light");
        document.documentElement.removeAttribute("data-theme");
        iconoSol.style.display = "block";
        iconoLuna.style.display = "none";
    }
});

btnEncriptar.addEventListener("click", encriptar);

btnDesencriptar.addEventListener("click", desencriptar);

borrarTexto.addEventListener("click", () => {
    textarea.value = "";
});

// Funciones
function limpiarHTML(referencia) {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.lastChild);
    }
}

// Validar que el textarea no contenga numeros ni letras mayusculas ni acentos
function validar(frase) {
    // validar para que solo pueda escribir letras minusculas y sin acentos
    const regex = /^[a-z\s]+$/;
    if (!regex.test(frase)) {
        // Mostramos un mensaje de error
        alert("Por favor, escriba únicamente frases en letra minúscula sin tildes ni caracteres especiales");
        return false;
    }
    return true;
}

function encriptarFrase(frase) {
    return frase.replace(/[eiaou]/g, (letra) => tablaDeEncriptacion[letra]);
    // En el replace, el primer parámetro es una expresión regular que busca todas las letras que estén en la tabla de encriptación (e, i, a, o, u) y en el segundo parámetro, se pasa una función que recibe como parámetro la letra que se está reemplazando (letra) y devuelve el valor de la tabla de encriptación para esa letra (tablaDeEncriptacion[letra]) en este caso "enter", "imes", "ai", "ober", "ufat"
}

function encriptar() {
    const frase = textarea.value.trim();
    if (!validar(frase)) {
        return;
    }
    limpiarHTML();
    // const fraseEncriptada = frase.replaceAll("e", "enter").replaceAll("i", "imes").replaceAll("a", "ai").replaceAll("o", "ober").replaceAll("u", "ufat");
    const fraseEncriptada = encriptarFrase(frase);
    crearParrafoResultado(fraseEncriptada);
    copiarBtn();
}

function desencriptar() {
    const frase = textarea.value.trim();
    console.log(frase);
    if (!validar(frase)) {
        return;
    }
    limpiarHTML();
    const fraseDesencriptada = frase.replaceAll("enter", "e").replaceAll("imes", "i").replaceAll("ai", "a").replaceAll("ober", "o").replaceAll("ufat", "u");
    crearParrafoResultado(fraseDesencriptada);
    copiarBtn();
}

function crearParrafoResultado(frase) {
    const resultadoParrafo = document.createElement("TEXTAREA");
    resultadoParrafo.readOnly = true;
    resultadoParrafo.id = "resultado";
    resultadoParrafo.textContent = frase;
    resultado.appendChild(resultadoParrafo);
}

function copiarBtn() {
    const copiarBtn = document.createElement("BUTTON");
    copiarBtn.textContent = "Copiar";
    copiarBtn.classList.add("copiar");

    // Añadimos un evento de click al botón de copiar
    copiarBtn.addEventListener("click", () => {
        // Obtenemos el texto a copiar
        const text = document.getElementById("resultado").textContent;

        // Copiamos el texto en el portapapeles
        navigator.clipboard.writeText(text).then(() => {
            // Mostramos un mensaje de éxito
            crearAlertaTextoCopiado("Texto copiado");
        }, (err) => {
            // Mostramos un mensaje de error
            crearAlertaTextoCopiado("Error al copiar", err);
        });
    });

    // Añadimos el botón de copiar al documento
    resultado.appendChild(copiarBtn);
}

function crearAlertaTextoCopiado(frase) {
    // Crear un parrafo para mostrar el mensaje de texto copiado
    const alerta = document.createElement("P");
    // Evitar que se muestre la alerta si ya existe una
    if (document.getElementById("copiar-alerta")) {
        return;
    }
    alerta.textContent = frase;
    alerta.id = "copiar-alerta";
    resultado.appendChild(alerta);
    // Eliminar el mensaje de texto copiado
    setTimeout(() => {
        alerta.remove();
    }, 2000);
}
