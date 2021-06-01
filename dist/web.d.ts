import { WebPlugin } from "@capacitor/core";
import { FirebaseMessagingPlugin } from "./plugin";
import { NotificationsPermissionState } from "./notifications-permission-state";
export declare class FirebaseMessagingWebPlugin extends WebPlugin implements FirebaseMessagingPlugin {
    constructor();
    openNotificationsPermissionSettings(): void;
    notificationsPermissionState(): Promise<{
        "state": NotificationsPermissionState;
    }>;
    removeAllDeliveredNotifications(): Promise<void>;
    subscribeToTopic(call: {
        topic: string;
    }): Promise<void>;
    unsubscribeFromTopic(call: {
        topic: string;
    }): Promise<void>;
    destroy(): Promise<void>;
}
