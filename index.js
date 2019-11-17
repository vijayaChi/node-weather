const request = require('request');
const argv = require('yargs').argv
let apiKey = '4419294cb88c21668bcf0b8858e31dee';
let city = argv.c || 'portland';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`

request(url,function(err,response,body){
    if(err){
        console.log('error : ', error);
    }
    else {
        let weather = JSON.parse(body);
        console.log(`It's ${weather.main.temp} degrees in ${weather.name}`);
        
    }
})

