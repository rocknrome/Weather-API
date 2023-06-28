const apiKey = '66d2442220be4bc7b5600857232806';

function fetchWeatherData(location) {
  const apiUrl = `https://api.weatherapi.com/v1/current.json?q=${encodeURIComponent(location)}&key=${apiKey}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('No weather report for this location. Please check your input');
      }
      return response.json();
    })
    .then(data => {
      // Process the data received from the API
      console.log(data);

      // Get the relevant data from the API response
      const location = data.location.name;
      const temperature = data.current.temp_c;
      const weather = data.current.condition.text;
      const iconUrl = data.current.condition.icon;

      // Display the location, temperature, and weather information
      document.getElementById('cityName').textContent = location;
      document.getElementById('temp').textContent = `${temperature}°C`;
      document.getElementById('weatherText').textContent = weather;

      // Display the weather condition image
      const img = document.createElement('img');
      img.src = 'https:' + iconUrl;
      document.getElementById('weatherImage').innerHTML = '';
      document.getElementById('weatherImage').appendChild(img);

      // Clear the search bar
      document.getElementById('textInput').value = '';
    })
    .catch(error => {
      // Handle any errors that occurred during the API request
      console.error(error);
      document.getElementById('errorText').textContent = error.message;
    });
}

function handleSearch() {
  const location = document.getElementById('textInput').value;
  document.getElementById('errorText').textContent = ''; // Clear previous error message
  fetchWeatherData(location);
}

document.getElementById('submitButton').addEventListener('click', handleSearch);

document.getElementById('textInput').addEventListener('keyup', event => {
  if (event.key === 'Enter') {
    handleSearch();
  }
});
