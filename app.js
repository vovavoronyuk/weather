const weatherBlock = document.querySelector("#weather");

async function loadWeather(e) {
  const server =
    "http://api.openweathermap.org/data/2.5/weather?q=Dnipro&units=metric&APPID=3eb66b9ddb0ac05b1a73a890e5c92a00";

  const response = await fetch(server, {
    method: "GET",
  });
  const responseResult = await response.json();
  if (response.ok) {
    getWeather(responseResult);
  } else {
    weatherBlock.innerHTML = responseResult.massage;
  }

  function getWeather(data) {
    const location = data.name;
    const temp = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_Like);
    const weatherStatus = data.weather[0].main;
    const weatherIcon = data.weather[0].icon;

    const template = `<div class="weather_header">
    <div class="weather_main">
        <div class="weather_city">${location}</div>
        <div class="weather_status">${weatherStatus}</div>
    </div>
    <div class="weather_icon">
        <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherStatus}">
    </div>
    <div class="weather_temp">${temp}</div>
    <div class="weather_feels-like">Feels like:${feelsLike}</div>
</div>`;

    weatherBlock.innerHTML = template;
  }

  if (weatherBlock) {
    loadWeather();
  }
}
