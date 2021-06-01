# capacitor-firebase-messaging-plugin
Firebase Messaging plugin for Capacitor.

# Installation
For now (until Capacitor is in beta, and plugin is evolving) only installation from github. Every minor release will have a separate branch, so you may use #vX.X anchor in github link, e.g.:
```npm install git+https://github.com/co-mmons/capacitor-firebase-messaging-plugin.git#v0.1```
Until Capacitor and plugin are final, every breaking change (either in api or configuration) will bump minor version (0.1.x, 0.2.x), non breaking changes bumps patch version (0.1.0, 0.2.1). You can also use master branch for latest version:
```npm install git+https://github.com/co-mmons/capacitor-firebase-messaging-plugin.git```

# Configure Android app
It is very likely, that gradle will yell, about firebase versions mismatch, so edit android/build.gradle and add:
```
allprojects {
    configurations.all {
        resolutionStrategy {
            force 'com.google.firebase:firebase-core:16.0.6'
            force 'com.google.firebase:firebase-iid:17.0.4'
            force 'com.google.firebase:firebase-messaging:17.3.4'
        }
    }
}
```
Of course change firebase libs versions if needed.

You must also register plugin in MainActivity.java:
```
this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
  add(FirebaseMessagingPlugin.class);
}});
```
The last thing is to configure firebase service in AndroidManifest.xml:
```
<application>
        <service android:name="co.mmons.capacitor.firebase.messaging.FirebaseMessagingServiceImpl" android:stopWithTask="false">
            <intent-filter>
                <action android:name="com.google.firebase.MESSAGING_EVENT" />
            </intent-filter>
        </service>
</application>
```
I recommend to add ```android:launchMode = "singleInstance"``` in activity node, as it will prevent the app from restarting (but prefered behavior depends on app type).

# Configure iOS app
Edit ios/App/Podfile and add pod to App target:
```
target 'App' do
  # ...other pods
  pod 'CapacitorFirebaseMessagingPlugin', :path => '../../node_modules/@co.mmons/capacitor-firebase-messaging-plugin'  
end
```

# API
Plugin is accessed as any other Capacitor plugin -> ```Capacitor.Plugins.FirebaseMessaging```. In order to listen for new messages/notifications you need to add "messageReceived" listener on the plugin:
```
Capacitor.Plugins.FirebaseMessaging.addListener("messageReceived", (message) => console.log(message));
```
Plugin methods are documented in plugin definition file (src/plugin.ts).