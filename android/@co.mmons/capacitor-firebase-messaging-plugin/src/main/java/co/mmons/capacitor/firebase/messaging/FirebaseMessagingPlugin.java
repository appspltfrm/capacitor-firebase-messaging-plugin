package co.mmons.capacitor.firebase.messaging;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.provider.Settings;

import androidx.annotation.NonNull;
import androidx.core.app.NotificationManagerCompat;

import com.getcapacitor.Bridge;
import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginHandle;
import com.getcapacitor.PluginMethod;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.RemoteMessage;

import java.io.IOException;

@NativePlugin(name = "FirebaseMessaging")
public class FirebaseMessagingPlugin extends Plugin {

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

        FirebaseMessaging.getInstance().setAutoInitEnabled(true);

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
    public void subscribeToTopic(final PluginCall call) {
        final String topic = call.getString("topic");
        FirebaseMessaging.getInstance().subscribeToTopic(topic)
            .addOnCompleteListener(new OnCompleteListener<Void>() {
                @Override
                public void onComplete(@NonNull Task<Void> task) {
//                    if (task.isSuccessful()) {
//                        call.resolve();
//                    } else {
//                        call.reject("Failed subscribing to topic " + topic, task.getException());
//                    }
                }
            });

        call.resolve();
    }

    @PluginMethod()
    public void unsubscribeFromTopic(final PluginCall call) {
        final String topic = call.getString("topic");
        FirebaseMessaging.getInstance().unsubscribeFromTopic(topic)
            .addOnCompleteListener(new OnCompleteListener<Void>() {
                @Override
                public void onComplete(@NonNull Task<Void> task) {
//                    if (task.isSuccessful()) {
//                        call.resolve();
//                    } else {
//                        call.reject("Failed unsubscribing from topic " + topic, task.getException());
//                    }
                }
            });

        call.resolve();
    }

    @PluginMethod()
    public void destroy(final PluginCall call) {
        try {
            FirebaseInstanceId.getInstance().deleteInstanceId();
            call.resolve();
        } catch (IOException e) {
            call.reject("Failed destroing firebase instance", e);
        }
    }

    @PluginMethod()
    public void openNotificationsPermissionSettings(PluginCall call) {

        Intent intent = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

        Uri uri = Uri.fromParts("package", this.getContext().getPackageName(), null);
        intent.setData(uri);

        this.getContext().startActivity(intent);

        call.success();
    }

    @PluginMethod()
    public void notificationsPermissionState(PluginCall call) {

        JSObject result = new JSObject();

        if (NotificationManagerCompat.from(this.getContext()).areNotificationsEnabled()) {
            result.put("state", "granted");
        } else {
            result.put("state", "denied");
        }

        call.resolve(result);
    }

    @PluginMethod()
    public void removeAllDeliveredNotifications(PluginCall call) {
        call.success();
    }

}
