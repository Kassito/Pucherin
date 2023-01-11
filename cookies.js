const cooki = document.getElementById("cooki");
const cookiRet = document.getElementById("cookiRet");
const cookiDel = document.getElementById("cookiDel");

cookiDel.addEventListener("click", cookilandDel);

function cookilandRet() {
  let recordsCookies = document.cookie;
  let cadenaRecords = "";
  let mostrarRecords = [];

  cadenaRecords = recordsCookies.replaceAll(/fichas/g, "fichas,");

  let arrayJugadores = cadenaRecords.replace(/,$/, "").split(",");

  arrayJugadores.sort((p1, p2) => p2.split(" ")[2] - p1.split(" ")[2])
  mostrarRecords = arrayJugadores.slice(0, 3);

  return mostrarRecords;
}

function cookilandDel() {
  let cok = document.cookie;
  alert("Borrrandooo")
  document.cookie = cok + "; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
