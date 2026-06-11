let tokenClient;
let accessToken = '';
let storedClientId = '';

/**
 * Resilient Initialization Guard: Polling mechanism to wait for the Google SDK to load.
 * @param {number} timeoutMs Maximum time to wait in milliseconds.
 * @returns {Promise<void>} Resolves when the SDK is ready, or rejects on timeout.
 */
function waitForGoogleSDK(timeoutMs = 5000) {
    return new Promise((resolve, reject) => {
        if (window.google && window.google.accounts && window.google.accounts.oauth2) {
            resolve();
            return;
        }

        const startTime = Date.now();
        const interval = setInterval(() => {
            const isReady = window.google && window.google.accounts && window.google.accounts.oauth2;
            if (isReady) {
                clearInterval(interval);
                resolve();
            } else if (Date.now() - startTime > timeoutMs) {
                clearInterval(interval);
                const errorMsg = `Google SDK failed to load within ${timeoutMs}ms. Please verify your internet connection or check if a browser extension is blocking 'accounts.google.com'.`;
                console.error(errorMsg);
                reject(new Error(errorMsg));
            }
        }, 100);
    });
}

window.gdriveHelper = {
    /**
     * Stores the Client ID for later initialization.
     * @param {string} clientId The Google OAuth Client ID.
     */
    init: function (clientId) {
        storedClientId = clientId;
        console.log("GDrive Helper: Client ID stored.");
        
        // Attempt immediate initialization if the SDK is already present
        if (window.google && window.google.accounts && window.google.accounts.oauth2) {
            this.ensureClientInitialized();
        }
    },

    /**
     * Initializes the token client if it hasn't been already.
     */
    ensureClientInitialized: function () {
        if (tokenClient || !storedClientId) return;

        try {
            tokenClient = google.accounts.oauth2.initTokenClient({
                client_id: storedClientId,
                scope: 'https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/drive.file',
                callback: (tokenResponse) => {
                    if (tokenResponse && tokenResponse.access_token) {
                        accessToken = tokenResponse.access_token;
                        console.log("GDrive Access Token acquired.");
                    }
                },
                ux_mode: 'popup'
            });
            console.log("GDrive: GIS Client Initialized");
        } catch (err) {
            console.error("GDrive: GIS Init Error:", err);
        }
    },

    /**
     * Requests an access token, waiting for the SDK to load if necessary.
     * @returns {Promise<string>} The access token.
     */
    requestToken: async function () {
        try {
            // 2.1 & 2.2: Resilient Initialization Guard with polling and timeout
            await waitForGoogleSDK(5000);

            // 2.3: Ensure the client is initialized before requesting the token
            this.ensureClientInitialized();

            if (!tokenClient) {
                throw new Error("GDrive: Google Token Client failed to initialize.");
            }

            return new Promise((resolve, reject) => {
                tokenClient.callback = (response) => {
                    if (response.error) {
                        console.error("GDrive: Token Request Error:", response.error);
                        reject(response);
                    } else {
                        accessToken = response.access_token;
                        resolve(accessToken);
                    }
                };
                tokenClient.requestAccessToken({ prompt: 'consent' });
            });
        } catch (err) {
            console.error("GDrive: requestToken failed:", err);
            throw err;
        }
    },

    /**
     * Returns the currently held access token.
     * @returns {string}
     */
    getToken: function () {
        return accessToken;
    }
};
