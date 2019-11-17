const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const apiKey = '4419294cb88c21668bcf0b8858e31dee';
let app = express();

app.use(bodyParser.urlencoded({extended : true})) ;
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/',function(req,res){
    res.render('index',{weather: null, error: null});
})

app.post('/', function(req,res){
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    request(url,function(err,response,body){
        if(err){
            res.render('index', {weather: null, error : 'Error please try again'});
        }
        else{
            let weather = JSON.parse(body);
            if(weather.main == undefined){
                res.render('index', {weather : null, error : 'Error, Please try again!' });
            }
            else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name} !`;
                res.render('index', {weather : weatherText, error : null});
            }
        }
    })
})

app.listen(8080,function(){
    console.log("Weather App is listening on port 8080!")
})