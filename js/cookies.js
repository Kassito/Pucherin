// const cooki = document.getElementById("cooki");
// const cookiRet = document.getElementById("cookiRet");
const cookiDel = document.getElementById("cookiDel");

cookiDel.addEventListener("click", cookilandDel);
// cooki.addEventListener("click", cookiland);

function cookiland(records) {
  // document.cookie += records + "; expires=Thu, 21 Dec 2023 12:00:00 UTC";
  document.cookie += records + "; expires=" + new Date();
}

function cookilandRet() {
  return document.cookie.replaceAll(/fichas/g, "fichas,")
                        .replace(/,$/, "")
                        .split(",")
                        .sort((p1, p2) => p2.split(" ")[2] - p1.split(" ")[2])
                        .slice(0, 3);
}

function cookilandDel() {
  let cok = document.cookie;
  alert("Borrrandooo")
  document.cookie = cok + "; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
