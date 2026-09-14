/*
 * Shadow Client
 * Eaglercraft 1.8.8
 * Main client-side module loader
 */

(function () {
    "use strict";

    const SHADOW_FILES = [
        "shadow-client-config.js",
        "shadow-client-settings.js",

        "shadow-client-hud.js",
        "shadow-client-fps.js",
        "shadow-client-cps.js",
        "shadow-client-keystrokes.js",
        "shadow-client-compass.js",

        "shadow-client-clickgui.js",
        "shadow-client-freelook.js",
        "shadow-client-keybinds.js",

        "shadow-client-bridge.js",
        "shadow-client-hud-editor.js",

        "shadow-client.js",
        "shadow-client-startup.js"
    ];

    const loaded = [];

    function loadScript(file) {
        return new Promise(function (resolve, reject) {
            const existing = document.querySelector(
                'script[data-shadow-file="' + file + '"]'
            );

            if (existing) {
                resolve();
                return;
            }

            const script = document.createElement("script");

            script.src = file;
            script.async = false;
            script.dataset.shadowFile = file;

            script.onload = function () {
                loaded.push(file);
                console.log("[Shadow Client] Loaded: " + file);
                resolve();
            };

            script.onerror = function () {
                console.error("[Shadow Client] Failed to load: " + file);
                reject(new Error("Failed to load " + file));
            };

            document.head.appendChild(script);
        });
    }

    async function loadShadowClient() {
        console.log("[Shadow Client] Starting...");

        for (const file of SHADOW_FILES) {
            try {
                await loadScript(file);
            } catch (error) {
                console.error(
                    "[Shadow Client] Loading stopped because of:",
                    error
                );

                return false;
            }
        }

        console.log(
            "[Shadow Client] All modules loaded (" +
            loaded.length +
            "/" +
            SHADOW_FILES.length +
            ")"
        );

        return true;
    }

    window.ShadowClientLoader = {
        files: SHADOW_FILES.slice(),
        loaded: loaded,

        start: loadShadowClient
    };

    /*
     * Start after the page has loaded.
     */
    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            loadShadowClient,
            { once: true }
        );
    } else {
        loadShadowClient();
    }

})();
