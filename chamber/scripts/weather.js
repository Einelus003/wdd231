const tempSpan = document.getElementById("current-temp");
const iconImg = document.getElementById("weather-icon");
const desc = document.getElementById("weather-desc");
const forecastList = document.getElementById("forecast");


const url = `https://api.openweathermap.org/data/2.5/weather?lat=18.5944&lon=-72.3074&units=imperial&appid=069bed0f8fb9cf108714cffdc7eae7ac`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=18.5944&lon=-72.3074&units=imperial&appid=069bed0f8fb9cf108714cffdc7eae7ac`;

async function getWeather() {
  const response = await fetch(url);
  const data = await response.json();

  tempSpan.textContent = `${Math.round(data.main.temp)}°F`;
  desc.textContent = data.weather[0].description;

  const icon = data.weather[0].icon;
  iconImg.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

async function getForecast() {
  const response = await fetch(forecastURL);
  const data = await response.json();

  forecastList.innerHTML = "";


  for (let i = 8; i <= 24; i += 8) {
    const item = data.list[i];
    const li = document.createElement("li");
    li.textContent = `${Math.round(item.main.temp)}°F — ${item.weather[0].description}`;
    forecastList.appendChild(li);
  }
}

getWeather();
getForecast();
