import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="open-weather"
export default class extends Controller {
  static values = {
    apiKey: String
  }

  static targets = ["icon", "temperature", "description", "city",
                    "date", "input", "currentLocation", "form",
                    "welcome", "blur"]

  connect() {
    // console.log("helloo")
  }

  weather(event) {
    event.preventDefault();
    const key = "51584be985ba7d5712771046299b7195"
    console.log(this.inputTarget.value);
    console.log(this.welcomeTarget.value);

    // Function to update card info
    const updateCard = (data) => {
        // Using data from api response to insert values into HTML card
        this.temperatureTarget.innerText = `${Math.round(data.main.temp)}°C`;
        this.iconTarget.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        const caps = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)
        this.descriptionTarget.innerText = caps;
        this.cityTarget.innerText = data.name;

        // Using data to create todays date for HTML card
        const today = new Date();
        const localOffset = data.timezone + today.getTimezoneOffset() * 60;
        const localDate = new Date(today.setUTCSeconds(localOffset));
        const options = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        const formattedDate = localDate.toLocaleDateString("en-US", options);
        date.innerText = formattedDate;

        this.iconTarget.classList.remove("d-none")
        this.welcomeTarget.classList.remove("d-none")
        this.blurTarget.classList.add("weather-info")
    };

    const fetchWeatherByName = (event) => {
      event.preventDefault();
      const city = this.inputTarget.value;
      const urlWithCityName = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
      fetch(urlWithCityName)
        .then(response => response.json())
        .then(updateCard);
    };

    const fetchWeatherByCoordinates = (coordinates) => {
      const urlWithCoordinates = `http://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${key}&units=metric`;
      fetch(urlWithCoordinates)
        .then(response => response.json())
        .then(updateCard);
    };

    const fetchCurrentPositionWeather = (event) => {
      event.preventDefault();
      navigator.geolocation.getCurrentPosition((data) => {
        fetchWeatherByCoordinates({ lat: data.coords.latitude, lon: data.coords.longitude });
      });
    };

    this.formTarget.addEventListener('click', fetchWeatherByName);
    this.currentLocationTarget.addEventListener('click', fetchCurrentPositionWeather);
  }
}
