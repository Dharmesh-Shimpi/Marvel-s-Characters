import { fetchMarveldata } from "./try.js";

fetchMarveldata()
.then(data => { 
  showLoadingOverlay();
  display(data);
  hideLoadingOverlay();
})
.catch(error => {
  console.error('Error fetching data:', error);
  hideLoadingOverlay();
});

// Function to show loading overlay
function showLoadingOverlay() {
document.getElementById('loading-overlay').style.display = 'block';
}

// Function to hide loading overlay
function hideLoadingOverlay() {
document.getElementById('loading-overlay').style.display = 'none';
}

function display(data) {
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get('name');

  const nameElement = document.querySelector('.name');
  nameElement.textContent = name;

  function getInfo(name) {
    const item = data.find(item => item.name === name);
    return item;  
  }
  
  const description = document.querySelector(".character-info");
  if (getInfo(name).description === '') {
    description.textContent = 'No description available';
  } else {
    description.textContent = getInfo(name).description;
  }
  document.querySelector('.character-img').src = getInfo(name).thumbnail.path + '/standard_fantastic.' + getInfo(name).thumbnail.extension;
  document.querySelector('.character-img').alt = getInfo(name).name;
  document.querySelector('.comics').textContent = 'Comics: ' + getInfo(name).comics.available;
  document.querySelector('.events').textContent = 'Events: ' + getInfo(name).events.available;
  document.querySelector('.series').textContent = 'Series: ' + getInfo(name).series.available;
  document.querySelector('.stories').textContent = 'Stories: ' + getInfo(name).stories.available;
  document.querySelector('.detail').href = getInfo(name).urls[0].url;
  document.querySelector('.wiki').href= getInfo(name).urls[1].url;
  document.querySelector('.comiclink').href = getInfo(name).urls[2].url;
  
  // Retrieve favorite character IDs from local storage
  let favoriteCharacterIds = JSON.parse(localStorage.getItem('favoriteCharacterIds')) || [];

  const likeButton = document.querySelector(".heart"); 

  likeButton.addEventListener('click', updateFavorites);
  function updateFavorites()  {
    const characterName = name;
    const isLiked = favoriteCharacterIds.includes(characterName);

    if (!isLiked) {
      likeButton.classList.add('heart-animation');
      likeButton.classList.add('fa-solid');
      likeButton.classList.remove('fa-regular');
      favoriteCharacterIds.push(characterName);
    } else {
      likeButton.classList.remove('heart-animation');
      likeButton.classList.remove('fa-solid');
      likeButton.classList.add('fa-regular');
      favoriteCharacterIds = favoriteCharacterIds.filter(id => id !== characterName);
    }

    // Update local storage with updated favorite character IDs
    localStorage.setItem('favoriteCharacterIds', JSON.stringify(favoriteCharacterIds));
  }

  const isCurrentCharacterLiked = favoriteCharacterIds.includes(name);
  if (isCurrentCharacterLiked) {
    likeButton.classList.add('heart-animation');
    likeButton.classList.add('fa-solid');
    likeButton.classList.remove('fa-regular');
  }
}
