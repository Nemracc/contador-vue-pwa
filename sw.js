// SERVICE WORKER
const CACHE_NAME = "v1_cache_contador_app_vue";
const urlsToCache = [
  "./",
  "./img/favicon.png",
  "./img/icon32.png",
  "./img/icon64.png",
  "./img/icon128.png",
  "./img/icon256.png",
  "./img/icon512.png",
  "./img/icon1024.png",
  "./js/main.js",
  "https://unpkg.com/vue@next",
  "./js/mountApp.js",
  "./css/style.css",
  "https://necolas.github.io/normalize.css/8.0.1/normalize.css",
];

//REferencia al service worker del navegador
self.addEventListener("install", (e) => {
  //Escucha lo que se va a guardar
  e.waitUntil(
    //Asigna el objeto cache que creamos al cache del navegador
    caches.open(CACHE_NAME).then((cache) =>
      cache
        .addAll(urlsToCache)
        .then(() => self.skipWaiting()) 
        //Error
        .catch((err) => console.log(err))
    )
  );
});

self.addEventListener("activate", (e) => {
  const cacheWhitelist = [CACHE_NAME];
//Espera a aue todo se ejecute
  e.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) {
        return res;
      }
      //si se actualizo el cache lo carga aqui
      return fetch(e.request);
    })
  );
});
