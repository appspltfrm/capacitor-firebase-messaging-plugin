/**
 * State of notification permission.
 */
export var NotificationsPermissionState;
(function (NotificationsPermissionState) {
    /**
     * The app has permission to use system notifications.
     */
    NotificationsPermissionState["granted"] = "granted";
    /**
     * 	The app has been denied permission to use system notifications.
     */
    NotificationsPermissionState["denied"] = "denied";
    /**
     * The app needs to ask for permission in order use system notifications.
     */
    NotificationsPermissionState["prompt"] = "prompt";
})(NotificationsPermissionState || (NotificationsPermissionState = {}));
;
//# sourceMappingURL=notifications-permission-state.js.map