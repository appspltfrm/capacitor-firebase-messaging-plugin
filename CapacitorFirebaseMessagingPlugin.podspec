
  Pod::Spec.new do |s|
    s.name = 'CapacitorFirebaseMessagingPlugin'
    s.version = '1.0.0'
    s.summary = 'Firebase Messaging plugin for Capacitor'
    s.license = 'MIT'
    s.homepage = 'https://github.com/co-mmons/capacitor-firebase-messaging-plugin'
    s.author = 'co.mmons'
    s.source = { :git => 'https://github.com/co-mmons/capacitor-firebase-messaging-plugin', :tag => s.version.to_s }
    s.source_files = 'ios/Plugin/Plugin/**/*.{swift,h,m,c,cc,mm,cpp}'
    s.ios.deployment_target  = '11.0'
    s.dependency 'Capacitor'
    s.dependency 'Firebase/Messaging'
    s.static_framework = true
  end
