// NutriTrack Service Worker
const CACHE_VERSION = "nutritrack-v59";

const PRECACHE_ASSETS = [
  "/NutriTrack/NutriTrack.jsx",
  "/NutriTrack/foods.json",
  "/NutriTrack/icons/icon-192.png",
  "/NutriTrack/icons/icon-512.png",
  "/NutriTrack/icons/apple-touch-icon.png",
];

// CDN scripts the app loads at bootstrap (React, ReactDOM, Babel).
// These are cross-origin; precaching them makes the app boot offline.
// Keep these in sync with the <script src> URLs in index.html.
const CDN_ASSETS = [
  "https://unpkg.com/react@18/umd/react.production.min.js",
  "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js",
  "https://unpkg.com/@babel/standalone/babel.min.js",
];

const WORKER_ORIGIN = "https://nutritrack-proxy.nickkropf.workers.dev";

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache =>
      // Precache same-origin assets (use bare paths; ignoreSearch lets
      // cache-busting query strings like ?v=3 still match at serve time).
      cache.addAll(PRECACHE_ASSETS).then(() =>
        // CDN scripts are best-effort: if unpkg is unreachable at install
        // time we still install (the app works once they're cached on a
        // later online load). cache.addAll would reject on a single
        // failure, so add them individually.
        Promise.all(
          CDN_ASSETS.map(url =>
            cache.add(url).catch(err => console.warn("[SW] precache CDN miss:", url, err && err.message))
          )
        )
      )
    ).then(() => self.skipWaiting())
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

  // App shell (index.html): network-first so online users always get the
  // freshest HTML, but fall back to the last cached copy when offline.
  // A bare return() here (pass-through) made Safari refuse to load the
  // page offline ("not connected to the internet"); respondWith with a
  // cache fallback is what makes the PWA work offline.
  if (request.method === "GET" &&
      (url.pathname === "/NutriTrack/" || url.pathname === "/NutriTrack/index.html")) {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_VERSION).then(cache => {
              // Cache under the request URL and the canonical index.html
              // path so either form matches on an offline reload.
              cache.put(request, clone);
              if (url.pathname === "/NutriTrack/") {
                cache.put(self.location.origin + "/NutriTrack/index.html", response.clone());
              }
            });
          }
          return response;
        })
        .catch(() =>
          caches.match(request, { ignoreSearch: true }).then(cached =>
            cached || caches.match("/NutriTrack/index.html", { ignoreSearch: true })
          )
        )
    );
    return;
  }

  if (request.url.startsWith(WORKER_ORIGIN)) {
    return;
  }

  if (request.method !== "GET") {
    return;
  }

  // CDN scripts (React/ReactDOM/Babel): cache-first, revalidate in
  // background. Offline -> served from cache; online -> fresh response
  // updates the cache for next time. ignoreSearch so cache-busting
  // query strings (?v=4) don't fragment the cache.
  const isCdnAsset = CDN_ASSETS.some(a => {
    const c = new URL(a);
    return url.origin === c.origin && url.pathname === c.pathname;
  });
  if (isCdnAsset) {
    event.respondWith(
      caches.match(request, { ignoreSearch: true }).then(cached => {
        const networkFetch = fetch(request).then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_VERSION).then(cache => cache.put(request, clone));
          }
          return response;
        }).catch(() => undefined);
        // Serve cached immediately if available; otherwise wait for network.
        return cached || networkFetch;
      })
    );
    return;
  }

  if (url.pathname === "/NutriTrack/foods.json") {
    // Network-first with cache fallback. ignoreSearch: true so the
    // precached bare path (/NutriTrack/foods.json, no ?v=3) is matched
    // when the network fetch fails offline.
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
