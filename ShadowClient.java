package net.shadowclient;

/**
 * Shadow Client core configuration/state.
 *
 * This class is intentionally independent of Minecraft's patched classes so
 * Shadow Client can be integrated incrementally without overwriting Eaglercraft
 * code.
 */
public final class ShadowClient {

    public static final String NAME = "Shadow Client";
    public static final String VERSION = "1.0.0";

    /*
     * Shadow Client settings
     */
    private static boolean enabled = true;
    private static boolean hudEnabled = true;
    private static boolean fpsEnabled = true;
    private static boolean cpsEnabled = true;
    private static boolean keystrokesEnabled = true;
    private static boolean compassEnabled = true;
    private static boolean freelookEnabled = false;

    /*
     * Client limits
     */
    private static int maxFps = 60;

    /*
     * HUD positions.
     * These will later be connected to the actual Minecraft GUI renderer.
     */
    private static int fpsX = 5;
    private static int fpsY = 5;

    private static int cpsX = 5;
    private static int cpsY = 25;

    private static int keystrokesX = 5;
    private static int keystrokesY = 50;

    private static int compassX = 5;
    private static int compassY = 115;

    private ShadowClient() {
    }

    public static void init() {
        enabled = true;
    }

    public static String getName() {
        return NAME;
    }

    public static String getVersion() {
        return VERSION;
    }

    public static boolean isEnabled() {
        return enabled;
    }

    public static void setEnabled(boolean value) {
        enabled = value;
    }

    public static boolean isHudEnabled() {
        return hudEnabled;
    }

    public static void setHudEnabled(boolean value) {
        hudEnabled = value;
    }

    public static boolean isFpsEnabled() {
        return fpsEnabled;
    }

    public static void setFpsEnabled(boolean value) {
        fpsEnabled = value;
    }

    public static boolean isCpsEnabled() {
        return cpsEnabled;
    }

    public static void setCpsEnabled(boolean value) {
        cpsEnabled = value;
    }

    public static boolean isKeystrokesEnabled() {
        return keystrokesEnabled;
    }

    public static void setKeystrokesEnabled(boolean value) {
        keystrokesEnabled = value;
    }

    public static boolean isCompassEnabled() {
        return compassEnabled;
    }

    public static void setCompassEnabled(boolean value) {
        compassEnabled = value;
    }

    public static boolean isFreelookEnabled() {
        return freelookEnabled;
    }

    public static void setFreelookEnabled(boolean value) {
        freelookEnabled = value;
    }

    public static int getMaxFps() {
        return maxFps;
    }

    public static void setMaxFps(int fps) {
        if (fps < 1) {
            fps = 1;
        }

        if (fps > 60) {
            fps = 60;
        }

        maxFps = fps;
    }

    public static int getFpsX() {
        return fpsX;
    }

    public static int getFpsY() {
        return fpsY;
    }

    public static void setFpsPosition(int x, int y) {
        fpsX = x;
        fpsY = y;
    }

    public static int getCpsX() {
        return cpsX;
    }

    public static int getCpsY() {
        return cpsY;
    }

    public static void setCpsPosition(int x, int y) {
        cpsX = x;
        cpsY = y;
    }

    public static int getKeystrokesX() {
        return keystrokesX;
    }

    public static int getKeystrokesY() {
        return keystrokesY;
    }

    public static void setKeystrokesPosition(int x, int y) {
        keystrokesX = x;
        keystrokesY = y;
    }

    public static int getCompassX() {
        return compassX;
    }

    public static int getCompassY() {
        return compassY;
    }

    public static void setCompassPosition(int x, int y) {
        compassX = x;
        compassY = y;
    }
}
