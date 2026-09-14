/*
 * Shadow Client
 * FPS Counter
 *
 * Measures the actual browser rendering rate
 * and displays it in the Shadow HUD.
 */

(function () {
    "use strict";

    let frames = 0;
    let lastTime = performance.now();
    let currentFPS = 0;

    function renderFrame(time) {
        frames++;

        const elapsed = time - lastTime;

        if (elapsed >= 500) {
            currentFPS = Math.round(
                (frames * 1000) / elapsed
            );

            frames = 0;
            lastTime = time;

            updateHUD();
        }

        requestAnimationFrame(renderFrame);
    }

    function updateHUD() {
        const element =
            document.getElementById("shadow-hud-fps");

        if (!element) {
            return;
        }

        element.textContent =
            "FPS: " + currentFPS;
    }

    window.ShadowFPS = {
        getFPS: function () {
            return currentFPS;
        }
    };

    requestAnimationFrame(renderFrame);

})();
