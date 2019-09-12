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
}


w.open();
