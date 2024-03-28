import { fetchMarveldata } from "./try.js";

fetchMarveldata()
.then(data => { 
  showLoadingOverlay();
  displayCharacters(data);
  hideLoadingOverlay();
})
.catch(error => {
  console.error('Error fetching data:', error);
  hideLoadingOverlay();
});

function showLoadingOverlay() {
  document.getElementById('loading-overlay').style.display = 'flex';
}

function hideLoadingOverlay() {
  document.getElementById('loading-overlay').style.display = 'none';
}

function displayCharacters(data) {
  const parentContainer = document.querySelector('.names');
  parentContainer.innerHTML = '';

  const favoriteCharacterIds = JSON.parse(localStorage.getItem('favoriteCharacterIds')) || [];
  const filteredData = favoriteCharacterIds.length > 0
    ? data.filter(item => favoriteCharacterIds.includes(item.name)) 
    : data;

  filteredData.forEach(item => {
    const nameDiv = document.createElement('div');
    nameDiv.classList.add('li');
    nameDiv.textContent = item.name;
    nameDiv.addEventListener('click', () => {
      display(item);
    });
    parentContainer.appendChild(nameDiv);
  });
}

function display(item) {
  const description = document.querySelector('.description');
  if (item.description !== '') {
    description.textContent = item.description;
  } else {
    description.textContent = 'No description available';
  }

  const name = document.querySelector('.name');
  name.textContent = item.name;

  const img = document.querySelector('.character-img');

  const imageUrl = item.thumbnail.path + '/standard_fantastic.' + item.thumbnail.extension;
  img.src = imageUrl;
  img.alt = item.name;

  showLoadingOverlay(); // Combine into a single call if needed
  img.onload = () => {
    hideLoadingOverlay();
  };
}
