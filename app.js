// const API_URL = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"
const API_KEY = "92ec2805af9962140156fd754f8dc4e3";
const REVERSE_GEO_URL = "https://api.openweathermap.org/geo/1.0/reverse";
const API_URL = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

let currentCity="";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon")


document.addEventListener("DOMContentLoaded", () => {

    const fetchCityName = async (latitude, longitude) => {
        try {
            const response = await fetch(
                `${REVERSE_GEO_URL}?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
            );

            const data = await response.json();
            console.log(data)
                currentCity=data[0].name;
                checkWeather(currentCity);

            }
         catch (error) {
            console.error("Error:", error);
        }
    };

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchCityName(latitude, longitude);
            },
            (error) => {
                console.error("Geolocation Error:", error);
            }
        );
    } else {
         alert("Geolocation is not supported by your browser.");
    }
});


async function checkWeather(city){
    const response = await fetch(API_URL + city + `&appid=${API_KEY}`);
  
    if (response.status==404){
        document.querySelector(".error").style.display="block";
        document.querySelector(".weather").style.display="none";
    }
    else{
        var data = await response.json();

        console.log(data);

        // console.log("The current time is"+isDay)
    
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML =Math.round(data.main.temp) + " °C";
        document.querySelector(".humidity").innerHTML =data.main.humidity + " %";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    
    
        const currentTime = data.dt; // Current time (UNIX timestamp)
        const sunrise = data.sys.sunrise; // Sunrise time (UNIX timestamp)
        const sunset = data.sys.sunset; // Sunset time (UNIX timestamp)

        // Determine if it's day or night
        const isDay = currentTime >= sunrise && currentTime <= sunset;

    
if(isDay==false){
    if(data.weather[0].main == "Clouds"){
        // weatherIcon.src = data.weather[0].icon;
        weatherIcon.src = "images/NightClouds.png";
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "images/NightMoon.png";
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/NightRain.png";
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/NightRain.png";
    }
    else if(data.weather[0].main == "Snow"){
        weatherIcon.src = "images/NightSnow.png";
    }
    else if(data.weather[0].main == "Thunderstorm"){
        weatherIcon.src = "images/NightStorm.png";
    }
    else{
        weatherIcon.src = "images/NightMoon.png";
    }
}
else{
    if(data.weather[0].main == "Clouds"){
        // weatherIcon.src = data.weather[0].icon;
        weatherIcon.src = "images/DayClouds.png";
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "images/DaySun.png";
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/DayRain.png";
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/DayRain.png";
    }
    else if(data.weather[0].main == "Snow"){
        weatherIcon.src = "images/DaySnow.png";
    }
    else if(data.weather[0].main == "Thunderstorm"){
        weatherIcon.src = "images/DayStorm.png";
    }
    else{
        weatherIcon.src = "images/DaySun.png";
    }
}
    
        document.querySelector(".weather").style.display="block";
        document.querySelector(".error").style.display="none";
    }

}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
    searchBox.value="";
})


