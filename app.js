
const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
const argv = yargs
    .options({
      a: {
        demand: true,
        alias: 'address',
        describe: 'address to get the weather for',
        string: true
      }
    })
    .help()
    .alias('help', 'h')
    .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if(errorMessage){
    console.log(errorMessage);
  } else {
    console.log(results.address );
    weather.getWeather(results.latitude,results.longtitude, (errorMessage, weatherResults) => {
      if(errorMessage){
        console.log(errorMessage);
      } else {
        console.log(`It's currently ${weatherResults.temperature}`);
        console.log(`but it feels like it is ${weatherResults.apparentTemperature}`)
      }
    });
  }
});
