import { fetchMarveldata } from "./try.js";

fetchMarveldata().then(data => {
  showLoadingOverlay();
  handleData(data);
  hideLoadingOverlay();
}).catch(error => {
  console.error('Error fetching data:', error);
  hideLoadingOverlay();
});

// Function to show loading overlay
export function showLoadingOverlay() {
  document.getElementById('loading-overlay').style.display = 'block';
}

// Function to hide loading overlay
export function hideLoadingOverlay() {
  document.getElementById('loading-overlay').style.display = 'none';
}

// Function to handle the retrieved data
export function handleData(data) {
  
  // Get the parent container where names will be added
  const parentContainer = document.querySelector('.names');
  const search = document.querySelector('.search');

  // Function to filter data based on search value
  function filterData() {
    parentContainer.innerHTML = ''; // Clear previous results
    if (search.value === '' || search.value === null) {
      data.forEach(item => {
        const nameDiv = createNameDiv(item);
        parentContainer.appendChild(nameDiv);
      });
    } else {
      data.forEach(item => {
        if (item.name.toLowerCase().includes(search.value.toLowerCase())) {
          const nameDiv = createNameDiv(item);
          parentContainer.appendChild(nameDiv);
        }
      });
    }
  }

  // Create name div element
  function createNameDiv(item) {
    const nameDiv = document.createElement('div');
    nameDiv.classList.add('li');
    nameDiv.textContent = item.name;
    nameDiv.addEventListener('click', () => {
      displayDetails(item);
    });
    return nameDiv;
  }

  // Function to display details when a nameDiv is clicked
  function displayDetails(item) {
    const description = document.querySelector('.description');
    if (item.description !== '') {
      description.textContent = item.description;
    } else {
      description.textContent = 'No description available';
    }
    const name = document.querySelector('.name');
    name.textContent = item.name;
    showLoadingOverlay();
    const img = document.querySelector('.character-img');

    let imageUrl = item.thumbnail.path + '/standard_fantastic.' + item.thumbnail.extension;
    img.src = imageUrl;
    img.alt = item.name;
    showLoadingOverlay();
    img.onload = () => {
      hideLoadingOverlay();
    };
    hideLoadingOverlay();
  }
  // Listen for input event on the search input field
  search.addEventListener('input', filterData);
  filterData();
  hideLoadingOverlay();
  // Add an event listener to each name anchor tag to handle clicks
  document.querySelectorAll('.name').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        event.preventDefault();
        const name = this.textContent;
        
        //details.html page with the name as a query parameter
        window.location.href = `details.html?name=${encodeURIComponent(name)}`;
    });
  });
}
