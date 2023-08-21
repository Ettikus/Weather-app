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
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=e42af692e8bd4f55adc95704232008&q=${city}&aqi=no`;

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
}
function getLiveScores() {
    const apiUrl = "apiv3.apifootball.com/?action=get_leaguesT"; // Replace with your API endpoint
    const apiKey = "6f0c36d842ecad9f5db52a3c9cf43acb947634c5dc5fe9dd3b7495deb1200034"; // Replace with your API key

    fetch(apiUrl, {
        headers: {
            "Authorization": `Bearer ${apiKey}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const scores = data.scores;

        const scoresList = document.getElementById("scoresList");
        scoresList.innerHTML = scores.map(score => `<li>${score.team1} ${score.score1} - ${score.score2} ${score.team2}</li>`).join('');
    })
    .catch(error => {
        console.error("Error fetching live scores:", error);
        const scoresList = document.getElementById("scoresList");
        scoresList.innerHTML = "Error fetching live scores.";
    });
}

// Fetch live scores on page load
getLiveScores();
