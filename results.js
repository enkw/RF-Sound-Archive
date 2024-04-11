document.addEventListener('DOMContentLoaded', function () {
  function getSearchQuery() {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('search') ? urlParams.get('search').toLowerCase() : '';
  }

  const searchQuery = getSearchQuery();
  const searchResults = document.getElementById('search-results');
  let currentAudioPlayer; // Keep track of the current audio player

  window.loadTrackFromResults = function (index) {
      const track = results[index];
      if (track && track.path) {
          // Remove the previous audio player if it exists
          if (currentAudioPlayer) {
              currentAudioPlayer.remove();
          }

          // Create a new audio player element
          currentAudioPlayer = document.createElement('audio');
          currentAudioPlayer.setAttribute('controls', 'controls');
          currentAudioPlayer.style.width = '100%';
          currentAudioPlayer.src = track.path;
          currentAudioPlayer.play();

          // Insert the audio player into the search results container
          searchResults.appendChild(currentAudioPlayer);
      } else {
          console.error('Track source not found.');
      }
  };

  const displayResults = () => {
      searchResults.innerHTML = '';

      if (results.length > 0) {
          results.forEach((track, index) => {
              let resultItem = document.createElement('div');
              resultItem.className = 'search-result-item';
              resultItem.innerHTML = `
                  <div style="flex-grow: 1;">
                      <strong>Track:</strong> ${track.name},
                      <strong>Artist:</strong> ${track.artist}
                  </div>
                  <button onclick="loadTrackFromResults(${index});">Play</button>
              `;
              searchResults.appendChild(resultItem);
          });
      } else {
          searchResults.innerHTML = '<div>No results found</div>';
      }
  };

  // Assuming 'track_list' is accessible and defined here
  const results = track_list.filter(track =>
      track.name.toLowerCase().includes(searchQuery) || track.artist.toLowerCase().includes(searchQuery)
  );

  displayResults();
});
