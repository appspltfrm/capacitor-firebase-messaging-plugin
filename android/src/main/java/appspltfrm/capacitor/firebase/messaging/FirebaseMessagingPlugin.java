package appspltfrm.capacitor.firebase.messaging;

import android.Manifest;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;

import androidx.annotation.NonNull;
import androidx.core.app.NotificationManagerCompat;

import com.getcapacitor.Bridge;
import com.getcapacitor.JSObject;
import com.getcapacitor.PermissionState;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginHandle;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.installations.FirebaseInstallations;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.RemoteMessage;

@CapacitorPlugin(
    name = "FirebaseMessaging",
    permissions = @Permission(strings = { Manifest.permission.POST_NOTIFICATIONS }, alias = FirebaseMessagingPlugin.PUSH_NOTIFICATIONS)
)
public class FirebaseMessagingPlugin extends Plugin {

    static final String PUSH_NOTIFICATIONS = "receive";

    private static Bridge staticBridge = null;
    private static RemoteMessage lastMessage = null;


    private static FirebaseMessagingPlugin getInstance() {

        if (staticBridge != null && staticBridge.getWebView() != null) {
            PluginHandle handle = staticBridge.getPlugin("FirebaseMessaging");
            if (handle == null) {
                return null;
            }

            return (FirebaseMessagingPlugin) handle.getInstance();
        }

        return null;
    }

    static void onMessageReceived(RemoteMessage remoteMessage) {
        FirebaseMessagingPlugin instance = FirebaseMessagingPlugin.getInstance();
        if (instance != null) {
            instance.notifyMessageReceived(remoteMessage);
        } else {
            lastMessage = remoteMessage;
        }
    }

    static void onNewToken(String newToken) {
        FirebaseMessagingPlugin instance = FirebaseMessagingPlugin.getInstance();
        if (instance != null) {
            JSObject eventData = new JSObject();
            eventData.put("token", newToken);
            instance.notifyListeners("tokenReceived", eventData, true);
        }
    }


    public void load() {

        staticBridge = this.bridge;
        if (lastMessage != null) {
            notifyMessageReceived(lastMessage);
            lastMessage = null;
        }

        // FirebaseMessaging.getInstance().setAutoInitEnabled(true);

        this.handleOnNewIntent(this.bridge.getActivity().getIntent());
    }

    protected void handleOnNewIntent(Intent intent) {
        super.handleOnNewIntent(intent);

        final Bundle input = intent.getExtras();

        if (input != null && input.containsKey("google.message_id")) {

            JSObject data = new JSObject();
            for (String key : input.keySet()) {
                Object value = input.get(key);
                data.put(key, value);
            }

            JSObject message = new JSObject();
            message.put("id", data.getString("google.message_id"));
            message.put("data", data);
            message.put("actionId", "tap");

            notifyListeners("messageReceived", message, true);
        }

    }

    private void notifyMessageReceived(RemoteMessage remoteMessage) {

        JSObject data = new JSObject();
        for (String key : remoteMessage.getData().keySet()) {
            Object value = remoteMessage.getData().get(key);
            data.put(key, value);
        }

        RemoteMessage.Notification remoteNotification = remoteMessage.getNotification();

        JSObject eventMessage = new JSObject();
        eventMessage.put("data", data);
        eventMessage.put("id", remoteMessage.getMessageId());
        eventMessage.put("title", remoteNotification.getTitle());
        //eventMessage.put("titleLocKey", remoteNotification.getTitleLocalizationKey());
        eventMessage.put("body", remoteNotification.getBody());

        notifyListeners("messageReceived", eventMessage, true);
    }

    @PluginMethod()
    public void getToken(final PluginCall call) {

        FirebaseMessaging.getInstance().getToken().addOnCompleteListener(new OnCompleteListener<String>() {
            @Override
            public void onComplete(@NonNull Task<String> task) {
                JSObject result = new JSObject();
                if (task.isSuccessful()) {
                    result.put("token", task.getResult());
                } else {
                    result.put("token", null);
                }
                call.resolve(result);
            }
        });
    }

    @PluginMethod()
    public void subscribeToTopic(final PluginCall call) {
        FirebaseMessaging.getInstance().subscribeToTopic(call.getString("topic"));
        call.resolve();
    }

    @PluginMethod()
    public void unsubscribeFromTopic(final PluginCall call) {
        FirebaseMessaging.getInstance().unsubscribeFromTopic(call.getString("topic"));
        call.resolve();
    }

    @PermissionCallback
    private void permissionsCallback(PluginCall call) {
        this.checkPermissions(call);
    }

    @PluginMethod()
    public void destroy(final PluginCall call) {

        FirebaseInstallations.getInstance().delete().addOnCompleteListener(new OnCompleteListener<Void>() {
            @Override
            public void onComplete(@NonNull Task<Void> task) {
                if (task.isSuccessful()) {
                    call.resolve();
                } else {
                    call.reject("Cant delete Firebase Instance ID", task.getException());
                }
            }
        });
    }

    @PluginMethod()
    public void openNotificationsPermissionSettings(PluginCall call) {

        Intent intent = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

        Uri uri = Uri.fromParts("package", this.getContext().getPackageName(), null);
        intent.setData(uri);

        this.getContext().startActivity(intent);

        call.resolve();
    }

    @PluginMethod()
    public void notificationsPermissionState(PluginCall call) {
        this.checkPermissions(call);
    }

    @PluginMethod
    public void checkPermissions(PluginCall call) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU) {
            JSObject permissionsResultJSON = new JSObject();
            permissionsResultJSON.put("receive", "granted");
            call.resolve(permissionsResultJSON);
        } else {
            super.checkPermissions(call);
        }
    }

    @PluginMethod
    public void requestPermissions(PluginCall call) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU || getPermissionState(PUSH_NOTIFICATIONS) == PermissionState.GRANTED) {
            JSObject permissionsResultJSON = new JSObject();
            permissionsResultJSON.put("receive", "granted");
            call.resolve(permissionsResultJSON);
        } else {
            requestPermissionForAlias(PUSH_NOTIFICATIONS, call, "permissionsCallback");
        }
    }

    @PluginMethod()
    public void removeAllDeliveredNotifications(PluginCall call) {
        call.resolve();
    }

}
