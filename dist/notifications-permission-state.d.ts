/**
 * State of notification permission.
 */
export declare enum NotificationsPermissionState {
    /**
     * The app has permission to use system notifications.
     */
    granted = "granted",
    /**
     * 	The app has been denied permission to use system notifications.
     */
    denied = "denied",
    /**
     * The app needs to ask for permission in order use system notifications.
     */
    prompt = "prompt"
}
