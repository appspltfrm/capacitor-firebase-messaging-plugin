import firebase from "firebase-admin";
import * as fse from "fs-extra";

(async () => {

    try {

        let serviceAccount = fse.readJsonSync("./key.json");

        firebase.initializeApp({
            credential: firebase.credential.cert(serviceAccount),
            databaseURL: "https://capacitor-plugins-demo.firebaseio.com"
        });

        let messaging = firebase.app().messaging();

        let payload: firebase.messaging.MessagingPayload = {
            data: {messageId: "sdsdsd"},
            notification: {titleLocKey: "newMessage", icon: "notification", sound: "default"}
        };

        // if (app && app.styles && (app.styles["notification-color"] || app.styles["primary-color"])) {
        //     payload.notification.color = app.styles["notification-color"] || app.styles["primary-color"];
        // }

        await messaging.sendToTopic(
            "test",
            payload,
            {timeToLive: 10, contentAvailable: true}
        );

    } catch (error) {
        console.error(error);
    } finally {
        firebase.app().delete();
    }

})();