/*1. core modules (build-in)*/
const path = require("path");
/*npm modules*/
//Express laden, konfigurieren, Server starten
const express = require("express"); //Express laden



const app = express(); //Variable, um Express-Anwendung zu speichern
const publicDirectoryPath = path.join(__dirname, "../public") //Path zu dem Ordner public erstellen und in static weiter unten bereitstellen


//Variablen die von Node bereitgestellt werden
//console.log(__dirname); //Directory name; in welchem Ordner ist diese Datei (path zu diesem Ordner)?
//console.log(path.join(__dirname)); //Path zu dieser Datei



//static nimmt den path, den wir brauchen
/* However, the path that you provide to the express.static function is relative to the directory from where you launch your node process. If you run the express app from another directory, it’s safer to use the absolute path of the directory that you want to serve: */
app.use(express.static(publicDirectoryPath));


//Nun können wir Methoden nutzen:
/*
app.get("", (req, res) => { //request, response (in order to send something back)
    res.send("<h1>Weather</h1>")
});
Wird nicht benötigt, da hier immer index.html gefunden wird!!!
*/
/*get -> 2 Argumente:
1. route
2. function: Hier wird beschrieben, was wir tun wollen, wenn der Nutzer diese Route besucht;
function hat 2 wichtige Argumente:
    1. Object, enthält Informationen über die eimgehende Anforderung an den Server
    2. response -> Antwort, um etwas an den User zurückzusenden
*/
//Express-Server finds the matching route the user is accessing und verarbeitet die Anfrage


app.get("/help", (req, res) => { //request, response
    //res.send("Help page"); //Send something back to the requester (im Browserwindow)
    /*res.send({
        name: "Pia",
        age: 26
    })*/
    res.send([
        {
            name: "Pia",
            age: 26
        },
        {
            name: "Peter",
            age: 28
        },
        {
            name: "Anna",
            age: 30
        }
    ]);
});

app.get("/about", (req, res) => { //request, response
    res.send("../about.html"); //Send something back to the requester (im Browserwindow)
});

app.get("/weather", (req, res) => { //request, response
    res.send({
        forecast: "It's 15 degrees.",
        location: "Cham, Bayern, Deutschland"
    }); //Send something back to the requester (im Browserwindow)
});
/*Beispiel:
    app.com
    app.com/help
    app.com/about
Domain: app.com; wird auf einem einzigen Express-Server ausgeführt
Einrichtung mehrerer Routen
*/

//Server starten (weitere Methode von app nutzen, nur ein einziges Mal)
app.listen(3000, () => {
    console.log("Server is up on port 3000!"); //Wird natürlich nicht im Browser angezeigt
}); //Hört auf einen bestimmten Port; zunächst 3000
/*2. Argument ist optional 
    = Rückruffunktion, wird nur ausgeführt, wenn der Server in Betrieb ist
*/

//Es gibt Defaultports: für HTTP-Website for example Port 80

//Webserver wird nie geschlossen, bis wir ihn schließen