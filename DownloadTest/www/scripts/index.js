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
    //download page
    var downloadFileBtn = document.getElementById("downloadFileBtn");
    var downloadResetBtn = document.getElementById("downloadResetBtn");
    var resultDownload = document.getElementById("resultDownload");
    var loadingDownload = document.getElementById("loadingDownload");
    var testResultArea = document.getElementById("testResultArea");

    //nav button has been clicked
    goDownloadNav.addEventListener("click", goDownload);
    goUploadNav.addEventListener("click", goUpload);
    goWifiNav.addEventListener("click", goWifi);
    goInfoNav.addEventListener("click", goInfo);


    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        //var parentElement = document.getElementById('deviceready');
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');
        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        //the download file button has been clicked
        downloadFileBtn.addEventListener("click", downloadFile);
        //the downloadResetBtn has been clicked
        downloadResetBtn.addEventListener("click", downloadReset);

        
        
    };

    /*-------------------------------------------*/
    //download function
    function downloadFile() {
        //show loading status
        loadingDownload.className = 'row';
        testResultArea.className = '';

        var start = new Date();
        var size = 0;
        if (document.getElementById('50mb').checked) {
            size += 50;
        }
        else if (document.getElementById('100mb').checked) {
            size += 100;
        }
        else if (document.getElementById('500mb').checked) {
            size += 500;
        }
        else if (document.getElementById('1000mb').checked) {
            size += 1000;
        }
        //set the downlaod file source
        var uri = encodeURI("http://10.1.200.111/" + size + "M.img");
        //set the download file path
        var fileURL = "///storage/emulated/0/DCIM/" + size + "M.img";
        

        //set starting download info
        resultDownload.innerHTML = "";
        resultDownload.className = 'panel-body blink';
        resultDownload.innerHTML += "Start downloading file..." + '<br>';
        resultDownload.innerHTML += "File name: " + size + 'M.img<br>';

        //call file transfer function
        var fileTransfer = new FileTransfer();

        fileTransfer.download(
           uri, fileURL, function (entry) {
              
               //set downloaded info
               resultDownload.innerHTML += "Download complete!" + '<br>';
               resultDownload.innerHTML += "File path: " + entry.toURL() + '<br>';

               var end = new Date();

               var totalDownloadTime = Math.floor((end - start) / 1000);

               var downloadAverage = Math.round((size / totalDownloadTime) * 100) / 100;

               resultDownload.innerHTML += "Total download time: " + totalDownloadTime + ' seconds<br>';

               resultDownload.innerHTML += "Download average: " + downloadAverage + 'MB/s<br>';

               //disable the animation
               resultDownload.className = 'panel-body';
               //hide loading status
               loadingDownload.className = 'hidden';
           },
           function (error) {
               //set downloading error info
               resultDownload.innerHTML += "Download error source: " + error.source + '<br>';
               resultDownload.innerHTML += "Download error target: " + error.target + '<br>';
               resultDownload.innerHTML += "Download error code: " + +error.code + '<br>';

               //disable the animation
               resultDownload.className = 'panel-body';
               //hide loading status
               loadingDownload.className = 'hidden';
           },
           false, {
               headers: {
                   "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
               }
           }
        );

    }
    //reset function
    function downloadReset() {
        //clear results
        resultDownload.className = 'panel-body';
        resultDownload.innerHTML = "";
        
        //hide loading status
        loadingDownload.className = 'hidden';
        testResultArea.className = 'hidden';
    }
    /*-------------------------------------------*/


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
    

    
    /*-------------------------------------------*/
    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();