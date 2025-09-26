const CACHE_NAME = 'mirror_fake_cache_v1';
const urlsToCache = [
  '/BaseJuggler/',
  '/BaseJuggler/index.html',
  '/BaseJuggler/script.js',
  '/BaseJuggler/exif-stripper.js',
  '/BaseJuggler/exif-js.min.js',
  '/BaseJuggler/manifest.json',
  '/BaseJuggler/icon-192.png',
  '/BaseJuggler/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

