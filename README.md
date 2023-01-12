# Juego del pucherin

Pucherín es un juego de mesa, ahora implementado en digital gracias a los desarrolladores Cristina Pascua y Pablo Casanova. Se trata de un juego de 2 a 4 jugadores y gana el que más fichas gana. 

![This is an image](/imagenes/puchero.jpg)


## Preparación del juego:
   - Se elige el número de jugadores.
   - Se reparten las 60 fichas entre los jugadores. 30 a cada uno siendo 2 jugadores, 20 siendo 3 jugadores, 15 siendo 4 jugadores y 12 siendo 5 jugadores.
   - Se sortea quién será la persona que empezará jugando.
   - Se mostrará de quien es cada turno y su número de fichas.
   - En todo momento puede pincharse en el botón que restablecerá a 0 el ranking de jugadores para los records.

## Secuenciación de un turno:
   - Se tiran dos dados de 6 caras.
   - Si el número es del 1 al 11, se pone una de tus fichas iniciales sobre la casilla del mismo número.
   - Si con tu ficha se completa una casilla, te llevas todas las fichas que haya en él. Serán los puntos para el final del juego.
   - Si no se completa ninguna casilla, le toca al siguiente jugador.

### Excepciones en las tiradas:
   - La casilla del 7 se llama puchero.
   - En caso de sacar un 7, se pone la ficha de manera habitual, pero aunque pongas la ficha 7 y completes el puchero no te la llevas. De hecho, las fichas en el puchero permanecen ocultas. No se sabe cuántas hay en cada momento.
   - El número 12 no se corresponde con ninguna casilla, en caso de sacarlo, el jugador retira para sí mismo todas las fichas que tuviese el puchero. Además si sacas un 12 no pones fichas, pudiendo producirse momentos en los que algún jugador tenga fichas y otros no.

## Final del juego:
   - Una vez que un jugador se queda sin fichas disponibles para poner, tira los dados de la misma manera, llevándose el contenido integro de la casilla correspondiente, aunque dicha casilla no esté completa.
   - En caso de sacar 7, no pasaría nada y le toca al siguiente.
   - Sí alguno saca un 12, se llevará todas las fichas del tablero dando así fin al juego.
   - El juego finaliza cuando todos los jugadores han puesto sus fichas y no quedan en el tablero.

## Recuento de puntos:
   - Cuando ya no quedan fichas en el tablero, se procede a contar los puntos. Gana el jugador que más puntos ha conseguido y se le preguntará el nombre para mostrarlo en pantalla. Aquellos que logren batir record de fichas ganadas, pasaran a estar en el top 3 de records del juego.
   - Una vez acabada la partida aparecerá el botón de reiniciar el juego para poder volver a jugar.

[Jugar ahora](https://kassito.github.io/Pucherin/)

Juego original fabricado por Juguetes Borrás y llevado a la edición digital por Infanta´s Developers.
