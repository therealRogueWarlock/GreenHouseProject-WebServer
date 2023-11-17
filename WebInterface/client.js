
var temperatureValue = 1;
var humidityValue = 2;



// Establishing connection with server
var socket = io.connect();
// client-side
socket.on("connect", (data) => {
    console.log(data)
    console.log(socket.id); 
});


socket.on("returnGreenhouseStatus", (greenhouseState) => { 

    var dateTime = GetCurrentDateTime();
    document.getElementById("updateTime").innerHTML = dateTime;
    document.getElementById("tempValue").innerHTML = greenhouseState.Temperature/10;
    document.getElementById("humidValue").innerHTML = greenhouseState.Humidity;
    document.getElementById("ArtificialLightIntensity").value = greenhouseState.LightIntensity;
    document.getElementById("LightLevelValue").value = greenhouseState.NaturalLight;
    document.getElementById("windowCheck").checked = greenhouseState.WindowStatus;
    document.getElementById("heaterCheck").checked = greenhouseState.HeaterStatus;
    
});

socket.on("returnEvent", (data) => { 
    console.log(data);
});


function GetCurrentDateTime(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return dateTime;
}

socket.emit("ListenToGreenhouseStatus");

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
    
    var lightInput = document.getElementById("LightIntensity");
    socket.emit('setLightIntensity', lightInput.value);
}
