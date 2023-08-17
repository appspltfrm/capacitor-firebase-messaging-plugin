var capacitorFirebaseMessagingPlugin = (function (exports, core) {
    'use strict';

    class FirebaseMessagingWebPlugin extends core.WebPlugin {
        openNotificationsPermissionSettings() {
            throw new Error("Method not implemented.");
        }
        checkPermissions() {
            throw new Error("Method not implemented.");
        }
        requestPermissions() {
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
        getToken() {
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

    return exports;

})({}, capacitorExports);
//# sourceMappingURL=plugin.js.map
