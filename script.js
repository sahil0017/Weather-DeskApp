//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//26dd2c16397c99435a6d6e7a3688d8cd

const weatherAPI={
    key: "26dd2c16397c99435a6d6e7a3688d8cd",
    baseURL:"http://api.openweathermap.org/data/2.5/weather"
}

const searchinputbox=document.getElementById("input-box");

// EVENT Listener on keyPRESS
searchinputbox.addEventListener('keypress',(event)=>{
    
    if(event.keyCode==13)
    {
        console.log(searchinputbox.value);
        getWeatherReport(searchinputbox.value);
        document.querySelector(".weather-body").style.display="block";
    }
})

// Annoynomous Function

//GET weather report
function getWeatherReport(city)
{
    fetch(`${weatherAPI.baseURL}?q=${city}&appid=${weatherAPI.key}&units=metric`)
    .then(weather => {
        return weather.json()
    }).then(showWeatherReport)
}

// show weather report
function showWeatherReport(weather)
{
    console.log(weather);

    // city
    let city=document.getElementById('city');
    city.innerText=`${weather.name}, ${weather.sys.country}`;

    // temparature
    let temp=document.getElementById('temp');
    temp.innerHTML=`${weather.main.temp}&deg;C`;

    // min-max

    let min_max=document.getElementById("min_max");
    min_max.innerHTML=`${weather.main.temp_min}&deg;C(min) / ${weather.main.temp_max}&deg;C(max)`;

    // weather type

    let weathertype=document.getElementById('weather');
    weathertype.innerText=`${weather.weather[0].main}`;

    let date=document.getElementById('date');
    let todaydate=new Date();
    date.innerText=dateManage(todaydate);

    if(weathertype.textContent=='Haze')
    {
        document.body.style.backgroundImage='url("Images/haze.jpg")';
    }
    else if(weathertype.textContent=='Rain')
    {
        document.body.style.backgroundImage='url("Images/rainyday.jpg")';
    }
    else if(weathertype.textContent=='Clouds')
    {
        document.body.style.backgroundImage='url("Images/Clouds.jpg")';
    }
    else if(weathertype.textContent=='Clear')
    {
        document.body.style.backgroundImage='url("Images/Clear.jpg")';
    }
    else if(weathertype.textContent=='Mist')
    {
        document.body.style.backgroundImage="url('Images/Mist.jpg')";
    }

}

// date manage

function dateManage(dateArg)
{
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let months=["January","Februrary","March","April","May",
               "June","July","August",,"August","September",
               "October","November","December"
            ];
    let year= dateArg.getFullYear();
    let month=months[dateArg.getMonth()];
    let date=dateArg.getDate();
    let day=days[dateArg.getDay()];

    return `${date} ${month} (${day}) , ${year}`;
}