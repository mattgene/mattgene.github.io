window.drawingUtils = {
    getNormalizedCoordinates: function (elementId, clientX, clientY) {
        const element = document.getElementById(elementId);
        if (!element) {
            return null;
        }
        const rect = element.getBoundingClientRect();

        // Calculate relative position within the element
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        // Normalize (0.0 to 1.0)
        let normalizedX = x / rect.width;
        let normalizedY = y / rect.height;

        // Ensure within bounds (just in case of border clicks etc)
        normalizedX = Math.max(0, Math.min(1, normalizedX));
        normalizedY = Math.max(0, Math.min(1, normalizedY));

        return { x: normalizedX, y: normalizedY };
    }
};
