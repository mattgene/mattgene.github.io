window.storageHelper = {
    requestPersistence: async function () {
        if (navigator.storage && navigator.storage.persist) {
            const isPersisted = await navigator.storage.persist();
            console.log(`Persisted storage granted: ${isPersisted}`);
            return isPersisted;
        }
        return false;
    }
};
