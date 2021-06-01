import {WebPlugin} from "@capacitor/core";
import {FirebaseMessagingPlugin} from "./FirebaseMessagingPlugin";
import {NotificationsPermissionState} from "./NotificationsPermissionState";

export class FirebaseMessagingWebPlugin extends WebPlugin implements FirebaseMessagingPlugin {

	openNotificationsPermissionSettings(): void {
		throw new Error("Method not implemented.");
	}

	notificationsPermissionState(): Promise<{"state": NotificationsPermissionState}> {
		throw new Error("Method not implemented.");
	}

	removeAllDeliveredNotifications(): Promise<void> {
		throw new Error("Method not implemented.");
	}

	subscribeToTopic(call: {topic: string}): Promise<void> {
		throw new Error("Method not implemented.");
	}

	unsubscribeFromTopic(call: {topic: string}): Promise<void> {
		throw new Error("Method not implemented.");
	}

	destroy(): Promise<void> {
		throw new Error("Method not implemented.");
	}
}
