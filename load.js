// PReguntar si el navegador soporta service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./sw.js")
    .then((reg) => console.log("Registro Exitoso"))
    .catch((err) => console.log(err));
}
