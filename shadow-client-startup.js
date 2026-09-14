/*
 * Shadow Client
 * Startup Manager
 *
 * Initializes the Shadow Client after
 * the Eaglercraft page has loaded.
 */

(function () {
    "use strict";

    let started = false;

    function startShadowClient() {
        if (started) {
            return;
        }

        started = true;

        console.log(
            "[Shadow Client] Starting Shadow Client..."
        );

        /*
         * Apply saved settings.
         */
        if (window.ShadowSettings) {
            window.ShadowSettings.apply();
        }

        /*
         * Create HUD elements.
         */
        if (window.ShadowHUD) {
            window.ShadowHUD.create();
        }

        /*
         * Create Keystrokes.
         */
        if (window.ShadowKeystrokes) {
            window.ShadowKeystrokes.create();
        }

        /*
         * Create Compass.
         */
        if (window.ShadowCompass) {
            window.ShadowCompass.create();
        }

        /*
         * Create ClickGUI.
         */
        if (window.ShadowClickGUI) {
            window.ShadowClickGUI.open();

            /*
             * Don't leave the GUI open when
             * the client starts.
             */
            window.ShadowClickGUI.close();
        }

        /*
         * Initialize the integration bridge.
         */
        if (window.ShadowBridge) {
            window.ShadowBridge.init();
        }

        /*
         * Apply saved HUD positions.
         */
        if (window.ShadowHUDEditor) {
            const positions =
                window.ShadowHUDEditor
                    .getPositions();

            console.log(
                "[Shadow Client] HUD positions loaded:",
                positions
            );
        }

        console.log(
            "[Shadow Client] Ready."
        );
    }

    /*
     * Wait until the page is ready.
     */
    if (
        document.readyState ===
        "loading"
    ) {
        document.addEventListener(
            "DOMContentLoaded",
            startShadowClient
        );
    } else {
        startShadowClient();
    }

    /*
     * Public startup function.
     */
    window.ShadowStartup = {
        start: startShadowClient,

        isStarted: function () {
            return started;
        }
    };

})();
