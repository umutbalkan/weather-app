const request = require('request');

var getWeather = (latitude,longtitude, callback) => {
  request({
    url: `https://api.darksky.net/forecast/8d2e6d8b811d0d440e0404e2d6370b81/${latitude},${longtitude}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback("Unable to connect to Forecast.io API");
    } else if (!error && response.statusCode === 200){
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    }
  });
};

module.exports.getWeather = getWeather;
