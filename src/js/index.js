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
const contenedorResultado = document.querySelector(".contenedor-msj");

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

btnEncriptar.addEventListener("click", encriptarBtn);

btnDesencriptar.addEventListener("click", desencriptarBtn);

borrarTexto.addEventListener("click", () => {
    textarea.value = "";
});

// Funciones
function limpiarHTML(referencia) {
    while (contenedorResultado.firstChild) {
        contenedorResultado.removeChild(contenedorResultado.lastChild);
    }
}

// Validar que el textarea no contenga numeros ni letras mayusculas ni acentos
function validar(frase) {
    // validar para que solo pueda escribir letras minusculas y sin acentos
    const regex = /^[a-z\s]+$/;
    if (!regex.test(frase)) {
        // Mostramos un mensaje de error
        // alert("Por favor, escriba únicamente frases en letra minúscula sin tildes ni caracteres especiales");
        crearModal("Parece que su mensaje está vacío o contiene mayúsculas o acentos. Por favor, evítelos.");
        return false;
    }
    return true;
}

function crearModal(mensaje) {
    const modal = document.createElement("DIV");
    modal.classList.add("modal");
    modal.innerHTML = `
        <div class="modal__content">
            <p class="modal__content--text">${mensaje}</p>
            <button class="modal__content--btn">Aceptar</button>
        </div>
    `;
    const main = document.querySelector("main");
    document.body.insertBefore(modal, main);

    const modalBtn = document.querySelector(".modal__content--btn");
    modalBtn.addEventListener("click", () => {
        modal.remove();
    });
}

function encriptarFrase(frase) {
    const tablaDeEncriptacion = {
        e: "enter",
        i: "imes",
        a: "ai",
        o: "ober",
        u: "ufat"
    };
    return frase.replace(/[eiaou]/g, (letra) => tablaDeEncriptacion[letra]);
    // En el replace, el primer parámetro es una expresión regular que busca todas las letras que estén en la tabla de encriptación (e, i, a, o, u) y en el segundo parámetro, se pasa una función que recibe como parámetro la letra que se está reemplazando (letra) y devuelve el valor de la tabla de encriptación para esa letra (tablaDeEncriptacion[letra]) en este caso "enter", "imes", "ai", "ober", "ufat"
}
function desencriptarFrase(frase) {
    const tablaDeDesencriptacion = {
        enter: "e",
        imes: "i",
        ai: "a",
        ober: "o",
        ufat: "u"
    };
    return frase.replace(/enter|imes|ai|ober|ufat/g, (letra) => tablaDeDesencriptacion[letra]);
}

function encriptarBtn() {
    const frase = textarea.value.trim();
    if (!validar(frase)) {
        return;
    }
    limpiarHTML();
    const fraseEncriptada = encriptarFrase(frase);
    crearParrafoResultado(fraseEncriptada);
    copiarBtn();
    crecerResultadoTextArea();
}

function desencriptarBtn() {
    const frase = textarea.value.trim();
    if (!validar(frase)) {
        return;
    }
    limpiarHTML();
    const fraseDesencriptada = desencriptarFrase(frase);
    crearParrafoResultado(fraseDesencriptada);
    copiarBtn();
    crecerResultadoTextArea();
}

function crearParrafoResultado(frase) {
    const resultadoParrafo = document.createElement("TEXTAREA");
    resultadoParrafo.readOnly = true;
    resultadoParrafo.id = "resultado";
    resultadoParrafo.textContent = frase;
    contenedorResultado.appendChild(resultadoParrafo);
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
            alertaTextoCopiado("Texto copiado");
        }, (err) => {
            // Mostramos un mensaje de error
            alertaTextoCopiado("Error al copiar", err);
        });
    });

    // Añadimos el botón de copiar al documento
    contenedorResultado.appendChild(copiarBtn);
}

function alertaTextoCopiado(frase) {
    // Crear un parrafo para mostrar el mensaje de texto copiado
    const alerta = document.createElement("P");
    // Evitar que se muestre la alerta si ya existe una
    if (document.getElementById("copiar-alerta")) {
        return;
    }
    alerta.textContent = frase;
    alerta.id = "copiar-alerta";
    contenedorResultado.appendChild(alerta);
    // Eliminar el mensaje de texto copiado
    setTimeout(() => {
        alerta.remove();
    }, 2000);
}

function crecerResultadoTextArea() {
    const resultado = document.getElementById("resultado");
    console.log(resultado.scrollHeight);
    // Poner un maximo de 500px
    // Este if solo debe de funcionar si el viewport es menor a 768px
    if (resultado.scrollHeight > 300 && window.innerWidth < 1440) {
        resultado.style.height = "300px";
    } else {
        resultado.style.height = resultado.scrollHeight + "px";
    }
}
