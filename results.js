document.addEventListener('DOMContentLoaded', function () {

  function getSearchQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('search') ? urlParams.get('search').toLowerCase() : '';
  }

  // Function to get the selected media types from the UI
  function getSelectedMediaTypes() {
    const checkboxes = document.querySelectorAll('input[name="media-type"]:checked');
    return Array.from(checkboxes).map(cb => cb.value.toLowerCase());
  }

  // Function to update and display results
  function updateAndDisplayResults() {
    const searchQuery = getSearchQuery();
    const selectedMediaTypes = getSelectedMediaTypes();
    const filteredResults = track_list.filter(track => {
      const matchesType = !selectedMediaTypes.length || selectedMediaTypes.includes(track.type.toLowerCase());
      const matchesQuery = !searchQuery || track.name.toLowerCase().includes(searchQuery) || track.artist.toLowerCase().includes(searchQuery);
      return matchesType && matchesQuery;
    });
    displayResults(filteredResults);
  }

  // Function to display the results
  function displayResults(filteredResults) {
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = ''; // Clear existing results
    if (filteredResults.length) {
      filteredResults.forEach((track, index) => {
        let resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';

        // Create audio player for each track
        let audioPlayer = document.createElement('audio');
        audioPlayer.setAttribute('controls', 'controls');
        audioPlayer.style.width = '100%';
        audioPlayer.src = track.path;

        // Create a download link. Note: this only works with the items on the server.
        let downloadLink = document.createElement('a');
        downloadLink.href = track.path;
        downloadLink.download = track.name; // This sets the filename for the downloaded file
        downloadLink.textContent = 'Download';
        downloadLink.style.display = 'block'; // Ensures the link is on a new line


        // Populate result item with track info and the audio player
        resultItem.innerHTML = `
          <div style="flex-grow: 1;">
            <strong>Track:</strong> ${track.name},
            <strong>Artist:</strong> ${track.artist}
          </div>
        `;
        // Append the audio player to the result item
        resultItem.appendChild(audioPlayer);

        searchResults.appendChild(resultItem);
      });
    } else {
      searchResults.innerHTML = '<div>No results found</div>';
    }
  }

  // Expose updateAndDisplayResults to the global scope to be called on filter change
  window.updateResults = updateAndDisplayResults;

  // Initial call to display results based on search query and no filters
  updateAndDisplayResults();
});
