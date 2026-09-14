/*
 * Shadow Client
 * Module Loader
 *
 * Loads the Shadow Client modules
 * in the correct order.
 */

(function () {
    "use strict";

    const modules = [
        "shadow-client-config.js",
        "shadow-client-hud.js",
        "shadow-client-cps.js",
        "shadow-client-fps.js",
        "shadow-client-keystrokes.js",
        "shadow-client-compass.js",
        "shadow-client-clickgui.js",
        "shadow-client-freelook.js"
    ];

    let loaded = 0;

    function loadModule(index) {
        if (index >= modules.length) {
            console.log(
                "[Shadow Client] All modules loaded."
            );

            window.ShadowClientLoaded = true;

            return;
        }

        const script =
            document.createElement("script");

        script.src =
            modules[index];

        script.async = false;

        script.onload = function () {
            loaded++;

            console.log(
                "[Shadow Client] Loaded " +
                modules[index] +
                " (" +
                loaded +
                "/" +
                modules.length +
                ")"
            );

            loadModule(index + 1);
        };

        script.onerror = function () {
            console.error(
                "[Shadow Client] Failed to load " +
                modules[index]
            );

            /*
             * Continue loading the remaining
             * modules instead of stopping everything.
             */
            loadModule(index + 1);
        };

        document.head.appendChild(script);
    }

    function start() {
        console.log(
            "[Shadow Client] Starting..."
        );

        loadModule(0);
    }

    window.ShadowClientLoader = {
        start: start,

        getLoadedCount: function () {
            return loaded;
        },

        getModuleCount: function () {
            return modules.length;
        }
    };

    if (
        document.readyState ===
        "loading"
    ) {
        document.addEventListener(
            "DOMContentLoaded",
            start
        );
    } else {
        start();
    }

})();
