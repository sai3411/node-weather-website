const request = require("request")

const forecast = (lat,long, callback) => {
    const url = "http://api.weatherapi.com/v1/forecast.json?key=1e925e061918414583061815200206&q="+encodeURIComponent(lat)+","+encodeURIComponent(long)

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect to the server",undefined)
        } else if (body.error) {
            callback("Unable to find location try other location", undefined)
        } else {
            callback(undefined, {
                temperature: body.current.temp_c,
                humidity: body.current.humidity,
                summary: body.current.condition.text
            })
        }
    })
}

module.exports = forecast