//CREAMOS LAS VARIABLES CON LAS IMG 
let uno = document.getElementById("uno");
let dos = document.getElementById("dos");
let tres = document.getElementById("tres");
let cuatro = document.getElementById("cuatro");
let cinco = document.getElementById("cinco");
let seis = document.getElementById("seis");
let siete = document.getElementById("siete");
let ocho = document.getElementById("ocho");
let nueve = document.getElementById("nueve");
let diez = document.getElementById("diez");
let once = document.getElementById("once");
let doce = document.getElementById("doce");
let trece = document.getElementById("trece");
let catorce = document.getElementById("catorce");
let quince = document.getElementById("quince");
let dieciseis = document.getElementById("dieciseis");
let diecisiete = document.getElementById("diecisiete");
let dieciocho = document.getElementById("dieciocho");
let diecinueve = document.getElementById("diecinueve");
let veinte = document.getElementById("veinte");

//CREAMOS LOS ARRAYS 
// ARRAYS PARA LAS CASILLAS(td)
let casillas = [uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez, once, doce, trece, catorce, quince, dieciseis, diecisiete, dieciocho, diecinueve, veinte];
// CREAMOS UN ARRAY CON LOS SRC QUE VAMOS A AÑADIR A LAS IMAGENES(src)
let paths = ["img/angelface.png", "img/perroface.png", "img/devilface.png", "img/nucacola.png", "img/ghoulface.png", "img/normalface.png", "img/deadface.png", "img/cumpleface.png", "img/chicleface.png", "img/chapin.png", "img/angelface.png", "img/perroface.png", "img/devilface.png", "img/nucacola.png", "img/ghoulface.png", "img/normalface.png", "img/deadface.png", "img/cumpleface.png", "img/chicleface.png", "img/chapin.png"];

// FUNCION BARAJAR --> REMOVEMOS EL ARRAY DE PATHS PARA QUE A LA HORA DE AÑADIRLOS ESTÉN ALEATORIAMENTE COLOCADOS
function barajar(array) {

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// ASIGNAR FOTO --> COLOCAMOS A LAS IMAGENES EL SRC DE LA ULTIMA POSICION DEL ARRAY PATHS
function asignarFoto(array1, array2) {
    //ESTA CAMBIA LA VARIABLE GLOBAL
    array1.forEach(img => {
        img.setAttribute("src", array2.pop());
    });
}
// LLAMADA A LA FUNCIÓN BARAJAR
barajar(paths);
// LLAMADA A LA FUNCION ASIGNAR FOTO
asignarFoto(casillas, paths);

// BOTON DE REINICIAR PARTIDA
let boton = document.getElementById("reiniciar");

// CONTADOR DE ACIERTOS
let contadorAciertos = 0;
// CONTADOR DE CLICKS(CUENTA 2 CLICKS)
let contador = 0;
// SRC1 --> DONDE SE ALMACENA EL PRIMER SRC A COMPARAR
let src1 = "";
// SRC2 --> DONDE SE ALMACENA EL SEGUNDO SRC A COMPARAR
let src2 = "";
// PRIMER-ELEMENTO --> DONDE SE ALMACENA EL PRIMER ELEMENTO PARA PODERLO COMPARAR CON EL ELEMENTO TARGET(EL 2º ELEMENTO)
let primerElemento = null;
// CONTADOR FALLOS --> PARA CONTAR LOS FALLOS CUANDO NO SE ENCUENTRA LA PAREJA
let contadorFallos = 0;

// FUNCION SUMAR ACIERTOS --> POR CADA PAREJA ENCONTRADA SUMA 1 ACIERTO A LOS 10 MUESTRA EL MENSAJE DE VICTORIA
function sumarAciertos() {

    let parrafo = document.getElementById("aciertosMostrar");
    let contenedor = document.getElementById("container-aciertos");
    contenedor.setAttribute("class", "forma-h2");

    let img = document.getElementById("imgAcierto");
    img.src = "/IMG/love.png";
    img.classList.add("fijo");
    img.classList.add("img-love");
    if (contadorAciertos < 10) {
        contadorAciertos++;
    }

    let aciertos = "";
    for (let i = 0; i < 10; i++) {
        aciertos += (i < contadorAciertos) ? "🟢" : "🔵";
    }

    if (contadorAciertos == 10) {
        //alert("¡HAS GANADO LA PARTIDA!");
        mostrarMensajeGanar();
        mostrarBotonReiniciar(); 
    }

    parrafo.innerHTML = aciertos;
    return contadorAciertos;
}

// MOSTRAR BOTON REINICIAR --> SE CREA UN BOTON CON DOM Y SE AÑADE AL ELEMENTO PADRE CUANDO SE LLAME A LA FUNCIÓN
function mostrarBotonReiniciar() {
    let contenedor = document.getElementById("botonReiniciar");
    let boton = document.createElement("input");
    boton.setAttribute("class", "boton");
    boton.setAttribute("type", "button");
    boton.setAttribute("value", "Jugar de Nuevo");
    boton.setAttribute("onclick", "location.reload()");
    boton.classList.add("brillo");
    contenedor.appendChild(boton);
}

// FUNCIÓN MOSTRAR MENSAJE GANAR --> SE OBTIENE LOS ELEMENTOS PADRES DE LA IMAGEN Y EL TEXTO Y SE LES CAMBIA LA OPACIDAD A 100%
function mostrarMensajeGanar() {
    let contenedorFoto = document.getElementById("fotoMensaje");
    let contenedorMensaje = document.getElementById("textoMensaje");
    contenedorFoto.removeAttribute("class");
    contenedorMensaje.removeAttribute("class");
    contenedorFoto.setAttribute("class", "opacidad-on");
    contenedorMensaje.setAttribute("class", "opacidad-on");
}

// FUNCION MOSTRAR MENSAJE PERDER --> OBTIENE LOS ELMENTS PADRES E HIJOS Y LES CAMBIA LAS CLASES
//                                    A LA IMAGEN LE CAMBIA EL SRC Y AL TEXTO EL CONTENIDO
function mostrarMensajePerder() {
    let contenedorFoto = document.getElementById("fotoMensaje");
    let contenedorMensaje = document.getElementById("textoMensaje");
    let contenedorIMG = document.getElementById("winLose");
    let contenedorTexto = document.getElementById("hdos");
    contenedorFoto.removeAttribute("class");
    contenedorMensaje.removeAttribute("class");
    contenedorFoto.setAttribute("class", "opacidad-on");
    contenedorMensaje.setAttribute("class", "opacidad-on");

    contenedorIMG.src = "IMG/lose.png";
    contenedorTexto.innerHTML = "¡OH! HAS PERDIDO...";
    
    contenedorIMG.classList.remove("quitarFondo");
    contenedorIMG.setAttribute("class", "mostrarFondo");
    

    asignarDisable();
    mostrarBotonReiniciar();
}

// EN MODO DE PRUEBA
function asignarDisable() {
    //ESTA CAMBIA LA VARIABLE GLOBAL
    contenedorIMG.forEach(img => {
        img.removeAttribute("class");
        img.setAttribute("class", "mostrarFondo");
    });
}

// VARIABLE QUE CONTIENE TODAS LAS IMAGENES DEL DOCUMENTO
let contenedorIMG = document.querySelectorAll("img");

// QUITAR FONDO --> QUITA LA OPACIDAD A LAS IMAGENES PARA QUE NO SE VEA SU CONTENIDO
function quitarFondo() {
    contenedorIMG.forEach(img => {
        if (!img.classList.contains("fijo")) {
            img.addEventListener("click", seleccionarImg);
            img.setAttribute("class", "quitarFondo");
        }
    });
}
// LLAMADA A LA FUNCION QUITAR FONDO PARA QUE EL CONTENIDO DEL TABLERO ESTÉ OCULTO
quitarFondo();

// EVENTO DE CLICK
function seleccionarImg(element) {
    element.target.removeAttribute("class", "quitarFondo");
    element.target.setAttribute("class", "mostrarFondo");

    // COMPROBAMOS QUE SEA EL PRIMER CLICK
    if (contador === 0) {
        src1 = element.target.src;
        primerElemento = element.target;
        actualizarContador();
    } else if (contador === 1) {    // COMPROBAMOS QUE SEA EL SEGUNDO CLICK

        // SI EL EL PRIMER TARGET ES DISTINTO AL SEGUNDO TARGET
        if (element.target !== primerElemento) {

            src2 = element.target.src;
            actualizarContador();
            console.log(contador);

            // COMPROBAMOS SI LOS DOS SRC SON IGUALES O NO
            if (comparar(src1, src2) == "SI") {
                primerElemento.removeAttribute("class");
                primerElemento.setAttribute("class", "fijo");
                element.target.removeAttribute("class");
                element.target.setAttribute("class", "fijo");
                sumarAciertos();
            }

            // PARA CONTROLAR QUE CUANDO SE PIERDA LA PARTIDA NO SE ACTIVE LA FUNCUÓN QUITAR FONDO
            if(contadorFallos<15){
            // DESPUÉS A TODAS LAS CARTAS QUE NO TENGAN LA CLASE FIJO LES "DAMOS LA VUELTA"
            if (!element.target.classList.contains("fijo")) {
                // SET TIME OUT --> PARA QUE CUANDO NO SEAN PAREJAS SE MUESTRE LA SEGUNDA IMAGEN DURANTE MEDIO SEGUNDO
                setTimeout(() => {
                    quitarFondo();
                }, 500);
            }
        }
        }

    }

}

// FUNCION ACTUALIZAR CONTADOR DE CLICKS --> ACTUALIZA EL CONTADOR CON UN CLICK Y AL SEGUNDO CLICK LO REINICIA
function actualizarContador() {
    contador++;
    if (contador == 2) {
        contador = 0;
    }
}

// FUNCIÓN COMPARAR --> COMPARA LOS DOS SRC PASADOS POR PARAMETRO Y RETORNA SI ES PAREJA O NO
function comparar(src1, src2) {

    let pareja = "";
    if (src1 == src2) {
        pareja = "SI";
    } else {
        pareja = "NO";
        contadorFallos++;
        console.log(contadorFallos);
        // CUANDO EL JUGADOR LLEGUE A 15 FALLOS PIERDE LA PARTIDA Y SE LE MUESTRA EL MENSAJE
        if (contadorFallos == 15) {
            mostrarMensajePerder();
        }
    }

    return pareja;
}

// MUSICA
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('activarMusica').addEventListener('click', function() {
        let musica = document.getElementById('musica');
        // DESMUTEAMOS EL AUDIO
        musica.muted = false; 
    });
});
