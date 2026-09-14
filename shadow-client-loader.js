(function () {
    "use strict";

    const files = [
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

        "shadow-client-wasm-bridge.js",
        "shadow-client-wasm-hooks.js",
        "shadow-client-bridge.js",

        "shadow-client-hud-editor.js",
        "shadow-client.js",
        "shadow-client-startup.js",
        "shadow-client-init.js"
    ];

    let index = 0;

    function loadNext() {
        if (index >= files.length) {
            console.log(
                "[Shadow Client] All modules loaded."
            );

            window.dispatchEvent(
                new CustomEvent("shadow-client-loaded")
            );

            return;
        }

        const file = files[index++];

        if (
            document.querySelector(
                'script[data-shadow-file="' + file + '"]'
            )
        ) {
            loadNext();
            return;
        }

        const script = document.createElement("script");

        script.src = file;
        script.async = false;
        script.dataset.shadowFile = file;

        script.onload = function () {
            console.log(
                "[Shadow Client] Loaded: " + file
            );

            loadNext();
        };

        script.onerror = function () {
            console.error(
                "[Shadow Client] Failed to load: " + file
            );
        };

        document.head.appendChild(script);
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            loadNext,
            { once: true }
        );
    } else {
        loadNext();
    }

    window.ShadowClientLoader = {
        files: files,
        start: loadNext
    };

})();
