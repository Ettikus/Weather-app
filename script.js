const searchButton = document.getElementById("searchButton");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");
const apiKey = '0c2e473d5e19be74690c264821b17c64'; 

searchButton.addEventListener("click", () => {
    const city = cityInput.value;
    if (city) {
        getWeather(city);
    }
});

function getWeather(city) {
    const apiUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.current) {
                const temperature = data.current.temperature;
                const weatherDescription = data.current.weather_descriptions[0];
                const humidity = data.current.humidity;

                weatherInfo.innerHTML = `
                    <h2>Weather in ${city}</h2>
                    <p>Temperature: ${temperature}°C</p>
                    <p>Weather description: ${weatherDescription}</p>
                    <p>Humidity: ${humidity}%</p>
                `;
            } else {
                weatherInfo.innerHTML = "Error fetching weather data.";
            }
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            weatherInfo.innerHTML = "Error fetching weather data. Please check your API request and response.";
        });
