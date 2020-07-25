const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname+"/index.html");
});

app.post('/', (req, res) => {
    const query = req.body.city;
    const apiKey = "663c7002c5f0feb1dec1a3b380628b45";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units=metric";

    https.get(url,(response) => { 
        response.on("data",(data) => {
            const weatherData = JSON.parse(data);
            const weatherDesc = weatherData.weather[0].description;
            const weatherIcon = weatherData.weather[0].icon;
            res.write("<h1>The weather description in "+ query +" is "+weatherDesc+"</h1>");
            res.write("<p>The temperature in "+ query +" is "+weatherData.main.temp+"</p>");
            res.write("<p><img src=http://openweathermap.org/img/wn/"+weatherIcon+"@2x.png></p>");
            res.send();
        })
    });
});





app.listen(3000, () => {
    console.log('App listening on port 3000!');
});