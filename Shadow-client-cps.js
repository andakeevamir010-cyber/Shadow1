/*
 * Shadow Client
 * CPS Counter
 *
 * Counts left and right mouse clicks
 * and displays them on the Shadow HUD.
 */

(function () {
    "use strict";

    const clickTimes = {
        left: [],
        right: []
    };

    const CPS_WINDOW = 1000;

    function registerClick(button) {
        const now = Date.now();

        clickTimes[button].push(now);

        cleanClicks(button);
        updateHUD();
    }

    function cleanClicks(button) {
        const cutoff = Date.now() - CPS_WINDOW;

        clickTimes[button] =
            clickTimes[button].filter(function (time) {
                return time >= cutoff;
            });
    }

    function getCPS(button) {
        cleanClicks(button);

        return clickTimes[button].length;
    }

    function updateHUD() {
        const element =
            document.getElementById("shadow-hud-cps");

        if (!element) {
            return;
        }

        const leftCPS = getCPS("left");
        const rightCPS = getCPS("right");

        element.textContent =
            "CPS: " +
            leftCPS +
            " | " +
            rightCPS;
    }

    document.addEventListener(
        "mousedown",
        function (event) {

            if (event.button === 0) {
                registerClick("left");
            }

            if (event.button === 2) {
                registerClick("right");
            }
        },
        true
    );

    document.addEventListener(
        "contextmenu",
        function (event) {
            /*
             * Don't cancel the normal Minecraft
             * right-click behavior.
             */
        },
        true
    );

    /*
     * Update the counter continuously so CPS
     * falls back to 0 when the player stops clicking.
     */
    setInterval(function () {
        updateHUD();
    }, 50);

    window.ShadowCPS = {
        getLeftCPS: function () {
            return getCPS("left");
        },

        getRightCPS: function () {
            return getCPS("right");
        },

        reset: function () {
            clickTimes.left = [];
            clickTimes.right = [];
            updateHUD();
        }
    };

})();
