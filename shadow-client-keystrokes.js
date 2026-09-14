/*
 * Shadow Client
 * Keystrokes HUD
 *
 * Displays:
 * W
 * A S D
 * LMB / RMB
 */

(function () {
    "use strict";

    const pressed = {};

    let container = null;

    function createKey(text, key) {
        const element = document.createElement("div");

        element.textContent = text;
        element.dataset.key = key;

        element.style.width = "30px";
        element.style.height = "30px";
        element.style.display = "flex";
        element.style.alignItems = "center";
        element.style.justifyContent = "center";

        element.style.margin = "2px";

        element.style.background =
            "rgba(15, 15, 15, 0.90)";

        element.style.border =
            "1px solid rgba(255, 255, 255, 0.20)";

        element.style.borderRadius = "4px";

        element.style.color = "#ffffff";

        element.style.fontFamily =
            "Arial, sans-serif";

        element.style.fontSize = "12px";
        element.style.fontWeight = "bold";

        element.style.transition =
            "background 0.05s, transform 0.05s";

        return element;
    }

    function setPressed(key, state) {
        pressed[key] = state;

        if (!container) {
            return;
        }

        const element =
            container.querySelector(
                '[data-key="' + key + '"]'
            );

        if (!element) {
            return;
        }

        if (state) {
            element.style.background =
                "rgba(80, 80, 80, 0.95)";

            element.style.transform =
                "scale(0.94)";
        } else {
            element.style.background =
                "rgba(15, 15, 15, 0.90)";

            element.style.transform =
                "scale(1)";
        }
    }

    function createHUD() {
        if (
            document.getElementById(
                "shadow-keystrokes"
            )
        ) {
            return;
        }

        container =
            document.createElement("div");

        container.id =
            "shadow-keystrokes";

        container.style.position =
            "fixed";

        container.style.zIndex =
            "999998";

        container.style.display =
            "flex";

        container.style.flexDirection =
            "column";

        container.style.alignItems =
            "center";

        container.style.padding =
            "4px";

        container.style.background =
            "rgba(5, 5, 5, 0.75)";

        container.style.border =
            "1px solid rgba(255,255,255,0.12)";

        container.style.borderRadius =
            "5px";

        /*
         * Default position.
         * The HUD editor can reposition
         * this later.
         */
        container.style.left = "10px";
        container.style.top = "70px";

        const rowW =
            document.createElement("div");

        rowW.style.display =
            "flex";

        rowW.appendChild(
            createKey("W", "w")
        );

        const rowASD =
            document.createElement("div");

        rowASD.style.display =
            "flex";

        rowASD.appendChild(
            createKey("A", "a")
        );

        rowASD.appendChild(
            createKey("S", "s")
        );

        rowASD.appendChild(
            createKey("D", "d")
        );

        const rowMouse =
            document.createElement("div");

        rowMouse.style.display =
            "flex";

        const lmb =
            createKey("LMB", "lmb");

        const rmb =
            createKey("RMB", "rmb");

        lmb.style.width = "48px";
        rmb.style.width = "48px";

        rowMouse.appendChild(lmb);
        rowMouse.appendChild(rmb);

        container.appendChild(rowW);
        container.appendChild(rowASD);
        container.appendChild(rowMouse);

        document.body.appendChild(container);
    }

    document.addEventListener(
        "keydown",
        function (event) {

            const key =
                event.key.toLowerCase();

            if (
                key === "w" ||
                key === "a" ||
                key === "s" ||
                key === "d"
            ) {
                setPressed(key, true);
            }
        },
        true
    );

    document.addEventListener(
        "keyup",
        function (event) {

            const key =
                event.key.toLowerCase();

            if (
                key === "w" ||
                key === "a" ||
                key === "s" ||
                key === "d"
            ) {
                setPressed(key, false);
            }
        },
        true
    );

    document.addEventListener(
        "mousedown",
        function (event) {

            if (event.button === 0) {
                setPressed("lmb", true);
            }

            if (event.button === 2) {
                setPressed("rmb", true);
            }
        },
        true
    );

    document.addEventListener(
        "mouseup",
        function (event) {

            if (event.button === 0) {
                setPressed("lmb", false);
            }

            if (event.button === 2) {
                setPressed("rmb", false);
            }
        },
        true
    );

    window.addEventListener(
        "blur",
        function () {

            setPressed("w", false);
            setPressed("a", false);
            setPressed("s", false);
            setPressed("d", false);
            setPressed("lmb", false);
            setPressed("rmb", false);
        }
    );

    window.ShadowKeystrokes = {
        create: createHUD
    };

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            createHUD
        );
    } else {
        createHUD();
    }

})();
