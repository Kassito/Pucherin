const fichasTotales = 12;
var jugadores = 0;
var finPartida = true;

var records = [];

function Partida() {
    constructor: {
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

var readline = require('readline');
let rl;

(function(){
    partida();
    
})();

function partida() {
    
    rl = readline.createInterface(
        process.stdin, process.stdout);

    //Se pregunta el número de jugadores, se crea una nueva partida y se asignan las fichas
    rl.question("¿Cuántos jugadores sois? de 2 a 5 ", (num) => {
        jugadores = parseInt(num);
        console.log("Jugadores: " + jugadores);
        repartir(jugadores);
        secuenciacion();
    });
    
}

function secuenciacion(){
    // let readline = require('readline');
    readline.emitKeypressEvents(process.stdin);

    process.stdin.on('keypress', () => {
        if(finPartida){
                comprobarFichas();
                turnoActual();
        }else{
            /*rl.pause();
            rl = readline.createInterface(
                process.stdin, process.stdout);
            // console.log("Presiona control + C")
            rl.on('SIGINT', () => {
                rl.question('Salir (s) no salir (n) ', (input) => {
                    if (input.match(/^s(es)?$/i)) { */
                        rl.pause();
                    /*}else{
                        rl.pause();
                        finPartida =true;
                        partida();
                    }
                });*/
            //});
        }
    });
        
    process.stdin.setRawMode(true);
}

//Al iniciar la partida reparte las fichas en función de los jugadores
function repartir(jugadores){

    pActual = new Partida();

    for (let i = 0; i < jugadores; i++) {
        let jugador = {Nombre: "Jugador" + (i+1), fichas: fichasTotales/jugadores, ganadas: 0};
        pActual.jugadores.push(jugador);    
        console.log(pActual.jugadores[i]["Nombre"] + " tiene " + pActual.jugadores[i]["fichas"] + " y ganadas 0");
    }

    sortear(jugadores);
    
    return fichasTotales/jugadores;
}

//Al iniciar la partida sortea el turno que toca para saber qué jugador empieza
function sortear(jugadores){

    let numTurno = Math.floor(Math.random()*((jugadores + 1)-1) + 1);
    
    pActual.turnoDe = numTurno;

    return numTurno;
}

//Asigna el turno que toca tras cada tirada de dados
function turnoActual(){
    if(pActual.turnoDe === jugadores){
        pActual.turnoDe = 1;
    } else{
        pActual.turnoDe += 1;
    }
}

//Comprueba que queden fichas por jugar y elige la función correcta en cada caso
function comprobarFichas(){
    let count = pActual.jugadores.length;
    let total = 0;
    let fichas = 0;
    console.log("Turno del jugador " + pActual.turnoDe);

    for (let i = 0; i < pActual.jugadores.length; i++) {
        total += pActual.jugadores[i]["ganadas"];
        fichas += pActual.jugadores[i]["fichas"];
        console.log(pActual.jugadores[i]["Nombre"] + " tiene " + pActual.jugadores[i]["fichas"] + " y ganadas " + pActual.jugadores[i]["ganadas"]);

        if(pActual.jugadores[i]["Nombre"] === "Jugador" + pActual.turnoDe){
            let fichas = pActual.jugadores[i]["fichas"];
            if(fichas === 0){
                count = 0;
            }
        }
    }

    if((finPartida) && total === fichasTotales){ //Si ya no hay fichas y la partida se ha terminado mira quién ha ganado
        finPartida = false;
        terminarPartida();
    }else {
        let numero = tiradaDados();

        if (count === 0) { //Si ya no quedan fichas por jugar, pero si en el tablero comienza a asignar las fichas en cada jugada
            sinFichasDisponibles(numero);
        } else{ //Si quedan fichas por jugar, sigue jugando normal
            conFichasDisponibles(numero);
        }

        for (let i = 2; i < 12; i++) { //Para modo texto pinta las fichas en cada turno
            console.log("Casilla " + i + " tiene " + pActual.casillas[i]);
        }
    }
}

//Cuando no quedan fichas para jugar asigna las que tenga cada casilla al jugador que ha sacado ese número
function sinFichasDisponibles(numero){
    let ficGanad = "fichasGanadas" + pActual.turnoDe;
    //Pinta la casilla a 0 en cada número, excepto en 12 que las suma todas y las pinta todas a 0
    if (numero === 12){ //En este caso gana todas las fichas
        for (let i = 0; i < pActual.jugadores.length; i++) {
            if(pActual.jugadores[i]["Nombre"] === "Jugador" + pActual.turnoDe){
                f = pActual.jugadores[i]["ganadas"];           
            }
        }
        
        for (let i = 2; i < 12; i++) { 
            if(i < 7){
                f += pActual.casillas[i];
                pActual.casillas[i] = 0;
            } else if(i > 7 && i < 12){
                f += pActual.casillas[i];
                pActual.casillas[i] = 0;
            } else if (i === 7){
                f += pActual.casillas[i];
                pActual.casillas[i] = 0;
            }
        }
    }

    //Suma el número de fichas ganadas en cada tirada al jugador actual
    for (let i = 0; i < pActual.jugadores.length; i++) {
        if(pActual.jugadores[i]["Nombre"] === "Jugador" + pActual.turnoDe){
            let fichas;
            if(numero === 12){
                fichas = f;
                pActual.jugadores[i]["ganadas"] = fichas;
            } else if (numero !== 7){
                fichas = pActual.jugadores[i]["ganadas"] += pActual.casillas[numero];
                pActual.jugadores[i]["ganadas"] = fichas;
                pActual.casillas[numero] = 0;
            } else {
                fichas = pActual.jugadores[i]["ganadas"];
            }

            console.log(pActual.jugadores[i]["Nombre"] + " gana " + fichas + " fichas");
        }
    }
}

//Comprueba qué jugador tiene más fichas ganadas y lo muestra por pantalla permitiendo resetear el juego
function terminarPartida(){
    console.log("fin partida");
    let contador = 0;
    let ganadorF = 0;
    let ganador = "";
    let resultadoRecords = [];

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
 
    if(contador > 1 ){ //Si dos jugadores o más sacan la misma puntuación es empate
        console.log("Empate");
    } else{ //Si no muestra el ganador y lo añade al ranking
        // let rc = readline.createInterface(
        //     process.stdin, process.stdout);
        // rc.question("¿Cómo te llamas? ", (nombre) => {
        //     ganador = toString(nombre);
        //     console.log(ganador)
        // });
        console.log("El ganador es " + ganador);
        records.push(ganador + " con " + ganadorF + " fichas"); 

        // cookiland(records);

    }
    // resultadoRecords = cookilandRet(); //Ordena el ranking
    console.log("----------------------------------------------")
    
    // mostrarRecords(resultadoRecords); //Muestra los 3 mejores
}

//Añade el título de records a la pantalla y pinta los 3 primeros
function mostrarRecords(resultadoRecords){
    console.log("Records:");
    for (let i = 0; i < 3; i++) {
        console.log(resultadoRecords[i]);
    }
}

//Si quedan fichas disponibles en los jugadores usa el número del dado para colocar la ficha en su sitio y resta una al jugador que le toque
function conFichasDisponibles(numero) {
    let ficInit = "fichasInicio" + pActual.turnoDe;
    let ficGanad = "fichasGanadas" + pActual.turnoDe;
    let fichasActuales = 0;
    
    //Se asigna el número de fichas a su casilla
    if(numero !== 12){
        pActual.casillas[numero]++;
    }

    fichasActuales = pActual.casillas[numero];

    for (let i = 0; i < pActual.jugadores.length; i++) { //Se actualizan los datos de las fichas del jugador actual
        if (pActual.jugadores[i]["Nombre"] === "Jugador" + pActual.turnoDe) {
            if(numero !== 12){
                let fichas = pActual.jugadores[i]["fichas"] -= 1;
            }
        }
    }

    //Se asigna el nuevo estado de la casilla que ha salido
    if (numero === 7) {
        fichasActuales += 1;
    } else if (numero === 12) {
        for (let i = 0; i < pActual.jugadores.length; i++) {
            if (pActual.jugadores[i]["Nombre"] === "Jugador" + pActual.turnoDe) {
                let fichas = pActual.jugadores[i]["ganadas"] += pActual.casillas[7];
                console.log(pActual.jugadores[i]["Nombre"] + " gana " + fichas + " fichas");
            }
        }
        pActual.casillas[7] = 0;
    }
    comprobarLleno(numero, fichasActuales);
}

//Sale un número aleatrio entre 2 y 12 para jugar y se pinta con los dos dados
function tiradaDados() {
    let dieOneValue = Math.floor(Math.random()*6);
    let dieTwoValue = Math.floor(Math.random()*6);
    let numero = dieOneValue + dieTwoValue +2;

    console.log("Sale el " + (numero));

    return numero;
}

//Comprueba el número que ha salido y pinta la casilla de nuevo vacía sumando su número al jugador que le toca
function comprobarLleno(numero, fichasActuales){
    let ficGanad = "fichasGanadas" + pActual.turnoDe;
    let f = 0;

    if(fichasActuales === numero){
        for (let i = 0; i < pActual.jugadores.length; i++) {
            if(pActual.jugadores[i]["Nombre"] === "Jugador" + pActual.turnoDe){
                let fichas = pActual.jugadores[i]["ganadas"] += numero;
                console.log(pActual.jugadores[i]["Nombre"] + " gana " + fichas + " fichas");
            }
        }

        pActual.casillas[numero] = 0;
    }
}