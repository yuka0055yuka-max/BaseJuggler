// キャッシュの名前とバージョンを定義
const CACHE_NAME = 'base-converter-cache-v1';

// オフライン時に利用できるようにキャッシュするファイルのリスト
const urlsToCache = [
    '/BaseJuggler/',
    '/BaseJuggler/index.html',
    '/BaseJuggler/style.css',
    '/BaseJuggler/script.js',
    '/BaseJuggler/manifest.json',
    '/BaseJuggler/icon-192.png',
    '/BaseJuggler/icon-512.png'
];

// Service Workerのインストールイベント
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Service Workerのフェッチイベント
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});

// Service Workerの有効化イベント
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

