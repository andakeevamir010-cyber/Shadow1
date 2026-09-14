/*
 * Shadow Client
 * Settings System
 *
 * Stores Shadow Client settings in localStorage.
 */

(function () {
    "use strict";

    const STORAGE_KEY =
        "shadow-client-settings";

    const defaults = {
        maxFPS: 60,

        hud: {
            fps: true,
            cps: true,
            keystrokes: true,
            compass: true
        },

        modules: {
            freelook: true
        }
    };

    let settings;

    function clone(object) {
        return JSON.parse(
            JSON.stringify(object)
        );
    }

    function load() {
        try {
            const saved =
                localStorage.getItem(
                    STORAGE_KEY
                );

            if (!saved) {
                settings = clone(defaults);
                save();
                return;
            }

            const parsed =
                JSON.parse(saved);

            settings = clone(defaults);

            if (
                typeof parsed.maxFPS ===
                "number"
            ) {
                settings.maxFPS =
                    Math.max(
                        30,
                        Math.min(
                            60,
                            Math.round(
                                parsed.maxFPS
                            )
                        )
                    );
            }

            if (parsed.hud) {
                Object.keys(
                    settings.hud
                ).forEach(function (key) {
                    if (
                        typeof parsed.hud[key] ===
                        "boolean"
                    ) {
                        settings.hud[key] =
                            parsed.hud[key];
                    }
                });
            }

            if (parsed.modules) {
                Object.keys(
                    settings.modules
                ).forEach(function (key) {
                    if (
                        typeof parsed.modules[key] ===
                        "boolean"
                    ) {
                        settings.modules[key] =
                            parsed.modules[key];
                    }
                });
            }

            save();

        } catch (error) {
            console.warn(
                "[Shadow Client] Settings reset."
            );

            settings = clone(defaults);
            save();
        }
    }

    function save() {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(settings)
        );
    }

    function get(path) {
        const parts =
            String(path).split(".");

        let value = settings;

        for (
            let i = 0;
            i < parts.length;
            i++
        ) {
            if (
                value === null ||
                value === undefined
            ) {
                return undefined;
            }

            value = value[parts[i]];
        }

        return value;
    }

    function set(path, value) {
        const parts =
            String(path).split(".");

        let target = settings;

        for (
            let i = 0;
            i < parts.length - 1;
            i++
        ) {
            if (
                !target[parts[i]] ||
                typeof target[parts[i]] !==
                    "object"
            ) {
                target[parts[i]] = {};
            }

            target = target[parts[i]];
        }

        target[
            parts[parts.length - 1]
        ] = value;

        save();

        apply();
    }

    function apply() {
        const hudMap = {
            fps: "shadow-hud-fps",
            cps: "shadow-hud-cps",
            keystrokes: "shadow-keystrokes",
            compass: "shadow-compass"
        };

        Object.keys(hudMap).forEach(
            function (key) {

                const element =
                    document.getElementById(
                        hudMap[key]
                    );

                if (!element) {
                    return;
                }

                element.style.display =
                    settings.hud[key]
                        ? ""
                        : "none";
            }
        );
    }

    function reset() {
        settings = clone(defaults);
        save();
        apply();
    }

    window.ShadowSettings = {
        get: get,
        set: set,

        all: function () {
            return clone(settings);
        },

        save: save,
        reset: reset,
        apply: apply
    };

    load();

    if (
        document.readyState ===
        "loading"
    ) {
        document.addEventListener(
            "DOMContentLoaded",
            apply
        );
    } else {
        apply();
    }

})();
