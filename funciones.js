
const botonDados = document.getElementById("dados");

const fichasTotales = 16;
var jugadores = 0;

// var records = [];
class Partida {
    constructor() {
        this.turnoDe = 1;
        this.tirada = 0;
        this.jugadores = [];
        this.casillas = {
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0
        };
    }
}

var pActual;

window.onload = () => {
    repartir();
}

//Al iniciar la partida reparte las fichas en función de los jugadores
function repartir(){
    jugadores = parseInt(prompt("¿Cuántos jugadores sois? de 2 a 4"));

    pActual = new Partida();

    for (let i = 0; i < jugadores; i++) {
        let jugador = {Nombre: "Jugador" + (i+1), fichas: fichasTotales/jugadores, ganadas: 0};
        pActual.jugadores.push(jugador);    
    }

    pintarJugadores(fichasTotales/jugadores);
}

//Al iniciar la partida pinta el número de jugadores seleccionado
function pintarJugadores(fichasInicio) {
    if(jugadores === 3){
        document.getElementById("jug3").innerHTML = "Jugador 3";
    }else if(jugadores === 4){
        document.getElementById("jug3").innerHTML = "Jugador 3";
        document.getElementById("jug4").innerHTML = "Jugador 4";
    }

    let ficInit = "";
    let ficGanad = "";
    
    for (let i = 1; i < jugadores + 1; i++) {
        ficInit = "fichasInicio" +i;
        ficGanad = "fichasGanadas" +i;
        
        document.getElementById(ficInit).innerHTML = fichasInicio;
        document.getElementById(ficGanad).innerHTML = 0;
    }
    
    // alert(pActual.jugadores[0]["ganadas"]);
    sortear();
}

//Al iniciar la partida sortea el turno que toca
function sortear(){
    let num = Math.floor(Math.random()*((jugadores + 1)-1) + 1);
    document.getElementById("turno").innerHTML = "Turno del jugador " + num;
    pActual.turnoDe =  num;
    console.log(pActual);
}

//Asigna el turno que toca
function turnoActual(){
    if(pActual.turnoDe === jugadores){
        pActual.turnoDe = 1;
    } else{
        pActual.turnoDe += 1;
    }

    document.getElementById("turno").innerHTML = "Turno del jugador " + pActual.turnoDe;
}

//Comprueba que queden fichas y elige la función correcta en cada caso
function comprobarFichas(){
    let count = pActual.jugadores.length;
    let total = 0;
    for (let i = 0; i < pActual.jugadores.length; i++) {
        total += pActual.jugadores[i]["ganadas"];
        if(pActual.jugadores[i]["Nombre"] === "Jugador" + pActual.turnoDe){
            let fichas = pActual.jugadores[i]["fichas"];
            if(fichas === 0){
                count = 0;
            }
        }
    }

    if(total === fichasTotales){
        terminarPartida();
    }
    
    let numero = tiradaDados();

    if (count === 0) {
        sinFichasDisponibles(numero);
    } else{
        conFichasDisponibles(numero);
    }
}

//Cuando no quedan fichas para jugar asigna las que tenga cada casilla al jugador que ha sacado ese número
function sinFichasDisponibles(numero){
    let ficGanad = "fichasGanadas" + pActual.turnoDe;

    if(numero < 7){
        pintarCasilla(canvases[numero -2], numero, 0);
    } else if(numero > 7 && numero < 12){
        pintarCasilla(canvases[numero -3], numero, 0);
    } else if (numero === 12){ //En este caso gana todas las fichas
        for (let i = 0; i < pActual.jugadores.length; i++) {
            if(pActual.jugadores[i]["Nombre"] === "Jugador" + pActual.turnoDe){
                f = pActual.jugadores[i]["ganadas"];           
            }
        }
        
        for (let i = 2; i < 12; i++) { 
            if(i < 7){
                f += pActual.casillas[i];
                pActual.casillas[i] = 0;
                pintarCasilla(canvases[i -2], i, 0);
            } else if(i > 7 && i < 12){
                f += pActual.casillas[i];
                pActual.casillas[i] = 0;
                pintarCasilla(canvases[i -3], i, 0);
            } else if (i === 7){
                f += pActual.casillas[i];
                pActual.casillas[i] = 0;
            }
        }
    }
    
    for (let i = 0; i < pActual.jugadores.length; i++) {
        if(pActual.jugadores[i]["Nombre"] === "Jugador" + pActual.turnoDe){
            let fichas;
            if(numero === 12){
                fichas = f;
                pActual.jugadores[i]["ganadas"] = fichas;
            } else{
                fichas = pActual.jugadores[i]["ganadas"] += pActual.casillas[numero];
                pActual.jugadores[i]["ganadas"] = fichas;
                pActual.casillas[numero] = 0;
            }
            document.getElementById(ficGanad).innerHTML = fichas;
        }
    }
}

//Comprueba qué jugador tiene más fichas ganadas y lo muestra por pantalla permitiendo resetear el juego
function terminarPartida(){
    let contador = 0;
    let ganadorF = 0;
    let ganador = "";
    for (let i = 0; i < pActual.jugadores.length; i++) {
        if(pActual.jugadores[i]["ganadas"] > ganadorF){
            ganadorF = pActual.jugadores[i]["ganadas"];
            ganador = pActual.jugadores[i]["Nombre"];
        }
    }

    for (let i = 0; i < pActual.jugadores.length; i++) {
        if (pActual.jugadores[i]["ganadas"] === ganadorF){
            contador++;
        }
    }

    let c = 0;
    let e = 0;
    if(contador > 1){ //Si dos jugadores o más sacan la misma puntuación es empate
        alert("Empate");
        event.preventDefault(); //TODO En desoso, averiguar cómo evitar alert cíclicos
    } else{
        alert("El ganador es " + ganador);
        event.preventDefault();
    }

    let refresh = document.getElementById('refresh');
    //No sacar números el dado una vez acabada la partida
    botonDados.removeEventListener("click", 
        comprobarFichas()
    );
    //TODO Ahora esto hay que arreglarlo
    refresh.addEventListener('click', () => {
        document.reload();
    });
}

//Al pulsar el botón comprueba las fichas y el turno para poder jugar
botonDados.addEventListener("click", () =>{
    comprobarFichas();
    turnoActual();
} );

//Si quedan fichas disponibles en los jugadores usa el número del dado para colocar la ficha en su sitio y resta una al jugador que le toque
function conFichasDisponibles(numero) {
    if(numero === 12){
        pActual.casillas[7]++;
    }else{
        pActual.casillas[numero]++;
    }

    let fichasActuales = pActual.casillas[numero];
    let ficInit = "fichasInicio" + pActual.turnoDe;
    let ficGanad = "fichasGanadas" + pActual.turnoDe;


    for (let i = 0; i < pActual.jugadores.length; i++) {
        if (pActual.jugadores[i]["Nombre"] === "Jugador" + pActual.turnoDe) {
            let fichas = pActual.jugadores[i]["fichas"] -= 1;
            document.getElementById(ficInit).innerHTML = fichas;
        }
    }

    if (numero < 7) {
        pintarCasilla(canvases[numero - 2], numero, fichasActuales);
    } else if (numero > 7 && numero < 12) {
        pintarCasilla(canvases[numero - 3], numero, fichasActuales);
    } else if (numero === 7) {
        fichasActuales += 1;
    } else if (numero === 12) {
        for (let i = 0; i < pActual.jugadores.length; i++) {
            if (pActual.jugadores[i]["Nombre"] === "Jugador" + pActual.turnoDe) {
                let fichas = pActual.jugadores[i]["ganadas"] += pActual.casillas[7];
                document.getElementById(ficGanad).innerHTML = fichas;
            }
        }
        pActual.casillas[7] = 0;
    }

    comprobarLleno(numero, fichasActuales);
}

//Sale un número aleatrio entre 2 y 12 para jugar
function tiradaDados() {
    // Partida.tirada = parseInt(prompt("introduce numero dados"));
    let numero = Math.floor(Math.random()*(13-2) + 2);
    alert(numero);
    // let numero = 4;
    // alert(numero);

    return numero;
}

//Comprueba el número que ha salido y pinta la casilla de nuevo vacía sumando su número al jugador que le toca
function comprobarLleno(numero, fichasActuales){
    let ficGanad = "fichasGanadas" + pActual.turnoDe;
    let f = 0;

    if(fichasActuales === numero){
        if(numero < 7){
            pintarCasilla(canvases[numero -2], numero, 0);
        } else if(numero > 7 && numero < 12){
            pintarCasilla(canvases[numero -3], numero, 0);
        } 

        for (let i = 0; i < pActual.jugadores.length; i++) {
            if(pActual.jugadores[i]["Nombre"] === "Jugador" + pActual.turnoDe){
                let fichas = pActual.jugadores[i]["ganadas"] += numero;
                document.getElementById(ficGanad).innerHTML = fichas;
            }
        }

        pActual.casillas[numero] = 0;
    }
}
