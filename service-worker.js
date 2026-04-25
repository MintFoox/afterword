// ─── VERSION ────────────────────────────────────────────────────────────────
// Bump this string whenever you deploy a new build.
// The SW filename stays the same; the browser detects the byte-level change
// and triggers the update flow automatically.
const APP_VERSION = "v69";
const CACHE_NAME  = `afterword-${APP_VERSION}`;

// ─── FILES TO PRE-CACHE ──────────────────────────────────────────────────────
// The HTML file is intentionally excluded here — it's handled by the
// network-first fetch strategy below, so it's always fresh and there's
// no filename to keep in sync when you rename versions.
const PRECACHE_URLS = [
  "./manifest.json",
  "./favicon.png",
  "./icon-192.png",
  "./icon-512.png"
];

// ─── INSTALL ─────────────────────────────────────────────────────────────────
// skipWaiting() makes the new SW take over immediately.
self.addEventListener("install", (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(
        PRECACHE_URLS.map((url) =>
          cache.add(url).catch((err) => console.warn("Failed to cache:", url, err))
        )
      )
    )
  );
});

// ─── ACTIVATE ────────────────────────────────────────────────────────────────
// Delete old caches, claim all tabs, then tell every tab to reload.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
      .then(() =>
        self.clients.matchAll({ type: "window" }).then((clients) => {
          clients.forEach((client) => client.postMessage({ type: "SW_UPDATED" }));
        })
      )
  );
});

// ─── FETCH ───────────────────────────────────────────────────────────────────
// Network-first for HTML documents (always fresh when online).
// Cache-first for everything else (fonts, icons, manifest).
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  const isHTML = url.pathname.endsWith(".html") || url.pathname === "/" || url.pathname === "";

  if (isHTML) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return networkResponse;
        })
        .catch(() => caches.match(event.request))
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((cached) => cached || fetch(event.request))
    );
  }
});
// ─── VERSION ────────────────────────────────────────────────────────────────
// Bump this string whenever you deploy a new build.
// The SW filename stays the same; the browser detects the byte-level change
// and triggers the update flow automatically.
const APP_VERSION = "v69";
const CACHE_NAME  = `afterword-${APP_VERSION}`;

// ─── FILES TO PRE-CACHE ──────────────────────────────────────────────────────
// The HTML file is intentionally excluded here — it's handled by the
// network-first fetch strategy below, so it's always fresh and there's
// no filename to keep in sync when you rename versions.
const PRECACHE_URLS = [
  "./manifest.json",
  "./favicon.png",
  "./icon-192.png",
  "./icon-512.png"
];

// ─── INSTALL ─────────────────────────────────────────────────────────────────
// skipWaiting() makes the new SW take over immediately.
self.addEventListener("install", (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(
        PRECACHE_URLS.map((url) =>
          cache.add(url).catch((err) => console.warn("Failed to cache:", url, err))
        )
      )
    )
  );
});

// ─── ACTIVATE ────────────────────────────────────────────────────────────────
// Delete old caches, claim all tabs, then tell every tab to reload.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
      .then(() =>
        self.clients.matchAll({ type: "window" }).then((clients) => {
          clients.forEach((client) => client.postMessage({ type: "SW_UPDATED" }));
        })
      )
  );
});

// ─── FETCH ───────────────────────────────────────────────────────────────────
// Network-first for HTML documents (always fresh when online).
// Cache-first for everything else (fonts, icons, manifest).
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  const isHTML = url.pathname.endsWith(".html") || url.pathname === "/" || url.pathname === "";

  if (isHTML) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return networkResponse;
        })
        .catch(() => caches.match(event.request))
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((cached) => cached || fetch(event.request))
    );
  }
});