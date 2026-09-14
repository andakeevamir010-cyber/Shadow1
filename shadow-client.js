/*
 * Shadow Client
 * Main Controller
 *
 * Shadow Client for Eaglercraft 1.8
 */

(function () {
    "use strict";

    const ShadowClient = {
        name: "Shadow Client",
        version: "1.0.0",
        minecraftVersion: "1.8",

        initialized: false,

        modules: {
            FPS: true,
            CPS: true,
            Keystrokes: true,
            Compass: true,
            Freelook: true
        },

        init: function () {
            if (this.initialized) {
                return;
            }

            this.initialized = true;

            console.log(
                "[Shadow Client] " +
                this.name +
                " " +
                this.version
            );

            this.applyModules();
        },

        toggle: function (module) {
            if (
                this.modules[module] === undefined
            ) {
                return;
            }

            this.modules[module] =
                !this.modules[module];

            this.applyModule(module);

            console.log(
                "[Shadow Client] " +
                module +
                ": " +
                (
                    this.modules[module]
                        ? "ON"
                        : "OFF"
                )
            );
        },

        setModule: function (
            module,
            enabled
        ) {
            if (
                this.modules[module] === undefined
            ) {
                return;
            }

            this.modules[module] =
                Boolean(enabled);

            this.applyModule(module);
        },

        applyModules: function () {
            const self = this;

            Object.keys(this.modules)
                .forEach(function (module) {
                    self.applyModule(module);
                });
        },

        applyModule: function (module) {
            const enabled =
                this.modules[module];

            const elements = {
                FPS: "shadow-hud-fps",
                CPS: "shadow-hud-cps",
                Keystrokes: "shadow-keystrokes",
                Compass: "shadow-compass"
            };

            const id = elements[module];

            if (!id) {
                return;
            }

            const element =
                document.getElementById(id);

            if (!element) {
                return;
            }

            element.style.display =
                enabled ? "" : "none";
        },

        openClickGUI: function () {
            if (
                window.ShadowClickGUI
            ) {
                window.ShadowClickGUI.open();
            }
        },

        closeClickGUI: function () {
            if (
                window.ShadowClickGUI
            ) {
                window.ShadowClickGUI.close();
            }
        },

        toggleClickGUI: function () {
            if (
                window.ShadowClickGUI
            ) {
                window.ShadowClickGUI.toggle();
            }
        },

        openHUDEditor: function () {
            if (
                window.ShadowHUDEditor
            ) {
                window.ShadowHUDEditor.open();
            }
        },

        closeHUDEditor: function () {
            if (
                window.ShadowHUDEditor
            ) {
                window.ShadowHUDEditor.close();
            }
        },

        resetHUD: function () {
            if (
                window.ShadowHUDEditor
            ) {
                window.ShadowHUDEditor.reset();
            }
        },

        getFPS: function () {
            if (
                window.ShadowFPS
            ) {
                return window.ShadowFPS.getFPS();
            }

            return 0;
        },

        getCPS: function () {
            if (
                window.ShadowCPS
            ) {
                return {
                    left:
                        window.ShadowCPS
                            .getLeftCPS(),

                    right:
                        window.ShadowCPS
                            .getRightCPS()
                };
            }

            return {
                left: 0,
                right: 0
            };
        },

        isFreelook: function () {
            if (
                window.ShadowFreelook
            ) {
                return window.ShadowFreelook
                    .isEnabled();
            }

            return false;
        },

        getSettings: function () {
            if (
                window.ShadowSettings
            ) {
                return window.ShadowSettings
                    .all();
            }

            return null;
        }
    };

    window.ShadowClient =
        Object.assign(
            window.ShadowClient || {},
            ShadowClient
        );

    /*
     * Start after the page is ready.
     */
    function start() {
        window.ShadowClient.init();
    }

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
