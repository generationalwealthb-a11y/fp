/* WealthPath Service Worker
   Minimal — exists only to satisfy PWA installability on Android/Chrome.
   Does NOT intercept any requests so it cannot cause white screens. */

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
    .then(() => self.clients.claim())
));
/* No fetch handler — all requests go directly to the network */
