# TiAds Module

## ATTENTION: This is the first version of the alpha module. We need to make it better before releasing it Open Source.

### Compatibility

Tested for Compatibility with:
* Ti SDK 5.5.1.GA
* Ti SDK 6.0.3.GA

### Abstract

This module maps native Advertising and Vendor Ids available for iOS and Android and make them accessible inside the Titanium application.

Implementation details for each platform are described below:

### iOS

For iOS we have mapped 3 main methods, one that verifies if the AdvertisingID is allowed to be read by your app and the other two for returning both the advertisingId itself and the vendorId.

#### iOS Methods:

*isAdvertisingTrackingEnabled* (Boolean)

> Returns a boolean indicating if the user has allowed the advertisingId to be tracked. According to Apple Guidelines this must always be respected and verified before calling the advertisingIdentifier method for retrieving it.
> Always calls this before calling the *advertisingIdentifier* method.

*advertisingIdentifier* (String)

> Returns Apple's advertisingIdentifier according to the official iOS Docs: (advertisingIdentifier)[https://developer.apple.com/reference/adsupport/asidentifiermanager/1614151-advertisingidentifier?language=objc]
>  In iOS 10.0 and later, the value of advertising​Identifier is all zeroes when the user has limited ad tracking.

*identifierForVendor* (String)

>  The value of this property is the same for apps that come from the same vendor running on the same device. A different value is returned for apps on the same device that come from different vendors, and for apps on different devices regardless of vendor.
>  Normally, the vendor is determined by data provided by the App Store. If the app was not installed from the app store (such as enterprise apps and apps still in development), then a vendor identifier is calculated based on the app’s bundle ID. The bundle ID is assumed to be in reverse-DNS format.
>  On iOS 6, the first two components of the bundle ID are used to generate the vendor ID. if the bundle ID only has a single component, then the entire bundle ID is used.
>  On IOS 7, all components of the bundle except for the last component are used to generate the vendor ID. If the bundle ID only has a single component, then the entire bundle ID is used.
>
> When implementing a system for serving advertisements, use the value in the advertising​Identifier property of the ASIdentifier​Manager class instead of this property. Use of that property requires you to follow the guidelines set forth in the class discussion for the proper use of that identifier. For more information, see ASIdentifier​Manager.
>
> https://developer.apple.com/reference/uikit/uidevice/1620059-identifierforvendor
>



#### iOS References:

* https://developer.apple.com/reference/adsupport/asidentifiermanager
* https://developer.apple.com/reference/adsupport/asidentifiermanager/1614151-advertisingidentifier
* https://developer.apple.com/reference/uikit/uidevice/1620059-identifierforvendor


### Android

#### Android Methods:

*getAdvertisingIdInfo* (String)

> This method returns Android AdvertisingId from AdvertisingIdClient.getAdvertisingIdInfo native method. This follows the (AdvertisingIdClient API)[https://developers.google.com/android/reference/com/google/android/gms/ads/identifier/AdvertisingIdClient]
> Due to the nature of Android AdvertisingIdClient implementation, the methods for fetching the ID cannot be called from the main thread and should be called on a separate AsyncTask. This sometimes causes a delay for reading the parameter as it must be called from a Google Play Services API (and probably makes some network connections behind). That said, the method will return the string: *processing* if the AsyncTask haven't returned yet.

#### Android References:

* https://developers.google.com/android/reference/com/google/android/gms/ads/identifier/AdvertisingIdClient
* http://stackoverflow.com/questions/25846108/how-to-get-advertising-id-in-android
* http://stackoverflow.com/questions/27961634/advertisingidclient-getadvertisingidinfo-blocked-by-main-thread

### Todo:

* iOS - Add option for synchronizing the identifierForVendor to the user keychain so it never resets on app uninstalls
* Android - Emit an event when the parameter is ready to be read (after AsyncTask has returned on onPostExecute)

