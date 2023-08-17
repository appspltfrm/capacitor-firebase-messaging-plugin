import {registerPlugin} from "@capacitor/core";

import type {FirebaseMessagingWebPlugin} from "./FirebaseMessagingWebPlugin";

export * from "./FirebaseMessagingPlugin";
export * from "./FirebaseMessagingWebPlugin";
export * from "./RemoteMessage";

const FirebaseMessaging = registerPlugin<FirebaseMessagingWebPlugin>("FirebaseMessaging", {
    web: () => import("./FirebaseMessagingWebPlugin").then(m => new m.FirebaseMessagingWebPlugin())
});

export {FirebaseMessaging};
