/* WealthPath Service Worker — PWA install support */
const CACHE = 'wealthpath-v1';

self.addEventListener('install', e => {
  // Don't skipWaiting — let normal SW lifecycle proceed safely on iOS
  e.waitUntil(Promise.resolve());
});

self.addEventListener('activate', e => {
  // Clean up old caches only — no clients.claim() to avoid iOS mid-load takeover
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', e => {
  // Only handle GET requests over http(s) — skip cross-origin, POST, etc.
  if (e.request.method !== 'GET') return;
  if (!e.request.url.startsWith('http')) return;

  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
