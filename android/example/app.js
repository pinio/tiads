Ti.UI.setBackgroundColor('#fff');

var tiads = require("ninja.ygor.tiads");

var w = Ti.UI.createWindow({
    title: "Identifiers",
    layout: "vertical"
    
});

if (Ti.Platform.osname == "android") {
    var lblGAI = Ti.UI.createLabel({
        text: "getAdvertisingIdentifier"
    });

    w.add(lblGAI);

    lblGAI.addEventListener("click", function() {
        var idfv = tiads.getAdvertisingIdInfo();
        lblGAI.setText("getAdvertisingIdentifier: " + idfv);
    })
    
    var lblLAE = Ti.UI.createLabel({
        text: "isLimitAdTrackingEnabled"
    });

    w.add(lblLAE);

    lblLAE.addEventListener("click", function() {
        var isLimitAdTrackingEnabled = tiads.isLimitAdTrackingEnabled();
        lblLAE.setText("isLimitAdTrackingEnabled: " + isLimitAdTrackingEnabled);
    })

    var lblAID = Ti.UI.createLabel({
        text: "getAndroidID"
    });

    w.add(lblAID);

    lblAID.addEventListener("click", function() {
        var androidid = tiads.getAndroidID();
        lblAID.setText("getAndroidID: " + androidid);
    })

    
    
} else {
    var lblADID = Ti.UI.createLabel({
        text: "advertisingIdentifier",
        top: 40
    });

    w.add(lblADID);

    lblADID.addEventListener("click", function() {
        var idfa = tiads.advertisingIdentifier;
        lblADID.setText("advertisingIdentifier: " + idfa);
    });

    var lblATE = Ti.UI.createLabel({
        text: "isAdvertisingTrackingEnabled"
    });

    w.add(lblATE);

    lblATE.addEventListener("click", function() {
        var iidfa = tiads.isAdvertisingTrackingEnabled;
        lblATE.setText("isAdvertisingTrackingEnabled: " + iidfa);
    })

    var lblIFV = Ti.UI.createLabel({
        text: "identifierForVendor"
    });

    w.add(lblIFV);

    lblIFV.addEventListener("click", function() {
        var idfv = tiads.identifierForVendor;
        lblIFV.setText("identifierForVendor: " + idfv);
    })
    
}


w.open();
