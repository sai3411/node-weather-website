const request = require("request")

const GeoCoding = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ address +".json?access_token=pk.eyJ1Ijoic2FpMzQxMSIsImEiOiJjazh2NTNlaXAwY2s4M25wbDBlZGxmcXV2In0.jCndxd_Fdqu1d1t5ewX1EA&limit=1"

    request({url, json:true}, (error,{body}) => {
        if (error) {
            callback("Unable to connect to the server",undefined)
        } else if (body.features.length === 0) {
            callback("Unable to find location try other location", undefined)
        } else {
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = GeoCoding