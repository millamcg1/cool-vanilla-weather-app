function updateWeatherData(response) {
  let tempValueElement = document.querySelector("#temp-value");
  let cityElement = document.querySelector("#search-city");
  let decriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let windSpeedApiRound = Math.round(response.data.wind.speed * 10) / 10;
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src=${response.data.condition.icon_url} alt="weather-icon" class="weather-temp-icon"/>`;
  timeElement.innerHTML = formatDate(date);
  tempValueElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  decriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${windSpeedApiRound}km/h`;
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let weekDays = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];
  let day = weekDays[date.getDay()];
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes} `;
}
function searchCity(city) {
  let apiKey = "t2a8732d5be070bfd9a04c0a8o4eba02";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeatherData);
}

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  forecastHtml = ``;

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
<div class="forecast-day">
<div class="forecast-day">Tue</div>
        <div class="forecast-icon">🌤</div>
        <div>
          <strong class="forecast-temp-max">10º</strong>
          <span class="forecast-temp-min">| 2º </span>
        </div>
       </div>
  `;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

function applySearch(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  searchCity(searchInputElement.value);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", applySearch);

searchCity("Omagh");
displayForecast();
