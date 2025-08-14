const input = document.querySelector("#weather-input");
const btn = document.querySelector("#weather-btn");
const res = document.querySelector(".weather-result");
const loc = document.querySelector("#location");
const temp = document.querySelector("#temprature");
const cond = document.querySelector("#condition");

const weatherCodes = {
    0: "Clear sky ☀️",
    1: "Mainly clear 🌤️",
    2: "Partly cloudy ⛅",
    3: "Overcast ☁️",
    45: "Fog 🌫️",
    48: "Depositing rime fog ❄️🌫️",
    51: "Light drizzle 🌦️",
    53: "Moderate drizzle 🌧️",
    55: "Dense drizzle 🌧️💧",
    56: "Light freezing drizzle ❄️🌦️",
    57: "Dense freezing drizzle ❄️🌧️",
    61: "Slight rain 🌦️",
    63: "Moderate rain 🌧️",
    65: "Heavy rain 🌧️💦",
    66: "Light freezing rain ❄️🌦️",
    67: "Heavy freezing rain ❄️🌧️💦",
    71: "Slight snow fall 🌨️",
    73: "Moderate snow fall ❄️🌨️",
    75: "Heavy snow fall ❄️❄️🌨️",
    77: "Snow grains ❄️✨",
    80: "Slight rain showers 🌦️",
    81: "Moderate rain showers 🌧️",
    82: "Violent rain showers 🌧️💦⚡",
    85: "Slight snow showers 🌨️",
    86: "Heavy snow showers ❄️🌨️❄️",
    95: "Thunderstorm (slight or moderate) ⛈️",
    96: "Thunderstorm with slight hail ⛈️❄️",
    99: "Thunderstorm with heavy hail ⛈️❄️❄️"
};

const getWeather = async () => {

    const city = input.value.trim();
    if (!city) {
        alert("Enter a city Name!!");
        return;
    }

    const URL = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;

    let geoResponse = await fetch(URL);
    let geoData = await geoResponse.json();
    if (!geoData.results || geoData.results.lenght === 0) {
        alert("City not found!!");
        return;
    }
    const location1 = geoData.results[0];

    const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${location1.latitude}&longitude=${location1.longitude}&current_weather=true`;
    const weatherResponse = await fetch(weatherURL);
    const weatherdata = await weatherResponse.json();

    loc.innerText = `Location: ${location1.name}, ${location1.country}`;
    temp.innerText = `Temperature: ${weatherdata.current_weather.temperature}°C`;
    cond.innerText = `Condition: ${weatherCodes[weatherdata.current_weather.weathercode]}`;

};

btn.addEventListener("click", getWeather);


