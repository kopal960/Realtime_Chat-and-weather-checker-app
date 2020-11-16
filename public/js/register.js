const locationReg=document.getElementById('location');
const errorMessage=document.getElementById('error-message')
const weather={};
weather.temperature = {
    unit : "celsius"
}

const KELVIN = 273;

const key = "4d7fe63988bfe069ab4b57f876a945c7";


if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
    
}

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log(latitude+" "+longitude);
    getWeather(latitude, longitude);
}

function showError(error){
    locationReg.value = `${error.message}`;
}

function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.city = data.name;
            weather.country = data.sys.country;
            const location=weather.city + " , " +weather.country;
            locationReg.value=location;     
        })
}