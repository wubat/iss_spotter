const { nextISSTimesForMyLocation } = require('./iss_promised')

// const printPassTimes = function(passTimes) {
//   for (const pass of passTimes) {
//     const dateTime = new Date(0)
//     dateTime.setUTCSeconds(pass.risetime)
//     const duration = pass.duration
//     console.log(`next pass at ${dateTime} for ${duration} seconds!`)
//   }
// }

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log('it did not work: ', error.message)
  })