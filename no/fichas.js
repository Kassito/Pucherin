// Obtener una referencia al elemento canvas
var canvas = document.getElementById('myCanvas');

// Obtener el contexto del canvas en 2D
var ctx = canvas.getContext('2d');




// Dibujar n fichas en un círculo utilizando la función arc()
function pintarCasilla(canvas, fichas, num){
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, 2 * Math.PI);
  ctx.fillStyle = 'green';
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, 2 * Math.PI);
  ctx.fillStyle = 'brown';
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 30, 0, 2 * Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  
  
  
  for (var i = 0; i < fichas; i++) {
      // Calcular la posición en el círculo para cada ficha
      var x = Math.cos(2 * Math.PI * i / fichas) * 70 + canvas.width / 2;
      var y = Math.sin(2 * Math.PI * i / fichas) * 70 + canvas.height / 2;

      // Dibujar la ficha en la posición calculada
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, 2 * Math.PI);
      if (i < num ) ctx.fillStyle = 'red'
         else ctx.fillStyle = 'white'
      ctx.fill();
  }
 
    ctx.fillStyle = 'red';
  // Establecer la fuente para el texto
  ctx.font = 'bold 40px Times';
  // Dibujar el número en el canvas usando el método fillText()
    const textWidth = ctx.measureText(fichas).width;
   x = canvas.width / 2 - textWidth / 2;
 
  ctx.fillText(fichas, x, 160);
 
}
