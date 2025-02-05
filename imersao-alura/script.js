const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');
const artistName = document.getElementById('artist-name'); // Elemento existente
const artistImage = document.getElementById('artist-img'); // Elemento existente

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists`;
    fetch(url)
        .then(response => response.json())
        .then(result => {
            const filteredResults = result.filter(artist =>
                artist.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            displayResults(filteredResults);
        });
}

function displayResults(result) {
    resultPlaylist.classList.add("hidden");

    if (result.length === 0) {
        artistName.innerText = "Nenhum artista encontrado";
        artistImage.src = ""; // Remove a imagem
        return;
    }

    const artist = result[0]; // Pega o primeiro artista correspondente

    artistName.innerText = artist.name;
    artistImage.src = artist.urlImg;
    artistImage.alt = artist.name;

    resultArtist.classList.remove('hidden');
}

document.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === '') {
        resultPlaylist.classList.add('hidden');
        resultArtist.classList.remove('hidden');
        return;
    }
    
    requestApi(searchTerm);
});
