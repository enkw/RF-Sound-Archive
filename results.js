document.addEventListener('DOMContentLoaded', function () {

  let currentPlayingAudio = null; // Reference to currently playing audio

  function getSearchQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('search') ? urlParams.get('search').toLowerCase() : '';
  }

  function getSelectedMediaTypes() {
    const checkboxes = document.querySelectorAll('input[name="media-type"]:checked');
    return Array.from(checkboxes).map(cb => cb.value.toLowerCase());
  }

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

  function displayResults(filteredResults) {
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = ''; // Clear existing results
    if (filteredResults.length) {
      filteredResults.forEach((track, index) => {
        let resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';

        let audioPlayer = document.createElement('audio');
        audioPlayer.setAttribute('controls', 'controls');
        audioPlayer.style.width = '100%';
        audioPlayer.src = track.path;

        // Add an event listener to ensure only one audio plays at a time
        audioPlayer.onplay = function() {
          if (currentPlayingAudio && currentPlayingAudio !== audioPlayer) {
            currentPlayingAudio.pause();
          }
          currentPlayingAudio = audioPlayer;
        };

        let downloadLink = document.createElement('a');
        downloadLink.href = track.path;
        downloadLink.download = track.name;
        downloadLink.textContent = 'Download';
        downloadLink.style.display = 'block';

        resultItem.innerHTML = `
          <div style="flex-grow: 1;">
            <strong>Track:</strong> ${track.name},
            <strong>Artist:</strong> ${track.artist}
          </div>
        `;
        resultItem.appendChild(audioPlayer);
        searchResults.appendChild(resultItem);
      });
    } else {
      searchResults.innerHTML = '<div>No results found</div>';
    }
  }

  window.updateResults = updateAndDisplayResults;
  updateAndDisplayResults();
});