window.bvrImageStorage = {
    db: null,
    dbVersion: 1,
    initDB: function () {
        return new Promise((resolve, reject) => {
            if (this.db) {
                resolve();
                return;
            }
            const request = indexedDB.open("BvrImageCacheDB", this.dbVersion);
            request.onblocked = function () {
                console.warn("資料庫升級被封鎖，請關閉其他分頁/App再重試");
                alert("請關閉所有相關網頁，以完成系統更新。");
            };
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains("images")) {
                    db.createObjectStore("images", { keyPath: "id" });
                }
            };
            request.onsuccess = (event) => {
                this.db = event.target.result;
                this.db.onversionchange = () => {
                    this.db.close();
                    this.db = null;
                    alert("系統已在其他分頁更新，請重新載入此頁面。");
                    location.reload();
                };
                console.log("BvrImageCacheDB initialized");
                resolve();
            };
            
            request.onerror = (event) => {
                console.error("IndexedDB error:", event.target.error);
                reject(event.target.error);
            };
        });
    },
    saveImage: function (id, data) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject("Database not initialized");
                return;
            }
            const transaction = this.db.transaction(["images"], "readwrite");
            const store = transaction.objectStore("images");
            const record = { id: id, data: data };
            const request = store.put(record);
            request.onsuccess = () => resolve();
            request.onerror = (e) => reject(e.target.error);
        });
    },
    getImage: function (id) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject("Database not initialized");
                return;
            }
            const transaction = this.db.transaction(["images"], "readonly");
            const store = transaction.objectStore("images");
            const request = store.get(id);
            request.onsuccess = () => {
                const record = request.result;
                resolve(record ? record.data : null);
            };
            request.onerror = (e) => reject(e.target.error);
        });
    },
    deleteImage: function (id) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject("Database not initialized");
                return;
            }
            const transaction = this.db.transaction(["images"], "readwrite");
            const store = transaction.objectStore("images");
            const request = store.delete(id);
            request.onsuccess = () => resolve();
            request.onerror = (e) => reject(e.target.error);
        });
    },
    getAllKeys: function () {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject("Database not initialized");
                return;
            }
            const transaction = this.db.transaction(["images"], "readonly");
            const store = transaction.objectStore("images");
            const request = store.getAllKeys();
            request.onsuccess = () => resolve(request.result);
            request.onerror = (e) => reject(e.target.error);
        });
    }
    
};
