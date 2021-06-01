import Foundation
import Capacitor
import UserNotifications
import FirebaseCore
import FirebaseMessaging
import FirebaseInstanceID

@objc(CAPFirebaseMessagingPlugin)
public class CAPFirebaseMessagingPlugin: CAPPlugin, MessagingDelegate {
    
    override init(bridge: CAPBridge!, pluginId: String!, pluginName: String!) {
        self.notificationCenter = UserNotificationCenterDelegateImpl(bridge: bridge);
        
        super.init(bridge: bridge, pluginId: pluginId, pluginName: pluginName);
    }
    
    var notificationCenter: UserNotificationCenterDelegateImpl;
    
    public override func load() {
        
        FirebaseApp.configure();
        Messaging.messaging().delegate = self;
        
        self.notificationCenter.requestPermissions();
    }
    
    @objc func openNotificationsPermissionSettings(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            UIApplication.shared.open(URL(string: "app-settings:")!);
        }
    }
    
    @objc func notificationsPermissionState(_ call: CAPPluginCall) {
        
        UNUserNotificationCenter.current().getNotificationSettings(completionHandler: {settings in
            let status = settings.authorizationStatus;
            if (status == UNAuthorizationStatus.authorized) {
                call.resolve(["state": "granted"]);
            } else if (status == UNAuthorizationStatus.denied) {
                call.resolve(["state": "denied"]);
            } else {
                call.resolve(["state": "prompt"]);
            }
        })
    }
    
    @objc func subscribeToTopic(_ call: CAPPluginCall) {
        let topic = call.getString("topic")!;
        Messaging.messaging().subscribe(toTopic: topic, completion: {completion in
            if (completion == nil) {
                call.resolve();
            } else {
                call.error("Failed subscribe to topic \(topic)", completion);
            }
        });
    }

    @objc func unsubscribeFromTopic(_ call: CAPPluginCall) {
        let topic = call.getString("topic")!;
        Messaging.messaging().unsubscribe(fromTopic: topic, completion: {completion in
            if (completion == nil) {
                call.resolve();
            } else {
                call.error("Failed unsubscribe from topic \(topic)", completion);
            }
        });
    }
    
    @objc func destroy(_ call: CAPPluginCall) {
        InstanceID.instanceID().deleteID(handler: {error in
            if (error != nil) {
                call.error("Failed delete firebase instance", error);
            } else {
                call.resolve();
            }
        });
    }

    /**
     * Remove all notifications from Notification Center
     */
    @objc func removeAllDeliveredNotifications(_ call: CAPPluginCall) {
        
        UNUserNotificationCenter.current().removeAllDeliveredNotifications();
        
        DispatchQueue.main.async(execute: {
            UIApplication.shared.applicationIconBadgeNumber = 0
        });
        
        call.success();
    }

    
    public func messaging(_ messaging: Messaging, didReceiveRegistrationToken fcmToken: String) {
        print("CAPFirebaseMessagingPlugin: received token");
        notifyListeners("tokenReceived", data:["value": fcmToken]);
    }
}
