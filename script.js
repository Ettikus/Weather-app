const searchButton = document.getElementById("searchButton");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");
const locationButton = document.getElementById("locationButton");

searchButton.addEventListener("click", () => {
    const city = cityInput.value;
    if (city) {
        getWeatherByCity(city);
    }
});

locationButton.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            getWeatherByLocation(latitude, longitude);
        }, error => {
            console.error("Error getting location:", error);
            weatherInfo.innerHTML = "Error getting location.";
        });
    } else {
        weatherInfo.innerHTML = "Geolocation is not supported by this browser.";
    }
});

function getWeatherByCity(city) {
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=e42af692e8bd4f55adc95704232008&q=${city}&days=7&aqi=no&alerts=no`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Add this line to see the API response structure
            displayWeather(data);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            weatherInfo.innerHTML = "Error fetching weather data.";
        });
}

function getWeatherByLocation(lat, lon) {
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=e42af692e8bd4f55adc95704232008&q=${lat},${lon}&days=7&aqi=no&alerts=no`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            weatherInfo.innerHTML = "Error fetching weather data.";
        });
}

function displayWeather(data) {
    const location = data.location.name;
    const currentWeather = data.current;
    const forecast = data.forecast.forecastday.slice(0, 3); // Slice to get only the next 3 days

    let weatherHtml = `
        <h2>Weather in ${location}</h2>
        <p>Current Temperature: ${currentWeather.temp_c}°C</p>
        <p>Current Description: ${currentWeather.condition.text}</p>
        <h3>3-Day Forecast</h3>
        <div class="forecast-container">
    `;

    forecast.forEach(day => {
        const rain = day.day.daily_chance_of_rain ? `${day.day.daily_chance_of_rain}%` : "N/A";
        weatherHtml += `
            <div class="forecast">
                <h4>${day.date}</h4>
                <p>Max Temperature: ${day.day.maxtemp_c}°C</p>
                <p>Min Temperature: ${day.day.mintemp_c}°C</p>
                <p>Condition: ${day.day.condition.text}</p>
                <p>Chance of Rain: ${rain}</p>
            </div>
        `;
    });

    weatherHtml += '</div>';
    weatherInfo.innerHTML = weatherHtml;
}


    weatherHtml += '</div>';
    weatherInfo.innerHTML = weatherHtml;

