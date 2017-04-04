Ti.UI.setBackgroundColor('#fff');

var w = Ti.UI.createWindow({
    title: "Ads Identifiers",
    layout: "vertical"
    
});

var tiads = require("ninja.ygor.tiads");


var lbl = Ti.UI.createLabel({
    text: "advertisingIdentifier",
    top: 40
});

w.add(lbl);

lbl.addEventListener("click", function() {
        var idfa = tiads.advertisingIdentifier;
        lbl.setText("advertisingIdentifier: " + idfa);
});

var lbl2 = Ti.UI.createLabel({
    text: "isAdvertisingTrackingEnabled"
});

w.add(lbl2);

lbl2.addEventListener("click", function() {
        var iidfa = tiads.isAdvertisingTrackingEnabled;
        lbl2.setText("isAdvertisingTrackingEnabled: " + iidfa);
})

var lbl3 = Ti.UI.createLabel({
    text: "identifierForVendor"
});

w.add(lbl3);

lbl3.addEventListener("click", function() {
        var idfv = tiads.identifierForVendor;
        lbl3.setText("identifierForVendor: " + idfv);
})

var lbl4 = Ti.UI.createLabel({
    text: "getAdvertisingIdInfo"
});

w.add(lbl4);

lbl4.addEventListener("click", function() {
        var idfv = tiads.getAdvertisingIdInfo();
        lbl4.setText("getAdvertisingIdInfo: " + idfv);
})

w.open();
