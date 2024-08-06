// script.js

let data = {};

document.addEventListener('DOMContentLoaded', function() {

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(json => {
            data = json;
            console.log('Read Success: ' , data);
        })
        .catch(error => console.error('Error fetching JSON:', error));


    const resultsContainer = document.getElementById('results');

    const searchButton = document.getElementById('searchBtn');
    const clearButton = document.getElementById('clearBtn');
    const searchInput = document.getElementById('searchBox');
    const messageBox = document.getElementById('message-box');
  

    const homeSection = document.getElementById('home-section');
    const aboutSection = document.getElementById('about-section');
    const contactSection = document.getElementById('contact-section');

    const searchSection = document.getElementById('search-section');
    const homeLink = document.getElementById('home-link');
    const aboutLink = document.getElementById('about-link');
    const contactLink = document.getElementById('contact-link');

    // Function to show the message box
    function showMessage(message) {
      messageBox.textContent = message;
      messageBox.style.display = 'block';
    }
  
    // Function to hide the message box
    function hideMessage() {
      messageBox.style.display = 'none';
    }
  
    // Search button click event
    searchButton.addEventListener('click', function() {
      if (searchInput.value.trim() === '') {
        showMessage('Please enter a valid query.');
      } else {
        hideMessage();

        const searchQuery = searchInput.value.trim().toLowerCase();
        
        resultsContainer.innerHTML = '';

        console.log('Search query:', searchQuery); // Log the search query

        let results = [];

        

        /*if (data[searchQuery]) {
            results = data[searchQuery];
        } else {
            for (let key in data) {
                if (data[key].some(item => item.name.toLowerCase().includes(searchQuery) || item.description.toLowerCase().includes(searchQuery))) {
                    results = results.concat(data[key].filter(item => item.name.toLowerCase().includes(searchQuery) || item.description.toLowerCase().includes(searchQuery)));
                }
            }
        } // if*/




    // Search based on the key (e.g., 'countries', 'beaches', 'temples')
    if (data[searchQuery]) {
        // If the key is 'countries', look within the cities array

        console.log('DIsplaying data again: ' , data);

        if (searchQuery === 'countries') {
            data.countries.forEach(country => {
                country.cities.forEach(city => {
                    results.push({
                        name: city.name,
                        description: city.description,
                        imageUrl: city.imageUrl
                    });

                    /*if (city.name.toLowerCase().includes(searchQuery) || city.description.toLowerCase().includes(searchQuery)) {
                        results.push({
                            name: city.name,
                            description: city.description,
                            imageUrl: city.imageUrl
                        });
                    }*/
                });
            });
        } else { // For 'beaches' and 'temples'
            data[searchQuery].forEach(item => {
                results.push({
                    name: item.name,
                    description: item.description,
                    imageUrl: item.imageUrl
                });
                /*if (item.name.toLowerCase().includes(searchQuery) || item.description.toLowerCase().includes(searchQuery)) {
                    results.push({
                        name: item.name,
                        description: item.description,
                        imageUrl: item.imageUrl
                    });
                }*/
            });
        }
    } else {
        // Search within all available data if the key does not match
        for (let key in data) {
            data[key].forEach(item => {
                if (item.cities) { // If the item has a 'cities' key
                    item.cities.forEach(city => {
                        const name = city.name ? city.name.toLowerCase() : '';
                        const description = city.description ? city.description.toLowerCase() : '';

                        if (name.includes(searchQuery) || description.includes(searchQuery)) {
                            results.push({
                                name: city.name,
                                description: city.description,
                                imageUrl: city.imageUrl
                            });
                        }
                    });
                } else { // For 'beaches' and 'temples'
                    const name = item.name ? item.name.toLowerCase() : '';
                    const description = item.description ? item.description.toLowerCase() : '';

                    if (name.includes(searchQuery) || description.includes(searchQuery)) {
                        results.push({
                            name: item.name,
                            description: item.description,
                            imageUrl: item.imageUrl
                        });
                    }
                }
            });
        }
    }
   

        console.log('Search results:', results); // Log the search results


        if (results.length > 0) {
            results.forEach(item => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
                    <img src="${item.imageUrl}" alt="${item.name}">
                    <p class="name">${item.name}</p>
                    <p class="description">${item.description}</p>
                    <button class="book-now">Visit</button>
                `;
                resultsContainer.appendChild(card);
            });
        } else {
            /*resultsContainer.innerHTML = '<p>No results found.</p>';*/
            showMessage('No result Found');
        }



      } // else
    });
  
    // Clear button click event
    clearButton.addEventListener('click', function() {
      searchInput.value = ''; // Clear the search input
      hideMessage(); // Hide the message box
      resultsContainer.innerHTML = '';
    });


    // Home link click event
    homeLink.addEventListener('click', function() {
        toggleSearchSection(true); // Show the search section
        toggleHomeSection(true); 
        toggleAboutSection(false);
        toggleContactSection(false);
        hideMessage(); // Hide the message box
        resultsContainer.innerHTML = '';
    });

    // About Us link click event
    aboutLink.addEventListener('click', function() {
        toggleSearchSection(false); // Hide the search section
        toggleHomeSection(false); 
        toggleContactSection(false);

        toggleAboutSection(true);
        hideMessage(); // Hide the message box
        resultsContainer.innerHTML = '';
    });


    // Contact link click event
    contactLink.addEventListener('click', function() {
        toggleSearchSection(false); // Hide the search section
        toggleHomeSection(false); 

        toggleContactSection(true);
        toggleHomeSection(false); 
        toggleAboutSection(false);
        hideMessage(); // Hide the message box
        resultsContainer.innerHTML = '';
    });


  function toggleHomeSection(show) {
    homeSection.style.display = show ? 'block' : 'none';
  }

  function toggleAboutSection(show) {
    aboutSection.style.display = show ? 'list-item' : 'none';
  }

  function toggleContactSection(show) {
    contactSection.style.display = show ? 'flex' : 'none';
  }


  // Function to show or hide the search section
  function toggleSearchSection(show) {
    searchSection.style.display = show ? 'flex' : 'none';
  }

    // Initialize the state
    toggleSearchSection(true); // Hide search section initially or as per requirement


    // Initialize the state
    toggleAboutSection(false); // Hide search section initially or as per requirement

     // Initialize the state
     toggleContactSection(false); // Hide search section initially or as per requirement



  });
  