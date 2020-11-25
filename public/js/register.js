const locationReg=document.getElementById('location');
const errorMessage=document.getElementById('error-message')
const weather={};
weather.temperature = {
    unit : "celsius"
}


const key = API_KEY;


if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
    
}

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude, longitude);
}

function showError(error){
    locationReg.value = `${error.message}`;
}

function getWeather(latitude, longitude){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
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