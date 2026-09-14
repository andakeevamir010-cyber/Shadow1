/*
 * Shadow Client
 * ClickGUI
 *
 * Press RIGHT SHIFT to open/close.
 */

(function () {
    "use strict";

    const modules = {
        FPS: true,
        CPS: true,
        Keystrokes: true,
        Compass: true,
        Freelook: true
    };

    let gui = null;

    function createGUI() {
        if (gui) return;

        gui = document.createElement("div");

        gui.id = "shadow-clickgui";

        gui.style.position = "fixed";
        gui.style.left = "50%";
        gui.style.top = "50%";
        gui.style.transform = "translate(-50%, -50%)";

        gui.style.width = "360px";
        gui.style.maxHeight = "70vh";

        gui.style.overflowY = "auto";

        gui.style.padding = "14px";

        gui.style.background =
            "rgba(8, 8, 8, 0.97)";

        gui.style.border =
            "1px solid rgba(255,255,255,0.18)";

        gui.style.borderRadius = "8px";

        gui.style.boxShadow =
            "0 8px 30px rgba(0,0,0,0.65)";

        gui.style.color = "#ffffff";

        gui.style.fontFamily =
            "Arial, sans-serif";

        gui.style.zIndex = "1000000";

        gui.style.display = "none";

        createTitle();
        createModules();

        document.body.appendChild(gui);
    }

    function createTitle() {
        const title =
            document.createElement("div");

        title.textContent =
            "SHADOW CLIENT";

        title.style.fontSize = "20px";
        title.style.fontWeight = "bold";

        title.style.letterSpacing =
            "2px";

        title.style.marginBottom =
            "4px";

        title.style.textAlign =
            "center";

        gui.appendChild(title);

        const subtitle =
            document.createElement("div");

        subtitle.textContent =
            "1.8 • Client Settings";

        subtitle.style.fontSize =
            "11px";

        subtitle.style.opacity =
            "0.55";

        subtitle.style.textAlign =
            "center";

        subtitle.style.marginBottom =
            "14px";

        gui.appendChild(subtitle);
    }

    function createModules() {
        Object.keys(modules).forEach(
            function (moduleName) {

                const button =
                    document.createElement("button");

                button.textContent =
                    moduleName +
                    "  •  " +
                    (modules[moduleName]
                        ? "ON"
                        : "OFF");

                button.dataset.module =
                    moduleName;

                button.style.display =
                    "block";

                button.style.width =
                    "100%";

                button.style.padding =
                    "10px";

                button.style.marginBottom =
                    "7px";

                button.style.border =
                    "1px solid rgba(255,255,255,0.12)";

                button.style.borderRadius =
                    "5px";

                button.style.background =
                    modules[moduleName]
                        ? "rgba(70,70,70,0.9)"
                        : "rgba(20,20,20,0.9)";

                button.style.color =
                    "#ffffff";

                button.style.cursor =
                    "pointer";

                button.style.textAlign =
                    "left";

                button.style.fontSize =
                    "13px";

                button.onclick =
                    function () {

                        toggleModule(
                            moduleName,
                            button
                        );
                    };

                gui.appendChild(button);
            }
        );
    }

    function toggleModule(
        moduleName,
        button
    ) {
        modules[moduleName] =
            !modules[moduleName];

        button.textContent =
            moduleName +
            "  •  " +
            (modules[moduleName]
                ? "ON"
                : "OFF");

        button.style.background =
            modules[moduleName]
                ? "rgba(70,70,70,0.9)"
                : "rgba(20,20,20,0.9)";

        applyModule(
            moduleName,
            modules[moduleName]
        );
    }

    function applyModule(
        moduleName,
        enabled
    ) {
        const ids = {
            FPS: "shadow-hud-fps",
            CPS: "shadow-hud-cps",
            Compass: "shadow-compass",
            Keystrokes: "shadow-keystrokes"
        };

        const id = ids[moduleName];

        if (!id) return;

        const element =
            document.getElementById(id);

        if (element) {
            element.style.display =
                enabled ? "" : "none";
        }
    }

    function toggleGUI() {
        if (!gui) {
            createGUI();
        }

        const open =
            gui.style.display !== "none";

        gui.style.display =
            open ? "none" : "block";
    }

    document.addEventListener(
        "keydown",
        function (event) {

            /*
             * Right Shift opens/closes
             * the Shadow ClickGUI.
             */
            if (
                event.code ===
                "ShiftRight"
            ) {
                toggleGUI();

                event.preventDefault();
            }
        },
        true
    );

    window.ShadowClickGUI = {
        open: function () {
            if (!gui) createGUI();
            gui.style.display = "block";
        },

        close: function () {
            if (gui) {
                gui.style.display = "none";
            }
        },

        toggle: toggleGUI,

        getModuleState:
            function (moduleName) {
                return modules[moduleName];
            },

        setModuleState:
            function (
                moduleName,
                enabled
            ) {
                if (
                    modules[moduleName] ===
                    undefined
                ) {
                    return;
                }

                modules[moduleName] =
                    Boolean(enabled);

                applyModule(
                    moduleName,
                    modules[moduleName]
                );
            }
    };

    if (
        document.readyState ===
        "loading"
    ) {
        document.addEventListener(
            "DOMContentLoaded",
            createGUI
        );
    } else {
        createGUI();
    }

})();
