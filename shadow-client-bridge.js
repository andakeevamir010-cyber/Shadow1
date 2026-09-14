/*
 * Shadow Client
 * Eaglercraft 1.8 Integration Bridge
 *
 * This bridge connects the Shadow Client
 * UI/modules to the actual game runtime.
 *
 * It intentionally does NOT replace or modify
 * the Eaglercraft WASM runtime.
 */

(function () {
    "use strict";

    const ShadowBridge = {

        initialized: false,

        gameReady: false,

        /*
         * Called when the Eaglercraft client
         * has finished starting.
         */
        init: function () {
            if (this.initialized) {
                return;
            }

            this.initialized = true;

            console.log(
                "[Shadow Client] Integration bridge initialized."
            );
        },

        /*
         * Tell Shadow Client that Minecraft
         * is ready.
         */
        setGameReady: function (ready) {
            this.gameReady = Boolean(ready);

            console.log(
                "[Shadow Client] Game ready:",
                this.gameReady
            );
        },

        /*
         * Send the player's rotation to
         * the Shadow Compass/Freelook systems.
         */
        updateRotation: function (yaw, pitch) {

            if (
                window.ShadowCompass &&
                typeof window.ShadowCompass.setYaw ===
                    "function"
            ) {
                window.ShadowCompass.setYaw(
                    Number(yaw) || 0
                );
            }

            if (
                window.ShadowFreelook &&
                !window.ShadowFreelook.isEnabled()
            ) {
                window.ShadowFreelook.setRotation(
                    Number(yaw) || 0,
                    Number(pitch) || 0
                );
            }
        },

        /*
         * Update the FPS display from the
         * actual game if the game provides
         * its own FPS value.
         */
        updateFPS: function (fps) {

            const element =
                document.getElementById(
                    "shadow-hud-fps"
                );

            if (!element) {
                return;
            }

            if (
                typeof fps === "number" &&
                isFinite(fps)
            ) {
                element.textContent =
                    "FPS: " +
                    Math.max(
                        0,
                        Math.round(fps)
                    );
            }
        },

        /*
         * Update the Shadow keystrokes state.
         */
        updateKey: function (
            key,
            pressed
        ) {

            if (
                !window.ShadowKeystrokes
            ) {
                return;
            }

            const eventType =
                pressed
                    ? "keydown"
                    : "keyup";

            /*
             * The existing keystrokes module
             * listens to normal browser keyboard
             * events, so dispatch a compatible
             * event.
             */
            try {

                const event =
                    new KeyboardEvent(
                        eventType,
                        {
                            key: key,
                            code:
                                "Key" +
                                String(key)
                                    .toUpperCase(),
                            bubbles: true
                        }
                    );

                document.dispatchEvent(event);

            } catch (error) {
                console.warn(
                    "[Shadow Client] Could not update key:",
                    error
                );
            }
        },

        /*
         * Get the current Shadow Client state.
         */
        getState: function () {
            return {
                initialized:
                    this.initialized,

                gameReady:
                    this.gameReady,

                fps:
                    window.ShadowFPS
                        ? window.ShadowFPS.getFPS()
                        : 0,

                freelook:
                    window.ShadowFreelook
                        ? window.ShadowFreelook.isEnabled()
                        : false
            };
        }
    };

    window.ShadowBridge =
        ShadowBridge;

    ShadowBridge.init();

})();
