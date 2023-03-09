'use strict';
const axios = require('axios');

class Forecast {
  constructor(weatherObjFromSearch, i) {
    this.date = weatherObjFromSearch.data[i].datetime;
    this.description = `Low of ${weatherObjFromSearch.data[i].low_temp}, high of ${weatherObjFromSearch.data[i].max_temp} with ${weatherObjFromSearch.data[i].weather.description}`;
  }
}


async function getWeather (request, response, next) {
  try {

    let lat = request.query.lat;

    let lon = request.query.lon;
    // console.log(lat);
    // console.log(lon);
    let weatherDataFromApii = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&days=5&units=I&key=${process.env.WEATHER_API_KEY}`);

    // let lat = request.query.lat;
    // let lon = request.query.lon.toString();
    // let latStr = lat.toString();
    // let search = request.query.search;
    // let weatherObj = weatherData.find(i => i.city_name.toLowerCase() === search.toLowerCase());
    let weatherObjLatLon = weatherDataFromApii.data;
    let toBeRenderWeatherObj = [];
    for (let j = 0; j < weatherObjLatLon.data.length; j++) {
      let indWeatherObj = new Forecast(weatherObjLatLon, j);

      toBeRenderWeatherObj.push(indWeatherObj);
    }

    // let weatherArr = [];
    // function to create weather array
    // let weatherArrFn = (weatherObj) => {
    //   for (let i = 0; i < weatherObj.length; i++) {
    //     weatherArr.push(new Forecast(weatherObj, i));
    //     console.log(weatherArr);
    //   }
    // };
    // weatherArrFn();
    // let renderWeather = new Forecast(weatherObj, 0);

    response.send(toBeRenderWeatherObj);
  } catch (error) {
    next(error);
  }
}

module.exports = getWeather;
