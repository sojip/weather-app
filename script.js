const key = "fc8bf4667289e7c30873c74867d8ccdf";
const url = "https://api.openweathermap.org/data/2.5/weather?q=";
const form = document.querySelector("form");
const units = document.querySelector("#units");

getWeather();

form.addEventListener("submit", (e) => {
    let city = document.querySelector("#query").value;
    let unit = document.querySelector(".active").textContent.toLowerCase();
    e.preventDefault();
    getWeather(unit, city);
})

units.addEventListener("click", () => {
    let units = document.querySelectorAll("button > span");
    units.forEach((unit) => {
        unit.classList.toggle("active");
    })
    let unit = document.querySelector(".active").textContent.toLowerCase(); 
    let city = document.querySelector(".city").textContent;
    if (city) getWeather(unit, city);
    else getWeather(unit);
})


async function getWeather(unit = "°c", city = "bertoua") {
    try {
        unit === "°c" ? unit = "metric" : unit = "imperial";
        let response = await fetch(`${url}${city}&units=${unit}&appid=${key}`);
        let datas = await response.json();
        if (datas.cod == "200") {
            addDataToScreen(datas);
            return
        }
        else if (datas.cod == "404") {
            alert("Datas Not Found");
            return
        }
    } catch (error) {
        alert(error);
        return
    }  
}

function addDataToScreen(datas) {
    document.querySelector(".icon").src = `http://openweathermap.org/img/wn/${datas.weather[0].icon}@2x.png`;
    document.querySelector(".city").textContent = datas.name;
    document.querySelector(".description").textContent = datas.weather[0].description;
    document.querySelector(".temperature").textContent = datas.main.temp;
    document.querySelector(".humidity").textContent = `H: ${datas.main.humidity}%`;
    let unit = document.querySelector(".active").textContent.toLowerCase();
    document.querySelector("#unit_").textContent = unit;
    return
} 