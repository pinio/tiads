# TiAds Module

### Compatibility

Tested for Compatibility with:
* Ti SDK 6.0.3.GA

Althought we've managed to build the module to work on Ti SDK 5.x, it causes so many conflicts with other jars in the Android version that made us simply give up making it work. It works fine for iOS on Ti 5 and you're welcome to download the source and build it for Ti 5. (See issues#1)

### Abstract

This module maps native Advertising and Vendor Ids available for iOS and Android and make them accessible inside the Titanium application.

Implementation details for each platform are described below:

### iOS

For iOS we have mapped 3 main methods, one that verifies if the AdvertisingID is allowed to be read by your app and the other two for returning both the advertisingId itself and the vendorId.

#### iOS Attributes:

*isAdvertisingTrackingEnabled* (Boolean)

> Returns a boolean indicating if the user has allowed the advertisingId to be tracked. According to Apple Guidelines this must always be respected and verified before calling the advertisingIdentifier method for retrieving it.
> Always calls this before calling the **advertisingIdentifier** method.

*advertisingIdentifier* (String)

> Returns Apple's advertisingIdentifier according to the official iOS Docs: [advertisingIdentifier](https://developer.apple.com/reference/adsupport/asidentifiermanager/1614151-advertisingidentifier?language=objc)
>  In iOS 10.0 and later, the value of advertising​Identifier is all zeroes when the user has limited ad tracking.

*identifierForVendor* (String)

>  The value of this property is the same for apps that come from the same vendor running on the same device. A different value is returned for apps on the same device that come from different vendors, and for apps on different devices regardless of vendor.
>  Normally, the vendor is determined by data provided by the App Store. If the app was not installed from the app store (such as enterprise apps and apps still in development), then a vendor identifier is calculated based on the app’s bundle ID. The bundle ID is assumed to be in reverse-DNS format.
>  On iOS 6, the first two components of the bundle ID are used to generate the vendor ID. if the bundle ID only has a single component, then the entire bundle ID is used.
>  On IOS 7, all components of the bundle except for the last component are used to generate the vendor ID. If the bundle ID only has a single component, then the entire bundle ID is used.
>
> When implementing a system for serving advertisements, use the value in the advertisingIdentifier property of the ASIdentifierManager class instead of this property. Use of that property requires you to follow the guidelines set forth in the class discussion for the proper use of that identifier. For more information, see ASIdentifierManager.
>
> https://developer.apple.com/reference/uikit/uidevice/1620059-identifierforvendor
>

#### iOS References:

* https://developer.apple.com/reference/adsupport/asidentifiermanager
* https://developer.apple.com/reference/adsupport/asidentifiermanager/1614151-advertisingidentifier
* https://developer.apple.com/reference/uikit/uidevice/1620059-identifierforvendor


### Android

On Android we mapped the method getAdvertisingIdInfo from the AdvertisingIdClient API available as part of the Google Play Services.
Be aware that this requires the GooglePlayServices to be installed on the user's device in order to work properly and this also requires the GooglePlayServices base jar and the ads jar (both included on the android/lib). I have tried my best to use a version of those JARs that doesn't conflict with other modules like ti.map but JAR hell might happen.

#### Android Methods:

*getAdvertisingIdInfo* (String)

> This method returns Android AdvertisingId from AdvertisingIdClient.getAdvertisingIdInfo native method. This follows the [AdvertisingIdClient API](https://developers.google.com/android/reference/com/google/android/gms/ads/identifier/AdvertisingIdClient)
> May return **processing** if the AsyncTask haven't returned with the advertising id yet.

*isLimitAdTrackingEnabled* (Boolean)

> Returns a boolean indicating if the user has allowed to be tracked using Advertising IDs on Android. This is similar to iOS  isAdvertisingTrackingEnabled and should be respected according to Google Play Privacy Guidelines.

*getAndroidID* (String)

> Returns the **ANDROID_ID** of the user device from Android SDK Settings.Secure.
> A 64-bit number (as a hex string) that is randomly generated when the user first sets up the device and should remain constant for the lifetime of the user's device.
> This can be used as an equivalent to iOS identifierForVendor on Android although it is not reseted on every installation.
> ANDROID_ID seems a good choice for a unique device identifier.
> There are downsides: First, it is not 100% reliable on releases of Android prior to 2.2 (“Froyo”). Also, there has been at least one widely-observed bug in a popular handset from a major manufacturer, where every instance has the same ANDROID_ID. According to https://android-developers.googleblog.com/2011/03/identifying-app-installations.html

#### Android Notes:

If you get a google-play-services-base.jar conflict with other modules like ti.map, try removing the jar from one of the modules in order to solve it.
Due to the nature of Android AdvertisingIdClient implementation, the methods for fetching the ID cannot be called from the main thread and should be called on a separate AsyncTask. This sometimes causes a delay for reading the parameter as it must be called from a Google Play Services API (and probably makes some network connections behind). That said, the method will return the string: **processing** if the AsyncTask haven't returned yet.

#### Android References:

* https://developers.google.com/android/reference/com/google/android/gms/ads/identifier/AdvertisingIdClient
* http://stackoverflow.com/questions/25846108/how-to-get-advertising-id-in-android
* http://stackoverflow.com/questions/27961634/advertisingidclient-getadvertisingidinfo-blocked-by-main-thread

### Usage

Follow the example on example/app.js. There you can find all methods used on the sample app.

### Building the Module

For **iOS**:

cd on the ios directory and run:

> ti build -p ios --build-only

the module zip will be generated at the root directory.

For **Android**:

cd on the android directory and run:

> ant

the module zip will be on the dist folder.

PR's are more than welcome.

Issues can be reported on this repository Issues.