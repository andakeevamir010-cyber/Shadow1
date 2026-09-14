/*
 * Shadow Client
 * Keybind System
 *
 * Default:
 * Right Shift = ClickGUI
 * F = Freelook
 */

(function () {
    "use strict";

    const STORAGE_KEY = "shadow-client-keybinds";

    const defaults = {
        clickgui: "ShiftRight",
        freelook: "KeyF"
    };

    let keybinds;

    function load() {
        try {
            const saved =
                localStorage.getItem(STORAGE_KEY);

            keybinds = saved
                ? Object.assign(
                    {},
                    defaults,
                    JSON.parse(saved)
                )
                : Object.assign({}, defaults);

        } catch (error) {
            keybinds =
                Object.assign({}, defaults);
        }
    }

    function save() {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(keybinds)
        );
    }

    function setKeybind(module, key) {
        if (!module || !key) {
            return false;
        }

        keybinds[module] = key;

        save();

        return true;
    }

    function getKeybind(module) {
        return keybinds[module] || null;
    }

    function reset() {
        keybinds =
            Object.assign({}, defaults);

        save();
    }

    /*
     * Listen for key presses.
     */
    document.addEventListener(
        "keydown",
        function (event) {

            /*
             * Don't activate keybinds while
             * typing into an input field.
             */
            const target = event.target;

            if (
                target &&
                (
                    target.tagName === "INPUT" ||
                    target.tagName === "TEXTAREA"
                )
            ) {
                return;
            }

            /*
             * ClickGUI
             */
            if (
                event.code ===
                keybinds.clickgui
            ) {
                if (
                    window.ShadowClickGUI &&
                    !event.repeat
                ) {
                    window.ShadowClickGUI.toggle();
                }

                return;
            }

            /*
             * Freelook
             *
             * The freelook module itself handles
             * holding/releasing the key.
             */
        },
        true
    );

    load();

    window.ShadowKeybinds = {

        get: function (module) {
            return getKeybind(module);
        },

        set: function (
            module,
            key
        ) {
            return setKeybind(
                module,
                key
            );
        },

        reset: reset,

        all: function () {
            return Object.assign(
                {},
                keybinds
            );
        }
    };

})();
