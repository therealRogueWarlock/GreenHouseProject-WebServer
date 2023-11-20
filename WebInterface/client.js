// Author: Sander Kirchert 304694
// Filename: client.js


// Establishing connection with server
var socket = io.connect();
// client-side
socket.on("connect", (data) => {
    console.log(data)
    console.log(socket.id); 

    // Ask server to add client to Greenhouse status listeners
    socket.emit("ListenToGreenhouseStatus");

    // when server emits "returnGreenhouseStatus"
    socket.on("returnGreenhouseStatus", (greenhouseState) => { 

        updateHtmlView(greenhouseState)

    });

});




// Debug methode, recive back values send to the server
socket.on("returnEvent", (data) => { 
    console.log(data);
});

/**
 * Updates the html document with given greenhouse state
 * @param {*} greenhouseState 
 */
function updateHtmlView(greenhouseState){

    var dateTime = GetCurrentDateTime();
    document.getElementById("updateTime").innerHTML = dateTime;
    document.getElementById("tempValue").innerHTML = greenhouseState.Temperature/10;
    document.getElementById("humidValue").innerHTML = greenhouseState.Humidity;
    document.getElementById("ArtificialLightIntensity").value = greenhouseState.LightIntensity;
    document.getElementById("LightLevelValue").innerHTML = greenhouseState.NaturalLight;
    document.getElementById("windowCheck").checked = greenhouseState.WindowStatus;
    document.getElementById("heaterCheck").checked = greenhouseState.HeaterStatus;

}
/**
 * Utiliy methode to get current date and time
 * @returns 
 */

function GetCurrentDateTime(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return dateTime;
}

/**
 * UI event handler for Heater toggle.
 * Emits socket event setHeater when toggled.
 */
function toggleHeater() {
    // Get the checkbox
    var checkBox = document.getElementById("heaterCheck");
    if (checkBox.checked == true){
        socket.emit("setHeater", 1);
    } else {
        socket.emit("setHeater", 0);
    }
}
/**
 * UI event handler for Window toggle.
 * Emits socket event setWindow when toggled.
 */
function toggleWindow() {
    // Get the checkbox
    var checkBox = document.getElementById("windowCheck");
    if (checkBox.checked == true){
        socket.emit("setWindow", 1);
    } else {
        socket.emit("setWindow", 0);
    }
}
/**
 * UI event handler for Light slider.
 * Emits socket event setLightIntensity on value change.
 */
function lightSlider() {
    var lightInput = document.getElementById("ArtificialLightIntensity");
    socket.emit('setLightIntensity', lightInput.value);
}
