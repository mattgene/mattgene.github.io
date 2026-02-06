
let tokenClient;
let accessToken = '';

window.gdriveHelper = {
    // 初始化 Google OAuth 客戶端
    init: function (clientId) {
        try {
            tokenClient = google.accounts.oauth2.initTokenClient({
                client_id: clientId,
                scope: 'https://www.googleapis.com/auth/drive.file', // 僅限存取此 App 建立的檔案
                callback: (tokenResponse) => {
                    if (tokenResponse && tokenResponse.access_token) {
                        accessToken = tokenResponse.access_token;
                        // 通知 Blazor 授權已完成 (可選)
                        console.log("GDrive Access Token acquired.");
                    }
                },
                ux_mode: 'popup'
            });
            console.log("client id=" + clientId);
            console.log("GIS Client Initialized");
        } catch (err) {
            console.error("GIS Init Error:", err);
        }
    },

    // 彈出視窗請求授權
    requestToken: function () {
        return new Promise((resolve) => {
            tokenClient.callback = (response) => {
                accessToken = response.access_token;
                resolve(accessToken);
            };
            tokenClient.requestAccessToken({ prompt: 'consent' });
        });
    },

    // 取得當前的 Token
    getToken: function () {
        return accessToken;
    }
};