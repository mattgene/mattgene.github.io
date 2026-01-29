window.bvrImageStorage = {
    db: null,
    initDB: function () {
        return new Promise((resolve, reject) => {
            if (this.db) {
                resolve();
                return;
            }
            const request = indexedDB.open("BvrImageCacheDB", 1);
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains("images")) {
                    db.createObjectStore("images", { keyPath: "id" });
                }
            };
            request.onsuccess = (event) => {
                this.db = event.target.result;
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
