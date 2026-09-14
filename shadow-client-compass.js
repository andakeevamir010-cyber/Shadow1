/*
 * Shadow Client
 * Compass HUD
 *
 * Displays the player's current facing direction.
 */

(function () {
    "use strict";

    let compass = null;

    const directions = [
        "N",
        "NE",
        "E",
        "SE",
        "S",
        "SW",
        "W",
        "NW"
    ];

    function createCompass() {
        if (document.getElementById("shadow-compass")) {
            compass = document.getElementById("shadow-compass");
            return;
        }

        compass = document.createElement("div");

        compass.id = "shadow-compass";

        compass.textContent = "N";

        compass.style.position = "fixed";
        compass.style.left = "10px";
        compass.style.top = "160px";

        compass.style.zIndex = "999997";

        compass.style.padding = "6px 12px";

        compass.style.background =
            "rgba(10, 10, 10, 0.85)";

        compass.style.border =
            "1px solid rgba(255,255,255,0.15)";

        compass.style.borderRadius = "4px";

        compass.style.color = "#ffffff";

        compass.style.fontFamily =
            "Arial, sans-serif";

        compass.style.fontSize = "14px";

        compass.style.fontWeight = "bold";

        compass.style.textAlign = "center";

        compass.style.userSelect = "none";

        document.body.appendChild(compass);
    }

    function updateCompass(yaw) {
        if (!compass) {
            createCompass();
        }

        if (typeof yaw !== "number") {
            return;
        }

        /*
         * Minecraft yaw:
         * 0   = South
         * 90  = West
         * 180 = North
         * 270 = East
         *
         * Convert it to a simple
         * 8-direction compass.
         */

        let normalized =
            ((yaw % 360) + 360) % 360;

        let index =
            Math.round(normalized / 45) % 8;

        const direction =
            directions[index];

        compass.textContent =
            "Direction: " + direction;
    }

    /*
     * Expose the updater so the actual
     * Eaglercraft Minecraft renderer/player
     * can send its real yaw value here.
     */
    window.ShadowCompass = {
        create: createCompass,

        update: updateCompass,

        setYaw: function (yaw) {
            updateCompass(yaw);
        }
    };

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            createCompass
        );
    } else {
        createCompass();
    }

})();
