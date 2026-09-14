(function () {
    "use strict";

    /*
     * Shadow Client
     * Eaglercraft 1.8.8
     *
     * Runtime hook manager.
     *
     * IMPORTANT:
     * This does not modify WASM memory or hook arbitrary
     * functions. It provides events that the actual
     * Eaglercraft source integration can connect to.
     */

    const Hooks = {
        initialized: false,
        runtimeReady: false,

        init: function () {
            if (this.initialized) return;

            this.initialized = true;

            console.log("[Shadow Client] WASM hooks initialized.");

            window.addEventListener(
                "shadow-wasm-connected",
                this.onRuntimeConnected.bind(this)
            );

            window.addEventListener(
                "shadow-wasm-disconnected",
                this.onRuntimeDisconnected.bind(this)
            );
        },

        onRuntimeConnected: function () {
            this.runtimeReady = true;

            console.log(
                "[Shadow Client] Eaglercraft runtime is ready."
            );

            this.emit("runtime-ready");
        },

        onRuntimeDisconnected: function () {
            this.runtimeReady = false;

            console.log(
                "[Shadow Client] Eaglercraft runtime disconnected."
            );

            this.emit("runtime-disconnected");
        },

        emit: function (name, detail) {
            window.dispatchEvent(
                new CustomEvent(
                    "shadow-" + name,
                    {
                        detail: detail || null
                    }
                )
            );
        },

        on: function (name, callback) {
            window.addEventListener(
                "shadow-" + name,
                callback
            );
        }
    };

    window.ShadowWASMHooks = Hooks;

    Hooks.init();

})();
