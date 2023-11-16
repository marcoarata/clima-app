const apiKey = "ff9b41622f994b1287a73535210809";
const apiUrl = "https://api.weatherapi.com/v1/forecast.json?";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city){
    const response = await fetch(apiUrl + `key=${apiKey}` + `&q=${city}`);

    if(response.status == 400){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();
   
        document.querySelector(".city").innerHTML = data.location.name;
        document.querySelector(".temp").innerHTML = Math.round(data.current.temp_c) + "°C";
        document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
        document.querySelector(".wind").innerHTML = data.current.wind_kph + " km/hr";
    
        if(data.current.condition.text == "Partly cloudy"){
            weatherIcon.src = "./assets/img/clouds.png";
        }
        else if(data.current.condition.text == "Sunny"){
            weatherIcon.src = "./assets/img/clear.png";
        }
        else if(data.current.condition.text == "Rain"){
            weatherIcon.src = "./assets/img/rain.png";
        }
        else if(data.current.condition.text == "Patchy rain possible"){
            weatherIcon.src = "./assets/img/drizzle.png";
        }
        else if(data.current.condition.text == "Fog"){
            weatherIcon.src = "./assets/img/mist.png";
        }
    
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }

}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
