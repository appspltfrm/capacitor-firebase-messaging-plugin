#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(FirebaseMessagingPlugin, "FirebaseMessaging",
    CAP_PLUGIN_METHOD(openNotificationsPermissionSettings, CAPPluginReturnNone);
    CAP_PLUGIN_METHOD(notificationsPermissionState, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(subscribeToTopic, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(unsubscribeFromTopic, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(destroy, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(removeAllDeliveredNotifications, CAPPluginReturnPromise);
)
