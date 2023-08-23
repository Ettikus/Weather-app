const searchButton = document.getElementById("searchButton");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");

searchButton.addEventListener("click", () => {
    const city = cityInput.value;
    if (city) {
        getWeather(city);
    }
});

function getWeather(city) {
    const apiUrl = `api.openweathermap.org/data/2.5/weather?id=524901&APPID=be0f40f4dfad82fdc8eb601136fb0bd1`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const temperature = data.current.temp_c;
            const description = data.current.condition.text;

            weatherInfo.innerHTML = `
                <h2>Weather in ${city}</h2>
                <p>Temperature: ${temperature}°C</p>
                <p>Description: ${description}</p>
            `;
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            weatherInfo.innerHTML = "Error fetching weather data.";
        });
