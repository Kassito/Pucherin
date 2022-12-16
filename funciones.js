
// pintarCasilla(canvas,11,7);

console.log("sdad")

var Partida = {
    fichasTotales: 60,
    numJugadores: 0,
    tirada: 0,
    jugadores: [],
    casillas: {
        "dos": 0,
        "tres": 0,
        "cuatro": 0,
        "cinco": 0,
        "seis": 0,
        "siete": 0,
        "ocho": 0,
        "nueve": 0,
        "diez": 0,
        "once": 0
    }
}

Partida.numJugadores = parseInt(prompt("¿Cuántos jugadores sois? de 2 a 4"));

console.log(repartir(3));

function repartir(){
    for (let i = 0; i < Partida.numJugadores; i++) {
        let jugador = {Nombre: "Jugador" + (i+1), fichas: Partida.fichasTotales/Partida.numJugadores, ganadas: 0};
        Partida.jugadores.push(jugador);    
    }

}

const botonDados = document.getElementById("dados");
botonDados.onclick = function (){
    Partida.tirada = parseInt(prompt("introduce numero dados"));
    // let numero = Math.floor(Math.random()*(13-2) + 2);
    // alert(numero);
    alert(Partida.tirada);
}

