// NutriTrack Service Worker
const CACHE_VERSION = "nutritrack-v54";

const PRECACHE_ASSETS = [
  "/NutriTrack/NutriTrack.jsx",
  "/NutriTrack/foods.json",
  "/NutriTrack/icons/icon-192.png",
  "/NutriTrack/icons/icon-512.png",
  "/NutriTrack/icons/apple-touch-icon.png",
];

const WORKER_ORIGIN = "https://nutritrack-proxy.nickkropf.workers.dev";

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => cache.addAll(PRECACHE_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", event => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.pathname === "/NutriTrack/" || url.pathname === "/NutriTrack/index.html") {
    return;
  }

  if (request.url.startsWith(WORKER_ORIGIN)) {
    return;
  }

  if (request.method !== "GET") {
    return;
  }

  if (url.pathname === "/NutriTrack/foods.json") {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_VERSION).then(cache => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  const isPrecached = PRECACHE_ASSETS.some(asset => {
    if (asset.startsWith("http")) return request.url === asset;
    return url.pathname === asset || url.pathname.startsWith(asset);
  });

  if (isPrecached) {
    event.respondWith(
      caches.match(request, { ignoreSearch: true }).then(cached => {
        if (cached) return cached;
        return fetch(request).catch(() => undefined);
      }).catch(() => undefined)
    );
    return;
  }

  if (url.origin === self.location.origin) {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_VERSION).then(cache => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => caches.match(request, { ignoreSearch: true }))
    );
  }
});