const CACHE_NAME = 'pikmin-v19';
const CACHE_PREFIX = 'pikmin-v';
const ASSETS = ['./', './index.html', './manifest.json'];
self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
    self.skipWaiting();
});
self.addEventListener('activate', (e) => {
    // 僅保留目前版本，避免跨版本查詢時命中舊的計時程式。
    e.waitUntil(
        caches.keys()
            .then(keys => Promise.all(
                keys
                    .filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            ))
            .then(() => clients.claim())
    );
});
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.open(CACHE_NAME)
            .then(cache => cache.match(e.request))
            .then(res => res || fetch(e.request))
    );
});
