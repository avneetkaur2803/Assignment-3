// Wait for the DOM content to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function () {
  // Selecting necessary DOM elements
  const weatherForm = document.querySelector('#weather-form'); // Form element
  const cityInput = document.querySelector('#city-input'); // Input field for city
  const weatherInfo = document.querySelector('.weather-info'); // Div to display weather information
  const apiKey = '3adfbf9d34b24500a7c193209230612'; // API key for Weather API

  // Adding event listener to the form for submitting city name
  weatherForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission from refreshing the page

    // Get the value of the input field (city name) and trim any whitespace
    const cityName = cityInput.value.trim();

    // Check if city name is empty
    if (cityName === '') {
      alert('Please enter a city name.'); // Show alert if city name is empty
      return;
    }

    // Construct the API URL with the city name and API key
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(cityName)}`;

    // Fetch weather data from the API
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok'); // Throw error if response is not successful
        }
        return response.json(); // Convert response to JSON format
      })
      .then(data => {
        // Extract necessary weather data from the response
        const iconUrl = `https:${data.current.condition.icon}`; // Weather icon URL
        const cityName = data.location.name; // City name
        const temperatureCelsius = data.current.temp_c; // Temperature in Celsius
        const temperatureFahrenheit = data.current.temp_f; // Temperature in Fahrenheit
        const humidity = data.current.humidity; // Humidity
        const pressure = data.current.pressure_mb; // Pressure
        const description = data.current.condition.text; // Weather description
        const weatherCondition = data.current.condition.text.toLowerCase(); // Weather condition (converted to lowercase for consistency)

        // Dynamically set background image based on weather condition
        document.body.style.backgroundImage = `url('${getBackgroundImage(weatherCondition)}')`;

        // Display weather information in the weatherInfo div
        weatherInfo.innerHTML = `
          <img src="${iconUrl}" alt="${description}" class="weather-icon">
          <p>City: ${cityName}</p>
          <p>Temperature: ${temperatureCelsius}°C / ${temperatureFahrenheit}°F</p>
          <p>Humidity: ${humidity}%</p>
          <p>Pressure: ${pressure} mb</p>
          <p>Description: ${description}</p>
        `;
      })
      .catch(error => {
        console.error('Error fetching data:', error); // Log error if fetching data fails
        weatherInfo.innerHTML = '<p>Error fetching weather data.</p>'; // Display error message in weatherInfo div
      });
  });
// Function to get background image based on weather condition
function getBackgroundImage(weatherCondition) {
  // Define background images based on weather conditions
  const backgroundImageUrls = {
    'clear': 'https://img.freepik.com/free-vector/sun-light-with-clouds-sky-background_1017-38299.jpg?w=1060',
    'partly cloudy': 'https://images.unsplash.com/photo-1469365556835-3da3db4c253b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'cloudy': 'https://images.unsplash.com/photo-1611928482473-7b27d24eab80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'mist': 'mist.jpg', // This URL should be updated with the actual mist image URL
    'rain': 'https://images.unsplash.com/photo-1518803194621-27188ba362c9?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'sunny': 'https://images.unsplash.com/photo-1606170034961-ee40e2dbe6bf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'mist' : 'https://images.unsplash.com/photo-1512923927402-a9867a68180e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  };

  // Check if the weather condition is in the background image list
  if (weatherCondition in backgroundImageUrls) {
    return backgroundImageUrls[weatherCondition]; // Return corresponding background image URL
  } else {
    // Default background image if condition not found
    return 'https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  }
}
});

  