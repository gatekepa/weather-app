const request = require("request")
const moment = require("moment")

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/ec9ef3b06fbd96ae1c7ba6d7155e2cf7/" + latitude + "," + longitude + "?units=si&exclude=hourly"

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service", undefined)
        } else if (body.error) {
            callback("Unable to find location")
        } else {
            const temp = Math.round(body.currently.temperature * 10) / 10
            const chanceOfRain = body.currently.precipProbability
            const dailySummary = body.daily.data[0].summary
            const todaysHighTemp = Math.round(body.daily.data[0].temperatureHigh *10) / 10
            const todaysHighTempTime = moment(body.daily.data[0].temperatureHighTime * 1000).format("LT")
            const todaysLowTemp = Math.round(body.daily.data[0].temperatureLow * 10) / 10
            callback(undefined, `Today's weather: ${dailySummary} It is currently ${temp}°C, with a high of ${todaysHighTemp}°C at ${todaysHighTempTime} today, and a low of ${todaysLowTemp}°C overnight. There is a ${chanceOfRain}% chance of rain.`)
        }
    })
}

module.exports = forecast