# TiAds Module

### Compatibility

Tested for Compatibility with:
* Ti SDK 8.1.1.GA

Althought we've managed to build the module to work on Ti SDK 5.x, it causes so many conflicts with other jars in the Android version that made us simply give up making it work. It works fine for iOS on Ti 5 and you're welcome to download the source and build it for Ti 5. (See issues#1)

### Abstract

This module maps native Advertising and Vendor Ids available for iOS and Android and make them accessible inside the Titanium application.

Implementation details for each platform are described below:

### iOS

**DEPRECATED!!!**

For iOS, the current Titanium SDK GA (8.1.1.GA) already provides access to the Ads Identifiers therefore this module is not required anymore in order to access those parameters.

You can use the following accessors on the latest versions of Titanium:

- Ti.Platform.identifierForVendor
- Ti.Platform.identifierForAdvertising
-Ti.Platform.isAdvertisingTrackingEnabled

Please refer to official Ti Documentation for more info.

### Android

On Android we mapped the method getAdvertisingIdInfo from the AdvertisingIdClient API available as part of the Google Play Services.
Be aware that this requires the GooglePlayServices to be installed on the user's device in order to work properly and this also requires the GooglePlayServices base jar and the ads jar (both included on the android/lib). I have tried my best to use a version of those JARs that doesn't conflict with other modules like ti.map but JAR hell might happen.

> The module is still needed on Android as of Ti 8.1.1.GA since I couldn't find a clean way to use AsyncTask with Hyperloop since we need to access the AdvertisingIdClient out of the main thread. Thus this module is still required for Android

#### Deprecations

I have deprecated the *getAndroidID* method since the same info can be fetched using Ti.Platform.id on current Titanium versions.

#### Android Methods:

*getAdvertisingIdInfo* (String)

> This method returns Android AdvertisingId from AdvertisingIdClient.getAdvertisingIdInfo native method. This follows the [AdvertisingIdClient API](https://developers.google.com/android/reference/com/google/android/gms/ads/identifier/AdvertisingIdClient)
> May return **processing** if the AsyncTask haven't returned with the advertising id yet.

*isLimitAdTrackingEnabled* (Boolean)

> Returns a boolean indicating if the user has allowed to be tracked using Advertising IDs on Android. This is similar to iOS  isAdvertisingTrackingEnabled and should be respected according to Google Play Privacy Guidelines.

*getAndroidID* (String)

*DEPRECATED* - Use Ti.Platform.id directly.


> Returns the **ANDROID_ID** of the user device from Android SDK Settings.Secure.
> A 64-bit number (as a hex string) that is randomly generated when the user first sets up the device and should remain constant for the lifetime of the user's device.
> This can be used as an equivalent to iOS identifierForVendor on Android although it is not reseted on every installation.
> ANDROID_ID seems a good choice for a unique device identifier.
> There are downsides: First, it is not 100% reliable on releases of Android prior to 2.2 (“Froyo”). Also, there has been at least one widely-observed bug in a popular handset from a major manufacturer, where every instance has the same ANDROID_ID. According to https://android-developers.googleblog.com/2011/03/identifying-app-installations.html

#### Android Notes:

> Google Play Services JAR Hell should not happen anymore since Appcelerator greatly improved this area with the introduction of ti.playservices.

If you get a google-play-services-base.jar conflict with other modules like ti.map, try removing the jar from one of the modules in order to solve it.
Due to the nature of Android AdvertisingIdClient implementation, the methods for fetching the ID cannot be called from the main thread and should be called on a separate AsyncTask. This sometimes causes a delay for reading the parameter as it must be called from a Google Play Services API (and probably makes some network connections behind). That said, the method will return the string: **processing** if the AsyncTask haven't returned yet.

#### Android References:

* https://developers.google.com/android/reference/com/google/android/gms/ads/identifier/AdvertisingIdClient
* http://stackoverflow.com/questions/25846108/how-to-get-advertising-id-in-android
* http://stackoverflow.com/questions/27961634/advertisingidclient-getadvertisingidinfo-blocked-by-main-thread

### Usage

Follow the example on example/app.js. There you can find all methods used on the sample app.

### Building the Module

For **Android**:

cd on the android directory and run:

> appc run -p android --build-only

the module zip will be on the dist folder.

PR's are more than welcome.

Issues can be reported on this repository Issues.
