let currentDetailsContainer = null; // Variável para armazenar a caixa de detalhes atual

async function loadBooks() {
    try {
        const response = await fetch('JSON/data.json');
        const data = await response.json();
        displayBooks(data.books);

        const genreFilter = document.getElementById('genre-filter');
        const ratingFilter = document.getElementById('rating-filter');

        genreFilter.addEventListener('change', () => {
            applyFilters(data.books, genreFilter.value, ratingFilter.value);
        });

        ratingFilter.addEventListener('change', () => {
            applyFilters(data.books, genreFilter.value, ratingFilter.value);
        });
    } catch (error) {
        console.error("Erro ao carregar os livros:", error);
    }
}

function applyFilters(books, selectedGenre, selectedRating) {
    let filteredBooks = books;

    if (selectedGenre) {
        filteredBooks = filteredBooks.filter(book => book.genre === selectedGenre);
    }

    if (selectedRating) {
        filteredBooks = filteredBooks.filter(book => book.rating === parseInt(selectedRating));
    }

    displayBooks(filteredBooks);
}

function displayBooks(books) {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';
    books.forEach(book => {
        const card = document.createElement('div');
        card.classList.add('book-card');
        card.innerHTML = `
            <a href="#" class="book-link" onclick="openBookDetails(event, '${book.title}', '${book.cover}', '${book.genre}', '${book.synopsis}', ${book.rating}, ${book.views})">
                <h3>${book.title}</h3>
                <img src="${book.cover}" alt="${book.title}" class="book-cover">
                <p>Genre: ${book.genre}</p>
                <div class="stars">${getStars(book.rating)}</div>
            </a>
        `;
        bookList.appendChild(card);
    });
}

function getStars(rating) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        starsHtml += `<span class="star ${i <= rating ? 'filled' : ''}">★</span>`;
    }
    return starsHtml;
}

function openBookDetails(event, title, cover, genre, synopsis, rating, views) {
    event.preventDefault(); // Impede o comportamento padrão do link

    // Fechar a caixa de detalhes atual, se existir
    if (currentDetailsContainer) {
        currentDetailsContainer.remove();
    }

    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('book-details');
    detailsContainer.innerHTML = `
        <div class="details-header">
            <span class="close-button" onclick="closeBookDetails()">✖</span>
        </div>
        <h3>${title}</h3>
        <img src="${cover}" alt="${title}" class="book-cover">
        <p>${genre}</p>
        <div class="stars">${getStars(rating)}</div>
        <p>(${views} visualizações)</p>
        <p>${synopsis}</p>
    `;
    document.body.appendChild(detailsContainer);
    currentDetailsContainer = detailsContainer; // Armazena a nova caixa de detalhes

    detailsContainer.addEventListener('click', (e) => {
        if (e.target === detailsContainer) {
            closeBookDetails();
        }
    });
}

function closeBookDetails() {
    if (currentDetailsContainer) {
        currentDetailsContainer.remove();
        currentDetailsContainer = null; // Reseta a variável
    }
}

document.addEventListener("DOMContentLoaded", loadBooks);

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
