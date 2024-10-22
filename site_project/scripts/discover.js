async function loadBooks() {
    try {
        const response = await fetch('JSON/data.json');
        const data = await response.json();
        displayBooks(data.books);

        const genreFilter = document.getElementById('genre-filter');
        genreFilter.addEventListener('change', () => {
            const selectedGenre = genreFilter.value;
            const filteredBooks = selectedGenre ? data.books.filter(book => book.genre === selectedGenre) : data.books;
            displayBooks(filteredBooks);
        });
    } catch (error) {
        console.error("Erro ao carregar os livros:", error);
    }
}

function displayBooks(books) {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';
    books.forEach(book => {
        const card = document.createElement('div');
        card.classList.add('book-card');
        card.innerHTML = `
            <a href="discover.html" class="book-link">
                <img src="${book.cover}" alt="${book.title}" class="book-cover" loading="lazy" width="200" height="250">
                <h3>${book.title}</h3>
                <p>Genre: ${book.genre}</p>
                <p>${book.synopsis}</p>
            </a>
        `;
        bookList.appendChild(card);
    });
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
  