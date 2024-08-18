const texto = document.querySelector("#entradaDeTexto__textarea");
const textoConvertido = document.querySelector("#salidaDeTexto__texto__textarea");
const botonPegar = document.querySelector("#botonPegar");
const botonCopiar = document.querySelector("#botonCopiar");

const interfazSinTexto = document.querySelector("#interfazSinTexto");
const interfazConTexto = document.querySelector("#interfazConTexto");

const regexRequisito = /[^a-z\s]/;

var claves = [
    ["e", "enter"], 
    ["i", "imes"], 
    ["a", "ai"], 
    ["o", "ober"], 
    ["u", "ufat"]
];

// Botones
    function botonEncriptar() {
        mostrarOcultarSalidaDeTexto();
        if (regexRequisito.test(texto.value) || texto.value === "") {
            alert("Por favor, ingrese algún texto válido a encriptar (letras minúsculas sin acentos)");
        } else {
            const textoEncriptado = encriptar(texto.value);
            textoConvertido.value = textoEncriptado;
        }
        return;
    };

    function botonDesencriptar() {
        mostrarOcultarSalidaDeTexto();
        if (regexRequisito.test(texto.value) || texto.value === "") {
            alert("Por favor, ingrese algún texto válido a desencriptar (letras minúsculas sin acentos)");
        } else {
            const textoDesencriptado = desencriptar(texto.value);
            textoConvertido.value = textoDesencriptado;
        }
        return;
    };

    botonPegar.addEventListener("click", async () => {
        try {
            const textoAPegar = await navigator.clipboard.readText();
            texto.value = textoAPegar;
            console.log("Texto pegado");
        } catch (error) {
            console.log("Imposible acceder al portapapeles");
        }
    });

    botonCopiar.addEventListener("click", () => {
        try {
            navigator.clipboard.writeText(textoConvertido.value);
            console.log("Texto copiado");
        } catch (error) {
            console.log("Imposible acceder al portapapeles");
        }
    });

// Funciones
    function encriptar(textoAEncriptar) {
        textoAEncriptar = textoAEncriptar.toLowerCase();

        for (let i = 0; i < claves.length; i++) {
            if (textoAEncriptar.includes(claves[i][0])) {
            textoAEncriptar = textoAEncriptar.replaceAll(claves[i][0], claves[i][1]);
            }
        }
        return textoAEncriptar;
    };

    function desencriptar(textoADesencriptar) {
        textoADesencriptar = textoADesencriptar.toLowerCase();

        for (let i = 0; i < claves.length; i++) {
            if (textoADesencriptar.includes(claves[i][1])) {
            textoADesencriptar = textoADesencriptar.replaceAll(claves[i][1], claves[i][0]);
            }
        }
        return textoADesencriptar;
    };

// Mostrar u ocultar textarea, al encriptar/desencriptar
    function mostrarOcultarSalidaDeTexto() {
        if ((texto.value !== "" && !(regexRequisito.test(texto.value)) && interfazConTexto.classList.contains("hide")) || (texto.value === "" && interfazSinTexto.classList.contains("hide")) || (regexRequisito.test(texto.value) && interfazSinTexto.classList.contains("hide"))) {
            interfazSinTexto.classList.toggle("hide");
            interfazConTexto.classList.toggle("hide");
        }
    };