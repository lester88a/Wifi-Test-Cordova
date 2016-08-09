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
    
    //upload page
    var uploadSubmitBtn = document.getElementById("uploadSubmit");
    var uploadResetBtn = document.getElementById("uploadReset");
    var resultUploadArea = document.getElementById("resultUploadArea");
    var loadingUpload = document.getElementById("loadingUpload");
    var resultUpload = document.getElementById("resultUpload");

    //nav button has been clicked
    goDownloadNav.addEventListener("click", goDownload);
    goUploadNav.addEventListener("click", goUpload);
    goWifiNav.addEventListener("click", goWifi);
    goInfoNav.addEventListener("click", goInfo);

    

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        //
        uploadSubmitBtn.addEventListener("click", uploadFile);
        uploadResetBtn.addEventListener("click", reset);

    };
    /*-------------------------------------------*/
    function uploadFile()
    {
        //show result area
        resultUploadArea.className = '';
        //show loading icon
        loadingUpload.className = '';

        //upload function
        //var fileURL = "///storage/emulated/0/DCIM/myFile";

        var fileURL = "http://sapc031/upload/files/my.txt";
       
        resultUpload.innerHTML += "<br/>fileURL = " + fileURL;
        var uri = encodeURI("http://sapc031/upload/files/");
        resultUpload.innerHTML += "<br/>uri = " + uri;
        var options = new FileUploadOptions();

        options.fileKey = "file";
        options.fileName = "my.txt";
        options.mimeType = "text/plain";

        var headers = { 'headerParam': 'headerValue' };
        options.headers = headers;

        var ft = new FileTransfer();

        ft.upload(fileURL, uri, onSuccess, onError, options);

        function onSuccess(r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
            resultUpload.innerHTML += "<br/>Code = " + r.responseCode;
            resultUpload.innerHTML += "<br/>Response = " + r.response;
            resultUpload.innerHTML += "<br/>Sent = " + r.bytesSent;
        }

        function onError(error) {
            alert("An error has occurred: Code = " + error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
            resultUpload.innerHTML += "<br/>An error has occurred: Code = " + error.code;
            resultUpload.innerHTML += "<br/>upload error source = " + error.source;
            resultUpload.innerHTML += "<br/>upload error target = " + error.target;
        }



    }

    function reset()
    {
        //hide
        resultUploadArea.className = 'hidden';
        loadingUpload.className = 'hidden';
    }

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