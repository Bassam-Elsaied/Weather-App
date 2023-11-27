let container = document.querySelector(".container");
let search = document.querySelector(".search-box button");
let weatherBox = document.querySelector(".weather-box");
let weatherDetails = document.querySelector(".weather-details");
let error404 = document.querySelector(".not-found");

search.addEventListener("click", ()=>{
    const apikey = "fdb223c7321aad30795079a83d706004";
    const city = document.querySelector(".search-box input").value;

    if (city == '')
        return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`)
    .then(response => response.json()).then(json => {
        if(json.cod === '404'){
            container.style.height ="400px";
            weatherBox.style.display ="none";
            weatherDetails.style.display ="none";
            error404.style.display ="block";
            error404.classList.add("fade-in");
            return;
        }
        error404.style.display = "none";
        error404.classList.remove("fade-in");

        let img = document.querySelector(".weather-box img");
        let temperature = document.querySelector(".weather-box .temperature");
        let description = document.querySelector(".weather-box .description");
        let humidity = document.querySelector(".weather-details .humidity span");
        let wind = document.querySelector(".weather-details .wind span");

        switch (json.weather[0].main){
            case 'Clear':
                img.src = "images/clear.png";
                break;
            case 'Rain':
                img.src = "images/rain.png";
                break;
            case 'Snow':
                img.src = "images/snow.png";
                break;
            case 'Mist':
                img.src = "images/mist.png";
                break;
            case 'Clouds':
                img.src = "images/cloud.png";
                break;
            default : img.src = "";
        }
        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML =`${json.weather[0].description}`;
        humidity.innerHTML= `${json.main.humidity}%`;
        wind.innerHTML=`${parseInt(json.wind.speed)}Km/h`

        weatherBox.style.display="";
        weatherDetails.style.display="";
        weatherBox.classList.add("fade-in");
        weatherDetails.classList.add("fade-in");
        container.style.height= "590px";
    });
})