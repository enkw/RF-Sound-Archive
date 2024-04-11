// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Function to parse URL parameters
  function getSearchQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('search') ? urlParams.get('search').toLowerCase() : '';
  }

  // Assuming 'track_list' is defined and accessible here
  const searchQuery = getSearchQuery();
  const searchResults = document.getElementById('search-results');

  // Clear previous results
  searchResults.innerHTML = '';

  // Filter the track list based on the search query
  const results = track_list.filter(track =>
    track.name.toLowerCase().includes(searchQuery) || track.artist.toLowerCase().includes(searchQuery)
  );

  // Display results
  if (results.length > 0) {
    results.forEach((track, index) => {
      let resultItem = document.createElement('div');
      resultItem.innerHTML = `<div class="search-result-item">Track: ${track.name}, Artist: ${track.artist} <button onclick="loadTrack(${index}); playTrack();">Play</button></div>`;
      searchResults.appendChild(resultItem);
    });
  } else {
    searchResults.innerHTML = '<div>No results found</div>';
  }

  // Function placeholders for `loadTrack` and `playTrack`, assuming these are defined elsewhere
  window.loadTrack = function (index) {
    // Implementation of loading the track by index from 'track_list'
    console.log(`Loading track ${track_list[index].name}`);
    // Additional functionality to set up the track for playing goes here
  };

  window.playTrack = function () {
    // Implementation of playing the loaded track
    console.log('Playing the loaded track');
    // Additional functionality to control playback goes here
  };
});

