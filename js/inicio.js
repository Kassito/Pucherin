const botonDados = document.getElementById("dados");
var jugadores = 0;
//El juego comienza al cargar la página completa
window.onload = () => {
    refresh.style.visibility = "hidden";
    jugadores = parseInt(prompt("¿Cuántos jugadores sois? de 2 a 5"));
    repartir(jugadores);
}


//Al pulsar el botón de los dados comprueba las fichas y el turno para poder jugar
botonDados.addEventListener("click", () =>{
    comprobarFichas();
    turnoActual();
} );