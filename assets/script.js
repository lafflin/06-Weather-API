// DOM elements
const bodyEl = $("body");
const mainEl = $("#main");
const searchEl = $("#search");
const mainWeatherEl = $("#mainWeather");
const fiveDayEl = $("#fiveDay");

// api stuff
const apiKey = "d586f9f8d444d305ec48c97bc8680507";
var city = "";

// elements for the search bar and submit buttons
const citySearchEl = $(
	"<input type='text' id='searchInput'> <input type='submit' value='Get Weather' id='searchButton'>"
);
searchEl.append(citySearchEl);

// inside of this function need to eventually store each individual successful search into local storage to be displayed for search history
// this needs to be fixed, currently works as far as setting the city to the entered city, but won't add it to the API call
$("#searchButton").click(function () {
	console.log($("#searchInput"));
	currentCity = $("#searchInput").val();
	console.log(currentCity);
	city = JSON.stringify(currentCity);
	console.log(city);
	getWeather();
});

// more api stuff
var queryURL =
	"https://api.openweathermap.org/data/2.5/weather?q=" +
	city +
	"&appid=" +
	apiKey;
function getWeather() {
	fetch(queryURL)
		.then((res) => res.json())
		.then((data) => {
			let weather = data;
			console.log(weather);
		});
}

// after hitting enter, a main box for the weather info should pop up below the search bar (including city name, date, weather icon, temp, humidity, wind speed, uv index)
// when viewing the uv index there should be a color indicator of the condition; favorable(green), moderate(yellow), or severe(red)
//below these there should be a panel of the five day forecast. inside of each days card there should be date, an icon for weather,  temperature, wind speed, and humidity
