/* Manifest version: 4S9rL+ku */
self.addEventListener('install', event => {
    console.log('Service Worker installed');
});

self.addEventListener('fetch', event => {
    event.respondWith(fetch(event.request));
});