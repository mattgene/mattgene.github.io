/**
 * 建立 Intersection Observer 監聽元素進入可視區域
 * @param {DotNetObjectReference} dotNetRef - C# 物件參考
 * @param {string} elementId - 要觀察的元素 ID
 * @param {string} callbackMethod - C# 回調方法名稱
 */
window.createIntersectionObserver = function (dotNetRef, elementId, callbackMethod) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.warn(`Element with id '${elementId}' not found`);
        return null;
    }

    const options = {
        root: document.getElementById('records-scroll-container'), // 滾動容器
        rootMargin: '0px',
        threshold: 0.1 // 元素進入 10% 時觸發
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // 呼叫 C# 方法通知交集狀態
            dotNetRef.invokeMethodAsync(callbackMethod, entry.isIntersecting)
                .catch(err => console.error('Error invoking .NET method:', err));
        });
    }, options);

    observer.observe(element);

    // 回傳 observer 物件讓 C# 可以斷開連接
    return {
        disconnect: function () {
            observer.disconnect();
        }
    };
};

/**
 * 降級方案：使用傳統滾動事件
 */
window.setupScrollListener = function (dotNetRef) {
    const container = document.getElementById('records-scroll-container');
    if (!container) return;

    let isLoading = false;

    container.addEventListener('scroll', function () {
        if (isLoading) return;

        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight;
        const clientHeight = container.clientHeight;

        // 距離底部 100px 時觸發
        if (scrollTop + clientHeight >= scrollHeight - 100) {
            isLoading = true;
            dotNetRef.invokeMethodAsync('OnIntersection', true)
                .then(() => {
                    // 延遲重置，避免連續觸發
                    setTimeout(() => { isLoading = false; }, 1000);
                })
                .catch(err => {
                    console.error(err);
                    isLoading = false;
                });
        }
    });
};