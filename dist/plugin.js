var capacitorFirebaseMessagingPlugin = (function (exports, core) {
    'use strict';

    /**
     * State of notification permission.
     */
    exports.NotificationsPermissionState = void 0;
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
    })(exports.NotificationsPermissionState || (exports.NotificationsPermissionState = {}));

    class FirebaseMessagingWebPlugin extends core.WebPlugin {
        openNotificationsPermissionSettings() {
            throw new Error("Method not implemented.");
        }
        notificationsPermissionState() {
            throw new Error("Method not implemented.");
        }
        removeAllDeliveredNotifications() {
            throw new Error("Method not implemented.");
        }
        subscribeToTopic(_call) {
            throw new Error("Method not implemented.");
        }
        unsubscribeFromTopic(_call) {
            throw new Error("Method not implemented.");
        }
        destroy() {
            throw new Error("Method not implemented.");
        }
    }

    var FirebaseMessagingWebPlugin$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        FirebaseMessagingWebPlugin: FirebaseMessagingWebPlugin
    });

    const FirebaseMessaging = core.registerPlugin("FirebaseMessaging", {
        web: () => Promise.resolve().then(function () { return FirebaseMessagingWebPlugin$1; }).then(m => new m.FirebaseMessagingWebPlugin())
    });

    exports.FirebaseMessaging = FirebaseMessaging;
    exports.FirebaseMessagingWebPlugin = FirebaseMessagingWebPlugin;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, capacitorExports);
//# sourceMappingURL=plugin.js.map
