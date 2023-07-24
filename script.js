var _0xf01f = [
  "\x37\x36\x61\x38\x34\x61\x35\x37\x37\x64\x33\x33\x63\x30\x64\x64\x64\x61\x64\x38\x34\x30\x39\x65\x37\x34\x32\x38\x33\x62\x63\x65",
];
let key = _0xf01f[0];
let KELVIN = 273;

const locationEle = document.getElementById("location");
const temp = document.getElementById("temp");
const feels = document.getElementById("feels");
const dec = document.getElementById("dec");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const pressure = document.getElementById("pressure");
const visibility = document.getElementById("visibility");
const weatherEle = document.querySelector(".weather-icon");
const notificationElement = document.querySelector(".notification");
const time = document.getElementById("time");

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
} else {
  const resultDiv = document.getElementById("result");
  resultDiv.textContent = "Geolocation is not available in this browser.";
}

function successCallback(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  getweather(latitude, longitude);
  const resultDiv = document.getElementById("result");
  resultDiv.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
}

function errorCallback(error) {
  const resultDiv = document.getElementById("result");
  if (error.code === error.PERMISSION_DENIED) {
    resultDiv.textContent =
      "Geolocation permission denied. Please allow access in your browser settings.";
    const instructionsDiv = document.getElementById("instructions");
    instructionsDiv.textContent =
      "To enable geolocation access, go to your browser settings, find 'Site Settings' or 'Privacy and Security', and allow location access for this extension.";
  } else {
    resultDiv.textContent = "Error getting location: " + error.message;
  }
}

let weather = {};
weather.temperature = {
  unit: "celsius",
};

function getweather(latitude, longitude) {
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

  fetch(api)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      weather.city = data.name;
      weather.country = data.sys.country;
      weather.iconId = data.weather[0].icon;
      weather.temperature.value = data.main.temp;
      weather.feels = data.main.feels_like;
      weather.humidity = data.main.humidity;
      weather.wind = data.wind.speed;
      weather.pressure = data.main.pressure;
      weather.visibility = data.visibility;
      weather.description = data.weather[0].description;
    })
    .then(function () {
      displayWeather();
    });
}

function displayWeather() {
  weatherEle.innerHTML = `<img src="./images/${weather.iconId}.png">`;
  temp.innerHTML = `<p><i class="fa-solid fa-temperature-half "></i> ${Math.floor(
    weather.temperature.value - KELVIN
  )}\u00B0C</p>`;
  dec.innerHTML = `<p> ${weather.description}</p>`;
  locationEle.innerHTML = `<p>${weather.city},${weather.country}</p>`;
  humidity.innerHTML = `<p><i class="fa-solid fa-droplet"></i> <b>Humidity</b> : ${weather.humidity} %</p>`;
  wind.innerHTML = `<p><i class="fa-solid fa-wind"></i> <b>Wind</b> : ${weather.wind} m/s</p>`;
  feels.innerHTML = `<p>Feels like: ${Math.floor(
    weather.feels - KELVIN
  )}\u00B0C </p>`;
  pressure.innerHTML = `<p><i class="fa-solid fa-arrow-down-short-wide"></i><b>Pressure</b>: ${weather.pressure} Pa</p>  `;
  visibility.innerHTML = `<p><i class="fa-solid fa-eye"></i><b>Visibility</b>: ${weather.visibility} m</p>  `;
}

// for time
const todaytime = () => {
  const today = new Date();
  let hour = today.getHours();
  let minute = today.getMinutes();
  let seconds = today.getSeconds();
  let result;
  if (hour > 12) {
    hour = hour - 12;
    result = "PM";
  } else {
    result = "AM";
  }
  const todaytime = `${formateTime(hour)}:${formateTime(minute)}:${formateTime(
    seconds
  )} ${result}`;

  document.getElementById("time").innerText = todaytime;
};
const formateTime = (time) => {
  return time < 10 ? `0${time}` : time;
};
setInterval(todaytime, 1000);
