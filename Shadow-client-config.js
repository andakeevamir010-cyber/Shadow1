/*
 * Shadow Client
 * Eaglercraft 1.8
 *
 * Client configuration only.
 * No launcher code.
 */

window.ShadowClient = {
    name: "Shadow Client",
    version: "1.0.0",
    minecraftVersion: "1.8",

    settings: {
        maxFPS: 60,

        modules: {
            fps: true,
            cps: true,
            keystrokes: true,
            compass: true,
            freelook: true
        },

        hud: {
            movable: true
        }
    },

    hudPositions: {
        fps: {
            x: 10,
            y: 10
        },

        cps: {
            x: 10,
            y: 30
        },

        keystrokes: {
            x: 10,
            y: 70
        },

        compass: {
            x: 10,
            y: 160
        }
    }
};

console.log(
    "[Shadow Client] Loaded " +
    window.ShadowClient.name +
    " " +
    window.ShadowClient.version
);
