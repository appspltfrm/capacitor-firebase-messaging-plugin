import { registerPlugin } from "@capacitor/core";
export * from "./FirebaseMessagingPlugin";
export * from "./FirebaseMessagingWebPlugin";
export * from "./RemoteMessage";
const FirebaseMessaging = registerPlugin("FirebaseMessaging", {
    web: () => import("./FirebaseMessagingWebPlugin").then(m => new m.FirebaseMessagingWebPlugin())
});
export { FirebaseMessaging };
//# sourceMappingURL=index.js.map