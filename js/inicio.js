const botonDados = document.getElementById("dados");

//El juego comienza al cargar la página completa
window.onload = () => {
    refresh.style.visibility = "hidden";
    repartir();
}


//Al pulsar el botón de los dados comprueba las fichas y el turno para poder jugar
botonDados.addEventListener("click", () =>{
    comprobarFichas();
    turnoActual();
} );