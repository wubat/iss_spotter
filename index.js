
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("didn't work :(  ", error);
//     return ;
//   }

//   console.log("it worked! returned IP: ", ip);
// });

// fetchCoordsByIP('162.245.144.188', (error, coordinates) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned coordinates:' , coordinates);
// });


// const testCoords = { latitude: 49.2827291, longitude: -123.1207375 }

// fetchISSFlyOverTimes(testCoords, (error, passTimes) => {
//   if (error) {
//     console.log("error: ", error)
//     return
//   }

//   console.log("it worked!", passTimes)
// })
const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const dateTime = new Date(0)
    dateTime.setUTCSeconds(pass.risetime)
    const duration = pass.duration
    console.log(`next pass at ${dateTime} for ${duration} seconds!`)
  }
}


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("didnt work :( - ", error)
  }

  printPassTimes(passTimes)
})