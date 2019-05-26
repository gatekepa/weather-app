const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/ec9ef3b06fbd96ae1c7ba6d7155e2cf7/" + latitude + "," + longitude + "?units=si"

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service", undefined)
        } else if (body.error) {
            callback("Unable to find location")
        } else {
            const temp = body.currently.temperature
            const chanceOfRain = body.currently.precipProbability
            const dailySummary = body.daily.data[0].summary
            callback(undefined , `${dailySummary} It is currently ${temp} degrees out. There is a ${chanceOfRain}% chance of rain.`)
        }
    })
}

module.exports = forecast