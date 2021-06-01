package co.mmons.capacitor.firebase.messaging;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

public class FirebaseMessagingServiceImpl extends FirebaseMessagingService {

    public FirebaseMessagingServiceImpl() {
    }

    @Override
    public void onNewToken(String newToken) {
        super.onNewToken(newToken);
        FirebaseMessagingPlugin.onNewToken(newToken);
    }

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);
        FirebaseMessagingPlugin.onMessageReceived(remoteMessage);
    }

}