import type { PermissionState, PluginListenerHandle } from "@capacitor/core";
import type { RemoteMessage } from "./RemoteMessage";
export interface FirebaseMessagingPlugin {
    /**
     * Check permission to receive push notifications.
     *
     * On Android 12 and below the status is always granted because you can always
     * receive push notifications. If you need to check if the user allows
     * to display notifications, use local-notifications plugin.
     */
    checkPermissions(): Promise<{
        receive: PermissionState;
    }>;
    /**
     * Request permission to receive push notifications.
     *
     * On Android 12 and below it doesn't prompt for permission because you can always
     * receive push notifications.
     *
     * On iOS, the first time you use the function, it will prompt the user
     * for push notification permission and return granted or denied based
     * on the user selection. On following calls it will get the current status of
     * the permission without prompting again.
     *
     * @since 1.0.0
     */
    requestPermissions(): Promise<{
        receive: PermissionState;
    }>;
    /**
     * Open permission settings for current app. On iOS it will open settings related to system notifications,
     * on android it will open "about app" view, where the user will be able to grant system notifications.
     */
    openNotificationsPermissionSettings(): void;
    /**
     * Remove all notifications.
     */
    removeAllDeliveredNotifications(): Promise<void>;
    /**
     * Subscribes to topic.
     * @param topic The name of the topic to subscribe. Must match the following regular expression: "[a-zA-Z0-9-_.~%]{1,900}".
     * @return A promise, which is resolved when subscription successful, rejects other case.
     * @see https://firebase.google.com/docs/reference/android/com/google/firebase/messaging/FirebaseMessaging.html#subscribeToTopic(java.lang.String)
     */
    subscribeToTopic(call: {
        topic: string;
    }): Promise<void>;
    /**
     * Unsubscribes from topic.
     * @param topic The name of the topic to subscribe. Must match the following regular expression: "[a-zA-Z0-9-_.~%]{1,900}".
     * @return A promise, which is resolved when unsubscription successful, rejects other case.
     * @see https://firebase.google.com/docs/reference/android/com/google/firebase/messaging/FirebaseMessaging.html#unsubscribeFromTopic(java.lang.String)
     */
    unsubscribeFromTopic(call: {
        topic: string;
    }): Promise<void>;
    /**
     * Delete the firebase instance (so it applies for other firebase components, e.g. Analytics or Firestore) and the data associated with it.
     * This stops the periodic sending of data to the Firebase backend started when the instance was generated, unless
     * another library that requires instance (like FCM, RemoteConfig or Analytics) is used or it's configured to be executed automatically.
     *
     * @return A promise, which is resolved when destroy successful, rejects other case.
     */
    destroy(): Promise<void>;
    getToken(): Promise<{
        token: string | null;
    }>;
    addListener(eventName: "messageReceived", listenerFunc: (event: RemoteMessage) => void): Promise<PluginListenerHandle>;
    addListener(eventName: "tokenReceived", listenerFunc: (event: {
        token: string;
    }) => void): Promise<PluginListenerHandle>;
}
