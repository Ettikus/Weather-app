const searchButton = document.getElementById("searchButton");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");
const apiKey = "c7c7f2c822c3e21c088b2de6be5d4e3a"; // Replace with your OpenWeatherMap API key

searchButton.addEventListener("click", () => {
    const city = cityInput.value;
    if (city) {
        getWeather(city);
    }
});

function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${c7c7f2c822c3e21c088b2de6be5d4e3a}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const temperature = data.main.temp;
            const description = data.weather[0].description;

            weatherInfo.innerHTML = `
                <h2>Weather in ${city}</h2>
                <p>Temperature: ${temperature} K</p>
                <p>Description: ${description}</p>
            `;
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            weatherInfo.innerHTML = "Error fetching weather data.";
        });
}
