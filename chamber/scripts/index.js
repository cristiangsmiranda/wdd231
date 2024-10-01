fetch('data/G.S.members.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const qualifiedMembers = data.filter(member => 
            member.membership_level === "Silver" || member.membership_level === "Gold"
        );

        const randomMembers = [];
        while (randomMembers.length < 2 && qualifiedMembers.length > 0) {
            const randomIndex = Math.floor(Math.random() * qualifiedMembers.length);
            randomMembers.push(qualifiedMembers[randomIndex]);
            qualifiedMembers.splice(randomIndex, 1); // Remover para evitar duplicatas
        }

        // Adicionar membros à nova seção de cards
        const membersContainer = document.getElementById('members-cards');

        randomMembers.forEach(member => {
            const card = document.createElement('div');
            card.className = 'member-card';
            card.innerHTML = `
                <h3>${member.name}</h3>
                <img src="${member.logo}" alt="${member.name} Logo" width="100"/>
                <p>Phone: ${member.phone}</p>
                <p>Address: ${member.address}</p>
                <p><a href="${member.website}" target="_blank">Visit the website</a></p>
                <p>Membership Level: ${member.membership_level}</p>
            `;
            membersContainer.appendChild(card);
        });
    })
    .catch(error => console.error('Error fetching member data:', error));

function convertUnixToTime(unixTime) {
    const date = new Date(unixTime * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

// Função para buscar clima atual
async function fetchWeather() {
    const apiKey = '5c8c33a8d924cf8e376c1fb552cf29d7';
    const city = 'Salvador';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const temp = Math.round(data.main.temp);
        const weatherDescription = data.weather[0].description;
        const tempHigh = Math.round(data.main.temp_max);
        const tempLow = Math.round(data.main.temp_min);
        const humidity = data.main.humidity;
        const sunrise = convertUnixToTime(data.sys.sunrise);
        const sunset = convertUnixToTime(data.sys.sunset);

        document.querySelector('#current-temp').textContent = `${temp}°C`;
        document.querySelector('#current-description').textContent = capitalizeWords(weatherDescription);
        document.querySelector('#high-temp').textContent = `High: ${tempHigh}°C`;
        document.querySelector('#low-temp').textContent = `Low: ${tempLow}°C`;
        document.querySelector('#humidity').textContent = `Humidity: ${humidity}%`;
        document.querySelector('#sunrise').textContent = `Sunrise: ${sunrise}`;
        document.querySelector('#sunset').textContent = `Sunset: ${sunset}`;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Função para buscar a previsão do tempo
async function fetchForecast() {
    const apiKey = '5c8c33a8d924cf8e376c1fb552cf29d7';
    const city = 'Salvador';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const dayAfterTomorrow = new Date(today);
        dayAfterTomorrow.setDate(today.getDate() + 2);
        const todayTemps = data.list.filter(item => {
            const date = new Date(item.dt * 1000);
            return date.getDate() === today.getDate();
        });
        const tomorrowTemps = data.list.filter(item => {
            const date = new Date(item.dt * 1000);
            return date.getDate() === tomorrow.getDate();
        });
        const dayAfterTemps = data.list.filter(item => {
            const date = new Date(item.dt * 1000);
            return date.getDate() === dayAfterTomorrow.getDate();
        });

        // Calcula a temperatura média para cada dia
        const averageTodayTemp = todayTemps.reduce((acc, item) => acc + item.main.temp, 0) / todayTemps.length;
        const averageTomorrowTemp = tomorrowTemps.reduce((acc, item) => acc + item.main.temp, 0) / tomorrowTemps.length;
        const averageDayAfterTemp = dayAfterTemps.reduce((acc, item) => acc + item.main.temp, 0) / dayAfterTemps.length;
        // Atualiza o HTML com as temperaturas médias
        document.querySelector('#today-temp').textContent = Math.round(averageTodayTemp);
        document.querySelector('#tomorrow-temp').textContent = Math.round(averageTomorrowTemp);
        document.querySelector('#day-after-temp').textContent = Math.round(averageDayAfterTemp);
    } catch (error) {
        console.error('Error when searching for the weather forecast:', error);
    }
}

function capitalizeWords(str) {
    return str.split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
}

window.onload = function() {
    fetchWeather();
    fetchForecast();
};

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
