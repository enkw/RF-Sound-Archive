// Function to handle music search functionality
async function searchMusicByGenre(genre) {
    try {
        const response = await fetch('/api/music/search?genre=${genre}');

        // Display search results to the user
        if (response.ok) {
            const searchResults = await response.json();
            console.log(`Searching for music tracks in the ${genre} genre`);
            console.log('Search Results:', searchResults);
        } else {
            console.log('Error searching for music tracks');
        }
    } catch (error) {
        console.error('Error searching for music tracks:', error.message);
    }
}

// Usage of searchMusicByGenre function
// Search for all music tracks
searchMusicByGenre();
