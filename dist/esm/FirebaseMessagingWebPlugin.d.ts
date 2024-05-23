import { PermissionState, WebPlugin } from "@capacitor/core";
import type { FirebaseMessagingPlugin } from "./FirebaseMessagingPlugin";
export declare class FirebaseMessagingWebPlugin extends WebPlugin implements FirebaseMessagingPlugin {
    openNotificationsPermissionSettings(): void;
    checkPermissions(): Promise<{
        receive: PermissionState;
    }>;
    requestPermissions(): Promise<{
        receive: PermissionState;
    }>;
    removeAllDeliveredNotifications(): Promise<void>;
    subscribeToTopic(_call: {
        topic: string;
    }): Promise<void>;
    unsubscribeFromTopic(_call: {
        topic: string;
    }): Promise<void>;
    getToken(): Promise<{
        token: null;
    }>;
    destroy(): Promise<void>;
}
