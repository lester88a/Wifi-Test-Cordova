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
    //wifi page
    var wifiSubmitBtn = document.getElementById("wifiSubmit");
    var wifiResetBtn = document.getElementById("wifiReset");
    var resultWifi = document.getElementById("resultWifi");
    var workingStatus = document.getElementById("workingStatus");
    var testResultArea = document.getElementById("testResultArea");
    var deviceReadyArea = document.getElementById("deviceReadyArea");

    //process bar objects
    var progress = document.getElementById('myProgress');
    var bar = document.getElementById('myBar');
    //check network obejct
    var checkNet;
    //network status obejct
    var online;
    var offline;

    //nav button has been clicked
    goDownloadNav.addEventListener("click", goDownload);
    goUploadNav.addEventListener("click", goUpload);
    goWifiNav.addEventListener("click", goWifi);
    goInfoNav.addEventListener("click", goInfo);


    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);


        //the submit button has been clicked
        wifiSubmitBtn.addEventListener("click", submit);
        //when the reset button has been clicked
        wifiResetBtn.addEventListener("click", reset);


    };
    /*-------------------------------------------*/
    //check network
    function checkNetwork() {
        online = document.addEventListener("online", onOnline, false);
        offline = document.addEventListener("offline", onOffline, false);
    }

    //when wifi or network offline
    function onOffline() {
        resultWifi.innerHTML += '<span class="text-danger">Offline at: ' + Date() + '</span><br>';
        //set vibration when the network is offline
        vibration();
    }
    function onOnline() {
        resultWifi.innerHTML += '<span class="text-success">Online at: ' + Date() + '</span><br>';
    }
    function vibration() {
        var time = 1000;
        navigator.vibrate(time);
    }

    function networkInfo() {
        var networkState = navigator.connection.type;
        var states = {};

        states[Connection.UNKNOWN] = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI] = 'WiFi connection';
        states[Connection.CELL_2G] = 'Cell 2G connection';
        states[Connection.CELL_3G] = 'Cell 3G connection';
        states[Connection.CELL_4G] = 'Cell 4G connection';
        states[Connection.CELL] = 'Cell generic connection';
        states[Connection.NONE] = 'No network connection';

        return 'Connection type: ' + states[networkState];
    }
    /*-------------------------------------------*/
    //submit function
    function submit() {
        //disable the submit button
        wifiSubmitBtn.disabled = true;
        //show testResultArea
        testResultArea.className = '';
        //show progress bar
        deviceReadyArea.className = '';

        //display network status info
        resultWifi.innerHTML += networkInfo() + '<br>';
        resultWifi.innerHTML += 'Test Started at: ' + Date() + '<br>';

        //change the deviceready to start working
        workingStatus.innerHTML = 'Testing...';
        workingStatus.className = 'label label-success blink';

        //get the testing time value
        if (document.getElementById('10mins').checked) {
            //do
            processBar(0.1);
        }
        else if (document.getElementById('30mins').checked) {
            //do
            processBar(3);
        }
        else if (document.getElementById('60mins').checked) {
            //do
            processBar(60);
        }
    }
    /*-------------------------------------------*/
    //reset function
    function reset() {
        //enable the sumbit button
        wifiSubmitBtn.disabled = false;

        //reset the testing time
        document.getElementById('10mins').checked = true;
        document.getElementById('30mins').checked = false;
        document.getElementById('60mins').checked = false;

        //reset the process bar
        var elem = document.getElementById("myBar");
        elem.style.width = 0;

        //clear the result log
        resultWifi.innerHTML = '';

        //disable the animation
        workingStatus.className = 'label label-success';
        //reset status to device ready
        workingStatus.innerHTML = 'Device is ready';

        //hide testResultArea
        testResultArea.className = 'hidden';
        //hide progress bar
        deviceReadyArea.className = 'hidden';
    }

    /*-------------------------------------------*/
    //process bar
    function processBar(minute) {
        //set reset button click event
        wifiResetBtn.addEventListener("click", resetProcess);
        var width = 0;
        var id = setInterval(frame, minute * 60 * 10);
        function frame() {
            if (width == 100) {
                //stop timer
                clearInterval(id);
                //disable the animation
                workingStatus.className = 'label label-success';
                //reset status to device ready
                workingStatus.innerHTML = 'Done';
                //enable submit button
                wifiSubmitBtn.disabled = false;
                //assign the test status
                resultWifi.innerHTML += 'Test finished at: ' + Date() + '<br>';
                //remove event listener for online or offline status
                online = document.removeEventListener("online", onOnline, false);
                offline = document.removeEventListener("offline", onOffline, false);
            }
            else {
                width++;
                bar.style.width = width + '%';
            }
        }
        //start the animation
        //parentElement.className = 'blink';
        function resetProcess() {
            clearInterval(id);
            bar.style.width = 0 + '%';
            //disable the animation
            workingStatus.className = 'label label-success';
        }
        //check the network if is offline
        checkNetwork();
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