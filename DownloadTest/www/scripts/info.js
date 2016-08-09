// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    //button obejcts
    var goDownloadNav = document.getElementById("goDownload");
    var goUploadNav = document.getElementById("goUpload");
    var goWifiNav = document.getElementById("goWifi");
    var goInfoNav = document.getElementById("goInfo");
    
    //info page
    var inAppBrowserBtn = document.getElementById("inAppBrowserBtn");

    //nav button has been clicked
    goDownloadNav.addEventListener("click", goDownload);
    goUploadNav.addEventListener("click", goUpload);
    goWifiNav.addEventListener("click", goWifi);
    goInfoNav.addEventListener("click", goInfo);

    

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        

        //the inAppBrowserBtn has been clicked
        inAppBrowserBtn.addEventListener("click", openBrowser);
        
        //StatusBar
        //StatusBar.hide();
        StatusBar.backgroundColorByHexString("#59D89C");
    };

   

    /*-------------------------------------------*/
    //go to download page
    function goDownload() {
        window.location.href = "index.html";
    }
    //go to upload page
    function goUpload() {
        window.location.href = "uploadPage.html";
    }
    //go to wifi page
    function goWifi() {
        window.location.href = "wifiPage.html";
    }
    //go to info page
    function goInfo() {
        window.location.href = "infoPage.html";
    }
    /*-------------------------------------------*/
    

    function openBrowser() {
        var url = 'http://10.1.200.111';
        var target = '_self';
        var options = "location=no,hidden=no";
        
        var ref = cordova.InAppBrowser.open(url, target, options);

        ref.addEventListener('loadstart', loadstartCallback);
        ref.addEventListener('loadstop', loadstopCallback);
        ref.addEventListener('loadloaderror', loaderrorCallback);
        ref.addEventListener('exit', exitCallback);

        function loadstartCallback(event) {
            console.log('Loading started: ' + event.url)
        }

        function loadstopCallback(event) {
            console.log('Loading finished: ' + event.url)
        }

        function loaderrorCallback(error) {
            console.log('Loading error: ' + error.message)
        }

        function exitCallback() {
            console.log('Browser is closed...')
        }
    }

    /*-------------------------------------------*/
    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();