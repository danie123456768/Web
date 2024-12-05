const baseURL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';
const apiKey = 'NH43A6679NC8DG4246RBV9SG7';

// Grab references to DOM elements
const search = document.querySelector('#search');
const dateInput = document.querySelector('#date');
const searchForm = document.querySelector('#searchForm');
const weatherTable = document.querySelector('#weatherTable tbody');

// Add event listener for the search form
searchForm.addEventListener('submit', fetchWeather);

function fetchWeather(event) {
    event.preventDefault();

    const country = search.value.trim();
    const date = dateInput.value;

    if (!country) {
        alert('Please enter a country.');
        return;
    }

    // Construct the API URL
    let url = `${baseURL}/${country}`;
    url += date ? `/${date}` : '';
    url += `?unitGroup=metric&key=${apiKey}&contentType=json`;

    // Fetch data from the API
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(json => {
            displayResults(json);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherTable.innerHTML = '<tr><td colspan="4">Unable to fetch weather data. Please try again later.</td></tr>';
        });
}

function displayResults(data) {
    weatherTable.innerHTML = ''; 

    if (!data || !data.days || data.days.length === 0) {
        weatherTable.innerHTML = '<tr><td colspan="4">No results found. Please check your search.</td></tr>';
        return;
    }

    data.days.forEach(day => {
        const row = document.createElement('tr');
        const date = document.createElement('td');
        const temperature = document.createElement('td');
        const condition = document.createElement('td');
        const iconCell = document.createElement('td');
       

        date.textContent = day.datetime;
        temperature.textContent = `${day.temp}`;
        condition.textContent = day.conditions;
       

        row.appendChild(date);
        row.appendChild(temperature);
        row.appendChild(condition);
        

        weatherTable.appendChild(row);
    });
}
