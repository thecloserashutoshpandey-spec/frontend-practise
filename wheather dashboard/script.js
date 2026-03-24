const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const errorMsg = document.getElementById("errorMsg");
const weatherCard = document.getElementById("weatherCard");

cityInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});

searchBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    
    errorMsg.innerText = "";
    weatherCard.classList.add("hidden");

    if (!city) {
        errorMsg.innerText = "Please enter a city name";
        return;
    }

    try {
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
        const geoData = await geoRes.json();
        
        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("City not found");
        }

        const { latitude, longitude, name } = geoData.results[0];
        
        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        const weatherData = await weatherRes.json();

        document.getElementById("cityName").innerText = name;
        document.getElementById("temp").innerText = `${weatherData.current_weather.temperature}°C`;
        document.getElementById("desc").innerText = "Current Temperature";

        weatherCard.classList.remove("hidden");
    } catch (err) {
        errorMsg.innerText = err.message;
    }
});