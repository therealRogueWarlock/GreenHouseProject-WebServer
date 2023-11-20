// Author: Sander Kirchert 304694


// Establishing connection with server
var socket = io.connect();
// client-side
socket.on("connect", (data) => {
    console.log(data)
    console.log(socket.id); 
});

// when server emits "returnGreenhouseStatus"
socket.on("returnGreenhouseStatus", (greenhouseState) => { 

    updateHtmlView(greenhouseState)

});


socket.emit("ListenToGreenhouseStatus");


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


function GetCurrentDateTime(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return dateTime;
}


function toggleHeater() {
    // Get the checkbox
    var checkBox = document.getElementById("heaterCheck");
    if (checkBox.checked == true){
        socket.emit("setHeater", 1);
    } else {
        socket.emit("setHeater", 0);
    }
}

function toggleWindow() {
    // Get the checkbox
    var checkBox = document.getElementById("windowCheck");
    if (checkBox.checked == true){
        socket.emit("setWindow", 1);
    } else {
        socket.emit("setWindow", 0);
    }
}

function lightSlider() {
    
    var lightInput = document.getElementById("ArtificialLightIntensity");
    socket.emit('setLightIntensity', lightInput.value);
}
