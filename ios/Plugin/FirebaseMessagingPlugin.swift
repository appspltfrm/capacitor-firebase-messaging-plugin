import Foundation
import Capacitor
import UserNotifications
import FirebaseCore
import FirebaseMessaging

enum PushNotificationError: Error {
    case tokenParsingFailed
    case tokenRegistrationFailed
}

@objc(FirebaseMessagingPlugin)
public class FirebaseMessagingPlugin: CAPPlugin {
    
    private let notificationDelegateHandler = PushNotificationsHandler()
    private var appDelegateRegistrationCalled: Bool = false
    
    override public func load() {
    
        self.bridge?.notificationRouter.pushNotificationHandler = self.notificationDelegateHandler
        self.notificationDelegateHandler.plugin = self
        

        NotificationCenter.default.addObserver(self,
                                               selector: #selector(self.didRegisterForRemoteNotificationsWithDeviceToken(notification:)),
                                               name: .capacitorDidRegisterForRemoteNotifications,
                                               object: nil)

        NotificationCenter.default.addObserver(self,
                                               selector: #selector(self.didFailToRegisterForRemoteNotificationsWithError(notification:)),
                                               name: .capacitorDidFailToRegisterForRemoteNotifications,
                                               object: nil)
        
        UNUserNotificationCenter.current().requestAuthorization(options:[.badge, .alert, .sound]) {(granted, error) in
        }
    }
    
    deinit {
        NotificationCenter.default.removeObserver(self)
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
        Messaging.messaging().subscribe(toTopic: topic);
        call.resolve();
    }

    @objc func unsubscribeFromTopic(_ call: CAPPluginCall) {
        let topic = call.getString("topic")!;
        Messaging.messaging().unsubscribe(fromTopic: topic);
        call.resolve();
    }

    @objc func getToken(_ call: CAPPluginCall) {
        call.resolve(["token": Messaging.messaging().fcmToken as Any]);
    }

    @objc func destroy(_ call: CAPPluginCall) {
        NotificationCenter.default.removeObserver(self)
    }
    
    @objc func removeAllDeliveredNotifications(_ call: CAPPluginCall) {
        
        UNUserNotificationCenter.current().removeAllDeliveredNotifications();
        
        DispatchQueue.main.async(execute: {
            UIApplication.shared.applicationIconBadgeNumber = 0
        });
        
        call.resolve();
    }
    
    @objc public func didRegisterForRemoteNotificationsWithDeviceToken(notification: NSNotification) {
        appDelegateRegistrationCalled = true
        
        if let deviceToken = notification.object as? Data {
            let deviceTokenString = deviceToken.reduce("", {$0 + String(format: "%02X", $1)})
            print("CAPFirebaseMessagingPlugin: received token");
            notifyListeners("registration", data: ["value": deviceTokenString])
        
        } else if let stringToken = notification.object as? String {
            print("CAPFirebaseMessagingPlugin: received token");
            notifyListeners("registration", data: ["value": stringToken])
            
        } else {
            print("CAPFirebaseMessagingPlugin: token error");
            notifyListeners("registrationError", data: ["error": PushNotificationError.tokenParsingFailed.localizedDescription])
        }
    }

    @objc public func didFailToRegisterForRemoteNotificationsWithError(notification: NSNotification) {
        appDelegateRegistrationCalled = true
        guard let error = notification.object as? Error else {
            return
        }
        notifyListeners("registrationError", data: [
            "error": error.localizedDescription
        ])
    }
}
