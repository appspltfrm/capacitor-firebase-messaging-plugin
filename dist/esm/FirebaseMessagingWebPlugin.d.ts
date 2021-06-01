import { WebPlugin } from "@capacitor/core";
import type { FirebaseMessagingPlugin } from "./FirebaseMessagingPlugin";
import type { NotificationsPermissionState } from "./NotificationsPermissionState";
export declare class FirebaseMessagingWebPlugin extends WebPlugin implements FirebaseMessagingPlugin {
    openNotificationsPermissionSettings(): void;
    notificationsPermissionState(): Promise<{
        "state": NotificationsPermissionState;
    }>;
    removeAllDeliveredNotifications(): Promise<void>;
    subscribeToTopic(_call: {
        topic: string;
    }): Promise<void>;
    unsubscribeFromTopic(_call: {
        topic: string;
    }): Promise<void>;
    destroy(): Promise<void>;
}
