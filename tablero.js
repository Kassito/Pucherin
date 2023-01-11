
var container = document.querySelector(".box");
const casillas = 9;

// crear puchero
 var puchero = document.createElement('canvas');
 puchero.classList.add('puchero');
 puchero.width = 120;
 puchero.height = 120;
 container.appendChild(puchero);
 pintarPuchero(puchero);
// Crear elementos canvas para las casillas
// Usar un bucle for para crear los elementos de manera automática

// Los canvas se formarán en una elipse
for (var i = 0; i < casillas; i++) {
  // Crear un elemento canvas
  var canvas = document.createElement('canvas');
  canvas.classList.add('casilla');
  // Establecer el ancho y alto del canvas en 50 (cada canvas será de 50 x 50)
  canvas.width = 120;
  canvas.height = 120;
  // Añadir el canvas a la página
  container.appendChild(canvas);
  
}

// Obtener una referencia a todos los elementos canvas en la página
var canvases = document.querySelectorAll('.casilla');

// Dibujar una elipse en cada canvas y posicionarlos en una elipse de 
for (var i = 0; i < canvases.length; i++) {
  // Obtener el contexto del canvas en 2D
  var ctx = canvases[i].getContext('2d');

  // Dibujar una elipse en el canvas
  ctx.beginPath();  
  
  //ctx.ellipse(35, 35, 35, 35, 0, 0, 2 * Math.PI);
  //ctx.stroke();

  // Posicionar el canvas en la elipse 
  // canvases[i].style.left = Math.cos(2 * Math.PI * i / casillas) * 400 + 400 - 25 + 'px';
  // canvases[i].style.top = Math.sin(2 * Math.PI * i / casillas) * 250 + 300  - 25  + 'px';
  const tablero = document.getElementById("tablero");
  let k = 0.0009;

  canvases[i].style.left = (Math.cos(2 * Math.PI * i / casillas) *  (tablero.clientWidth/2.5) + (tablero.clientWidth/2.5)) + 'px';
  canvases[i].style.top = (Math.sin(2 * Math.PI * i / casillas) * (tablero.clientHeight/2.5) + (tablero.clientHeight/2.5)) + 'px';
  
  if (i>4) pintarCasilla(canvases[i],i+3)
  else pintarCasilla(canvases[i],i+2)
}

function pintarCasilla(canvas, fichas, num){
  var ctx = canvas.getContext('2d');
  ctx.arc(canvas.width / 2, canvas.height / 2, 60, 0, 2 * Math.PI);
  ctx.fillStyle = 'green';
  ctx.fill();
  for (var i = 0; i < fichas; i++) {
      // Calcular la posición en el círculo para cada ficha
      var x = Math.cos(2 * Math.PI * i / fichas) * 35 + canvas.width / 2;
      var y = Math.sin(2 * Math.PI * i / fichas) * 35 + canvas.height / 2;

      // Dibujar la ficha en la posición calculada
      ctx.beginPath();
      ctx.arc(x, y, 9, 0, 2 * Math.PI);
      if (i < num ) ctx.fillStyle = 'red'
         else ctx.fillStyle = 'white'
      ctx.fill();
    
     ctx.fillStyle = 'white';
    // Establecer la fuente para el texto
     ctx.font = '24px sans-serif';
     // Dibujar el número en el canvas usando el método fillText()
     x = canvas.width / 2 - ctx.measureText(fichas).width / 2;
     y = canvas.height / 2 + 10;
     ctx.fillText(fichas, x, y);
  }
  
}

function pintarPuchero(canvas){
  var ctx = canvas.getContext('2d');
  ctx.arc(canvas.width / 2, canvas.height / 2, 60, 0, 2 * Math.PI);
  ctx.fillStyle = 'red';
  ctx.fill();
  // for (var i = 0; i < 4; i++) {
      // // Calcular la posición en el círculo para cada ficha
      // var x = Math.cos(2 * Math.PI * i / 4) * 35 + canvas.width / 2;
      // var y = Math.sin(2 * Math.PI * i / 4) * 35 + canvas.height / 2;

      // // Dibujar la ficha en la posición calculada
      // ctx.beginPath();
      // ctx.arc(x, y, 9, 0, 2 * Math.PI);
     
      // ctx.fillStyle = 'white'
      // ctx.fill();
    
     ctx.fillStyle = 'white';
    // Establecer la fuente para el texto
     ctx.font = '24px sans-serif';
     // Dibujar el número en el canvas usando el método fillText()
     x = canvas.width / 2 - ctx.measureText(7).width / 2;
     y = canvas.height / 2 + 10;
     ctx.fillText(7, x, y);
  // }
  
}




