'use strict';

// 1.REQUIRE
// in our server we have to use 'require' instead of import
// here we will list the requirement for our server

// to creatte a server we are bringing in Express

const express = require('express');


const cors = require('cors');


// 3. we need to bring in our .env file, so we'll use this after we have run 'npm i dotenv'
require('dotenv').config();


// lab7-2-2 importing weather data from .json
let weatherData = require('./data/weather.json');

// 2.USE
// once we require something, we have to use it
// this is where we assign  the required file a variable
// react does this in one step with import, it says we must use it and it assigns it to a variable
// express takes 2 steps: require and use

// once we have express we must use it
const app = express();


app.use(cors());

// 4. define a PORT & validate env is working
// if my server is running on 3002, I know something is wrong with either my .env file or how I'm importing it.
const PORT = process.env.PORT || 3002;


// 6. ROUTES
// we will use these to access our endpoints

// define our default route
// app.get() correlates to axios.get()
// the first arugment is a URL in quote
// the second is the callback that defines what should happen when aa request comes into that url

// app.get('/', (request, response) => {
//   response.send('Hello from our server!');
// });

// app.get('/sayHello', (request, response) => {
//   console.log(request.query.firstName);
//   let firstName = request.query.firstName;
//   response.send(`hello ${firstName}`);
// });

app.get('/weather', (request, response, next) => {
  try {


    // let lat = request.query.lat;
    // let lon = request.query.lon.toString();
    // let latStr = lat.toString();
    let search = request.query.search;
    // console.log(weatherData[1].city_name);
    let weatherObj = weatherData.find(i => i.city_name === search);
    // let weatherArr = [];
    // function to create weather array
    // let weatherArrFn = (weatherObj) => {
    //   for (let i = 0; i < weatherObj.length; i++) {
    //     weatherArr.push(new Forecast(weatherObj, i));
    //     console.log(weatherArr);
    //   }
    // };
    // weatherArrFn();
    let renderWeather = new Forecast(weatherObj, 0);

    response.send(renderWeather);
  } catch (error) {
    next(error);
  }
});





//lab7-2-5 class
// SAMPLE "description": "Low of 17.1, high of 23.6 with broken clouds",
class Forecast {
  constructor(weatherObjFromSearch, i) {
    this.date = weatherObjFromSearch.data[i].datetime;
    this.description = `Low of ${weatherObjFromSearch.data[i].low_temp.toString()}, high of ${weatherObjFromSearch.data[i].max_temp.toString()} with ${weatherObjFromSearch.data[i].weather.description}`;
  }
}


// ERRORS
// handle all the errors
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// 5. LISTEN
// start the server
// listen is Express methtod that takes in two arguments, a port value and a call back function
// to run it: npm start OR nodemon (auto update with any changes, much better)

app.listen(PORT, () => console.log('port works'));



//comment from https://github.com/codefellows/seattle-code-301d95/blob/main/class-07/in-class-demo/pets-api-301d95/server.js