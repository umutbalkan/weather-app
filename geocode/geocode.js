const request = require('request');

var geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);
  request({
    url: 'http://maps.googleapis.com/maps/api/geocode/json?address=' + encodedAddress,
    json: true
  }, (error,response, body) => {
    if (error) {
      callback("Unable to connect GoogleAPI");
    } else if (body.status === 'ZERO_RESULTS') {
      callback("Unable to find that address.");
    } else if (body.status === "OK") {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longtitude: body.results[0].geometry.location.lng
      })
    } else if (body.status === "OVER_QUERY_LIMIT") {
      callback("Exceeded daily request quota for this API");
    }
  });
};

module.exports.geocodeAddress = geocodeAddress;
