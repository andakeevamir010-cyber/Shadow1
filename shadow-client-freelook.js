/*
 * Shadow Client
 * Freelook
 *
 * Default key: F
 *
 * Hold F to enter freelook.
 * Release F to return to normal camera control.
 */

(function () {
    "use strict";

    let enabled = false;

    let yaw = 0;
    let pitch = 0;

    const sensitivity = 0.15;

    function start() {
        if (!window.ShadowClient) {
            return;
        }

        enabled = true;

        document.body.classList.add(
            "shadow-freelook"
        );
    }

    function stop() {
        enabled = false;

        document.body.classList.remove(
            "shadow-freelook"
        );
    }

    function toggle() {
        if (enabled) {
            stop();
        } else {
            start();
        }
    }

    function handleMouse(event) {
        if (!enabled) {
            return;
        }

        yaw -= event.movementX * sensitivity;

        pitch -= event.movementY * sensitivity;

        /*
         * Keep vertical camera rotation
         * within Minecraft's normal range.
         */
        pitch = Math.max(
            -90,
            Math.min(90, pitch)
        );
    }

    document.addEventListener(
        "mousemove",
        handleMouse,
        true
    );

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.code === "KeyF" &&
                !event.repeat
            ) {
                start();
            }

        },
        true
    );

    document.addEventListener(
        "keyup",
        function (event) {

            if (
                event.code === "KeyF"
            ) {
                stop();
            }

        },
        true
    );

    window.ShadowFreelook = {

        isEnabled: function () {
            return enabled;
        },

        getYaw: function () {
            return yaw;
        },

        getPitch: function () {
            return pitch;
        },

        setRotation:
            function (
                newYaw,
                newPitch
            ) {
                yaw = Number(newYaw) || 0;

                pitch =
                    Number(newPitch) || 0;

                pitch = Math.max(
                    -90,
                    Math.min(90, pitch)
                );
            },

        start: start,

        stop: stop,

        toggle: toggle
    };

})();
