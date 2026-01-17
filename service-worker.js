/* Manifest version: o35dt0qM */
self.addEventListener('install', event => {
    console.log('Service Worker installed');
});

self.addEventListener('fetch', event => {
    event.respondWith(fetch(event.request));
});