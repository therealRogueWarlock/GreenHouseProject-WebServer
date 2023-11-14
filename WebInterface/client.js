
var temperatureValue = 1;
var humidityValue = 2;



// Establishing connection with server
var socket = io.connect();
// client-side
socket.on("connect", (data) => {
    console.log(data)
    console.log(socket.id); 
});


socket.on("returnGreenhouseStatus", (data) => { 
    
    var greenhouseState = JSON.parse(data);

    console.log(greenhouseState);

    temperatureValue = greenhouseState.Temperature/10;
    humidityValue = greenhouseState.Humidity;

    var dateTime = GetCurrentDateTime();
    document.getElementById("tempValue").innerHTML = temperatureValue;
    document.getElementById("humidValue").innerHTML = humidityValue;
    document.getElementById("updateTime").innerHTML = dateTime;
    document.getElementById("LightIntensity").value = greenhouseState.lightIntensity;
    document.getElementById("windowCheck").checked = greenhouseState.window;
    document.getElementById("heaterCheck").checked = greenhouseState.heater;
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
