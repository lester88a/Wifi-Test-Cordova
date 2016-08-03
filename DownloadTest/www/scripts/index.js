// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    //button obejcts
    var uploadBtn = document.getElementById("uploadBtn");
    var downloadBtn = document.getElementById("downloadBtn");
    var wifiBtn = document.getElementById("wifiBtn");

    wifiBtn.addEventListener("click", goWifi);
    //the next page button has been clicked
    downloadBtn.addEventListener("click", goDownload);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        
        


    };
    function onBackKeyDown() {
        // Handle the back button
        window.history.back();
    }
    //go to next page
    function goWifi() {
        window.location.href = "second.html";
    }
    //go back to first page
    function goDownload() {
        window.location.href = "index.html";
    }

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();