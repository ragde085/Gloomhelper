// Gloomhelper service worker — offline-first cache.
// Bump CACHE_VERSION whenever any precached asset changes so older caches
// are dropped on next activation.
const CACHE_VERSION = "gloomhelper-v0.3.0";
const PRECACHE = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./icons/icon.svg",
  "./icons/icon-maskable.svg",
  "./data/characters.js",
  "./data/conditions.js",
  "./data/elements.js",
  "./data/modifiers.js",
  "./data/monsters.js",
  "./data/items.js",
  "./data/rules.js",
  "./data/history.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Cache-first for same-origin GETs; fall back to network, then cache the
// response. Non-GETs and cross-origin requests bypass the cache.
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        if (res && res.ok && res.type === "basic") {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() => {
        // offline + uncached: best-effort fallback to the app shell for navigations
        if (req.mode === "navigate") return caches.match("./index.html");
        return new Response("", { status: 504, statusText: "offline" });
      });
    })
  );
});

// Allow pages to ask the SW to update immediately (used by the in-app
// "update available" toast).
self.addEventListener("message", (event) => {
  if (event.data === "skipWaiting") self.skipWaiting();
});
