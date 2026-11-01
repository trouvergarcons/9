/**
 * AJAX with JSON Demo - Hypothetical Weather API
 * ===============================================================
 * This script demonstrates:
 * 1. How to send an asynchronous request (AJAX) to a weather API.
 * 2. How the server returns structured data in JSON format.
 * 3. How to parse that JSON into JavaScript objects.
 * 4. How to dynamically update the webpage (DOM) without reloading.
 * 
 * Included implementations:
 * - Modern `fetch()` API with Promises / async-await
 * - Traditional `XMLHttpRequest` (classic AJAX)
 */

// ==========================================
// 1. MOCK DATA FOR HYPOTHETICAL WEATHER API (50 WORLD CITIES)
// ==========================================
const cityProfiles = {
  // Asia
  tokyo: { city: "Tokyo", country: "Japan", lat: 35.6762, lon: 139.6503, temp: 22, condition: "Sunny", icon: "☀️", humidity: 55, wind: 12, uv: 5, aqi: "Good" },
  delhi: { city: "Delhi", country: "India", lat: 28.6139, lon: 77.2090, temp: 32, condition: "Hazy Sun", icon: "🌤️", humidity: 62, wind: 9, uv: 8, aqi: "Moderate" },
  shanghai: { city: "Shanghai", country: "China", lat: 31.2304, lon: 121.4737, temp: 24, condition: "Partly Cloudy", icon: "⛅", humidity: 70, wind: 14, uv: 6, aqi: "Moderate" },
  mumbai: { city: "Mumbai", country: "India", lat: 19.0760, lon: 72.8777, temp: 30, condition: "Humid & Sunny", icon: "☀️", humidity: 78, wind: 15, uv: 9, aqi: "Moderate" },
  beijing: { city: "Beijing", country: "China", lat: 39.9042, lon: 116.4074, temp: 21, condition: "Clear Sky", icon: "☀️", humidity: 40, wind: 11, uv: 6, aqi: "Good" },
  dhaka: { city: "Dhaka", country: "Bangladesh", lat: 23.8103, lon: 90.4125, temp: 31, condition: "Tropical Warm", icon: "🌤️", humidity: 80, wind: 10, uv: 8, aqi: "Moderate" },
  osaka: { city: "Osaka", country: "Japan", lat: 34.6937, lon: 135.5023, temp: 23, condition: "Clear", icon: "☀️", humidity: 58, wind: 13, uv: 6, aqi: "Good" },
  karachi: { city: "Karachi", country: "Pakistan", lat: 24.8607, lon: 67.0011, temp: 33, condition: "Breezy & Sunny", icon: "☀️", humidity: 65, wind: 20, uv: 9, aqi: "Moderate" },
  chongqing: { city: "Chongqing", country: "China", lat: 29.4316, lon: 106.9123, temp: 25, condition: "Overcast", icon: "☁️", humidity: 76, wind: 8, uv: 4, aqi: "Moderate" },
  kolkata: { city: "Kolkata", country: "India", lat: 22.5726, lon: 88.3639, temp: 31, condition: "Warm & Humid", icon: "🌤️", humidity: 82, wind: 11, uv: 8, aqi: "Moderate" },
  manila: { city: "Manila", country: "Philippines", lat: 14.5995, lon: 120.9842, temp: 30, condition: "Scattered Showers", icon: "🌦️", humidity: 83, wind: 12, uv: 7, aqi: "Good" },
  guangzhou: { city: "Guangzhou", country: "China", lat: 23.1291, lon: 113.2644, temp: 28, condition: "Humid", icon: "⛅", humidity: 75, wind: 10, uv: 7, aqi: "Moderate" },
  shenzhen: { city: "Shenzhen", country: "China", lat: 22.5431, lon: 114.0579, temp: 27, condition: "Partly Cloudy", icon: "⛅", humidity: 74, wind: 13, uv: 7, aqi: "Good" },
  lahore: { city: "Lahore", country: "Pakistan", lat: 31.5204, lon: 74.3587, temp: 32, condition: "Sunny", icon: "☀️", humidity: 50, wind: 8, uv: 8, aqi: "Moderate" },
  bengaluru: { city: "Bengaluru", country: "India", lat: 12.9716, lon: 77.5946, temp: 26, condition: "Pleasant", icon: "🌤️", humidity: 64, wind: 14, uv: 7, aqi: "Good" },
  jakarta: { city: "Jakarta", country: "Indonesia", lat: -6.2088, lon: 106.8456, temp: 31, condition: "Passing Showers", icon: "🌦️", humidity: 82, wind: 11, uv: 8, aqi: "Moderate" },
  chennai: { city: "Chennai", country: "India", lat: 13.0827, lon: 80.2707, temp: 32, condition: "Coastal Breeze", icon: "🌤️", humidity: 75, wind: 18, uv: 9, aqi: "Moderate" },
  bangkok: { city: "Bangkok", country: "Thailand", lat: 13.7563, lon: 100.5018, temp: 33, condition: "Hot & Humid", icon: "☀️", humidity: 72, wind: 10, uv: 9, aqi: "Moderate" },
  seoul: { city: "Seoul", country: "South Korea", lat: 37.5665, lon: 126.9780, temp: 20, condition: "Crisp & Clear", icon: "☀️", humidity: 48, wind: 14, uv: 5, aqi: "Good" },
  hyderabad: { city: "Hyderabad", country: "India", lat: 17.3850, lon: 78.4867, temp: 29, condition: "Warm", icon: "🌤️", humidity: 60, wind: 12, uv: 8, aqi: "Good" },
  tehran: { city: "Tehran", country: "Iran", lat: 35.6892, lon: 51.3890, temp: 27, condition: "Dry & Sunny", icon: "☀️", humidity: 28, wind: 13, uv: 7, aqi: "Moderate" },
  chengdu: { city: "Chengdu", country: "China", lat: 30.5728, lon: 104.0668, temp: 22, condition: "Misty Clouds", icon: "☁️", humidity: 78, wind: 7, uv: 4, aqi: "Moderate" },
  nanjing: { city: "Nanjing", country: "China", lat: 32.0603, lon: 118.7969, temp: 23, condition: "Partly Cloudy", icon: "⛅", humidity: 68, wind: 11, uv: 5, aqi: "Good" },
  wuhan: { city: "Wuhan", country: "China", lat: 30.5928, lon: 114.3055, temp: 24, condition: "Scattered Clouds", icon: "⛅", humidity: 69, wind: 10, uv: 5, aqi: "Moderate" },
  hochiminh: { city: "Ho Chi Minh City", country: "Vietnam", lat: 10.8231, lon: 106.6297, temp: 32, condition: "Tropical Warm", icon: "🌤️", humidity: 79, wind: 11, uv: 8, aqi: "Moderate" },
  ahmedabad: { city: "Ahmedabad", country: "India", lat: 23.0225, lon: 72.5714, temp: 34, condition: "Sunny & Dry", icon: "☀️", humidity: 45, wind: 12, uv: 9, aqi: "Moderate" },
  kualalumpur: { city: "Kuala Lumpur", country: "Malaysia", lat: 3.1390, lon: 101.6869, temp: 31, condition: "Afternoon Showers", icon: "🌦️", humidity: 84, wind: 9, uv: 7, aqi: "Good" },
  hongkong: { city: "Hong Kong", country: "China", lat: 22.3193, lon: 114.1694, temp: 27, condition: "Coastal Clouds", icon: "⛅", humidity: 75, wind: 18, uv: 6, aqi: "Good" },
  singapore: { city: "Singapore", country: "Singapore", lat: 1.3521, lon: 103.8198, temp: 30, condition: "Tropical Warmth", icon: "🌤️", humidity: 81, wind: 11, uv: 8, aqi: "Good" },
  dubai: { city: "Dubai", country: "United Arab Emirates", lat: 25.2048, lon: 55.2708, temp: 37, condition: "Sunny & Desert Heat", icon: "☀️", humidity: 42, wind: 17, uv: 10, aqi: "Moderate" },
  // Europe
  london: { city: "London", country: "United Kingdom", lat: 51.5074, lon: -0.1278, temp: 15, condition: "Drizzle", icon: "🌧️", humidity: 82, wind: 16, uv: 3, aqi: "Good" },
  paris: { city: "Paris", country: "France", lat: 48.8566, lon: 2.3522, temp: 19, condition: "Mild & Clear", icon: "🌤️", humidity: 60, wind: 10, uv: 4, aqi: "Good" },
  berlin: { city: "Berlin", country: "Germany", lat: 52.5200, lon: 13.4050, temp: 17, condition: "Partly Cloudy", icon: "⛅", humidity: 65, wind: 14, uv: 4, aqi: "Good" },
  istanbul: { city: "Istanbul", country: "Turkey", lat: 41.0082, lon: 28.9784, temp: 22, condition: "Sunny & Breezy", icon: "🌤️", humidity: 64, wind: 18, uv: 6, aqi: "Good" },
  moscow: { city: "Moscow", country: "Russia", lat: 55.7558, lon: 37.6173, temp: 12, condition: "Cool & Overcast", icon: "☁️", humidity: 72, wind: 15, uv: 2, aqi: "Good" },
  // North America
  newyork: { city: "New York", country: "United States", lat: 40.7128, lon: -74.0060, temp: 18, condition: "Breezy & Sunny", icon: "🌤️", humidity: 55, wind: 20, uv: 5, aqi: "Good" },
  losangeles: { city: "Los Angeles", country: "United States", lat: 34.0522, lon: -118.2437, temp: 26, condition: "Sunny & Warm", icon: "☀️", humidity: 50, wind: 11, uv: 7, aqi: "Moderate" },
  chicago: { city: "Chicago", country: "United States", lat: 41.8781, lon: -87.6298, temp: 16, condition: "Windy & Fair", icon: "💨", humidity: 58, wind: 28, uv: 4, aqi: "Good" },
  toronto: { city: "Toronto", country: "Canada", lat: 43.6532, lon: -79.3832, temp: 15, condition: "Partly Cloudy", icon: "⛅", humidity: 62, wind: 16, uv: 4, aqi: "Good" },
  mexicocity: { city: "Mexico City", country: "Mexico", lat: 19.4326, lon: -99.1332, temp: 22, condition: "Pleasant & Clear", icon: "🌤️", humidity: 52, wind: 10, uv: 8, aqi: "Moderate" },
  // South America
  saopaulo: { city: "São Paulo", country: "Brazil", lat: -23.5505, lon: -46.6333, temp: 23, condition: "Partly Cloudy", icon: "⛅", humidity: 72, wind: 13, uv: 6, aqi: "Good" },
  buenosaires: { city: "Buenos Aires", country: "Argentina", lat: -34.6037, lon: -58.3816, temp: 19, condition: "Mild & Sunny", icon: "☀️", humidity: 65, wind: 15, uv: 5, aqi: "Good" },
  riodejaneiro: { city: "Rio de Janeiro", country: "Brazil", lat: -22.9068, lon: -43.1729, temp: 28, condition: "Warm & Sunny", icon: "☀️", humidity: 76, wind: 14, uv: 8, aqi: "Good" },
  bogota: { city: "Bogotá", country: "Colombia", lat: 4.7110, lon: -74.0721, temp: 18, condition: "Scattered Rain", icon: "🌦️", humidity: 79, wind: 9, uv: 6, aqi: "Good" },
  lima: { city: "Lima", country: "Peru", lat: -12.0464, lon: -77.0428, temp: 20, condition: "Coastal Mist", icon: "☁️", humidity: 82, wind: 12, uv: 5, aqi: "Moderate" },
  // Africa
  cairo: { city: "Cairo", country: "Egypt", lat: 30.0444, lon: 31.2357, temp: 33, condition: "Dry & Sunny", icon: "☀️", humidity: 38, wind: 15, uv: 9, aqi: "Moderate" },
  lagos: { city: "Lagos", country: "Nigeria", lat: 6.5244, lon: 3.3792, temp: 30, condition: "Warm & Humid", icon: "🌤️", humidity: 84, wind: 13, uv: 8, aqi: "Moderate" },
  kinshasa: { city: "Kinshasa", country: "DR Congo", lat: -4.4419, lon: 15.2663, temp: 31, condition: "Tropical Warm", icon: "🌤️", humidity: 80, wind: 9, uv: 8, aqi: "Good" },
  luanda: { city: "Luanda", country: "Angola", lat: -8.8390, lon: 13.2894, temp: 27, condition: "Pleasant Breeze", icon: "🌤️", humidity: 76, wind: 16, uv: 8, aqi: "Good" },
  // Oceania
  sydney: { city: "Sydney", country: "Australia", lat: -33.8688, lon: 151.2093, temp: 21, condition: "Sunny & Mild", icon: "☀️", humidity: 60, wind: 18, uv: 6, aqi: "Good" }
};

// Assemble complete weather API responses for all 50 cities
const hypotheticalApiDatabase = {};
for (const [key, p] of Object.entries(cityProfiles)) {
  hypotheticalApiDatabase[key] = {
    status: "success",
    location: {
      city: p.city,
      country: p.country,
      coordinates: { latitude: p.lat, longitude: p.lon }
    },
    current: {
      temperature: p.temp,
      unit: "°C",
      feels_like: p.temp > 25 ? p.temp + 1 : p.temp - 1,
      condition: p.condition,
      icon: p.icon,
      humidity: p.humidity,
      wind_speed: p.wind,
      uv_index: p.uv,
      air_quality: p.aqi
    },
    forecast: [
      { day: "Tomorrow", temp: p.temp + 1, condition: p.condition, icon: p.icon },
      { day: "Day 2", temp: p.temp - 2, condition: "Scattered Clouds", icon: "⛅" },
      { day: "Day 3", temp: p.temp, condition: "Partly Cloudy", icon: "🌤️" }
    ],
    last_updated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
}

// ==========================================
// 2. DOM ELEMENT REFERENCES
// ==========================================
const citySelect = document.getElementById('citySelect');
const fetchBtn = document.getElementById('fetchBtn');
const statusMessage = document.getElementById('statusMessage');
const weatherDisplay = document.getElementById('weatherDisplay');

// Weather fields
const cityNameEl = document.getElementById('cityName');
const coordinatesEl = document.getElementById('coordinates');
const weatherIconEl = document.getElementById('weatherIcon');
const tempValueEl = document.getElementById('tempValue');
const tempUnitEl = document.getElementById('tempUnit');
const conditionTextEl = document.getElementById('conditionText');
const feelsLikeEl = document.getElementById('feelsLike');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('windSpeed');
const uvIndexEl = document.getElementById('uvIndex');
const airQualityEl = document.getElementById('airQuality');
const forecastContainer = document.getElementById('forecastContainer');
const lastUpdatedEl = document.getElementById('lastUpdated');
const usedMethodBadge = document.getElementById('usedMethodBadge');
const jsonPre = document.getElementById('jsonPre');

// ==========================================
// 3. AJAX METHOD 1: MODERN fetch() API
// ==========================================
/**
 * Fetches weather data using the modern Promise-based `fetch()` API
 * @param {string} cityKey 
 * @returns {Promise<Object>}
 */
async function fetchWeatherWithFetchApi(cityKey) {
  // If user selected "Local weather.json File"
  if (cityKey === 'local') {
    const response = await fetch('./weather.json');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status} (${response.statusText})`);
    }
    // Parse the JSON response stream into a JavaScript object
    const data = await response.json();
    return data;
  }

  // Hypothetical API URL:
  // e.g., https://api.hypotheticalweather.com/v1/current?city=tokyo
  // Here we simulate the network latency of a real remote API call:
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = hypotheticalApiDatabase[cityKey];
      if (data) {
        // Return a fresh copy of the JSON data
        resolve(JSON.parse(JSON.stringify(data)));
      } else {
        reject(new Error(`City '${cityKey}' not found in hypothetical weather database.`));
      }
    }, 450); // 450ms simulated network round-trip
  });
}

// ==========================================
// 4. AJAX METHOD 2: TRADITIONAL XMLHttpRequest
// ==========================================
/**
 * Fetches weather data using traditional XMLHttpRequest
 * @param {string} cityKey 
 * @returns {Promise<Object>}
 */
function fetchWeatherWithXHR(cityKey) {
  return new Promise((resolve, reject) => {
    if (cityKey === 'local') {
      // Create a new XMLHttpRequest object
      const xhr = new XMLHttpRequest();
      
      // Configure it: GET request for './weather.json', asynchronous (true)
      xhr.open('GET', './weather.json', true);

      // Callback triggered when HTTP transaction finishes
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            // Convert JSON string from xhr.responseText to a JavaScript Object
            const parsedData = JSON.parse(xhr.responseText);
            resolve(parsedData);
          } catch (err) {
            reject(new Error('Failed to parse JSON response: ' + err.message));
          }
        } else {
          reject(new Error(`XHR HTTP Error! Status: ${xhr.status} ${xhr.statusText}`));
        }
      };

      // Callback for network failures
      xhr.onerror = function() {
        reject(new Error('Network error during XMLHttpRequest. If viewing via file://, use a local server.'));
      };

      // Send the request over the network
      xhr.send();
    } else {
      // Simulate remote XHR call with network delay
      setTimeout(() => {
        const data = hypotheticalApiDatabase[cityKey];
        if (data) {
          // In traditional AJAX, the server returns a string:
          const jsonStringFromHypotheticalServer = JSON.stringify(data);
          
          // The browser receives the JSON string and parses it:
          const parsedData = JSON.parse(jsonStringFromHypotheticalServer);
          resolve(parsedData);
        } else {
          reject(new Error(`City '${cityKey}' not found.`));
        }
      }, 450);
    }
  });
}

// ==========================================
// 5. DOM DISPLAY & RENDERING FUNCTION
// ==========================================
/**
 * Takes the parsed JSON data object and maps its properties to HTML elements
 * @param {Object} data - The parsed JSON weather response
 * @param {string} methodUsed - Which AJAX method was used ('fetch' or 'xhr')
 */
function displayWeatherData(data, methodUsed) {
  // 1. Location details
  cityNameEl.textContent = `${data.location.city}, ${data.location.country}`;
  coordinatesEl.textContent = `Lat: ${data.location.coordinates.latitude}°, Lon: ${data.location.coordinates.longitude}°`;

  // 2. Current conditions
  weatherIconEl.textContent = data.current.icon;
  tempValueEl.textContent = data.current.temperature;
  tempUnitEl.textContent = data.current.unit || '°C';
  conditionTextEl.textContent = data.current.condition;
  feelsLikeEl.textContent = `${data.current.feels_like}${data.current.unit || '°C'}`;

  // 3. Environmental metrics
  humidityEl.textContent = `${data.current.humidity}%`;
  windSpeedEl.textContent = `${data.current.wind_speed} km/h`;
  uvIndexEl.textContent = data.current.uv_index;
  airQualityEl.textContent = data.current.air_quality;

  // 4. Forecast items (mapping JSON array to HTML cards)
  forecastContainer.innerHTML = '';
  if (Array.isArray(data.forecast)) {
    data.forecast.forEach(item => {
      const card = document.createElement('div');
      card.className = 'forecast-card';
      card.innerHTML = `
        <span class="forecast-day">${item.day}</span>
        <span class="forecast-icon">${item.icon}</span>
        <span class="forecast-temp">${item.temp}°</span>
        <span class="forecast-cond">${item.condition}</span>
      `;
      forecastContainer.appendChild(card);
    });
  }

  // 5. Metadata
  lastUpdatedEl.textContent = data.last_updated || new Date().toLocaleTimeString();
  usedMethodBadge.textContent = methodUsed === 'fetch' ? 'API: fetch()' : 'API: XMLHttpRequest';

  // 6. JSON Inspector Viewer
  jsonPre.textContent = JSON.stringify(data, null, 2);

  // Reveal the card
  weatherDisplay.classList.remove('hidden');
}

// ==========================================
// 6. EVENT HANDLER & CONTROLLER
// ==========================================
async function handleFetchWeather() {
  const selectedCity = citySelect.value;
  const selectedMethod = document.querySelector('input[name="ajaxMethod"]:checked').value;

  // Show loading status
  setLoadingState(true, `Sending asynchronous ${selectedMethod.toUpperCase()} request to hypothetical weather API...`);

  try {
    let weatherData;

    if (selectedMethod === 'fetch') {
      weatherData = await fetchWeatherWithFetchApi(selectedCity);
    } else {
      weatherData = await fetchWeatherWithXHR(selectedCity);
    }

    // Success: render the data
    displayWeatherData(weatherData, selectedMethod);
    setLoadingState(false);
  } catch (error) {
    console.error('AJAX Error:', error);
    showErrorState(
      `Failed to fetch weather data: ${error.message}. ` +
      (window.location.protocol === 'file:' && selectedCity === 'local' 
        ? '<br><br>💡 <strong>Note:</strong> Browsers block local file AJAX (CORS) when opened via <code>file:///</code>. Please test using another city option, or run a local web server (e.g. <code>python -m http.server</code> or VS Code Live Server).' 
        : '')
    );
  }
}

function setLoadingState(isLoading, message = '') {
  if (isLoading) {
    statusMessage.className = 'status-box loading';
    statusMessage.innerHTML = `<span>⏳</span> <span>${message}</span>`;
    statusMessage.classList.remove('hidden');
    fetchBtn.disabled = true;
  } else {
    statusMessage.classList.add('hidden');
    fetchBtn.disabled = false;
  }
}

function showErrorState(htmlMessage) {
  statusMessage.className = 'status-box error';
  statusMessage.innerHTML = `<span>⚠️</span> <div>${htmlMessage}</div>`;
  statusMessage.classList.remove('hidden');
  fetchBtn.disabled = false;
}

// ==========================================
// 7. TAB NAVIGATION (Inspector & Tutorial)
// ==========================================
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Deactivate all tabs
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.add('hidden'));

    // Activate selected tab
    button.classList.add('active');
    const targetId = button.getAttribute('data-tab');
    document.getElementById(targetId).classList.remove('hidden');
  });
});

// Attach fetch button listener
fetchBtn.addEventListener('click', handleFetchWeather);

// Automatically trigger an initial fetch on page load so the user sees data immediately!
window.addEventListener('DOMContentLoaded', () => {
  handleFetchWeather();
});
