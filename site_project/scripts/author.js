let genreCount = 1; // Contador para os gêneros

document.getElementById("addGenreButton").addEventListener("click", function() {
    if (genreCount < 4) {
        genreCount++;
        const newGenreLabel = document.createElement("label");
        newGenreLabel.setAttribute("for", `genre${genreCount}`);
        newGenreLabel.textContent = `Genre of the work (optional) ${genreCount}:`;
        
        const newGenreInput = document.createElement("input");
        newGenreInput.type = "text";
        newGenreInput.id = `genre${genreCount}`;
        newGenreInput.name = `genre${genreCount}`;
        
        const addGenreContainer = document.getElementById("addGenreContainer");
        addGenreContainer.appendChild(newGenreLabel);
        addGenreContainer.appendChild(newGenreInput);

        // Se já for o 4º gênero, esconde o botão
        if (genreCount === 4) {
            document.getElementById("addGenreButton").style.display = "none";
        }
    }
});

document.getElementById("authorForm").addEventListener("submit", function(event) {
    const genres = [document.getElementById("genre1").value, 
                    document.getElementById("genre2")?.value, 
                    document.getElementById("genre3")?.value, 
                    document.getElementById("genre4")?.value];

    // Valida se pelo menos um gênero foi preenchido
    const hasSelectedGenre = genres.some(genre => genre.trim() !== "");
    if (!hasSelectedGenre) {
        event.preventDefault(); // Impede o envio do formulário
        document.getElementById("genreError").style.display = "block"; // Exibe a mensagem de erro
    }
});

document.addEventListener("DOMContentLoaded", () => {
    let currentPath = window.location.pathname;
    if (currentPath.startsWith('/')) {
        currentPath = currentPath.substring(1);
    }
    const navLinks = document.querySelectorAll('.navigation-home a');
    navLinks.forEach(link => {
        if (currentPath.endsWith(link.getAttribute('href'))) {
            link.classList.add('active');
            link.style.backgroundColor = 'white';
            link.style.color = 'black';
        }
    });
});
  
  document.getElementById("currentyear").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = "Last Modification: " + document.lastModified;
  