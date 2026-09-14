(function () {
    "use strict";

    /*
     * Shadow Client
     * Eaglercraft 1.8.8 integration bootstrap
     *
     * This file initializes Shadow Client after the
     * Eaglercraft page has loaded.
     */

    let initialized = false;

    function initShadowClient() {
        if (initialized) return;
        initialized = true;

        console.log("[Shadow Client] Initializing...");

        /*
         * Start the main Shadow Client controller
         */
        if (
            window.ShadowClient &&
            typeof window.ShadowClient.init === "function"
        ) {
            window.ShadowClient.init();
        }

        /*
         * Initialize HUD
         */
        if (
            window.ShadowHUD &&
            typeof window.ShadowHUD.init === "function"
        ) {
            window.ShadowHUD.init();
        }

        /*
         * Initialize settings
         */
        if (
            window.ShadowSettings &&
            typeof window.ShadowSettings.init === "function"
        ) {
            window.ShadowSettings.init();
        }

        /*
         * Initialize keyboard controls
         */
        if (
            window.ShadowKeybinds &&
            typeof window.ShadowKeybinds.init === "function"
        ) {
            window.ShadowKeybinds.init();
        }

        /*
         * Initialize freelook
         */
        if (
            window.ShadowFreelook &&
            typeof window.ShadowFreelook.init === "function"
        ) {
            window.ShadowFreelook.init();
        }

        /*
         * Enable the HUD editor system
         */
        if (
            window.ShadowHUDEditor &&
            typeof window.ShadowHUDEditor.init === "function"
        ) {
            window.ShadowHUDEditor.init();
        }

        console.log("[Shadow Client] Ready.");
    }

    /*
     * Wait until the browser page is ready.
     */
    function waitForClient() {
        if (
            window.ShadowClient ||
            window.ShadowHUD ||
            window.ShadowSettings
        ) {
            initShadowClient();
            return;
        }

        setTimeout(waitForClient, 100);
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            waitForClient,
            { once: true }
        );
    } else {
        waitForClient();
    }

    window.ShadowClientInit = {
        init: initShadowClient
    };

})();
