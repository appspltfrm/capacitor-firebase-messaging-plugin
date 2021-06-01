import UserNotifications
import Capacitor

typealias JSObject = [String:Any];

public class UserNotificationCenterDelegateImpl : NSObject, UNUserNotificationCenterDelegate  {
    
    public var bridge: CAPBridge?;
    
    init(bridge: CAPBridge!) {
        super.init();
        
        self.bridge = bridge;
        
        let center = UNUserNotificationCenter.current()
        center.delegate = self;
    }
    
    public func requestPermissions() {

        let center = UNUserNotificationCenter.current()
        center.requestAuthorization(options:[.badge, .alert, .sound]) { (granted, error) in
        }
        
        DispatchQueue.main.async {
            UIApplication.shared.registerForRemoteNotifications()
        }
    }
    
    /**
     * Handle delegate willPresent action when the app is in the foreground.
     * This controls how a notification is presented when the app is running, such as
     * whether it should stay silent, display a badge, play a sound, or show an alert.
     */
    public func userNotificationCenter(_ center: UNUserNotificationCenter,
                                       willPresent notification: UNNotification,
                                       withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
        
        let request = notification.request;
        
        var plugin: CAPPlugin;
        var action: String;
        var data: JSObject;
        
        if (request.trigger?.isKind(of: UNPushNotificationTrigger.self))! {
            plugin = (self.bridge?.getOrLoadPlugin(pluginName: "FirebaseMessaging"))!
            action = "messageReceived";
            data = makeRemoteMessageJsObject(request);
            
        } else {
            plugin = (self.bridge?.getOrLoadPlugin(pluginName: "LocalNotifications"))!;
            action = "localNotificationReceived";
            data = makeNotificationRequestJSObject(request);
        }
        
        plugin.notifyListeners(action, data: data);

        if (action == "messageReceived") {
            completionHandler([.badge]);
        } else {
            completionHandler([.badge, .sound, .alert])
        }
    }
    
    /**
     * Handle didReceive action, called when a notification opens or activates
     * the app based on an action.
     */
    public func userNotificationCenter(_ center: UNUserNotificationCenter,
                                       didReceive response: UNNotificationResponse,
                                       withCompletionHandler completionHandler: @escaping () -> Void) {
        completionHandler();
        
        var data = JSObject();
        let request = response.notification.request;
        
        var plugin: CAPPlugin;
        var eventName: String;
        
        if (request.trigger?.isKind(of: UNPushNotificationTrigger.self))! {
            plugin = (self.bridge?.getOrLoadPlugin(pluginName: "FirebaseMessaging"))!
            data = makeRemoteMessageJsObject(request);
            eventName = "messageReceived";
        } else {
            plugin = (self.bridge?.getOrLoadPlugin(pluginName: "LocalNotifications"))!
            data = makeNotificationRequestJSObject(request);
            eventName = "localNotificationActionPerformed";
        }
        
        if (response.actionIdentifier == UNNotificationDefaultActionIdentifier) {
            data["actionId"] = "tap";
        } else if (response.actionIdentifier == UNNotificationDismissActionIdentifier) {
            data["actionId"] = "dismiss";
        }
        
        // If the type of action was for an input type, get the value
        if let inputType = response as? UNTextInputNotificationResponse {
            data["inputValue"] = inputType.userText;
        }
        
        plugin.notifyListeners(eventName, data: data, retainUntilConsumed: true);
    }
    
    /**
     * Turn a UNNotificationRequest into a JSObject to return back to the client.
     */
    func makeNotificationRequestJSObject(_ request: UNNotificationRequest) -> JSObject {
        
        return [
            "id": request.identifier,
            "extra": [:]
        ]
    }
    
    /**
     * Turn a UNNotificationRequest into a JSObject to return back to the client.
     */
    func makeRemoteMessageJsObject(_ request: UNNotificationRequest) -> JSObject {
        let content = request.content
        
        let extraData = try? JSONSerialization.jsonObject(with: JSONSerialization.data(withJSONObject: content.userInfo), options: []);
        
        return [
            "id": request.identifier,
            "title": content.title,
            "subtitle": content.subtitle,
            "body": content.body,
            "badge": content.badge ?? 1,
            "data": extraData as Any
        ]
    }
    
}
