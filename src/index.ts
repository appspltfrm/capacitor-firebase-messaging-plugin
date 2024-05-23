import {registerPlugin} from "@capacitor/core";
import {FirebaseMessagingPlugin} from "./FirebaseMessagingPlugin";

export * from "./FirebaseMessagingPlugin";
export * from "./FirebaseMessagingWebPlugin";
export * from "./RemoteMessage";

const FirebaseMessaging = registerPlugin<FirebaseMessagingPlugin>("FirebaseMessaging", {
    web: () => import("./FirebaseMessagingWebPlugin").then(m => new m.FirebaseMessagingWebPlugin())
});

export {FirebaseMessaging};
