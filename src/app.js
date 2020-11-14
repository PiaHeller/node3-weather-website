/*1. core modules (build-in)*/
const path = require("path");
/*2. npm modules*/
const express = require("express");
const hbs = require("hbs");
/*3. */
const geocode = require("./utils/geocode.js"); //Auslagern
const forecast = require("./utils/forecast.js"); //Auslagern


const app = express(); //express() is a top-level function exported by the express module

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public"); //Zugriff auf den Ordner public
const viewsPath = path.join(__dirname, "../templates/views"); //Ordner für views wird jetzt umbenannt (Default-folder ist views)
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs"); //Zeile muss genau so sein
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);


// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", { //Object mit Variablen, auf die index Zugriff haben soll
        title: "Weather",
        name: "Pia Heller"
    });
    //Wir können eines unserer views rendern; Name allein reicht aus (so wie er im views-Ordner angegeben ist)
    //Express gets index in views and converts it to HTML -> wird im Browser für User angezeigt
});


app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Pia Heller"
    })
});


app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        message: "Das ist eine kleine Nachricht, um dir weiterzuhelfen!",
        name: "Pia Heller"
    })
});

//Endpunkt
app.get("/weather", (req, res) => { //request, response
    const address = req.query.address; //?address=Boston z.B.
    if (!address) {
        return res.send({
            error: "You must provide an address!"
        });
    }

    //Callback
    geocode.geocode(address, (error, { latitude, longitude, location } = {}) /*Zuerst war hier data (= Object): (error, data)*/ => { //In der Funktion haben wir Zugriff auf die Ergebnisse, in diesem Fall auf lat und long (wenn der Geocode Prozess fertig ist); 2 Parameter sind hier in der Regel üblich: error und data (einer der beiden hat einen Wert, der andere ist undefined)
        //Da ohne = {} ein Problem auftreten könnte, wenn wir geocode aufrufen und ein Fehler zurückgegeben wird, fügen wir es hinzu, um einen Default-Wert für ein leeres Objekt anzugeben (falls ein Fehler zurückgegeben wird, ist das Objekt undefined)
        if (error) {
            return res.send({
                error //Shorthand (instead of error: error)
            });
        }
    
        //Callback
        forecast.forecast(latitude, longitude, (error, { weatherDescription, currentTemperature, feelsLikeTemperature } = {}) => { //Wir starten eine weitere asychrone Funktion
            if (error) {
                return res.send({
                    error //Shorthand
                });
            }
            //Erfolgreich: (clientside mithilfe von fetch darauf zugreifen)
            res.send({
                forecast: weatherDescription + ". It is currently " + currentTemperature + " degrees out. It feels like " + feelsLikeTemperature + " degrees out.",
                location, //Shorthand
                address //Shorthand
            });
        });
    }); //Chaning together multiple callbacks
});


app.get("/products", (req, res) => {
    if (!req.query.search) { //if there is so search term
        return res.send( { //direkt hier return -> Grund siehe unten (instead of else, würde natürlich aich funktionieren, aber so besser)
            error: "You must provide a search term"
        });
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
});
/*Fehlermeldung:
    Cannot set headers after they are sent to the client!
    -> Diese Fehlermeldung wird angezeigt, wenn man versucht, 2 x auf eine Anfrage zu antworten (res.send 2 x)!
    -> Deshalb: return hinzufügen -> Ausführung der Funktion wird gestoppt (app.get(...))! Code weiter unten in der Funktion wird dann nicht mehr ausgeführt!
*/

app.get("/help/*", (req, res) => { //matching anything after help
    res.render("404", {
        title: "Error",
        errorMessage: "Help article not found!",
        name: "Pia Heller"
    })
});


//Aufruf einer Seite, die es nicht gibt; muss zum Schluss kommen
app.get("*", (req, res) => { //matching anything that hasn't been matched so far
    res.render("404", {
        title: "Error",
        errorMessage: "Page not found!",
        name: "Pia Heller"
    })
});


app.listen(3000, () => {
    console.log("Server is up on port 3000!"); //Wird natürlich nicht im Browser angezeigt
});