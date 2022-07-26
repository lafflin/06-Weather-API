// main DOM elements
const bodyEl = $("body");
const mainEl = $("#main");
const searchEl = $("#search");
const mainWeatherEl = $("#mainWeather");
const fiveDayEl = $("#fiveDay");
const dayOneEl = $("#dayOne");
const dayTwoEl = $("#dayTwo");
const dayThreeEl = $("#dayThree");
const dayFourEl = $("#dayFour");
const dayFiveEl = $("#dayFive");
fiveDayEl.append(dayOneEl, dayTwoEl, dayThreeEl, dayFourEl, dayFiveEl);
// weather display DOM elements
const cityNameEl = $("<h1>");
const dateEl = $("<h4>");
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
// 5-day forecast DOM elements
// day 1/5
const date1 = $("<h3>");
const icon1 = $("<img>");
const temp1 = $("<h3>");
const windspeed1 = $("<h3>");
const humidity1 = $("<h3>");
dayOneEl.append(date1, icon1, temp1, windspeed1, humidity1);
// day 2/5
const date2 = $("<h3>");
const icon2 = $("<img>");
const temp2 = $("<h3>");
const windspeed2 = $("<h3>");
const humidity2 = $("<h3>");
dayTwoEl.append(date2, icon2, temp2, windspeed2, humidity2);
// day 3/5
const date3 = $("<h3>");
const icon3 = $("<img>");
const temp3 = $("<h3>");
const windspeed3 = $("<h3>");
const humidity3 = $("<h3>");
dayTwoEl.append(date3, icon3, temp3, windspeed3, humidity3);
// day 4/5
const date4 = $("<h3>");
const icon4 = $("<img>");
const temp4 = $("<h3>");
const windspeed4 = $("<h3>");
const humidity4 = $("<h3>");
dayTwoEl.append(date4, icon4, temp4, windspeed4, humidity4);
// day 5/5
const date5 = $("<h3>");
const icon5 = $("<img>");
const temp5 = $("<h3>");
const windspeed5 = $("<h3>");
const humidity5 = $("<h3>");
dayTwoEl.append(date5, icon5, temp5, windspeed5, humidity5);

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
			wIconEl.attr("src", "http://openweathermap.org/img/wn/" + wIcon + ".png");
			currentTempEl.text("Temp: " + weather.main.temp);
			let lat = weather.coord.lat;
			let lon = weather.coord.lon;
			fetch(
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
			return fetch(
				"https://api.openweathermap.org/data/2.5/forecast?lat=" +
					lat +
					"&lon=" +
					lon +
					"&units=imperial&appid=" +
					apiKey
			)
				.then((res) => res.json())
				.then((data) => {
					let forecastData = data;
					console.log(forecastData);
					// day 1/5
					let milliseconds1 = forecastData.list[4].dt * 1000;
					let dateObj1 = new Date(milliseconds1);
					const dateA = dateObj1.toLocaleString();
					date1.text(dateA);
					let iconA = forecastData.list[4].weather[0].icon;
					icon1.attr(
						"src",
						"http://openweathermap.org/img/wn/" + iconA + ".png"
					);
					temp1.text("Temp: " + forecastData.list[4].main.temp);
					windspeed1.text("Wind Speed: " + forecastData.list[4].wind.speed);
					humidity1.text("Humidity: " + forecastData.list[4].main.humidity);
					// day 2/5
					let milliseconds2 = forecastData.list[12].dt * 1000;
					let dateObj2 = new Date(milliseconds2);
					const dateB = dateObj2.toLocaleString();
					date2.text(dateB);
					let iconB = forecastData.list[12].weather[0].icon;
					icon2.attr(
						"src",
						"http://openweathermap.org/img/wn/" + iconB + ".png"
					);
					temp2.text("Temp: " + forecastData.list[12].main.temp);
					windspeed2.text("Wind Speed: " + forecastData.list[12].wind.speed);
					humidity2.text("Humidity: " + forecastData.list[12].main.humidity);
					// day 3/5
					let milliseconds3 = forecastData.list[20].dt * 1000;
					let dateObj3 = new Date(milliseconds3);
					const dateC = dateObj3.toLocaleString();
					date3.text(dateC);
					let iconC = forecastData.list[20].weather[0].icon;
					icon3.attr(
						"src",
						"http://openweathermap.org/img/wn/" + iconC + ".png"
					);
					temp3.text("Temp: " + forecastData.list[20].main.temp);
					windspeed3.text("Wind Speed: " + forecastData.list[20].wind.speed);
					humidity3.text("Humidity: " + forecastData.list[20].main.humidity);
					// day 4/5
					let milliseconds4 = forecastData.list[28].dt * 1000;
					let dateObj4 = new Date(milliseconds4);
					const dateD = dateObj4.toLocaleString();
					date4.text(dateD);
					let iconD = forecastData.list[28].weather[0].icon;
					icon4.attr(
						"src",
						"http://openweathermap.org/img/wn/" + iconD + ".png"
					);
					temp4.text("Temp: " + forecastData.list[28].main.temp);
					windspeed4.text("Wind Speed: " + forecastData.list[28].wind.speed);
					humidity4.text("Humidity: " + forecastData.list[28].main.humidity);
					// day 5/5
					let milliseconds5 = forecastData.list[36].dt * 1000;
					let dateObj5 = new Date(milliseconds5);
					const dateE = dateObj5.toLocaleString();
					date5.text(dateE);
					let iconE = forecastData.list[36].weather[0].icon;
					icon5.attr(
						"src",
						"http://openweathermap.org/img/wn/" + iconE + ".png"
					);
					temp5.text("Temp: " + forecastData.list[36].main.temp);
					windspeed5.text("Wind Speed: " + forecastData.list[36].wind.speed);
					humidity5.text("Humidity: " + forecastData.list[36].main.humidity);
				});
		});
}

// when viewing the uv index there should be a color indicator of the condition; favorable(green), moderate(yellow), or severe(red)
