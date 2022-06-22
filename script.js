/* The API Key */
let APIkey1 = "81ad7991cd1e4b4cab3200814222106";    //WeatherAPI
let APIkey2 = "b71b9bad8434b318326718e426cd30d0";   //OpenWeatherMap

/* Getting DOM Elements */
let City = document.getElementById('location');
let Temp = document.getElementById('temperature');
let Icon = document.getElementById('icon');
let Condition = document.getElementById('condition');
let Humidity = document.getElementById('1');
let Pressure = document.getElementById('2');
let Wind = document.getElementById('3');
/*-----------------------------------------------------------------------------------------------------*/

/* Always focusing Input field */
document.getElementById('input').focus();

/* Fetch results when user clicks search icon */
let searchIcon = document.getElementById('search');
searchIcon.addEventListener('click', ()=>{
    let userInput = document.getElementById('input').value;
    FetchData(userInput);
})

/* Fetch results when user presses Enter key */
let keyPress = document.getElementById('input');
keyPress.addEventListener('keydown', (e)=>{
    if(e.key == 'Enter')
    {
        let userInput = document.getElementById('input').value;
        FetchData(userInput);
    }
});

/*-----------------------------------------------------------------------------------------------------*/

/* Function that fetches the current weather information */
async function FetchData(userInput)
{

    let url = `https://api.weatherapi.com/v1/current.json?key=${APIkey1}&q=${userInput}`;
    let output = await fetch(url);
    let data = await output.json();
    // console.log(data);

    /* Changing displayed data */
    City.innerText = data.location.name;
    Icon.setAttribute('src', data.current.condition.icon);
    Temp.innerText = data.current.temp_c + "°C";
    Condition.innerText = data.current.condition.text;

    Humidity.innerText = "Humidity : " + data.current.humidity + "%";
    Pressure.innerText = "Pressure : " + data.current.pressure_mb + "mb"
    Wind.innerText = "Wind : " + data.current.wind_kph + "km/h , " + data.current.wind_dir;
}

/*-----------------------------------------------------------------------------------------------------*/

/* Getting user's current location/coordinates to show weather in ther location */
/* This uses Geolocation API and passes the lat and lon values to FetchCityName() function to get the user's city name */
navigator.geolocation.getCurrentPosition(success, error);
function success(position)
{
    let lat = position.coords.latitude;
    let lon = position.coords.longitude; 
    FetchCityName(lat, lon);
}
function error(error)
{
    alert("ERROR : " + error.message+"\n\nIf you are on a Mobile browser, please turn on location of your device");
}

/* Function to fetch user's city name */
async function FetchCityName(lat, lon)
{
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey2}`;
    let output = await fetch(url);
    let data = await output.json();
    // console.log(data);
    FetchData(data.name);
}
/*-----------------------------------------------------------------------------------------------------*/