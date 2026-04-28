/* Manifest version: 1ariIvpX */
// 監聽安裝事件
self.addEventListener('install', event => {
    console.log('Service Worker: Installing...');
    // 讓新的 SW 安裝後立即進入等待狀態，不要強制取代舊的 SW 以免損壞正在進行的資料庫事務
});

// 監聽啟動事件
self.addEventListener('activate', event => {
    console.log('Service Worker: Activated');
    // 確保 SW 啟動後立即接管所有分頁
    event.waitUntil(clients.claim());
});

// 核心：處理來自 Blazor 端的消息
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        // 當使用者點擊「立即更新」時觸發
        self.skipWaiting();
    }
});

self.addEventListener('fetch', event => {
    event.respondWith(fetch(event.request));
});