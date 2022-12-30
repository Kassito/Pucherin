
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

function repartir(){
    jugadores = parseInt(prompt("¿Cuántos jugadores sois? de 2 a 4"));

    pActual = new Partida();

    for (let i = 0; i < jugadores; i++) {
        let jugador = {Nombre: "Jugador" + (i+1), fichas: fichasTotales/jugadores, ganadas: 0};
        pActual.jugadores.push(jugador);    
    }

    pintarJugadores(fichasTotales/jugadores);
}

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

function sortear(){
    let num = Math.floor(Math.random()*((jugadores + 1)-1) + 1);
    document.getElementById("turno").innerHTML = "Turno del jugador " + num;
    pActual.turnoDe =  num;
    console.log(pActual);
}

function turnoActual(){
    if(pActual.turnoDe === jugadores){
        pActual.turnoDe = 1;
    } else{
        pActual.turnoDe += 1;
    }

    document.getElementById("turno").innerHTML = "Turno del jugador " + pActual.turnoDe;
}

function comprobarFichas(){
    let count = pActual.jugadores.length;
    let total = 0;
    for (let i = 0; i < pActual.jugadores.length; i++) {
        // console.log("Fichas Totales:" + total)
        total += pActual.jugadores[i]["ganadas"];
        if(pActual.jugadores[i]["Nombre"] === "Jugador" + pActual.turnoDe){
            let fichas = pActual.jugadores[i]["fichas"];
            if(fichas === 0){
                count = 0;
            }
        }
    }
    console.log("Fichas Totales tras el bucle:" + total)

    let { ficInit, numero, fichasActuales, ficGanad } = tiradaDados();

    if (count === 0) {
        if(total === fichasTotales){
            terminarPartida();
        } else{
            sinFichasDisponibles(numero);
        }
    }else{
        conFichasDisponibles(numero, fichasActuales, ficGanad, ficInit);
    }
}

function sinFichasDisponibles(numero){
    let ficGanad = "fichasGanadas" + pActual.turnoDe;

    if(numero < 7){
        pintarCasilla(canvases[numero -2], numero, 0);
    } else if(numero > 7 && numero < 12){
        pintarCasilla(canvases[numero -3], numero, 0);
    } else if (numero === 12){
        for (let i = 0; i < pActual.jugadores.length; i++) {
            if(pActual.jugadores[i]["Nombre"] === "Jugador" + pActual.turnoDe){
                f = pActual.jugadores[i]["ganadas"];           
            }
        }
        for (let i = 0; i < 10; i++) {
            // console.log(i + " veces")
            f += pActual.casillas[i + 2];
            console.log(pActual.casillas[i + 2] + " f: " + f);
            if(i < 7){
                pintarCasilla(canvases[i +2], i+2, 0);
            } else if(i > 7 && i < 12){
                pintarCasilla(canvases[i +3], i+3, 0);
            }
            // pintarCasilla(canvases[i + 2], i + 2, 0);
        }
    }
//No coge todas bien si sale 12
    for (let i = 0; i < pActual.jugadores.length; i++) {
        if(pActual.jugadores[i]["Nombre"] === "Jugador" + pActual.turnoDe){
            // console.log(pActual.casillas[numero])
            let fichas;
            if(numero === 12){
                fichas = f;
            }else{
                fichas = pActual.jugadores[i]["ganadas"] += pActual.casillas[numero] - 1;
            }
            console.log(fichas + " gana" + " turno" + pActual.turnoDe)
            document.getElementById(ficGanad).innerHTML = fichas;
        }
    }

    pActual.casillas[numero] = 0;
}

function terminarPartida(){
    let fTotal = 0;
    let ganadorF = 0;
    let ganador = "";
    for (let i = 0; i < pActual.jugadores.length; i++) {
        fTotal += pActual.jugadores[i]["ganadas"];
        if(pActual.jugadores[i]["ganadas"] > ganadorF){
            ganadorF = pActual.jugadores[i]["ganadas"];
            ganador = pActual.jugadores[i]["Nombre"];
        }
    }

    if(fTotal === fichasTotales){
        alert("El ganador es " + ganador);
        let refresh = document.getElementById('refresh');
        refresh.addEventListener('click', _ => {
            location.reload();
        })
        
    }
}

botonDados.addEventListener("click", () =>{
    comprobarFichas();
    turnoActual();
} );

function conFichasDisponibles(numero, fichasActuales, ficGanad, ficInit) {
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
        fichasActuales +=1;
        console.log("del 7: "+fichasActuales);
    } else if (numero === 12) {
        // console.log(pActual.casillas[7]);
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

function tiradaDados() {
    // Partida.tirada = parseInt(prompt("introduce numero dados"));
    let numero = Math.floor(Math.random()*(13-2) + 2);
    alert(numero);
    // let numero = 4;
    // alert(numero);
    if(numero === 12){
        pActual.casillas[7]++;
    }else{
        pActual.casillas[numero]++;
    }
    let fichasActuales = pActual.casillas[numero];
    let ficInit = "fichasInicio" + pActual.turnoDe;
    let ficGanad = "fichasGanadas" + pActual.turnoDe;
    return {ficInit, numero, fichasActuales, ficGanad};
}

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
