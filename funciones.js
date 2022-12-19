
const botonDados = document.getElementById("dados");

var turnoDe = 0;
var jugadores = 0;

window.onload = () => {
    repartir();
  }

var Partida = {
    fichasTotales: 60,
    tirada: 0,
    jugadores: [],
    casillas: {
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
    }
}

function repartir(){
    jugadores = parseInt(prompt("¿Cuántos jugadores sois? de 2 a 4"));
    for (let i = 0; i < jugadores; i++) {
        let jugador = {Nombre: "Jugador" + (i+1), fichas: Partida.fichasTotales/jugadores, ganadas: 0};
        Partida.jugadores.push(jugador);    
    }

    pintarJugadores(Partida.fichasTotales/jugadores);
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

    sortear();
}

function sortear(){
    let num = Math.floor(Math.random()*((jugadores + 1)-1) + 1);
    document.getElementById("turno").innerHTML = "Turno del jugador " + num;
    turnoDe =  num;
    console.log(Partida)
}

function turnoActual(){
    if(turnoDe === jugadores){
        turnoDe = 1;
    } else{
        turnoDe += 1;
    }

    document.getElementById("turno").innerHTML = "Turno del jugador " + turnoDe;

}

botonDados.addEventListener("click", () =>{
     //Partida.tirada = parseInt(prompt("introduce numero dados"));
    // let numero = Math.floor(Math.random()*(13-2) + 2);
    // alert(numero);
    let numero = 4;
    alert(numero);
    Partida.casillas[numero] ++;
    let fichasActuales = Partida.casillas[numero];
    let ficInit = "fichasInicio" + turnoDe;

    for (let i = 0; i < Partida.jugadores.length; i++) {
        if(Partida.jugadores[i]["Nombre"] === "Jugador" + turnoDe){
            let fichas = Partida.jugadores[i]["fichas"] -= 1;
            document.getElementById(ficInit).innerHTML = fichas;
        }
    }

    if(numero<7){
        pintarCasilla(canvases[numero -2], numero, fichasActuales);
    } else if(numero>7 && numero < 12){
        pintarCasilla(canvases[numero -3], numero, fichasActuales);
    } else if (numero === 7){
        Partida.casillas[7] ++;
    } else if (numero === 12){

    }
    
    comprobarLleno(numero, fichasActuales);
} );

function comprobarLleno(numero, fichasActuales){
    let ficGanad = "fichasGanadas" + turnoDe;

    if(fichasActuales === numero){
        if(numero<7){
            pintarCasilla(canvases[numero -2], numero, 0);
        } else if(numero>7 && numero < 12){
            pintarCasilla(canvases[numero -3], numero, 0);
        } 

        for (let i = 0; i < Partida.jugadores.length; i++) {
            if(Partida.jugadores[i]["Nombre"] === "Jugador" + turnoDe){
                let fichas = Partida.jugadores[i]["ganadas"] += numero;
                document.getElementById(ficGanad).innerHTML = fichas;
            }
        }

        Partida.casillas[numero] = 0;
    }
}
