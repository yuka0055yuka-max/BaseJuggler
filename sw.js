// キャッシュの名前とバージョンを定義
const CACHE_NAME = 'base-converter-cache-v1';
// オフライン時に利用できるようにキャッシュするファイルのリスト
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/manifest.json',
    '/icon-192.png',
    '/icon-512.png'
];

// Service Workerのインストールイベント
self.addEventListener('install', event => {
    // インストール処理が完了するまで待機
    event.waitUntil(
        // 'caches' API を使って指定した名前のキャッシュを開く
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                // 指定したファイルをすべてキャッシュに追加
                return cache.addAll(urlsToCache);
            })
    );
});

// Service Workerのフェッチイベント (ネットワークリクエストを横取りする)
self.addEventListener('fetch', event => {
    event.respondWith(
        // まずキャッシュにリクエストされたリソースがあるか確認
        caches.match(event.request)
            .then(response => {
                // キャッシュにあれば、そのレスポンスを返す
                if (response) {
                    return response;
                }
                // キャッシュになければ、ネットワークにリクエストを送り、レスポンスを返す
                return fetch(event.request);
            })
    );
});

// Service Workerの有効化イベント (古いキャッシュの削除など)
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        // このキャッシュ名がホワイトリストになければ削除
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
