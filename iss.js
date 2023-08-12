const request = require('request');
const ipURL = 'https://api.ipify.org?format=json';


const fetchMyIP = function(callback) {
  request(ipURL, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    } 
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
    }
    
    const ipString = JSON.parse(body).ip;
    callback(null, ipString);
  })
};


const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    const parsedBody = JSON.parse(body);
    const latLongObj = {
      latitude: parsedBody.latitude,
      longitude: parsedBody.longitude
    };

    if (error) {
      callback(error, null) ;
      return;
    }

    if(parsedBody.success === false) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;

      callback(Error(message), null);
      return;
    }

    callback(null, latLongObj)
  })
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null)
      return
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }
    const passes = JSON.parse(body).response
    callback(null, passes)
  })
}

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null) 
    }

    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        return callback(error, null)
      }

      fetchISSFlyOverTimes(coordinates, (error, passTimes) => {
        if (error) {
          return callback(error, null) 
        }

        callback(null, passTimes)
      })
    })
  })
}

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };