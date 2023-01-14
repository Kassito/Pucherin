const refresh = document.getElementById('refresh');
const images = ["imagenes/dado1.jpg", "imagenes/dado2.jpg", "imagenes/dado3.jpg", "imagenes/dado4.jpg", "imagenes/dado5.jpg", "imagenes/dado6.jpg"];

const fichasTotales = 60;

var finPartida = false;

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

//A futurno se usarán objetos con métodos que harán el código más limpio
// class Jugador{
//     constructor(nombre, fichas, ganadas) {
//     this.nombre = nombre;
//     this.fichas = fichas;
//     this.ganadas = ganadas;
//     };
//     get fichasDisponibles() {
//         return this.ficahs;
//     };
//     set fichasDisponibles(restar) {
//         this.fichas -= restar;
//     }
//     get ganadas() {
//         return this.ganadas;
//     };
//     set ganadas(numero) {
//         this.ganadas += numero;
//     }
// }

// Jugador.prototype = {
//     constructor: Jugador,
    
//     restarFicha: function() {
//       return this.fichas-=1;
//     },
//     sumarGanadas: function(numero) {
//       return this.ganadas += numero; 
//     }
//   };

var pActual;

//Al iniciar la partida reparte las fichas en función de los jugadores
function repartir(jugadores){
    //Se pregunta el número de jugadores, se crea una nueva partida y se asignan las fichas
    pActual = new Partida();

    console.log(pActual);

    for (let i = 0; i < jugadores; i++) {
        let jugador = {Nombre: "Jugador" + (i+1), fichas: fichasTotales/jugadores, ganadas: 0};
        pActual.jugadores.push(jugador);    
        console.log(pActual.jugadores[i]["Nombre"] + " tiene " + pActual.jugadores[i]["fichas"] + " y ganadas 0");
    }

    pintarJugadores(fichasTotales/jugadores, jugadores);
    
    return fichasTotales/jugadores;
}

//Al iniciar la partida pinta el número de jugadores seleccionado con sus fichas correspondientes
function pintarJugadores(fichasInicio, jugadores) {
    if(jugadores === 3){
        document.getElementById("jug3").innerHTML = "Jugador 3";
    }else if(jugadores === 4){
        document.getElementById("jug3").innerHTML = "Jugador 3";
        document.getElementById("jug4").innerHTML = "Jugador 4";
    }else if(jugadores === 5){
        document.getElementById("jug3").innerHTML = "Jugador 3";
        document.getElementById("jug4").innerHTML = "Jugador 4";
        document.getElementById("jug5").innerHTML = "Jugador 5";
    }

    let ficInit = "";
    let ficGanad = "";
    
    for (let i = 1; i < jugadores + 1; i++) {
        ficInit = "fichasInicio" +i;
        ficGanad = "fichasGanadas" +i;
        
        document.getElementById(ficInit).innerHTML = fichasInicio;
        document.getElementById(ficGanad).innerHTML = 0;
    }
    
    sortear(jugadores);
}

//Al iniciar la partida sortea el turno que toca para saber qué jugador empieza
function sortear(jugadores){
    let num = Math.floor(Math.random()*((jugadores + 1)-1) + 1);
    
    console.log("Turno del jugador " + num);
    document.getElementById("turno").innerHTML = "Turno del jugador " + num;
    
    pActual.turnoDe = num;

    return num;
}

//Asigna el turno que toca tras cada tirada de dados
function turnoActual(){
    if(pActual.turnoDe === jugadores){
        pActual.turnoDe = 1;
    } else{
        pActual.turnoDe += 1;
    }

    console.log("Turno del jugador " + pActual.turnoDe);
    document.getElementById("turno").innerHTML = "Turno del jugador " + pActual.turnoDe;
}

//Comprueba que queden fichas por jugar y elige la función correcta en cada caso
function comprobarFichas(){
    let count = pActual.jugadores.length;
    let total = 0;
    let fichas = 0;
    for (let i = 0; i < pActual.jugadores.length; i++) {
        total += pActual.jugadores[i]["ganadas"];
        // fichas += pActual.jugadores[i]["fichas"];
        if(pActual.jugadores[i]["Nombre"] === "Jugador" + pActual.turnoDe){
            fichas = pActual.jugadores[i]["fichas"];
            console.log(fichas+" Fichas fuera")

            // if(fichas === 0){
            //     count = 0;
            // }
         }
    }

    if((!finPartida) && total === fichasTotales){ //Si ya no hay fichas y la partida se ha terminado mira quién ha ganado
        finPartida = true;
        terminarPartida();
    }else {
        let numero = tiradaDados();

        if (fichas === 0) { //Si ya no quedan fichas por jugar, pero si en el tablero comienza a asignar las fichas en cada jugada
            console.log("entrando sinfichas")
            sinFichasDisponibles(numero);
        } else{ //Si quedan fichas por jugar, sigue jugando normal
            console.log("entrando confichas")
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
            document.getElementById(ficGanad).innerHTML = fichas;
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
        document.getElementById("ganador").innerHTML = "Empate";
    } else{ //Si no muestra el ganador y lo añade al ranking
        ganador = prompt("¿Cuál es tu nombre?"); //Pregunta el nombre del ganador para ponerlo por pantalla
        console.log("El ganador es " + ganador);
        document.getElementById("ganador").innerHTML = "El ganador es " + ganador;
        records.push(ganador + " con " + ganadorF + " fichas"); 
        cookiland(records);

    }
    resultadoRecords = cookilandRet(); //Ordena el ranking

    //Muestra y oculta los botones
    botonDados.style.visibility = "hidden";
    refresh.style.visibility = "visible";
    
    mostrarRecords(resultadoRecords); //Muestra los 3 mejores

    refresh.addEventListener('click', () => { //Permite resetear la partida al finalizarla
        location.reload();
    });
}

//Añade el título de records a la pantalla y pinta los 3 primeros
function mostrarRecords(resultadoRecords){
    document.getElementById("tituloRecords").innerHTML = "RECORDS:"
    console.log("Records:");
    for (let i = 0; i < 3; i++) {
        document.getElementById("mostrarRecord").innerHTML += resultadoRecords[i] + "<br>";
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
                console.log(pActual.jugadores[i]["Nombre"] + " tiene " + fichas + " fichas");
                document.getElementById(ficInit).innerHTML = fichas;
            }
        }
    }

    //Se pinta el nuevo estado de la casilla que ha salido
    if (numero < 7) {
        console.log("Numero menor a 7")
        pintarCasilla(canvases[numero - 2], numero, fichasActuales);
    } else if (numero > 7 && numero < 12) {
        console.log("Numero mayor a 7")

        pintarCasilla(canvases[numero - 3], numero, fichasActuales);
    } else if (numero === 7) {
        console.log("Numero 7")

        fichasActuales += 1;
        // pActual.casillas[7]+=1;
    } else if (numero === 12) {
        console.log("Numero menor a 12");
        for (let i = 0; i < pActual.jugadores.length; i++) {
            if (pActual.jugadores[i]["Nombre"] === "Jugador" + pActual.turnoDe) {
                let fichasGanadas = pActual.jugadores[i]["ganadas"] += pActual.casillas[7];
                console.log(pActual.jugadores[i]["Nombre"] + " gana " + fichasGanadas + " fichas");
                document.getElementById(ficGanad).innerHTML = fichasGanadas;
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
    girarDado(dieOneValue, dieTwoValue);

    console.log("Sale el " + (numero));

    return numero;
}

//Se añade y quita el movimiento de los dados a cada tirada
function girarDado(dieOneValue, dieTwoValue){
    let dice = document.querySelectorAll("img")
    dice.forEach(function(die){
        die.classList.add("shake");
    });
    setTimeout(function() {
        dice.forEach(function(die){
            die.classList.remove("shake");
        });

        document.getElementById("dadoA").setAttribute("src" , images[dieOneValue]);
        document.getElementById("dadoB").setAttribute("src" , images[dieTwoValue]);

    }, 1000);
}

//Comprueba el número que ha salido y pinta la casilla de nuevo vacía sumando su número al jugador que le toca
function comprobarLleno(numero, fichasActuales){
    let ficGanad = "fichasGanadas" + pActual.turnoDe;
    // let f = 0;
    console.log(fichasActuales +" y numero "+ numero)

    if(fichasActuales === numero && numero !==7){
        if(numero < 7){
            console.log("MEnos que 7")
            pintarCasilla(canvases[numero -2], numero, 0);
        } else if(numero > 7 && numero < 12){
            console.log("MAs que 7")

            pintarCasilla(canvases[numero -3], numero, 0);
        }

        for (let i = 0; i < pActual.jugadores.length; i++) {
            if(pActual.jugadores[i]["Nombre"] === "Jugador" + pActual.turnoDe){
                let fichas = pActual.jugadores[i]["ganadas"] += numero;
                console.log(pActual.jugadores[i]["Nombre"] + " gana " + fichas + " fichas");
                document.getElementById(ficGanad).innerHTML = fichas;
            }
        }

        pActual.casillas[numero] = 0;
    }
}


