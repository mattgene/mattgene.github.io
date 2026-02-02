window.storageHelper = {
    requestPersistence: async function () {
        if (navigator.storage && navigator.storage.persist && navigator.storage.persisted) {
            // Check if already persisted to avoid redundant prompts
            const isAlreadyPersisted = await navigator.storage.persisted();
            if (isAlreadyPersisted) {
                console.log("Storage is already persisted.");
                return true;
            }

            // Request persistence
            const isPersisted = await navigator.storage.persist();
            console.log(`Persisted storage granted: ${isPersisted}`);
            return isPersisted;
        }
        console.warn("StorageManager API not supported.");
        return false;
    }
};
