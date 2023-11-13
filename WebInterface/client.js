
var temperatureValue = 1;
var humidityValue = 2;


// Establishing connection with server
var socket = io.connect();
// client-side
socket.on("connect", (data) => {
    console.log(data)
    console.log(socket.id); 
});


socket.on("returnTemperatureAndHumidity", (data) => { 
    
    var jsonObject = JSON.parse(data);

    temperatureValue = jsonObject.Temperature/10;
    humidityValue = jsonObject.Humidity;

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    document.getElementById("tempValue").innerHTML = temperatureValue;
    document.getElementById("tempTime").innerHTML = dateTime;
    document.getElementById("humidValue").innerHTML = humidityValue;
    document.getElementById("humidTime").innerHTML = dateTime;
});


setInterval(()=>{
    socket.emit("getTemperatureAndHumidity")
}, 1000);

