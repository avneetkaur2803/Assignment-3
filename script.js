// Define API credentials and URL template
const apiHost = 'wft-geo-db.p.rapidapi.com';
const apiKey = '<f84bb6648fmsh6ee15beec208e70p1b695djsn0ab80258d71f>';
const urlTemplate = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=';

document.getElementById("searchButton").addEventListener("click", () => {
    const cityInput = document.getElementById("cityInput").value;
    if (cityInput) {
        fetchCities(cityInput); // Call fetchCities with user input
    } else {
        alert("Please enter a city name prefix.");
    }
});

function fetchCities(namePrefix) {
    const url = `${urlTemplate}${namePrefix}`;

    // Fetch city data from the API
    fetch(url, {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": apiHost,
        },
    })
        .then((response) => response.json())
        .then((data) => displayResults(data)) // Display data
        .catch((error) => console.error("Error fetching data:", error)); // Handle errors
}

function displayResults(data) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; // Clear previous results

    if (data.data.length === 0) {
        resultsDiv.innerHTML = "<p>No cities found. Try another prefix.</p>";
        return;
    }

    // Loop through the cities and display the information
    data.data.forEach((city) => {
        const cityInfo = `
            <p>
                <strong>${city.name}, ${city.region}, ${city.country}</strong><br>
                Latitude: ${city.latitude}, Longitude: ${city.longitude}<br>
                Population: ${city.population || "N/A"}
            </p>
        `;
        resultsDiv.innerHTML += cityInfo; // Append city info to the results section
    });
}

// Documentation: https://rapidapi.com/wirefreethought/api/geodb-cities/
