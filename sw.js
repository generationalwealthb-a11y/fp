/* WealthPath Service Worker — Android/Chrome PWA install support only */
const CACHE = 'wealthpath-v1';

self.addEventListener('install', e => {
  e.waitUntil(Promise.resolve());
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (!e.request.url.startsWith('http')) return;
  if (e.request.mode === 'navigate') return; // never intercept HTML page navigation

  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
