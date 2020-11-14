/*npm module*/
const request = require("request"); //HTTP requests

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoicGlhaGVsbGVyIiwiYSI6ImNrZ3VuazhtcjBkcmwycnBqbWl1cnprNmQifQ.sU1E5RuBe4FSWC6ZQVHROA&limit=1";
    request({url, json: true}, (error, {body}) => { //data -> data.body -> {body}
        
        if (error) { //Error handler for low-level errors (keine Netzwerkverbindung beispielsweise)
            callback("Unable to connect to geocode service!", undefined);
        } else if (body.features.length === 0) {
            callback("Unable to find location! Try another search!", undefined);
        } else {
            const latitude = body.features[0].center[1]; //Lat
            const longitude = body.features[0].center[0] //Long
            const location = body.features[0].place_name;
            const data = {
                latitude,
                longitude,
                location
            }
            callback(undefined, data);
        }
    });
}

module.exports = {
    geocode: geocode
}

