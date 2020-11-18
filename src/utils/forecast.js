/*npm module*/
const request = require("request"); //HTTP requests

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=74885aed9cff0a66d96ac32eb6f6dba7&query=" + latitude + "," + longitude + "&units=m"; //m, fs, f
    request({url, json: true}, (error, {body}) => { //data -> data.body -> {body}
        if (error) { //Z.B. Keine Internetverbindung
            callback("Unable to connect to weather service!", undefined);
        } else if(body.error) { //Prüfen, ob error-property existiert -> JA? Etwas ist schief gegangen (Nutzereingabe, ...)
            callback("Unable to find location!", undefined);
        } else { //Alles funktioniert
            const weatherDescription = body.current.weather_descriptions[0];
            const currentTemperature = body.current.temperature;
            const feelsLikeTemperature = body.current.feelslike;
            const humidity = body.current.humidity;
            const data = {
                weatherDescription, //weatherDescription: weatherDescription; Gleicher Name -> Kurzform
                currentTemperature,
                feelsLikeTemperature,
                humidity
            }
            callback(undefined, data);
        }
    });
}

module.exports = {
    forecast: forecast
}

