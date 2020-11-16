console.log("Client side javascript file is loaded!"); //Going to run in the Browser

/* Fetch
    -> allows us to fetch data from an URL an do something with it
    "fetch data from URL ... and then run the function (callback function)"
*/

const weatherForm = document.querySelector("form");
const locationElement = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");


weatherForm.addEventListener("submit", (e) => { //name of the event we're trying to listen for, callback-function (runs every single time the event occurs)
    e.preventDefault(); //Verhindert, dass Seite neu geladen wird (Defaultverhalten); macht sonst nichts!
    const location = locationElement.value;
    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";

    //We are only fetching when the form is submitted
    fetch("/weather?address=" + location).then((response) => { //wie request in NodeJS; heroku-URL oder localhost
    response.json().then((data) => { //callback function wird ausgeführt, wenn json-data hier ist und geparsed wurde (parsed json-data wird zurückgeliefert)
        console.log(data); //Javascript Object

        if (data.error) {
            messageOne.textContent = data.error;
        } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        }
    });
});
})

