'use strict';

const express = require('express');
const cors = require('cors');
const getWeather = require('./modules/myweather');
const geMovie = require('./modules/movie');
require('dotenv').config();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;


app.get('/', (request, response) => {
  response.send('There is nothing to see here!');
});

app.get('/movie', geMovie );
app.get('/weather', getWeather);
app.get('*', (req, res) => {
  res.send('This page does not exist!');
});

app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(`Error Report: ${error.message}`);
});


app.listen(PORT, () => console.log('3001 port works'));

