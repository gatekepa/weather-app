const request = require("request")

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZ2F0ZWtlcGEiLCJhIjoiY2p2dnYzcW54M3BuMTQzcWo1aG4wbTNlcCJ9.yb24xvrByJwSU60pTrmISw&limit=1"

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to location services.", undefined)
        } else if (body.features.length === 0) {
            callback("Unable to find location. Try another search.", undefined)
        } else {
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            const place_name = body.features[0].place_name
            callback(undefined, {
                latitude,
                longitude,
                location: place_name
            })
        }
    })
}

module.exports = geocode