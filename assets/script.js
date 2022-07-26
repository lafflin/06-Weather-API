// main DOM elements
const bodyEl = $("body");
const mainEl = $("#main");
const searchEl = $("#search");
const mainWeatherEl = $("#mainWeather");
const fiveDayEl = $("#fiveDay");

// weather display DOM elements
const cityNameEl = $("<h1>");
const dateEl = $("<h5>");
const wIconEl = $("<img id='wIcon'>");
const currentTempEl = $("<h2>");
const humidityEl = $("<h3>");
const windSpeedEl = $("<h3>");
const uvEl = $("<h3>");

mainWeatherEl.append(
	cityNameEl,
	dateEl,
	wIconEl,
	currentTempEl,
	humidityEl,
	windSpeedEl,
	uvEl
);

// api stuff
const apiKey = "d586f9f8d444d305ec48c97bc8680507";
var city = "";

// elements for the search bar and submit buttons
const citySearchEl = $(
	"<input type='text' id='searchInput'> <input type='submit' value='Get Weather' id='searchButton'>"
);
searchEl.append(citySearchEl);

// inside of this function need to eventually store each individual successful search into local storage to be displayed for search history
$("#searchButton").click(function () {
	console.log($("#searchInput"));
	currentCity = $("#searchInput").val();
	console.log(currentCity);
	city = currentCity;
	console.log(city);
	getWeather();
});

// more api stuff
function getWeather() {
	var queryURL =
		"https://api.openweathermap.org/data/2.5/weather?q=" +
		city +
		"&units=imperial&appid=" +
		apiKey;
	fetch(queryURL)
		.then((res) => res.json())
		.then((data) => {
			let weather = data;
			console.log(weather);
			cityNameEl.text(weather.name);
			let timeMilliseconds = weather.dt * 1000;
			let dateObj = new Date(timeMilliseconds);
			const date = dateObj.toLocaleString();
			dateEl.text(date);
			let wIcon = weather.weather[0].icon;
			console.log(wIcon);
			wIconEl.attr("src", "http://openweathermap.org/img/wn/" + wIcon + ".png");
			currentTempEl.text("Temp: " + weather.main.temp);

			let lat = weather.coord.lat;
			console.log(lat);
			let lon = weather.coord.lon;

			return fetch(
				"https://api.openweathermap.org/data/2.5/onecall?lat=" +
					lat +
					"&lon=" +
					lon +
					"&appid=" +
					apiKey
			)
				.then((res) => res.json())
				.then((data) => {
					let secondData = data;
					console.log(secondData);
					uvEl.text("UV Index: " + secondData.current.uvi);
					humidityEl.text("Humidity: " + secondData.current.humidity);
					windSpeedEl.text("Wind Speed: " + secondData.current.wind_speed);
				});
		});
}
// when viewing the uv index there should be a color indicator of the condition; favorable(green), moderate(yellow), or severe(red)
//below these there should be a panel of the five day forecast. inside of each days card there should be date, an icon for weather,  temperature, wind speed, and humidity
