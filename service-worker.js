/* Manifest version: wE5m8RIX */
self.addEventListener('install', event => {
    console.log('Service Worker installed');
});

self.addEventListener('fetch', event => {
    event.respondWith(fetch(event.request));
});