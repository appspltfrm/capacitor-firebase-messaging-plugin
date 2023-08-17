import {PermissionState, WebPlugin} from "@capacitor/core";

import type {FirebaseMessagingPlugin} from "./FirebaseMessagingPlugin";

export class FirebaseMessagingWebPlugin extends WebPlugin implements FirebaseMessagingPlugin {

	openNotificationsPermissionSettings(): void {
		throw new Error("Method not implemented.");
	}

	checkPermissions(): Promise<{receive: PermissionState}> {
		throw new Error("Method not implemented.");
	}

	requestPermissions(): Promise<{receive: PermissionState}> {
		throw new Error("Method not implemented.");
	}

	removeAllDeliveredNotifications(): Promise<void> {
		throw new Error("Method not implemented.");
	}

	subscribeToTopic(_call: {topic: string}): Promise<void> {
		throw new Error("Method not implemented.");
	}

	unsubscribeFromTopic(_call: {topic: string}): Promise<void> {
		throw new Error("Method not implemented.");
	}

	getToken(): any {
		throw new Error("Method not implemented.");
	}

	destroy(): Promise<void> {
		throw new Error("Method not implemented.");
	}
}
