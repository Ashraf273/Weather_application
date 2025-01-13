// getting Access of elements of html //
let cityName=document.querySelector(".weather_city");
let dateTime=document.querySelector(".weather_date_time");
let w_forecast=document.querySelector(".weather_forecast");
let w_icon=document.querySelector(".weather_icon");
let w_temp=document.querySelector(".weather_temp");
let w_minTem=document.querySelector(".weather_min");
let w_maxTem=document.querySelector(".weather_max");

let w_feelsLike=document.querySelector(".w_feelsLike");
let w_humidity=document.querySelector(".w_humidity");
let w_wind=document.querySelector(".w_wind");
let w_pressure=document.querySelector(".w_pressure");

let citySearch=document.querySelector(".weather_search");


const getCountryName=(code)=>{
   return new Intl.DisplayNames([code], { type: 'region' }).of(code);

};

const getDateTime=(dt)=>{
const curDate = new Date(); // Convert seconds to milliseconds
console.log(curDate);
dateTime.textContent=curDate;

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
 second: "numeric",
};

const formatter = new Intl.DateTimeFormat("en-US", options);

return formatter.format(curDate);
}
setInterval(()=>{
    getDateTime();
},1000);

let city="Andhra Pradesh";

citySearch.addEventListener("submit",(e)=>{
    e.preventDefault();

    let cityName=document.querySelector(".city_name");
    console.log(cityName.value);
    city=cityName.value;
    getWeatherData();
    cityName.value="";
});


const getWeatherData= async()=>{
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=c4bd6273f2647f9f4bd029e26069bebf`;
    try{
        const res=await fetch(weatherUrl);
        const data=await res.json();
        console.log(data);

        const{ main, name, weather, wind, sys, dt }= data; 

        cityName.innerHTML=`${name}, ${getCountryName(sys.country)}`;
        dateTime.innerHTML=getDateTime(dt);

        w_forecast.innerHTML=weather[0].main;
        w_icon.innerHTML=`<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png"/>`;
        

        w_temp.innerHTML=`${main.temp}&#176 F`;
        w_minTem.innerHTML=`Min:${main.temp_min.toFixed()}&#176 F`;
        w_maxTem.innerHTML=`Max:${main.temp_max.toFixed()}&#176 F`;

        w_feelsLike.innerHTML=`${main.feels_like.toFixed(2)}&#176 F`;
        w_humidity.innerHTML=`${main.humidity}%`;
        w_wind.innerHTML=`${wind.speed} m/s`;
        w_pressure.innerHTML=`${main.pressure} hPa`;    }


    catch(error){
        console.log(error);
    }

};


document.body.addEventListener("load", getWeatherData());

