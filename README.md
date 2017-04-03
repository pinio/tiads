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

For iOS we have mapped 3 main methods, on that verifies if the AdvertisingID is allowed to be read by the user and the other two for returning both the advertisingId itself and the other to return the vendorId.

#### iOS Methods:

*isAdvertisingTrackingEnabled* (Boolean)

> Returns a boolean indicating if the user has allowed the advertisingId to be tracked. According to Apple Guidelines this must always be respected and verified before calling the advertisingIdentifier method for retrieving it.

*advertisingIdentifier* (String)

> Returns the advertisingIdentifier

#### iOS Notes:

Generally select the last two options on publish and stuff.

#### iOS References:

APPLE DOCS CONTAINING METHODS IMPLEMENTATION AND GUIDELINES FOR ADVERTISING IDENTIFIER
