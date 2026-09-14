/*
 * Shadow Client
 * HUD Editor
 *
 * Right Shift + H = HUD edit mode
 *
 * Drag:
 * - FPS
 * - CPS
 * - Keystrokes
 * - Compass
 *
 * Positions are saved automatically.
 */

(function () {
    "use strict";

    const STORAGE_KEY = "shadow-client-hud-positions";

    const defaults = {
        fps: { x: 10, y: 10 },
        cps: { x: 10, y: 40 },
        keystrokes: { x: 10, y: 80 },
        compass: { x: 10, y: 180 }
    };

    let positions = {};
    let editing = false;

    const hudElements = {
        fps: "shadow-hud-fps",
        cps: "shadow-hud-cps",
        keystrokes: "shadow-keystrokes",
        compass: "shadow-compass"
    };

    function load() {
        try {
            const saved =
                localStorage.getItem(STORAGE_KEY);

            positions = Object.assign(
                {},
                defaults,
                saved ? JSON.parse(saved) : {}
            );

        } catch (error) {
            positions = JSON.parse(
                JSON.stringify(defaults)
            );
        }
    }

    function save() {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(positions)
        );
    }

    function getElement(name) {
        return document.getElementById(
            hudElements[name]
        );
    }

    function applyPosition(name) {
        const element = getElement(name);

        if (!element || !positions[name]) {
            return;
        }

        element.style.position = "fixed";
        element.style.left =
            positions[name].x + "px";
        element.style.top =
            positions[name].y + "px";
    }

    function applyAllPositions() {
        Object.keys(hudElements).forEach(
            function (name) {
                applyPosition(name);
            }
        );
    }

    function setEditingStyle(element, active) {
        if (!element) {
            return;
        }

        if (active) {
            element.style.outline =
                "2px dashed rgba(255,255,255,0.7)";

            element.style.cursor = "move";
        } else {
            element.style.outline = "";
            element.style.cursor = "";
        }
    }

    function makeDraggable(name) {
        const element = getElement(name);

        if (!element || element.dataset.shadowEditor) {
            return;
        }

        element.dataset.shadowEditor = "true";

        let dragging = false;
        let offsetX = 0;
        let offsetY = 0;

        element.addEventListener(
            "pointerdown",
            function (event) {

                if (!editing) {
                    return;
                }

                dragging = true;

                const rect =
                    element.getBoundingClientRect();

                offsetX =
                    event.clientX - rect.left;

                offsetY =
                    event.clientY - rect.top;

                try {
                    element.setPointerCapture(
                        event.pointerId
                    );
                } catch (error) {
                    // Pointer capture may not be available.
                }

                event.preventDefault();
                event.stopPropagation();
            },
            true
        );

        element.addEventListener(
            "pointermove",
            function (event) {

                if (!dragging || !editing) {
                    return;
                }

                let x =
                    event.clientX - offsetX;

                let y =
                    event.clientY - offsetY;

                const maxX =
                    window.innerWidth -
                    element.offsetWidth;

                const maxY =
                    window.innerHeight -
                    element.offsetHeight;

                x = Math.max(
                    0,
                    Math.min(x, maxX)
                );

                y = Math.max(
                    0,
                    Math.min(y, maxY)
                );

                positions[name] = {
                    x: Math.round(x),
                    y: Math.round(y)
                };

                element.style.left =
                    positions[name].x + "px";

                element.style.top =
                    positions[name].y + "px";
            },
            true
        );

        element.addEventListener(
            "pointerup",
            function (event) {

                if (!dragging) {
                    return;
                }

                dragging = false;

                save();

                try {
                    element.releasePointerCapture(
                        event.pointerId
                    );
                } catch (error) {
                    // Pointer capture may already be released.
                }
            },
            true
        );

        element.addEventListener(
            "pointercancel",
            function () {
                dragging = false;
                save();
            },
            true
        );
    }

    function setupElements() {
        Object.keys(hudElements).forEach(
            function (name) {

                const element =
                    getElement(name);

                if (!element) {
                    return;
                }

                applyPosition(name);
                makeDraggable(name);

                setEditingStyle(
                    element,
                    editing
                );
            }
        );
    }

    function setEditMode(state) {
        editing = Boolean(state);

        setupElements();

        Object.keys(hudElements).forEach(
            function (name) {

                const element =
                    getElement(name);

                setEditingStyle(
                    element,
                    editing
                );
            }
        );

        if (editing) {
            showEditorMessage();
        } else {
            hideEditorMessage();
        }
    }

    function toggleEditMode() {
        setEditMode(!editing);
    }

    let message = null;

    function showEditorMessage() {
        if (!message) {
            message =
                document.createElement("div");

            message.id =
                "shadow-hud-editor-message";

            message.style.position = "fixed";
            message.style.left = "50%";
            message.style.bottom = "20px";

            message.style.transform =
                "translateX(-50%)";

            message.style.padding =
                "8px 14px";

            message.style.background =
                "rgba(5,5,5,0.92)";

            message.style.border =
                "1px solid rgba(255,255,255,0.18)";

            message.style.borderRadius =
                "5px";

            message.style.color =
                "#ffffff";

            message.style.fontFamily =
                "Arial, sans-serif";

            message.style.fontSize =
                "12px";

            message.style.zIndex =
                "1000002";

            message.style.pointerEvents =
                "none";

            document.body.appendChild(message);
        }

        message.textContent =
            "SHADOW HUD EDITOR • Drag elements • Right Shift + H to exit";
    }

    function hideEditorMessage() {
        if (message) {
            message.remove();
            message = null;
        }
    }

    function reset() {
        positions = JSON.parse(
            JSON.stringify(defaults)
        );

        save();
        applyAllPositions();
    }

    document.addEventListener(
        "keydown",
        function (event) {

            /*
             * Right Shift + H
             */
            if (
                event.code === "KeyH" &&
                event.shiftKey &&
                event.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT
            ) {
                toggleEditMode();

                event.preventDefault();
                event.stopPropagation();
            }
        },
        true
    );

    window.addEventListener(
        "resize",
        function () {

            if (!editing) {
                applyAllPositions();
            }

        }
    );

    window.ShadowHUDEditor = {
        open: function () {
            setEditMode(true);
        },

        close: function () {
            setEditMode(false);
        },

        toggle: toggleEditMode,

        reset: reset,

        isEditing: function () {
            return editing;
        },

        getPositions: function () {
            return JSON.parse(
                JSON.stringify(positions)
            );
        }
    };

    load();

    function initialize() {
        setupElements();
        applyAllPositions();
    }

    if (
        document.readyState ===
        "loading"
    ) {
        document.addEventListener(
            "DOMContentLoaded",
            initialize
        );
    } else {
        initialize();
    }

})();
