import { WebPlugin } from "@capacitor/core";
export class FirebaseMessagingWebPlugin extends WebPlugin {
    constructor() {
        super({ name: "FirebaseMessaging", platforms: ["web"] });
    }
    openNotificationsPermissionSettings() {
        throw new Error("Method not implemented.");
    }
    notificationsPermissionState() {
        throw new Error("Method not implemented.");
    }
    removeAllDeliveredNotifications() {
        throw new Error("Method not implemented.");
    }
    subscribeToTopic(call) {
        throw new Error("Method not implemented.");
    }
    unsubscribeFromTopic(call) {
        throw new Error("Method not implemented.");
    }
    destroy() {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=web.js.map