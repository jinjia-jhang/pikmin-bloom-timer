const CACHE_NAME = 'pikmin-v8';
const ASSETS = ['./', './index.html', './manifest.json'];

self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
    self.skipWaiting(); // 強制立即啟用
});

self.addEventListener('activate', (e) => {
    e.waitUntil(clients.claim());
});

self.addEventListener('fetch', (e) => {
    e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});