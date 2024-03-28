
// Function to generate the hash
console.log("Script started.");
function generateHash(timestamp, privateKey, publicKey) {
    // Concatenate the timestamp, private key, and public key
    var hashInput = timestamp + privateKey + publicKey;

    // Generate the MD5 hash
    var hash = CryptoJS.MD5(hashInput).toString();

    return hash;
}

// Example usage
var ts = Date.now(); // Replace with your timestamp
var privateKey = "5ba35987df1f4fb497bbb0c1edd479fa488c0333"; 
var publicKey = "e4fff3be3368a1d604d804e6d15e965f"; 

var hash = generateHash(ts, privateKey, publicKey);

// Fetch data from the Marvel API using the generated hash

//Fetch data from the Marvel API using the generated hash
export async function fetchMarveldata() {
    const limit = 100; // Number of characters to fetch per request (adjustable)
    let offset = 0;
    let allCharacters = [];
  
    while (true) {
      const response = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}&offset=${offset}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const characters = data.data.results;
  
      // Check if there are any characters returned
      if (characters.length === 0) {
        break; // No more characters to fetch, exit the loop
      }
  
      allCharacters = allCharacters.concat(characters); 
      offset += limit; 
    }
  
    return allCharacters;
  }
  


// BELOW CODE USED TO CREATE JSON FILE


// fetchMarveldata()
//   .then(data => {
//     // Convert the data to a JSON string
//     const jsonData = JSON.stringify(data);

//     // Create a Blob with the JSON string
//     const blob = new Blob([jsonData], { type: 'application/json' });

//     // Create a temporary anchor element
//     const a = document.createElement('a');
//     const url = window.URL.createObjectURL(blob);

//     // Set the anchor's attributes for downloading
//     a.href = url;
//     a.download = 'marvel_data.json';

//     // Programmatically click the anchor to trigger download
//     document.body.appendChild(a);
//     a.click();

//     // Clean up
//     window.URL.revokeObjectURL(url);
//     document.body.removeChild(a);
//   })
//   .catch(error => {
//     console.error('Error fetching data:', error);
//   });

