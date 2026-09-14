(function () {
    "use strict";

    /*
     * Shadow Client
     * Eaglercraft 1.8.8 WASM bridge
     *
     * This layer provides a safe interface between the
     * Shadow UI and the Eaglercraft runtime.
     *
     * It does NOT modify WASM memory or pretend to expose
     * Minecraft internals that are not actually available.
     */

    const ShadowWASM = {
        connected: false,
        runtime: null,

        connect: function (runtime) {
            if (!runtime) {
                console.warn(
                    "[Shadow Client] No Eaglercraft runtime supplied."
                );
                return false;
            }

            this.runtime = runtime;
            this.connected = true;

            console.log("[Shadow Client] Eaglercraft runtime connected.");

            window.dispatchEvent(
                new CustomEvent("shadow-wasm-connected")
            );

            return true;
        },

        disconnect: function () {
            this.runtime = null;
            this.connected = false;

            console.log("[Shadow Client] Eaglercraft runtime disconnected.");

            window.dispatchEvent(
                new CustomEvent("shadow-wasm-disconnected")
            );
        },

        isConnected: function () {
            return this.connected;
        },

        getRuntime: function () {
            return this.runtime;
        }
    };

    window.ShadowWASM = ShadowWASM;

})();
